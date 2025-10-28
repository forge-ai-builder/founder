import type { Database } from './database.types';

export type Invoice = Database['public']['Tables']['invoices']['Row'];
export type InvoiceInsert = Database['public']['Tables']['invoices']['Insert'];
export type InvoiceUpdate = Database['public']['Tables']['invoices']['Update'];

export type InvoiceItem = Database['public']['Tables']['invoice_items']['Row'];
export type InvoiceItemInsert = Database['public']['Tables']['invoice_items']['Insert'];

export type Client = Database['public']['Tables']['clients']['Row'];
export type ClientInsert = Database['public']['Tables']['clients']['Insert'];
export type ClientUpdate = Database['public']['Tables']['clients']['Update'];

export type User = Database['public']['Tables']['users']['Row'];
export type UserUpdate = Database['public']['Tables']['users']['Update'];

export interface InvoiceWithDetails extends Invoice {
  client: Client;
  items: InvoiceItem[];
}

export interface DashboardStats {
  totalRevenue: number;
  paidInvoices: number;
  pendingInvoices: number;
  overdueInvoices: number;
}