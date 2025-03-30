import { Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

import { User } from "@/features/user/models/user";
import { IUser } from "@/features/user/types/user";
import { supabase } from "@/lib/supabase";
import { isOAuthProviderFrom } from "@/utils/auth";

type AuthContextType = {
  session: Session | null;
  loading: boolean;
  user: IUser | null;
  setUser: (user: IUser) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
  user: null,
  setUser: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log(`[+][getSession] session.user`, JSON.stringify(session?.user));

      setSession(session);
      if (session?.user && session.user.app_metadata.provider) {
        const userModel = User.fromSupabaseAuthUser(
          session.user,
          isOAuthProviderFrom(session, "apple") ? "apple" : "google",
        );
        setUser(userModel);
      }
      setIsAuthenticated(!!session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log(`[+][onAuthStateChange] session.user`, JSON.stringify(session?.user));

      setSession(session);
      if (session?.user && session.user.app_metadata.provider) {
        const userModel = User.fromSupabaseAuthUser(
          session.user,
          isOAuthProviderFrom(session, "apple") ? "apple" : "google",
        );
        setUser(userModel);
      }
      setIsAuthenticated(!!session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setIsAuthenticated(false);
      setSession(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const value = {
    session,
    loading,
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
