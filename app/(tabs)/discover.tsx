import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Avatar, Card, Chip, Searchbar, Text, Button } from 'react-native-paper';
import { useState } from 'react';
import { Link } from 'expo-router';

// Define user types
const userTypes = [
  'Record Label Executive',
  'A&R Manager',
  'Music Industry Professional',
  'IP Lawyer',
  'Entertainment Lawyer',
  'Artist Manager',
  'Talent Scout',
  'Music Supervisor',
  'Songwriter',
  'Producer',
  'Sound Engineer',
  'Music Journalist',
  'Tour Manager',
];

// Sample user data
const sampleUsers = [
  {
    id: '1',
    name: 'John Doe',
    type: 'Record Label Executive',
    company: 'Universal Music',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    social: {
      linkedin: 'linkedin.com/johndoe',
      twitter: 'twitter.com/johndoe',
      instagram: 'instagram.com/johndoe',
    },
    bio: 'Over 15 years of experience in music industry management.',
  },
  // Add more sample users...
];

export default function DiscoverScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredUsers = sampleUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || user.type === selectedType;
    return matchesSearch && matchesType;
  });

  const renderUserCard = ({ item }: { item: typeof sampleUsers[0] }) => (
    <Card style={styles.card}>
      <Card.Title
        title={item.name}
        subtitle={item.type}
        left={(props) => <Avatar.Image {...props} source={{ uri: item.avatar }} />}
      />
      <Card.Content>
        <Text variant="bodyMedium">{item.company}</Text>
        <Text variant="bodySmall" style={styles.bio}>{item.bio}</Text>
        
        <View style={styles.socialLinks}>
          {Object.entries(item.social).map(([platform, url]) => (
            <Button
              key={platform}
              mode="outlined"
              compact
              onPress={() => {/* Handle social link press */}}
              style={styles.socialButton}
            >
              {platform}
            </Button>
          ))}
        </View>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => {/* Handle connect press */}}>Connect</Button>
        <Button onPress={() => {/* Handle view portfolio press */}}>View Portfolio</Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search professionals..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filters}
      >
        {userTypes.map((type) => (
          <Chip
            key={type}
            selected={selectedType === type}
            onPress={() => setSelectedType(selectedType === type ? null : type)}
            style={styles.chip}
          >
            {type}
          </Chip>
        ))}
      </ScrollView>

      <FlatList
        data={filteredUsers}
        renderItem={renderUserCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
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
  filters: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  bio: {
    marginTop: 8,
  },
  socialLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  socialButton: {
    marginRight: 8,
    marginTop: 8,
  },
}); 