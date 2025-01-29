import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

// Sample radio stations
const radioStations = [
  { id: '1', name: 'Hot FM', email: 'submit@hotfm.com' },
  { id: '2', name: 'Vibe Radio', email: 'submit@viberadio.com' },
  { id: '3', name: 'Metro FM', email: 'submit@metrofm.com' },
  { id: '4', name: 'Urban Beats', email: 'submit@urbanbeats.com' },
  { id: '5', name: 'Groove Nation', email: 'submit@groovenation.com' },
];

const SubmitComponent = () => {
  const [artistName, setArtistName] = useState('');
  const [trackInfo, setTrackInfo] = useState('');
  const [albumCover, setAlbumCover] = useState<string | null>(null);
  const [trackFile, setTrackFile] = useState<{ uri: string; name: string; type: string; }>({ uri: '', name: '', type: '' });
  const [selectedStations, setSelectedStations] = useState<{ id: any; name?: string; email?: string; }[]>([]);

  // Function to select album cover
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setAlbumCover(result.assets[0].uri);
    }
  };

  // Function to select audio track
  const pickTrack = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: 'audio/*',
    });

    if (!result.canceled) {
      const fileName = result.assets[0].name;
      const fileUri = result.assets[0].uri;
      setTrackFile({ uri: fileUri, name: fileName || '', type: '' });
    }
  };

  // Function to toggle radio station selection (max 5)
  const toggleStation = (station: { id: any; name?: string; email?: string; }) => {
    if (selectedStations.some((s) => s.id === station.id)) {
      setSelectedStations(selectedStations.filter((s) => s.id !== station.id));
    } else if (selectedStations.length < 5) {
      setSelectedStations([...selectedStations, station]);
    }
  };

  // Function to submit the song
  const handleSubmit = () => {
    if (!artistName || !trackInfo || !albumCover || !trackFile || selectedStations.length === 0) {
      alert('Please fill all fields and select at least one radio station.');
      return;
    }

    // Prepare submission data
    const submissionData = {
      artistName,
      trackInfo,
      albumCover,
      trackFile,
      selectedStations,
    };

    console.log('Submission Data:', submissionData);
    alert('Song submitted successfully!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Submit Your Song</Text>

      <TextInput
        style={styles.input}
        placeholder="Artist Name"
        placeholderTextColor="#999"
        value={artistName}
        onChangeText={setArtistName}
      />

      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Track Info"
        placeholderTextColor="#999"
        multiline
        value={trackInfo}
        onChangeText={setTrackInfo}
      />

      <TouchableOpacity style={styles.uploadButton} onPress={pickTrack}>
        <Text style={styles.uploadButtonText}>Upload Track</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        <Text style={styles.uploadButtonText}>Upload Album Cover</Text>
      </TouchableOpacity>

      {albumCover && (
        <Image source={{ uri: albumCover }} style={styles.imagePreview} />
      )}

      <Text style={styles.sectionTitle}>Select Up to 5 Radio Stations</Text>
      <FlatList
        data={radioStations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.radioItem,
              selectedStations.some((s) => s.id === item.id) && styles.selectedRadio
            ]}
            onPress={() => toggleStation(item)}
          >
            <Text style={styles.radioName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Song</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  uploadButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  uploadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  radioItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  selectedRadio: {
    backgroundColor: 'rgba(37, 99, 235, 0.5)',
    borderColor: '#2563eb',
  },
  radioName: {
    color: '#fff',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SubmitComponent;