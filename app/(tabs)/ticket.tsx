import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList
} from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Import Picker from @react-native-picker/picker

import { LinearGradient } from 'expo-linear-gradient';


interface Category {
  id: string;
  type: string;
  price: number;
}

interface Ticket {
  id: string;
  event: string;
  categories: { type: string; price: number; }[];
}
// Sample ticket data
const tickets = [
  { id: '1', event: 'Music Fest 2025', categories: [{ type: 'VVIP', price: 200 }, { type: 'VIP', price: 150 }, { type: 'General', price: 100 }] },
  { id: '2', event: 'Jazz Night', categories: [{ type: 'VVIP', price: 180 }, { type: 'VIP', price: 130 }, { type: 'General', price: 90 }] },
];

const TicketSales = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  // Filter tickets based on search query
  const filteredTickets = tickets.filter(ticket => 
    ticket.event.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <LinearGradient colors={['#9f1239', '#6b21a8', '#c2410c']} style={styles.container}>
      <Text style={styles.title}>Buy Your Tickets</Text>
      <TextInput 
        style={styles.searchInput}
        placeholder="Search for events..."
        placeholderTextColor="white"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList 
        data={filteredTickets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.ticketItem}>
            <Text style={styles.eventName}>{item.event}</Text>
            <Picker
              selectedValue={selectedCategory?.id === item.id ? selectedCategory.type : undefined}
              style={styles.picker}
              onValueChange={(value: string) => {
                const category = item.categories.find(cat => cat.type === value);
                if (category) {
                  setSelectedTicket(item)
                  setSelectedCategory({ id: item.id, type: value, price: item.categories.find(cat => cat.type === value)?.price ?? 0})}
                }
              }
                 >
              {item.categories.map(category => (
                <Picker.Item key={category.type} label={`${category.type} - $${category.price}`} value={category.type} />
              ))}
            </Picker>
          </View>
        )}
      />
      <Text style={styles.selectedTicketId}>ID: {selectedTicket?.id}</Text>
      <Text style={styles.selectedTicketCategories}>Categories: {selectedTicket?.categories.map(category => category.type).join(', ')}</Text>
      {selectedCategory && (
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Buy {selectedCategory.type} Ticket for ${selectedCategory.price}</Text>
        </TouchableOpacity>
      )}
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
    marginBottom: 15,
  },
  searchInput: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: 'white',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  ticketItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  picker: {
    backgroundColor: 'white',
    marginTop: 5,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  buyButton: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  buyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  selectedTicketId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },

  selectedTicketCategories: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 10,
  },
});

export default TicketSales;