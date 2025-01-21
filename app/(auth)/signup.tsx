import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  Button,
  TextInput,
  ProgressBar,
  Checkbox,
  Surface,
  Avatar,
} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';

// User role definitions
const userRoles = [
  {
    id: 'artist',
    title: 'Artist',
    icon: 'music',
    description: 'I make music and want to share it with the world',
  },
  {
    id: 'executive',
    title: 'Music Executive',
    icon: 'briefcase',
    description: 'I work in the music industry and scout talent',
  },
  {
    id: 'copyright',
    title: 'Copyright Expert',
    icon: 'gavel',
    description: 'I handle music rights and licensing',
  },
  {
    id: 'producer',
    title: 'Producer',
    icon: 'sliders-h',
    description: 'I produce and mix music',
  },
  {
    id: 'manager',
    title: 'Artist Manager',
    icon: 'user-tie',
    description: 'I manage artists and their careers',
  },
];

// Genre options for artists
const genres = [
  'Hip Hop', 'R&B', 'Pop', 'Rock', 'Jazz', 'Classical',
  'Electronic', 'Afrobeats', 'Gospel', 'Soul', 'Country',
];

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  profileImage: string | null;
  genre: string[];
  instruments: string;
  socialLinks: {
    instagram: string;
    twitter: string;
    youtube: string;
  };
  company: string;
  position: string;
  experience: string;
  bio: string;
  agreeToTerms: boolean;
}

export default function SignupScreen() {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState('');
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    profileImage: null,
    // Artist specific fields
    genre: [],
    instruments: '',
    socialLinks: {
      instagram: '',
      twitter: '',
      youtube: '',
    },
    // Executive specific fields
    company: '',
    position: '',
    experience: '',
    // Common fields
    bio: '',
    agreeToTerms: false,
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setFormData({ ...formData, profileImage: result.assets[0].uri });
    }
  };

  const renderRoleSelection = () => (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Choose Your Role</Text>
      <Text style={styles.subtitle}>Select the role that best describes you</Text>

      {userRoles.map((role) => (
        <TouchableOpacity
          key={role.id}
          onPress={() => setSelectedRole(role.id)}
        >
          <Surface style={[
            styles.roleCard,
            selectedRole === role.id && styles.selectedRole
          ]}>
            <FontAwesome5 
              name={role.icon} 
              size={24} 
              color={selectedRole === role.id ? '#fff' : '#000'}
            />
            <View style={styles.roleInfo}>
              <Text style={[
                styles.roleTitle,
                selectedRole === role.id && styles.selectedText
              ]}>
                {role.title}
              </Text>
              <Text style={[
                styles.roleDescription,
                selectedRole === role.id && styles.selectedText
              ]}>
                {role.description}
              </Text>
            </View>
          </Surface>
        </TouchableOpacity>
      ))}

      <Button
        mode="contained"
        onPress={() => setStep(2)}
        style={styles.button}
        disabled={!selectedRole}
      >
        Continue
      </Button>
    </ScrollView>
  );

  const renderBasicInfo = () => (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create Your Account</Text>

      <TouchableOpacity onPress={pickImage} style={styles.imageUpload}>
        {formData.profileImage ? (
          <Image
            source={{ uri: formData.profileImage }}
            style={styles.profileImage}
          />
        ) : (
          <Avatar.Icon size={100} icon="camera" />
        )}
        <Text style={styles.uploadText}>Upload Profile Picture</Text>
      </TouchableOpacity>

      <TextInput
        mode="outlined"
        label="Email"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        mode="outlined"
        label="Password"
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        style={styles.input}
        secureTextEntry
      />

      <TextInput
        mode="outlined"
        label="Confirm Password"
        value={formData.confirmPassword}
        onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
        style={styles.input}
        secureTextEntry
      />

      <TextInput
        mode="outlined"
        label="First Name"
        value={formData.firstName}
        onChangeText={(text) => setFormData({ ...formData, firstName: text })}
        style={styles.input}
      />

      <TextInput
        mode="outlined"
        label="Last Name (Optional)"
        value={formData.lastName}
        onChangeText={(text) => setFormData({ ...formData, lastName: text })}
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={() => setStep(3)}
        style={styles.button}
      >
        Next
      </Button>
    </ScrollView>
  );

  const renderRoleSpecificInfo = () => (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Additional Information</Text>

      {selectedRole === 'artist' && (
        <>
          <Text style={styles.sectionTitle}>Select Your Genres</Text>
          <View style={styles.genreContainer}>
            {genres.map((genre) => (
              <Checkbox.Item
                key={genre}
                label={genre}
                status={formData.genre.includes(genre) ? 'checked' : 'unchecked'}
                onPress={() => {
                  const newGenres = formData.genre.includes(genre)
                    ? formData.genre.filter(g => g !== genre)
                    : [...formData.genre, genre];
                  setFormData({ ...formData, genre: newGenres });
                }}
              />
            ))}
          </View>

          <TextInput
            mode="outlined"
            label="Instruments (comma separated)"
            value={formData.instruments}
            onChangeText={(text) => setFormData({ ...formData, instruments: text })}
            style={styles.input}
          />

          <TextInput
            mode="outlined"
            label="Instagram Username"
            value={formData.socialLinks.instagram}
            onChangeText={(text) => setFormData({
              ...formData,
              socialLinks: { ...formData.socialLinks, instagram: text }
            })}
            style={styles.input}
          />

          <TextInput
            mode="outlined"
            label="Twitter/X Username"
            value={formData.socialLinks.twitter}
            onChangeText={(text) => setFormData({
              ...formData,
              socialLinks: { ...formData.socialLinks, twitter: text }
            })}
            style={styles.input}
          />

          <TextInput
            mode="outlined"
            label="YouTube Channel"
            value={formData.socialLinks.youtube}
            onChangeText={(text) => setFormData({
              ...formData,
              socialLinks: { ...formData.socialLinks, youtube: text }
            })}
            style={styles.input}
          />
        </>
      )}

      {selectedRole === 'executive' && (
        <>
          <TextInput
            mode="outlined"
            label="Company"
            value={formData.company}
            onChangeText={(text) => setFormData({ ...formData, company: text })}
            style={styles.input}
          />

          <TextInput
            mode="outlined"
            label="Position"
            value={formData.position}
            onChangeText={(text) => setFormData({ ...formData, position: text })}
            style={styles.input}
          />

          <TextInput
            mode="outlined"
            label="Years of Experience"
            value={formData.experience}
            onChangeText={(text) => setFormData({ ...formData, experience: text })}
            style={styles.input}
            keyboardType="numeric"
          />
        </>
      )}

      <TextInput
        mode="outlined"
        label="Bio"
        value={formData.bio}
        onChangeText={(text) => setFormData({ ...formData, bio: text })}
        style={styles.input}
        multiline
        numberOfLines={4}
      />

      <View style={styles.termsContainer}>
        <Checkbox.Android
          status={formData.agreeToTerms ? 'checked' : 'unchecked'}
          onPress={() => setFormData({ ...formData, agreeToTerms: !formData.agreeToTerms })}
        />
        <Text style={styles.termsText}>
          I agree to the Terms & Conditions and Privacy Policy
        </Text>
      </View>

      <Button
        mode="contained"
        onPress={() => {
          // Handle signup logic here
          console.log('Form Data:', formData);
          router.replace('/(tabs)');
        }}
        style={styles.button}
        disabled={!formData.agreeToTerms}
      >
        Create Account
      </Button>
    </ScrollView>
  );

  return (
    <View style={styles.mainContainer}>
      <ProgressBar
        progress={step / 3}
        style={styles.progressBar}
      />
      {step === 1 && renderRoleSelection()}
      {step === 2 && renderBasicInfo()}
      {step === 3 && renderRoleSpecificInfo()}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  progressBar: {
    height: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  roleCard: {
    flexDirection: 'row',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
  },
  selectedRole: {
    backgroundColor: '#007AFF',
  },
  roleInfo: {
    marginLeft: 16,
    flex: 1,
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  roleDescription: {
    fontSize: 14,
    color: '#666',
  },
  selectedText: {
    color: '#fff',
  },
  imageUpload: {
    alignItems: 'center',
    marginVertical: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  uploadText: {
    marginTop: 8,
    color: '#666',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginVertical: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  genreContainer: {
    marginBottom: 16,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  termsText: {
    flex: 1,
    marginLeft: 8,
    color: '#666',
  },
});
