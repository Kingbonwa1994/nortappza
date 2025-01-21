import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  Text,
  Card,
  Searchbar,
  Button,
  Chip,
  Portal,
  Modal,
  TextInput,
  ProgressBar,
  Divider,
} from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';

interface Event {
  id: string;
  name: string;
  artist: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  description: string;
  image: string;
  tickets: {
    type: string;
    price: number;
    available: number;
    sold: number;
    description: string;
  }[];
}

// Sample event data
const events = [
  {
    id: '1',
    name: 'Summer Music Festival 2024',
    artist: 'Various Artists',
    date: 'July 5th, 2024',
    time: '8:00 PM',
    venue: 'Central Park Arena',
    address: '123 Park Avenue, New York',
    description: 'The biggest summer music festival featuring top artists.',
    image: 'https://example.com/event1.jpg',
    tickets: [
      {
        type: 'Early Bird',
        price: 50,
        available: 100,
        sold: 60,
        description: 'Limited early bird tickets',
      },
      {
        type: 'VIP',
        price: 150,
        available: 50,
        sold: 20,
        description: 'VIP access with meet & greet',
      },
    ],
  },
  // Add more events...
];

export default function TicketsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [ticketQuantities, setTicketQuantities] = useState<Record<string, number>>({});
  const [showCheckout, setShowCheckout] = useState(false);

  const updateQuantity = (ticketType: string, change: number) => {
    setTicketQuantities(prev => ({
      ...prev,
      [ticketType]: Math.max(0, (prev[ticketType] || 0) + change)
    }));
  };

  const renderEventCard = ({ item }: { item: Event }) => (
    <Card style={styles.eventCard}>
      <Image source={{ uri: item.image }} style={styles.eventImage} />
      <Card.Content>
        <Text style={styles.eventName}>{item.name}</Text>
        <Text style={styles.eventArtist}>{item.artist}</Text>
        
        <View style={styles.eventDetails}>
          <View style={styles.detailRow}>
            <FontAwesome name="calendar" size={16} />
            <Text style={styles.detailText}>{item.date}</Text>
          </View>
          <View style={styles.detailRow}>
            <FontAwesome name="clock-o" size={16} />
            <Text style={styles.detailText}>{item.time}</Text>
          </View>
          <View style={styles.detailRow}>
            <FontAwesome name="map-marker" size={16} />
            <Text style={styles.detailText}>{item.venue}</Text>
          </View>
        </View>

        <Button 
          mode="contained" 
          onPress={() => setSelectedEvent(item)}
          style={styles.buyButton}
        >
          Buy Tickets
        </Button>
      </Card.Content>
    </Card>
  );

  const renderTicketPurchaseModal = () => (
    <Portal>
      <Modal
        visible={selectedEvent !== null}
        onDismiss={() => setSelectedEvent(null)}
        contentContainerStyle={styles.modalContainer}
      >
        <ScrollView>
          <Text style={styles.modalTitle}>{selectedEvent?.name}</Text>
          
          {selectedEvent?.tickets.map((ticket) => (
            <View key={ticket.type} style={styles.ticketSection}>
              <View style={styles.ticketHeader}>
                <Text style={styles.ticketType}>{ticket.type}</Text>
                <Text style={styles.ticketPrice}>${ticket.price}</Text>
              </View>
              
              <Text style={styles.ticketDescription}>{ticket.description}</Text>
              
              <ProgressBar
                progress={(ticket.sold / ticket.available)}
                style={styles.progressBar}
              />
              
              <Text style={styles.availabilityText}>
                {ticket.available - ticket.sold} tickets remaining
              </Text>

              <View style={styles.quantitySelector}>
                <Button
                  mode="outlined"
                  onPress={() => updateQuantity(ticket.type, -1)}
                >
                  -
                </Button>
                <Text style={styles.quantity}>
                  {ticketQuantities[ticket.type] || 0}
                </Text>
                <Button
                  mode="outlined"
                  onPress={() => updateQuantity(ticket.type, 1)}
                >
                  +
                </Button>
              </View>
            </View>
          ))}

          <Divider style={styles.divider} />

          <View style={styles.orderSummary}>
            <Text style={styles.summaryTitle}>Order Summary</Text>
            {/* Calculate and display order summary */}
            <Button
              mode="contained"
              onPress={() => setShowCheckout(true)}
              style={styles.checkoutButton}
            >
              Proceed to Checkout
            </Button>
          </View>
        </ScrollView>
      </Modal>
    </Portal>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search events..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />

      <FlatList
        data={events}
        renderItem={renderEventCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.eventList}
      />

      {selectedEvent && renderTicketPurchaseModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchbar: {
    margin: 16,
    elevation: 2,
  },
  eventList: {
    padding: 16,
  },
  eventCard: {
    marginBottom: 16,
  },
  eventImage: {
    height: 200,
    width: '100%',
  },
  eventName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  eventArtist: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  eventDetails: {
    marginTop: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  detailText: {
    marginLeft: 8,
  },
  buyButton: {
    marginTop: 16,
  },
  modalContainer: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 8,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  ticketSection: {
    marginVertical: 12,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ticketType: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ticketPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ticketDescription: {
    color: '#666',
    marginTop: 4,
  },
  progressBar: {
    marginTop: 8,
  },
  availabilityText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 120,
    marginTop: 8,
  },
  quantity: {
    fontSize: 18,
  },
  divider: {
    marginVertical: 16,
  },
  orderSummary: {
    marginTop: 16,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  checkoutButton: {
    marginTop: 16,
  },
}); 