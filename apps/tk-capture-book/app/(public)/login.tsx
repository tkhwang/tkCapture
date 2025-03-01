import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";

import { APP_NAME } from "@/consts/appConsts";
import { appleSignIn } from "@/features/auth/apple/apple-sign-in";
import { useAuth } from "@/providers/auth-provider";

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);

  const { setIsAuthenticated } = useAuth();

  const handleGoogleLogin = () => {
    setLoading(true);

    // Google 로그인 로직
    console.log("Google login pressed");

    setIsAuthenticated(true);
    setLoading(false);
  };

  const handleAppleLogin = async () => {
    setLoading(true);

    // Apple 로그인 로직
    console.log("Apple login pressed");
    await appleSignIn();

    // setIsAuthenticated(true);
    setLoading(false);
  };

  const handleEmailLogin = () => {
    setLoading(true);

    // 이메일 로그인 로직

    setIsAuthenticated(true);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("@/assets/images/gradient-background.webp")}
        style={styles.backgroundImage}
      >
        <LinearGradient colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.8)"]} style={styles.gradient}>
          <Text style={styles.appName}>{APP_NAME}</Text>
          <View style={styles.content}>
            <Text style={styles.title}>환영합니다</Text>
            <Text style={styles.subtitle}>계정에 로그인하세요</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.socialButton, styles.googleButton]}
                onPress={handleGoogleLogin}
              >
                <AntDesign name="google" size={24} color="#EA4335" />
                <Text style={styles.buttonText}>Google로 계속하기</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.socialButton, styles.appleButton]}
                onPress={handleAppleLogin}
              >
                <AntDesign name="apple1" size={24} color="#000" />
                <Text style={styles.buttonText}>Apple로 계속하기</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.socialButton, styles.emailButton]}
                onPress={handleEmailLogin}
              >
                <AntDesign name="mail" size={24} color="#fff" />
                <Text style={[styles.buttonText, styles.emailButtonText]}>이메일로 계속하기</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>계정이 없으신가요?</Text>
              <TouchableOpacity>
                <Text style={styles.signupText}>회원가입</Text>
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
