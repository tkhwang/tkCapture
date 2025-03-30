import { Session } from "@supabase/supabase-js";

import { AuthProvider } from "@/features/user/types/user";

export function isOAuthProviderFrom(session: Session, provider: AuthProvider): boolean {
  if (!session.user.user_metadata.iss) return false;

  return session.user.user_metadata.iss.includes(provider);
}
