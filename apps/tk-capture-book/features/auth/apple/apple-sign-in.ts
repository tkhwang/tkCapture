import * as AppleAuthentication from "expo-apple-authentication";

import { supabase } from "@/lib/supabase";

export async function appleSignIn() {
  try {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });
    // Sign in via Supabase Auth.
    if (credential.identityToken) {
      const {
        error,
        data: { user },
      } = await supabase.auth.signInWithIdToken({
        provider: "apple",
        token: credential.identityToken,
      });
      console.log(JSON.stringify({ error, user }, null, 2));
      if (!error) {
        // User is signed in.
      }
    } else {
      throw new Error("No identityToken.");
    }
  } catch (e) {
    if (e.code === "ERR_REQUEST_CANCELED") {
      // handle that the user canceled the sign-in flow
    } else {
      // handle other errors
    }
  }
}
