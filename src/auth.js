// src/auth.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://woplbevwhogyiqpsnnct.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_N6tb1BKQ7XDuJJSg-tIs4g_r13llovy';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// Important: Use window.location for static login page
export function requireAuth() {
  getCurrentUser().then(user => {
    if (!user) {
      window.location.href = '/login.html';
    }
  });
}

export async function logout() {
  await supabase.auth.signOut();
  window.location.href = '/login.html';
}