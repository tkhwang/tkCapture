import * as AppleAuthentication from "expo-apple-authentication";

import { AuthSignInResult } from "@/features/auth/types/auth";
import { supabase } from "@/lib/supabase";

export function useAppleSignIn() {
  const signIn = async (): Promise<AuthSignInResult> => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      console.log(`[+][useAppleSignIn] credential`, JSON.stringify(credential));

      if (!credential.identityToken) {
        const error = new Error("No identityToken.");
        return { success: false, error };
      }

      const {
        error,
        data: { user },
      } = await supabase.auth.signInWithIdToken({
        provider: "apple",
        token: credential.identityToken,
      });

      if (error) {
        console.log(`[-][useAppleSignIn] error`, JSON.stringify(error));

        return { success: false, error };
      }

      console.log(`[+][useAppleSignIn] user`, JSON.stringify(user));
      return { success: true, user };
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`[-][useAppleSignIn] error`, JSON.stringify(error));
        return { success: false, error };
      } else {
        const newError = new Error(`Unknown error during Apple sign-in: ${error}`);
        return { success: false, error: newError };
      }
    }
  };

  return {
    signIn,
  };
}
