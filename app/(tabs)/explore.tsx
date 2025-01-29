import React from 'react';
import { 
  View, Text, TouchableOpacity, StyleSheet, FlatList, 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Linking from 'expo-linking';

// Sample data for stakeholders
const stakeholders = [
  {
    id: '1',
    name: 'John Doe',
    role: 'Music Executive',
    phone: '+1234567890',
    description: 'Helps artists sign record deals and manage contracts.',
  },
  {
    id: '2',
    name: 'Jane Smith',
    role: 'Promoter',
    phone: '+0987654321',
    description: 'Organizes events and promotes upcoming artists.',
  },
  {
    id: '3',
    name: 'Alice Johnson',
    role: 'Copyrighter',
    phone: '+1122334455',
    description: 'Handles music copyrights and protects intellectual property.',
  },
  {
    id: '4',
    name: 'Bob Brown',
    role: 'Music Label',
    phone: '+5566778899',
    description: 'Provides recording deals and artist management services.',
  },
];

// Function to open WhatsApp with the stakeholder's phone number
const openWhatsApp = (phone: string) => {
  const url = `https://wa.me/${phone.replace('+', '')}`;
  Linking.openURL(url).catch(() => {
    alert('Unable to open WhatsApp. Please make sure it is installed.');
  });
};

const Discover = () => {
  return (
    <LinearGradient
      colors={['#9f1239', '#6b21a8', '#c2410c']} // Gradient background
      style={styles.container}
    >
      <Text style={styles.title}>Discover Industry Stakeholders</Text>
      <FlatList
        data={stakeholders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Profile Placeholder */}
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {item.name.split(' ').map((n) => n[0]).join('').toUpperCase()}
              </Text>
            </View>
            
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.role}>{item.role}</Text>
              <Text style={styles.description}>{item.description}</Text>
              
              {/* Connect Button */}
              <TouchableOpacity
                style={styles.connectButton}
                onPress={() => openWhatsApp(item.phone)}
              >
                <Text style={styles.connectButtonText}>Connect on WhatsApp</Text>
              </TouchableOpacity>
            </View>
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
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ffffff50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  role: {
    fontSize: 14,
    color: 'lightgray',
  },
  description: {
    fontSize: 12,
    color: 'white',
    marginVertical: 5,
  },
  connectButton: {
    marginTop: 8,
    backgroundColor: '#22c55e',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  connectButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Discover;
