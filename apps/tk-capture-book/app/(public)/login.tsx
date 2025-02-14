import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";

import { useAuth } from "@/providers/auth-provider";

export default function LoginScreen() {
  const { setIsAuthenticated } = useAuth();

  const handleGoogleLogin = () => {
    // Google 로그인 로직
    console.log("Google login pressed");
    setIsAuthenticated(true);
  };

  const handleAppleLogin = () => {
    // Apple 로그인 로직
    console.log("Apple login pressed");
    setIsAuthenticated(true);
  };

  const handleEmailLogin = () => {
    // 이메일 로그인 로직
    console.log("Email login pressed");
    setIsAuthenticated(true);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://api.a0.dev/assets/image?text=abstract%20gradient%20background%20with%20modern%20design&aspect=9:16",
        }}
        style={styles.backgroundImage}
      >
        <LinearGradient colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.8)"]} style={styles.gradient}>
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
