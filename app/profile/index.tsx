import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Text,
  Surface,
  Button,
  TextInput,
  Avatar,
  FAB,
  Portal,
  Modal,
  IconButton,
} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { FontAwesome5 } from '@expo/vector-icons';

interface Reel {
  uri: string;
  id: number;
}

interface UserData {
  role: string;
  name: string;
  avatar: string | null;
  bio: string;
  portfolio: Array<{ uri: string; name: string }>;
  socialLinks: {
    instagram: string;
    twitter: string;
    website: string;
  };
  contactInfo: {
    email: string;
    phone: string;
    location: string;
  };
  reels: Reel[];
}

// Mock user data - replace with your auth system
const currentUser: UserData = {
  role: 'artist', // 'artist' | 'executive' | 'copyright' | 'producer' | 'manager'
  name: 'John Doe',
  avatar: null,
  bio: 'Music is life',
  portfolio: [],
  socialLinks: {
    instagram: '',
    twitter: '',
    website: '',
  },
  contactInfo: {
    email: 'john@example.com',
    phone: '',
    location: '',
  },
  reels: [], // For artists
};

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [userData, setUserData] = useState<UserData>(currentUser);

  const pickVideo = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'video/*',
        copyToCacheDirectory: true,
      });

      if (result.assets && result.assets[0]) {
        setUserData(prev => ({
          ...prev,
          reels: [...prev.reels, { uri: result.assets[0].uri, id: Date.now() }],
        }));
        setUploadModalVisible(false);
      }
    } catch (error) {
      console.error('Error picking video:', error);
    }
  };

  const updatePortfolio = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/msword'],
        copyToCacheDirectory: true,
      });

      if (result.assets && result.assets[0]) {
        setUserData(prev => ({
          ...prev,
          portfolio: [...prev.portfolio, { uri: result.assets[0].uri, name: result.assets[0].name }],
        }));
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  const renderArtistContent = () => (
    <>
      <Text style={styles.sectionTitle}>My Reels</Text>
      <ScrollView horizontal style={styles.reelsContainer}>
        {userData.reels.map((reel, index) => (
          <Surface key={index} style={styles.reelCard}>
            <Image source={{ uri: reel.uri }} style={styles.reelThumbnail} />
            <IconButton
              icon="delete"
              size={20}
              onPress={() => {
                setUserData(prev => ({
                  ...prev,
                  reels: prev.reels.filter(r => r.id !== reel.id),
                }));
              }}
            />
          </Surface>
        ))}
      </ScrollView>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setUploadModalVisible(true)}
        label="Upload Reel"
      />
    </>
  );

  const renderProfessionalContent = () => (
    <>
      <Text style={styles.sectionTitle}>Portfolio</Text>
      <View style={styles.portfolioContainer}>
        {userData.portfolio.map((doc, index) => (
          <Surface key={index} style={styles.documentCard}>
            <FontAwesome5 name="file-pdf" size={24} color="#FF0000" />
            <Text style={styles.documentName}>{doc.name}</Text>
            <IconButton
              icon="delete"
              size={20}
              onPress={() => {
                setUserData(prev => ({
                  ...prev,
                  portfolio: prev.portfolio.filter((_, i) => i !== index),
                }));
              }}
            />
          </Surface>
        ))}
        <Button
          mode="outlined"
          onPress={updatePortfolio}
          style={styles.addPortfolioButton}
        >
          Add Portfolio Document
        </Button>
      </View>
    </>
  );

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.header}>
        <TouchableOpacity onPress={async () => {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
          });

          if (!result.canceled && result.assets[0]) {
            setUserData(prev => ({ ...prev, avatar: result.assets[0].uri }));
          }
        }}>
          {userData.avatar ? (
            <Avatar.Image size={100} source={{ uri: userData.avatar }} />
          ) : (
            <Avatar.Icon size={100} icon="account" />
          )}
        </TouchableOpacity>
        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.role}>{userData.role}</Text>
      </Surface>

      <Surface style={styles.infoContainer}>
        {isEditing ? (
          <>
            <TextInput
              mode="outlined"
              label="Bio"
              value={userData.bio}
              onChangeText={(text) => setUserData(prev => ({ ...prev, bio: text }))}
              multiline
              style={styles.input}
            />
            <TextInput
              mode="outlined"
              label="Email"
              value={userData.contactInfo.email}
              onChangeText={(text) => setUserData(prev => ({
                ...prev,
                contactInfo: { ...prev.contactInfo, email: text },
              }))}
              style={styles.input}
            />
            <TextInput
              mode="outlined"
              label="Phone"
              value={userData.contactInfo.phone}
              onChangeText={(text) => setUserData(prev => ({
                ...prev,
                contactInfo: { ...prev.contactInfo, phone: text },
              }))}
              style={styles.input}
            />
            <Button
              mode="contained"
              onPress={() => setIsEditing(false)}
              style={styles.button}
            >
              Save Changes
            </Button>
          </>
        ) : (
          <>
            <Text style={styles.bio}>{userData.bio}</Text>
            <View style={styles.contactInfo}>
              <Text style={styles.contactItem}>📧 {userData.contactInfo.email}</Text>
              {userData.contactInfo.phone && (
                <Text style={styles.contactItem}>📱 {userData.contactInfo.phone}</Text>
              )}
            </View>
            <Button
              mode="outlined"
              onPress={() => setIsEditing(true)}
              style={styles.button}
            >
              Edit Profile
            </Button>
          </>
        )}
      </Surface>

      {userData.role === 'artist' ? renderArtistContent() : renderProfessionalContent()}

      <Portal>
        <Modal
          visible={uploadModalVisible}
          onDismiss={() => setUploadModalVisible(false)}
          contentContainerStyle={styles.modal}
        >
          <Text style={styles.modalTitle}>Upload Reel</Text>
          <Button
            mode="contained"
            onPress={pickVideo}
            style={styles.modalButton}
          >
            Choose Video
          </Button>
          <Button
            mode="outlined"
            onPress={() => setUploadModalVisible(false)}
          >
            Cancel
          </Button>
        </Modal>
      </Portal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
  },
  role: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  infoContainer: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
  },
  bio: {
    fontSize: 16,
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 12,
  },
  contactInfo: {
    marginBottom: 16,
  },
  contactItem: {
    fontSize: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
  reelsContainer: {
    paddingHorizontal: 16,
  },
  reelCard: {
    width: 150,
    height: 200,
    marginRight: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  reelThumbnail: {
    width: '100%',
    height: '100%',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
  portfolioContainer: {
    padding: 16,
  },
  documentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
  },
  documentName: {
    flex: 1,
    marginLeft: 12,
  },
  addPortfolioButton: {
    marginTop: 12,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalButton: {
    marginBottom: 12,
  },
});
