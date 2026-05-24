import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const adminEmail = 'ausiaam83@gmail.com';
const adminPassword = 'iloveutashu12';

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedAdmin() {
  try {
    let authUser = null;

    // Create the auth user, or reset the password if the user already exists.
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
    });

    if (authError) {
      if (authError.code !== 'email_exists') {
        console.error('Error creating auth user:', authError);
        return;
      }

      const { data: usersData, error: listError } = await supabase.auth.admin.listUsers();
      if (listError) {
        console.error('Error listing auth users:', listError);
        return;
      }

      authUser = usersData.users.find((user) => user.email === adminEmail) ?? null;
      if (!authUser) {
        console.error('Existing auth user was not found');
        return;
      }

      const { error: updateError } = await supabase.auth.admin.updateUserById(authUser.id, {
        password: adminPassword,
        email_confirm: true,
      });

      if (updateError) {
        console.error('Error updating auth user password:', updateError);
        return;
      }
    } else {
      authUser = authData.user ?? null;
    }

    if (!authUser) {
      console.error('No user returned from auth creation');
      return;
    }

    // Add user to admins table
    const { error: adminError } = await supabase
      .from('admins')
      .upsert({
        id: authUser.id,
        email: adminEmail,
        is_admin: true,
      }, { onConflict: 'id' });

    if (adminError) {
      console.error('Error creating admin record:', adminError);
      return;
    }

    console.log('✓ Admin user created successfully!');
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
    console.log('Dashboard: http://localhost:3000/admin/dashboard');
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

seedAdmin();
