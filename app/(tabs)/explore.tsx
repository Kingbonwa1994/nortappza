import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Linking from 'expo-linking';

const Discover = () => {
  // Sample data for stakeholders
  const stakeholders = [
    {
      id: '1',
      name: 'John Doe',
      role: 'Music Executive',
      phone: '+1234567890',
    },
    {
      id: '2',
      name: 'Jane Smith',
      role: 'Promoter',
      phone: '+0987654321',
    },
    {
      id: '3',
      name: 'Alice Johnson',
      role: 'Copyrighter',
      phone: '+1122334455',
    },
    {
      id: '4',
      name: 'Bob Brown',
      role: 'Music Label',
      phone: '+5566778899',
    },
  ];

  // Function to open WhatsApp with the stakeholder's phone number
  const openWhatsApp = (phone: string) => {
    const url = `https://wa.me/${phone}`;
    Linking.openURL(url).catch(() => {
      alert('Unable to open WhatsApp. Please make sure it is installed.');
    });
  };

  return (
    <LinearGradient
      colors={['#9f1239', '#6b21a8', '#c2410c']} // pink-800, purple-800, orange-700
      style={styles.container}
    >
      <Text style={styles.title}>Discover Music Industry Stakeholders</Text>
      <FlatList
        data={stakeholders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.role}>{item.role}</Text>
            <TouchableOpacity
              style={styles.connectButton}
              onPress={() => openWhatsApp(item.phone)}
            >
              <LinearGradient
                colors={['#ff6f61', '#ff4d4d']} // Gradient for the button
                style={styles.buttonGradient}
              >
                <Text style={styles.connectButtonText}>Connect</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  role: {
    fontSize: 14,
    color: '#ddd',
    marginBottom: 10,
  },
  connectButton: {
    borderRadius: 25,
    overflow: 'hidden', // Ensures the gradient stays within the button bounds
  },
  buttonGradient: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Discover;