import { createClient } from '@/utils/supabase/server';
import CircularNavigation from './navigation';

export default async function AuthNav() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return <CircularNavigation user={!!user} />;
}
