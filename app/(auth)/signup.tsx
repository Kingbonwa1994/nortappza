import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ID, Models } from 'react-native-appwrite';
import { account } from '@/lib/appwrite';  

const SignUp = () => {
  const [loggedInUser, setLoggedInUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();

  // Helper function to show error alerts
  const showError = (message: string) => {
    Alert.alert('Error', message, [{ text: 'OK' }]);
  };

  // Login function
  async function login(email: string, password: string) {
    try {
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      setLoggedInUser(user);
    } catch (error: any) {
      showError(error.message || 'Failed to log in.');
    }
  }

  // Registration function
  async function register(email: string, password: string, name: string) {
    if (!name.trim() || !email.trim() || !password.trim()) {
      showError('All fields are required.');
      return;
    }

    try {
      await account.create(ID.unique(), email, password, name);
      await login(email, password);
      router.replace('/(tabs)'); // Redirect after successful registration
    } catch (error: any) {
      showError(error.message || 'Failed to register.');
    }
  }

  return (
    <LinearGradient colors={['#581c87', '#9d174d', '#c2410c']} style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#ddd"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ddd"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ddd"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            await register(email, password, name);
          }}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        {loggedInUser && (
          <View style={styles.userInfo}>
            <Text style={styles.userInfoText}>Welcome, {loggedInUser.name}!</Text>
            <Text style={styles.userInfoText}>Email: {loggedInUser.email}</Text>
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    elevation: 10,
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#222',
    color: 'white',
    borderColor: '#9333ea',
    borderWidth: 1,
    borderRadius: 8,
  },
  button: {
    padding: 15,
    backgroundColor: '#9333ea',
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userInfo: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#333',
    borderRadius: 8,
  },
  userInfoText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SignUp;
