import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

export function useAuth() {
  const queryClient = useQueryClient();

  const { data: session, isLoading } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return data.session;
    },
  });

  const { data: user } = useQuery({
    queryKey: ['user', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return null;
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  const signInMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
    },
  });

  const signUpMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      
      if (data.user) {
        const { error: userError } = await supabase.from('users').insert({
          id: data.user.id,
          email: data.user.email!,
        });
        if (userError) throw userError;
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
    },
  });

  const signOutMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });

  return {
    session,
    user,
    isLoading,
    signIn: signInMutation.mutateAsync,
    signUp: signUpMutation.mutateAsync,
    signOut: signOutMutation.mutateAsync,
    isSigningIn: signInMutation.isPending,
    isSigningUp: signUpMutation.isPending,
  };
}