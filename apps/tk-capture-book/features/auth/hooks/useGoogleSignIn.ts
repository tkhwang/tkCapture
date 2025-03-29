import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useState } from "react";

export function useGoogleSignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const signIn = async () => {
    setLoading(true);

    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      console.log(`[+][useGoogleSignIn] response`, JSON.stringify(response));

      if (isSuccessResponse(response)) {
        //
      } else {
        // sign in was cancelled by user
      }
    } catch (error) {
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
        // an error that's not related to google sign in occurred
      }
    }
  };

  return {
    signIn,
    loading,
    error,
  };
}
