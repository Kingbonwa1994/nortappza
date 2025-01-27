import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const SignUp = ({ email, setEmail, password, setPassword, name, setName, register }: any) => {
  const router = useRouter();

  return (
    <LinearGradient colors={['#581c87', '#9d174d', '#c2410c']}
    style={styles.container}>
    <View>
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
          router.replace('/(tabs)'); // Redirect after successful registration
        }}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#d946ef',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'black',
    borderColor: 'blue',
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
  },
});

export default SignUp;
