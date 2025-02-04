import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { useRef, useState } from "react";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Picker } from "@react-native-picker/picker";

export default function SignUp() {
  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const userNameRef = useRef("");
  const [role, setRole] = useState("artist"); // Default role is "artist"


  const signUp = async (email: string, password: string, username: string, role: string) => {
    try {
      const response = await fetch(`${process.env.API_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username, role }),
      });
  
      const data = await response.json();
      return { data };
    } catch (error) {
      return { error };
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: "sign up", headerShown: false }} />
      <LinearGradient
        colors={["#9f1239", "#6b21a8", "#c2410c"]} // pink-800, purple-800, orange-700
        style={styles.container}
      >
        <Text style={styles.appName}>NORT</Text>
        <Text style={styles.appTagline}>Not On Radio Tunes</Text>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            placeholder="Username"
            placeholderTextColor="#999"
            autoCapitalize="none"
            nativeID="userName"
            onChangeText={(text) => {
              userNameRef.current = text;
            }}
            style={styles.textInput}
          />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#999"
            autoCapitalize="none"
            nativeID="email"
            onChangeText={(text) => {
              emailRef.current = text;
            }}
            style={styles.textInput}
          />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry={true}
            nativeID="password"
            onChangeText={(text) => {
              passwordRef.current = text;
            }}
            style={styles.textInput}
          />
        </View>

        {/* Role Selection */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>I am a:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={role}
              onValueChange={(itemValue) => setRole(itemValue)}
              style={styles.picker}
              dropdownIconColor="#fff"
            >
              <Picker.Item label="Artist" value="artist" />
              <Picker.Item label="Stakeholder" value="stakeholder" />
            </Picker>
          </View>
        </View>

        <TouchableOpacity
          onPress={async () => {
            const { data, error } = await signUp(
              emailRef.current,
              passwordRef.current,
              userNameRef.current,
              role // Pass the selected role to the signUp function
            );
            if (data) {
              router.replace("/");
            } else {
              console.log(error);
              // Alert.alert("Signup Error", resp.error?.message);
            }
          }}
          style={styles.button}
        >
          <LinearGradient
            colors={["#ff6f61", "#ff4d4d"]} // Gradient for the button
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Create Account</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.loginLinkContainer}>
          <Text
            style={styles.loginLinkText}
            onPress={() => router.replace("/(auth)/login")}
          >
            Click Here To Return To Sign In Page
          </Text>
        </View>
      </LinearGradient>
    </>
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
  pickerContainer: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "rgba(255, 255, 255, 0.3)",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    overflow: "hidden", // Ensures the Picker stays within bounds
  },
  picker: {
    width: "100%",
    color: "#fff",
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
  loginLinkContainer: {
    marginTop: 32,
  },
  loginLinkText: {
    color: "#fff",
    fontWeight: "500",
    textDecorationLine: "underline",
  },
});