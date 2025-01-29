import React, { useEffect } from 'react';
import { useRouter, Stack } from 'expo-router';


//let account = true

const AuthLayout = () => {
  const router = useRouter();

  useEffect(() => {
    ( () => {
      try {
        const account = localStorage.getItem('account');
        if (account) return
        
        router.replace('/(tabs)'); 
      } catch {
        router.replace('/login'); 
      }
    })();
  });

  return <Stack>
    <Stack.Screen name="index" 
    options={{  headerShown: false,
      headerBackTitle: 'Back', 
      headerBackVisible: true, 
      headerBackButtonDisplayMode: 'default'
     }} />
    <Stack.Screen name="signup" 
    options={{ headerShown: false, 
      headerBackTitle: 'Back', 
      headerBackVisible: true, 
      headerBackButtonDisplayMode: 'default' }} />
    <Stack.Screen name="login" 
    options={{ headerShown: false, 
    headerBackVisible: true,
    headerBackButtonDisplayMode: 'default'
    }} />
  </Stack>;
};

export default AuthLayout;
