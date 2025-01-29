import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const Profile = ({ role }: {role: string}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsAppNumber, setWhatsAppNumber] = useState('');
  const [tracks, setTracks] = useState([]);
  const [connections, setConnections] = useState(0);
  const [likes, setLikes] = useState(0);
  const [shares, setShares] = useState(0);
  const [comments, setComments] = useState(0);
  const [socialMediaLinks, setSocialMediaLinks] = useState<string[]>([]);
  const [videoReels, setVideoReels] = useState<string[]>([]);

  const isArtist = role === 'artist';

  const handleAddSocialMediaLink = () => {
    setSocialMediaLinks([...socialMediaLinks, '']);
  };

  const handleUploadReel = () => {
    // Logic to upload a video reel
    setVideoReels([...videoReels, 'https://example.com/reel.mp4']);
  };

  const handleSubscribe = () => {
    // Logic to handle subscription
    alert('Subscribed!');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <LinearGradient
        colors={['#6B21A8', '#C026D3', '#FB923C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.profilePic} />
        <Text style={styles.name}>{name || 'Your Name'}</Text>
        <TouchableOpacity style={styles.subscribeButton} onPress={handleSubscribe}>
          <Text style={styles.subscribeText}>Subscribe</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* User Details */}
      <View style={styles.detailsContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="WhatsApp Number"
          value={whatsAppNumber}
          onChangeText={setWhatsAppNumber}
          keyboardType="phone-pad"
        />

        {/* Social Media Links */}
        <View style={styles.socialMediaContainer}>
          <Text style={styles.sectionTitle}>Social Media Links</Text>
          {socialMediaLinks.map((link, index) => (
            <TextInput
              key={index}
              style={styles.input}
              placeholder={`Social Media Link ${index + 1}`}
              value={link}
              onChangeText={(text) => {
                const updatedLinks = [...socialMediaLinks];
                updatedLinks[index] = text;
                setSocialMediaLinks(updatedLinks);
              }}
            />
          ))}
          <TouchableOpacity style={styles.addButton} onPress={handleAddSocialMediaLink}>
            <Feather name="plus" size={20} color="white" />
            <Text style={styles.addButtonText}>Add Link</Text>
          </TouchableOpacity>
        </View>

        {/* Artist-Specific Features */}
        {isArtist && (
          <>
            {/* Upload Video Reels */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Upload Video Reels</Text>
              <TouchableOpacity style={styles.uploadButton} onPress={handleUploadReel}>
                <Feather name="upload" size={20} color="white" />
                <Text style={styles.uploadButtonText}>Upload Reel</Text>
              </TouchableOpacity>
              <FlatList
                data={videoReels}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.reelItem}>
                    <Text style={styles.reelText}>{item}</Text>
                  </View>
                )}
              />
            </View>

            {/* Tracks Sent to Radio Stations */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Tracks Sent to Radio Stations</Text>
              <FlatList
                data={tracks}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.trackItem}>
                    <Text style={styles.trackText}>{item}</Text>
                  </View>
                )}
              />
            </View>
          </>
        )}

        {/* Analytics Board */}
        <View style={styles.analyticsBoard}>
          <Text style={styles.sectionTitle}>Analytics</Text>
          <View style={styles.analyticsRow}>
            <Text style={styles.analyticsText}>Connections: {connections}</Text>
            {isArtist && (
              <>
                <Text style={styles.analyticsText}>Likes: {likes}</Text>
                <Text style={styles.analyticsText}>Shares: {shares}</Text>
                <Text style={styles.analyticsText}>Comments: {comments}</Text>
              </>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subscribeButton: {
    backgroundColor: '#C026D3',
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  subscribeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  detailsContainer: {
    padding: 20,
  },
  input: {
    backgroundColor: '#333',
    color: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  socialMediaContainer: {
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,

  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6B21A8',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    marginLeft: 5,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6B21A8',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 10,
  },
  uploadButtonText: {
    color: 'white',
    marginLeft: 5,
  },
  reelItem: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
  },
  reelText: {
    color: 'white',
  },
  trackItem: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
  },
  trackText: {
    color: 'white',
  },
  analyticsBoard: {
    marginTop: 20,
  },
  analyticsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  analyticsText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
});

export default Profile;