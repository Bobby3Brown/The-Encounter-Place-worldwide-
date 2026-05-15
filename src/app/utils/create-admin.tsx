/**
 * Admin User Creation Utility
 * 
 * To create an admin user, run this in your browser console on the website:
 * 
 * fetch('https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-a056ab6a/admin/signup', {
 *   method: 'POST',
 *   headers: {
 *     'Content-Type': 'application/json',
 *     'Authorization': 'Bearer YOUR_ANON_KEY'
 *   },
 *   body: JSON.stringify({
 *     email: 'admin@church.com',
 *     password: 'your-secure-password',
 *     name: 'Admin Name'
 *   })
 * })
 * .then(res => res.json())
 * .then(data => console.log('Admin created:', data))
 * .catch(err => console.error('Error:', err));
 * 
 * Replace YOUR_PROJECT_ID and YOUR_ANON_KEY with your actual Supabase credentials.
 */

import { projectId, publicAnonKey } from './supabase/info';

export async function createAdminUser(email: string, password: string, name: string) {
  try {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-a056ab6a/admin/signup`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ email, password, name }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to create admin');
    }

    console.log('Admin created successfully:', data);
    return data;
  } catch (error) {
    console.error('Error creating admin:', error);
    throw error;
  }
}

// Example usage (you can call this from browser console):
// import { createAdminUser } from './utils/create-admin';
// createAdminUser('admin@church.com', 'SecurePassword123!', 'Admin Name');
