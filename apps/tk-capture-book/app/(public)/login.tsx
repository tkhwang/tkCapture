import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Platform } from "react-native";

import { APP_NAME } from "@/consts/appConsts";
import { useAppleSignIn } from "@/features/auth/hooks/useAppleSignIn";
import { useGoogleSignIn } from "@/features/auth/hooks/useGoogleSignIn";
import { User } from "@/features/user/models/user";
import { useAuth } from "@/providers/auth-provider";

export default function LoginScreen() {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const { setIsAuthenticated, setUser } = useAuth();

  const { signIn: signInApple } = useAppleSignIn();
  const { signIn: signInGoogle } = useGoogleSignIn();

  const handleAppleLogin = async () => {
    console.log("Apple login pressed");

    const result = await signInApple();

    if (result.success) {
      try {
        const userModel = User.fromSupabaseAuthUser(result.user, "apple");
        console.log(`[+][LoginScreen] user: ${JSON.stringify(userModel)}`);

        const user = await userModel.findOrCreate();
        setUser(user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error(JSON.stringify(error));
      }
    } else if (!result.canceled) {
      // Show error to user if needed
      console.error(`[-][LoginScreen] Apple login failed: ${JSON.stringify(result.error)}`);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);

    const result = await signInGoogle();

    if (result?.success && result.user) {
      try {
        const userModel = User.fromSupabaseAuthUser(result.user, "google");
        console.log(`[+][LoginScreen] user: ${JSON.stringify(userModel)}`);

        const user = await userModel.findOrCreate();
        setUser(user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error(JSON.stringify(error));
      }
    }

    // setIsAuthenticated(true);
    setLoading(false);
  };

  const handleEmailLogin = () => {
    setLoading(true);

    // 이메일 로그인 로직

    setIsAuthenticated(true);
    setLoading(false);
  };

  // Combine local loading state with Apple loading state
  const isLoading = loading;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("@/assets/images/gradient-background.webp")}
        style={styles.backgroundImage}
      >
        <LinearGradient colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.8)"]} style={styles.gradient}>
          <Text style={styles.appName}>{APP_NAME}</Text>
          <View style={styles.content}>
            <Text style={styles.title}>{t("login.title")}</Text>
            <Text style={styles.subtitle}>{t("login.subtitle")}</Text>

            <View style={styles.buttonContainer}>
              {Platform.OS === "android" && (
                <TouchableOpacity
                  style={[styles.socialButton, styles.googleButton]}
                  onPress={handleGoogleLogin}
                  disabled={isLoading}
                >
                  <AntDesign name="google" size={24} color="#EA4335" />
                  <Text style={styles.buttonText}>{t("login.googleButton")}</Text>
                </TouchableOpacity>
              )}

              {Platform.OS === "ios" && (
                <TouchableOpacity
                  style={[styles.socialButton, styles.appleButton]}
                  onPress={handleAppleLogin}
                  disabled={isLoading}
                >
                  <AntDesign name="apple1" size={24} color="#000" />
                  <Text style={styles.buttonText}>{t("login.appleButton")}</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[styles.socialButton, styles.emailButton]}
                onPress={handleEmailLogin}
                disabled={isLoading}
              >
                <AntDesign name="mail" size={24} color="#fff" />
                <Text style={[styles.buttonText, styles.emailButtonText]}>
                  {t("login.emailButton")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    position: "absolute",
    top: 100,
    left: 0,
    right: 0,
    zIndex: 1,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
  },
  gradient: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
  },
  content: {
    marginTop: 60,
    marginBottom: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 40,
    opacity: 0.8,
  },
  buttonContainer: {
    gap: 16,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  googleButton: {
    backgroundColor: "#fff",
  },
  appleButton: {
    backgroundColor: "#fff",
  },
  emailButton: {
    backgroundColor: "#007AFF",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    flex: 1,
    textAlign: "center",
  },
  emailButtonText: {
    color: "#fff",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    gap: 8,
  },
  footerText: {
    color: "#fff",
    fontSize: 14,
  },
  signupText: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "600",
  },
});
