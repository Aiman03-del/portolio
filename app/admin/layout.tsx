import { createClient } from '@/lib/supabase/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import { AdminSidebar } from '@/components/admin-sidebar';
import Link from 'next/link';

export const metadata = {
  title: 'Admin Dashboard | Aiman Uddin Siam',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const adminSupabase = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Check if user is admin
  const { data: admin } = await adminSupabase
    .from('admins')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();

  if (!admin) {
    redirect('/auth/login');
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <div className="border-b border-border bg-card/50 px-8 py-4 flex justify-between items-center">
          <h2 className="text-lg font-light tracking-wide text-foreground">Admin Dashboard</h2>
          <Link
            href="/"
            className="px-4 py-2 text-sm font-light bg-muted hover:bg-muted/80 text-foreground rounded transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
