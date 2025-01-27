import React, { useState, useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Models } from 'react-native-appwrite';
import { AppwriteContext } from '@/providers/AuthContext';

const SignUp = () => {
  const { appwrite, setIsLoggedIn } = useContext(AppwriteContext);
  const [error, setError] = useState<string>('');
  const [loggedInUser, setLoggedInUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    if (!name || !email || !password) {
      setError('All fields are required');
      Alert.alert('Error', 'All fields are required');
      return;
    }

    try {
      const session = await appwrite.createAccount({ email, password, name });
      if (session) {
        const user = await appwrite.getCurrentUser();
        setIsLoggedIn(true);
        setLoggedInUser(user ?? null);
        Alert.alert('Success', 'Signup successful!');
        router.replace('/(tabs)');
      }
    } catch (e: any) {
      console.error('Signup Error:', e);
      setError(e.message || 'Signup failed');
      Alert.alert('Error', e.message || 'Signup failed');
    }
  };

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
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
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
