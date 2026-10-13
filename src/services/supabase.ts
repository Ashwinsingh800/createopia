import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { UserRole } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;


export interface OnboardingProfile {
  name: string;
  role: Extract<UserRole, 'brand' | 'creator'>;
  onboarding_goal: string;
  onboarding_completed: boolean;
}

export async function saveSupabaseOnboarding(
  userId: string,
  profile: OnboardingProfile
): Promise<void> {
  if (!supabase) return;

  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) {
    throw new Error(`We could not verify your session: ${sessionError.message}`);
  }

  // Seeded demo accounts use the local storage adapter and do not have a
  // Supabase session. They should continue through the existing fallback.
  if (!sessionData.session || sessionData.session.user.id !== userId) return;

  const { error } = await supabase.from('profiles').upsert(
    {
      id: userId,
      ...profile,
    },
    { onConflict: 'id' }
  );

  if (error) {
    throw new Error(`We could not save your profile: ${error.message}`);
  }
}
