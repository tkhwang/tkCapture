import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";

import { supabase } from "@/lib/supabase";

export function useGoogleSignIn() {
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      console.log(`[+][useGoogleSignIn] response`, JSON.stringify(response));

      if (isSuccessResponse(response) && response.data.idToken) {
        const {
          error,
          data: { user },
        } = await supabase.auth.signInWithIdToken({
          provider: "google",
          token: response.data.idToken,
        });

        if (error) {
          console.log(`[-][useGoogleSignIn] error`, JSON.stringify(error));
          return { success: false, error };
        }

        console.log(`[+][useGoogleSignIn] user`, JSON.stringify(user));
        return { success: true, user };
      } else {
        throw new Error("No identityToken.");
      }
    } catch (error: unknown) {
      console.log(`[-][][useGoogleSignIn] error`, JSON.stringify(error));

      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error during Apple sign-in";
        return { success: false, error: error instanceof Error ? error : new Error(errorMessage) };
      }
    }
  };

  return {
    signIn,
  };
}
