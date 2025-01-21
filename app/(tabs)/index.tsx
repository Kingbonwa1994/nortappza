import { View, StyleSheet, ImageBackground, Platform, Image, TouchableOpacity } from 'react-native';
import { Button, Text, Avatar, Surface } from 'react-native-paper';
import { Link } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <View style={styles.mainContainer}>
      {/* Header */}
      <Surface style={styles.header}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Link href="/profile/index" asChild>
          <TouchableOpacity>
            <Avatar.Icon 
              size={40} 
              icon="account"
              style={styles.profileIcon}
            />
          </TouchableOpacity>
        </Link>
      </Surface>

      {/* Main Content */}
      <ImageBackground
        source={require('../../assets/images/music-bg.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.content}>
            <Text style={styles.title}>NORT</Text>
            <Text style={styles.subtitle}>Not On Radio Tunes</Text>
            
            <View style={styles.buttonContainer}>
              <Link href="/(tabs)/(auth)/signup" asChild>
                <Button 
                  mode="contained" 
                  style={styles.button}
                  contentStyle={styles.buttonContent}
                  labelStyle={styles.buttonLabel}
                >
                  Get Started
                </Button>
              </Link>

              <Link href="/(tabs)/(auth)/login" asChild>
                <Button 
                  mode="outlined" 
                  style={[styles.button, styles.loginButton]}
                  contentStyle={styles.buttonContent}
                  labelStyle={styles.loginButtonLabel}
                >
                  Login
                </Button>
              </Link>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 48 : 16,
    backgroundColor: '#fff',
    elevation: 4,
  },
  logo: {
    width: 100,
    height: 40,
  },
  profileIcon: {
    backgroundColor: '#007AFF',
  },
  background: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 48,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  button: {
    width: '100%',
    borderRadius: 25,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.25)',
      },
      android: {
        elevation: 5,
      },
    }),
  },
  buttonContent: {
    height: 56,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginButton: {
    borderColor: '#ffffff',
  },
  loginButtonLabel: {
    color: '#ffffff',
  },
});
