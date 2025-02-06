import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';


export default function HomeScreen() {
  return (
    <LinearGradient
      colors={['#9f1239', '#6b21a8', '#c2410c']} // pink-800, purple-800, orange-700
      style={styles.container}
    >
      <View style={styles.content}>
     
        <Text style={styles.title}>NORT - Not On Radio Tunes</Text>
        <Text style={styles.subtitle}>
          Your Gateway to the Music Industry
        </Text>

        <View style={styles.featuresContainer}>
          <Text style={styles.featureText}>
            🎵 Submit your music to radio stations and get heard by thousands.
          </Text>
          <Text style={styles.featureText}>
            🤝 Connect with industry stakeholders like promoters, music executives, and event organizers.
          </Text>
          <Text style={styles.featureText}>
            🎟️ Subscribed artists can post event tickets and send multiple tracks.
          </Text>
          <Text style={styles.featureText}>
            🎥 Stakeholders can share artist reels, behind-the-scenes content, and more.
          </Text>
          <Text style={styles.featureText}>
            🔒 Subscription is required to access all features.
          </Text>
        </View>

        <Link href="/(auth)/sign-in" asChild>
          <TouchableOpacity style={styles.subscribeButton}>
            <Text style={styles.subscribeButtonText}>Subscribe Now</Text>
          </TouchableOpacity>
        </Link>

        <Text style={styles.loginPrompt}>
          Already have an account?{' '}
          <Link href="/(auth)/sign-in" asChild>
            <Text style={styles.loginLink}>Login</Text>
          </Link>
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  animation: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  featuresContainer: {
    width: '100%',
    marginBottom: 30,
  },
  featureText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'left',
  },
  subscribeButton: {
    backgroundColor: '#22c55e', // Green for the subscribe button
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  subscribeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginPrompt: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
  loginLink: {
    color: '#22c55e', // Green for the login link
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});