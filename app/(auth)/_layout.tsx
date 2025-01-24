import React, { useEffect } from 'react';
import { useRouter, Stack } from 'expo-router';


//let account = true

const AuthLayout = () => {
  const router = useRouter();

  useEffect(() => {
    ( () => {
      try {
        //account// Check if user is logged in
        router.replace('/(tabs)'); // Redirect to tabs if logged in
      } catch {
        // Do nothing, allow auth screens to show
      }
    })();
  });

  return <Stack />;
};

export default AuthLayout;
