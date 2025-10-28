export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          company_name: string | null;
          company_logo: string | null;
          company_address: string | null;
          company_phone: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          company_name?: string | null;
          company_logo?: string | null;
          company_address?: string | null;
          company_phone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          company_name?: string | null;
          company_logo?: string | null;
          company_address?: string | null;
          company_phone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      clients: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          email: string;
          address: string | null;
          phone: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          email: string;
          address?: string | null;
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          email?: string;
          address?: string | null;
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      invoices: {
        Row: {
          id: string;
          user_id: string;
          client_id: string;
          invoice_number: string;
          invoice_date: string;
          due_date: string;
          status: 'draft' | 'sent' | 'paid' | 'overdue';
          subtotal: number;
          tax_amount: number;
          total: number;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          client_id: string;
          invoice_number: string;
          invoice_date: string;
          due_date: string;
          status?: 'draft' | 'sent' | 'paid' | 'overdue';
          subtotal: number;
          tax_amount: number;
          total: number;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          client_id?: string;
          invoice_number?: string;
          invoice_date?: string;
          due_date?: string;
          status?: 'draft' | 'sent' | 'paid' | 'overdue';
          subtotal?: number;
          tax_amount?: number;
          total?: number;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      invoice_items: {
        Row: {
          id: string;
          invoice_id: string;
          description: string;
          quantity: number;
          rate: number;
          amount: number;
        };
        Insert: {
          id?: string;
          invoice_id: string;
          description: string;
          quantity: number;
          rate: number;
          amount: number;
        };
        Update: {
          id?: string;
          invoice_id?: string;
          description?: string;
          quantity?: number;
          rate?: number;
          amount?: number;
        };
      };
    };
    Functions: {
      [_ in never]: never;
    };
  };
}