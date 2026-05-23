import { createClient } from '@/lib/supabase/server';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
}

export async function getContactMessages() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data as ContactMessage[];
}

export async function createContactMessage(message: Omit<ContactMessage, 'id' | 'read' | 'created_at'>) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('contact_messages').insert([{ ...message, read: false }]).select().single();
  if (error) throw error;
  return data as ContactMessage;
}

export async function updateContactMessage(id: string, message: Partial<ContactMessage>) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('contact_messages').update(message).eq('id', id).select().single();
  if (error) throw error;
  return data as ContactMessage;
}

export async function deleteContactMessage(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('contact_messages').delete().eq('id', id);
  if (error) throw error;
}
