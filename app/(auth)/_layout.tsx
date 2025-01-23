import React, { useEffect } from 'react';
import { useRouter, Slot, Stack } from 'expo-router';
import { Account } from 'react-native-appwrite';


let account = new Account();

const AuthLayout = () => {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        await account.get(); // Check if user is logged in
        router.replace('(tabs)/index'); // Redirect to tabs if logged in
      } catch {
        // Do nothing, allow auth screens to show
      }
    })();
  }, []);

  return <Stack />;
};

export default AuthLayout;
