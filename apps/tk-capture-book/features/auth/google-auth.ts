import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { GOOGLE_WEB_CLIENT_ID } from "@/consts/appConsts";

export function configureGoogleAuth() {
  GoogleSignin.configure({
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    webClientId: GOOGLE_WEB_CLIENT_ID,
  });
}
