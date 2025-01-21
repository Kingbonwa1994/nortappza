import { View, StyleSheet, ScrollView, Image, Platform } from 'react-native';
import { Formik } from 'formik';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as Yup from 'yup';
import { useState } from 'react';
import {
  Button,
  Text,
  TextInput,
  Checkbox,
  Surface,
  TouchableRipple,
  Portal,
  Modal,
} from 'react-native-paper';

// Validation schema
const SubmissionSchema = Yup.object().shape({
  trackTitle: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Track title is required'),
  artistName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Artist name is required'),
  selectedStations: Yup.array()
    .min(1, 'Select at least one radio station')
    .required('Please select radio stations'),
  audioFile: Yup.mixed().required('Audio file is required'),
  coverImage: Yup.mixed().required('Cover image is required'),
});

// Radio stations data
const radioStations = [
  { id: '1', name: 'Metro FM' },
  { id: '2', name: 'Ukhozi FM' },
  { id: '3', name: '5FM' },
  { id: '4', name: 'YFM' },
  { id: '5', name: 'Gagasi FM' },
  { id: '6', name: 'East Coast Radio' },
  { id: '7', name: 'Lesedi FM' },
  { id: '8', name: 'Motsweding FM' },
  { id: '9', name: 'Good Hope FM' },
  { id: '10', name: 'Umhlobo Wenene FM' },
];

interface FormValues {
  trackTitle: string;
  artistName: string;
  selectedStations: string[];
  audioFile: any;
  coverImage: any;
}

export default function SubmitScreen() {
  const [stationsModalVisible, setStationsModalVisible] = useState(false);

  const pickAudio = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
        copyToCacheDirectory: true,
      });

      if (result.assets && result.assets[0]) {
        return result.assets[0];
      }
      return null;
    } catch (err) {
      console.error('Error picking audio:', err);
      return null;
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        return result.assets[0];
      }
      return null;
    } catch (err) {
      console.error('Error picking image:', err);
      return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.formContainer} elevation={2}>
        <Text style={styles.title}>Submit Your Track</Text>
        
        <Formik
          initialValues={{
            trackTitle: '',
            artistName: '',
            selectedStations: [] as string[],
            audioFile: null,
            coverImage: null,
          } as FormValues}
          validationSchema={SubmissionSchema}
          onSubmit={(values) => {
            console.log(values);
            // Here you would implement the actual submission logic
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <View>
              <TextInput
                mode="outlined"
                label="Track Title"
                onChangeText={handleChange('trackTitle')}
                onBlur={handleBlur('trackTitle')}
                value={values.trackTitle}
                error={!!(touched.trackTitle && errors.trackTitle)}
                style={styles.input}
              />
              {touched.trackTitle && errors.trackTitle && (
                <Text style={styles.errorText}>{errors.trackTitle as string}</Text>
              )}

              <TextInput
                mode="outlined"
                label="Artist Name"
                onChangeText={handleChange('artistName')}
                onBlur={handleBlur('artistName')}
                value={values.artistName}
                error={!!(touched.artistName && errors.artistName)}
                style={styles.input}
              />
              {touched.artistName && errors.artistName && (
                <Text style={styles.errorText}>{errors.artistName as string}</Text>
              )}

              <TouchableRipple
                onPress={async () => {
                  const audio = await pickAudio();
                  if (audio) {
                    setFieldValue('audioFile', audio);
                  }
                }}
                style={styles.uploadButton}
              >
                <View style={styles.uploadButtonContent}>
                  <Text>
                    {values.audioFile
                      ? `Selected: ${values.audioFile.name}`
                      : 'Upload Audio Track'}
                  </Text>
                </View>
              </TouchableRipple>
              {touched.audioFile && errors.audioFile && (
                <Text style={styles.errorText}>{errors.audioFile as string}</Text>
              )}

              <TouchableRipple
                onPress={async () => {
                  const image = await pickImage();
                  if (image) {
                    setFieldValue('coverImage', image);
                  }
                }}
                style={styles.uploadButton}
              >
                <View style={styles.uploadButtonContent}>
                  {values.coverImage ? (
                    <Image
                      source={{ uri: values.coverImage.uri }}
                      style={styles.coverPreview}
                    />
                  ) : (
                    <Text>Upload Cover Image</Text>
                  )}
                </View>
              </TouchableRipple>
              {touched.coverImage && errors.coverImage && (
                <Text style={styles.errorText}>{errors.coverImage as string}</Text>
              )}

              <Button
                mode="outlined"
                onPress={() => setStationsModalVisible(true)}
                style={styles.stationsButton}
              >
                Select Radio Stations
              </Button>
              {touched.selectedStations && errors.selectedStations && (
                <Text style={styles.errorText}>{errors.selectedStations as string}</Text>
              )}

              <Portal>
                <Modal
                  visible={stationsModalVisible}
                  onDismiss={() => setStationsModalVisible(false)}
                  contentContainerStyle={styles.modal}
                >
                  <ScrollView>
                    {radioStations.map((station) => (
                      <TouchableRipple
                        key={station.id}
                        onPress={() => {
                          const selected = values.selectedStations;
                          const index = selected.indexOf(station.id);
                          if (index === -1) {
                            setFieldValue('selectedStations', [...selected, station.id]);
                          } else {
                            setFieldValue(
                              'selectedStations',
                              selected.filter((id) => id !== station.id)
                            );
                          }
                        }}
                      >
                        <View style={styles.stationItem}>
                          <Checkbox
                            status={
                              values.selectedStations?.includes(station.id)
                                ? 'checked'
                                : 'unchecked'
                            }
                          />
                          <Text style={styles.stationName}>{station.name}</Text>
                        </View>
                      </TouchableRipple>
                    ))}
                  </ScrollView>
                  <Button
                    mode="contained"
                    onPress={() => setStationsModalVisible(false)}
                    style={styles.doneButton}
                  >
                    Done
                  </Button>
                </Modal>
              </Portal>

              <Button
                mode="contained"
                onPress={() => handleSubmit()}
                style={styles.submitButton}
              >
                Submit Track
              </Button>
            </View>
          )}
        </Formik>
      </Surface>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 12,
  },
  uploadButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 12,
    borderStyle: 'dashed',
  },
  uploadButtonContent: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverPreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  stationsButton: {
    marginBottom: 12,
  },
  submitButton: {
    marginTop: 20,
    paddingVertical: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    maxHeight: '80%',
    borderRadius: 8,
  },
  stationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  stationName: {
    marginLeft: 8,
  },
  doneButton: {
    marginTop: 16,
  },
}); 