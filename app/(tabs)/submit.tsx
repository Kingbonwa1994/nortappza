// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
// import { Client, Databases, Storage, ID } from 'react-native-appwrite';
// import React, { useState, useEffect } from 'react';
// import * as DocumentPicker from 'expo-document-picker';
// import * as ImagePicker from 'expo-image-picker';

// // Initialize Appwrite client
// const endpoint = process.env.ENDPOINT || ''
// const projectId = process.env.PROJECT_ID || ''
// const platform = process.env.PLATFORM || ''  
// const databaseId = process.env.DATABASE_ID || ''

// const client = new Client();
// client
//   .setEndpoint(endpoint) 
//   .setProject(projectId)
//   .setPlatform(platform)

// const databases = new Databases(client);
// const storage = new Storage(client);

// // Define types for better type safety
// type RadioStation = {
//   $id: string;
//   name: string;
//   email: string;
// };

// type Submission = {
//   trackTitle: string;
//   artistName: string;
//   radioStations: string[]; // Array of radio station IDs
//   audioFileUrl: string;
//   albumCoverUrl: string;
// };

// export default function App() {
//   const [radioStations, setRadioStations] = useState<RadioStation[]>([]);
//   const [selectedStations, setSelectedStations] = useState<string[]>([]);
//   const [trackTitle, setTrackTitle] = useState('');
//   const [artistName, setArtistName] = useState('');
//   const [audioFile, setAudioFile] = useState<DocumentPicker.DocumentPickerResult | null>(null);
//   const [albumCover, setAlbumCover] = useState<ImagePicker.ImagePickerAsset | null>(null);

//   // Fetch radio stations from Appwrite database
//   useEffect(() => {
//     const fetchRadioStations = async () => {
//       try {
//         const response = await databases.listDocuments(databaseId, 'radioStations');
//         setRadioStations(response.documents);
//       } catch (error) {
//         console.error('Error fetching radio stations:', error);
//       }
//     };
//     fetchRadioStations();
//   }, []);

//   // Handle audio file upload
//   const handleAudioUpload = async () => {
//     const result = await DocumentPicker.getDocumentAsync({ type: 'audio/*' });
//     if (result.assets && result.assets.length > 0) {
//       setAudioFile(result);
//     }
//   };

//   // Handle album cover upload
//   const handleAlbumCoverUpload = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });
//     if (!result.canceled && result.assets.length > 0) {
//       setAlbumCover(result.assets[0]);
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async () => {
//     if (!audioFile || !albumCover) {
//       Alert.alert('Error', 'Please upload both audio file and album cover.');
//       return;
//     }

//     try {
//       // Upload audio file to Appwrite storage
//       const audioFileResponse = await storage.createFile(
//         'audioSubmitted',
//         ID.unique(),
//         audioFile,

//       );

//       // Upload album cover to Appwrite storage
//       const albumCoverResponse = await storage.createFile(
//         'albumCovers',
//         ID.unique(),
//         albumCover
//       );

//       // Get file URLs
//       const audioFileUrl = `https://cloud.appwrite.io/v1/storage/buckets/audioSubmitted/files/${audioFileResponse.$id}/view`;
//       const albumCoverUrl = `https://cloud.appwrite.io/v1/storage/buckets/albumCovers/files/${albumCoverResponse.$id}/view`;

//       // Save submission to Appwrite database
//       const submissionData: Submission = {
//         trackTitle,
//         artistName,
//         radioStations: selectedStations,
//         audioFileUrl,
//         albumCoverUrl,
//       };
//       await databases.createDocument('your-database-id', 'submissions', ID.unique(), submissionData);

//       // Send email to radio stations (optional, using Appwrite Functions)
//       const selectedStationEmails = radioStations
//         .filter((station) => selectedStations.includes(station.$id))
//         .map((station) => station.email);

//       await fetch('https://your-appwrite-function-endpoint', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           emails: selectedStationEmails,
//           subject: 'New Music Submission',
//           message: `New submission from ${artistName}: ${trackTitle}. Audio: ${audioFileUrl}, Cover: ${albumCoverUrl}`,
//         }),
//       });

//       Alert.alert('Success', 'Submission successful!');
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       Alert.alert('Error', 'Submission failed. Please try again.');
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <StatusBar style="auto" />

//       {/* Submission Form */}
//       <TextInput
//         placeholder="Track Title"
//         value={trackTitle}
//         onChangeText={setTrackTitle}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Artist Name"
//         value={artistName}
//         onChangeText={setArtistName}
//         style={styles.input}
//       />
//       <Text>Select Radio Stations:</Text>
//       {radioStations.map((station) => (
//         <TouchableOpacity
//           key={station.$id}
//           onPress={() =>
//             setSelectedStations((prev) =>
//               prev.includes(station.$id)
//                 ? prev.filter((id) => id !== station.$id)
//                 : [...prev, station.$id]
//             )
//           }
//           style={[
//             styles.stationButton,
//             selectedStations.includes(station.$id) && styles.selectedStationButton,
//           ]}
//         >
//           <Text>{station.name}</Text>
//         </TouchableOpacity>
//       ))}
//       <TouchableOpacity onPress={handleAudioUpload} style={styles.button}>
//         <Text>Upload Audio File</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={handleAlbumCoverUpload} style={styles.button}>
//         <Text>Upload Album Cover</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={handleSubmit} style={styles.button}>
//         <Text>Submit</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'center',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 5,
//   },
//   button: {
//     backgroundColor: '#007BFF',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   stationButton: {
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     marginBottom: 5,
//   },
//   selectedStationButton: {
//     backgroundColor: '#007BFF',
//     borderColor: '#007BFF',
//   },
// });



export default function Submission(){
    return(
        <div>
            hu
        </div>
    )
}