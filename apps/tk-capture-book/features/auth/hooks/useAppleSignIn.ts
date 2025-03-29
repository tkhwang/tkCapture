import * as AppleAuthentication from "expo-apple-authentication";
import { useState } from "react";

import { AuthSignInResult } from "@/features/auth/types/auth";
import { supabase } from "@/lib/supabase";

export function useAppleSignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const signIn = async (): Promise<AuthSignInResult> => {
    setLoading(true);

    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      console.log(`[+][useAppleSignIn] credential`, JSON.stringify(credential));

      // Sign in via Supabase Auth.
      if (credential.identityToken) {
        const {
          error,
          data: { user },
        } = await supabase.auth.signInWithIdToken({
          provider: "apple",
          token: credential.identityToken,
        });
        console.log(
          `[+][useAppleSignIn] signInWithIdToken`,
          JSON.stringify({ error, user }, null, 2),
        );

        if (!error) {
          // User is signed in.
          return { success: true, user };
        } else {
          throw new Error(error.message);
        }
      } else {
        throw new Error("No identityToken.");
      }
    } catch (e) {
      if (e && typeof e === "object" && "code" in e && e.code === "ERR_REQUEST_CANCELED") {
        // User canceled the sign-in flow
        console.log("User canceled Apple sign-in");
        return { success: false, canceled: true };
      } else {
        // Other errors
        const errorMessage = e instanceof Error ? e.message : "Unknown error during Apple sign-in";
        console.error("Apple sign-in error:", errorMessage);
        setError(e instanceof Error ? e : new Error(errorMessage));
        return { success: false, error: e instanceof Error ? e : new Error(errorMessage) };
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    signIn,
    loading,
    error,
  };
}
