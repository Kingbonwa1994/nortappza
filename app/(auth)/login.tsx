import {
  Text,
  View,
  StyleSheet,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import  getCurrentUser from "@/lib/appwrite";
import signIn from "@/lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import CustomButton from "@/components/FormField";

export default function SignIn() {
  
  const router = useRouter();



  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: "sign up", headerShown: false }} />
      <LinearGradient
        colors={["#9f1239", "#6b21a8", "#c2410c"]} // pink-800, purple-800, orange-700
        style={styles.container}
      >
        <Text style={styles.appName}>NORT</Text>
        <Text style={styles.appTagline}>Not On Radio Tunes</Text>
        <View style={styles.formContainer}>
          
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Password</Text>
          
        </View>
          <LinearGradient
            colors={["#ff6f61", "#ff4d4d"]} // Gradient for the button
            style={styles.buttonGradient}
          >
        
            
          </LinearGradient>

        <View style={styles.signupLinkContainer}>
          <Text
            style={styles.signupLinkText}
            onPress={() => router.push("/(auth)/signup")}
          >
            Click Here To Create A New Account
          </Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  appName: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
  },
  appTagline: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 32,
  },
  formContainer: {
    width: "80%",
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  textInput: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "rgba(255, 255, 255, 0.3)",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "#fff",
    fontSize: 16,
  },
  button: {
    width: "80%",
    borderRadius: 25,
    overflow: "hidden", // Ensures the gradient stays within the button bounds
    marginTop: 20,
  },
  buttonGradient: {
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupLinkContainer: {
    marginTop: 32,
  },
  signupLinkText: {
    color: "#fff",
    fontWeight: "500",
    textDecorationLine: "underline",
  },
});