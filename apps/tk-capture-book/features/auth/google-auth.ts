import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Platform } from "react-native";

import { GOOGLE_IOS_CLIENT_ID, GOOGLE_WEB_CLIENT_ID } from "@/consts/appConsts";

export function configureGoogleAuth() {
  GoogleSignin.configure({
    // scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    scopes: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "openid",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
    webClientId: GOOGLE_WEB_CLIENT_ID,
    // Note: iosClientId is required for iOS. Without it, the warning occurs.
    ...(Platform.OS === "ios" && { iosClientId: GOOGLE_IOS_CLIENT_ID }),
  });
}
