import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedAdmin() {
  try {
    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: 'admin@aiman.dev',
      password: 'Admin@123456',
      email_confirm: true,
    });

    if (authError) {
      console.error('Error creating auth user:', authError);
      return;
    }

    if (!authData.user) {
      console.error('No user returned from auth creation');
      return;
    }

    // Add user to admins table
    const { error: adminError } = await supabase
      .from('admins')
      .insert({
        id: authData.user.id,
        email: 'admin@aiman.dev',
        is_admin: true,
      });

    if (adminError) {
      console.error('Error creating admin record:', adminError);
      return;
    }

    console.log('✓ Admin user created successfully!');
    console.log('Email: admin@aiman.dev');
    console.log('Password: Admin@123456');
    console.log('Dashboard: http://localhost:3000/admin/dashboard');
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

seedAdmin();
