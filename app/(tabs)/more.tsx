import { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Linking,
  FlatList,
} from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { Video, ResizeMode } from 'expo-av';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface VideoItem {
  id: string;
  url: string;
  artist: string;
  songName: string;
  description: string;
  streamingLinks: {
    spotify?: string;
    appleMusic?: string;
    youtube?: string;
    tidal?: string;
    instagram?: string;
    twitter?: string;
  };
  likes: number;
  shares: number;
}

// Sample video data
const videos: VideoItem[] = [
  {
    id: '1',
    url: 'YOUR_VIDEO_URL_HERE',
    artist: 'Artist Name',
    songName: 'Song Title',
    description: 'Check out my new track! 🎵 #music #newrelease',
    streamingLinks: {
      spotify: 'https://spotify.com/track/...',
      appleMusic: 'https://music.apple.com/...',
      youtube: 'https://youtube.com/...',
      tidal: 'https://tidal.com/...',
      instagram: 'https://instagram.com/...',
      twitter: 'https://twitter.com/...',
    },
    likes: 1234,
    shares: 567,
  },
  // Add more video items...
];

export default function MoreScreen() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const spinValue = useRef(new Animated.Value(0)).current;

  // Floating share icon animation
  const startSpinAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(spinValue, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const renderVideoItem = ({ item, index }: { item: VideoItem; index: number }) => {
    const videoRef = useRef<Video>(null);

    return (
      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          source={{ uri: item.url }}
          style={styles.video}
          resizeMode={ResizeMode.COVER}
          isLooping
          shouldPlay={index === activeVideoIndex}
          isMuted={false}
        />

        {/* Streaming Links */}
        <View style={styles.streamingLinks}>
          {item.streamingLinks.spotify && (
            <IconButton
              icon={() => <FontAwesome name="spotify" size={24} color="#1DB954" />}
              onPress={() => Linking.openURL(item.streamingLinks.spotify!)}
            />
          )}
          {item.streamingLinks.appleMusic && (
            <IconButton
              icon={() => <FontAwesome name="apple" size={24} color="#FC3C44" />}
              onPress={() => Linking.openURL(item.streamingLinks.appleMusic!)}
            />
          )}
          {item.streamingLinks.youtube && (
            <IconButton
              icon={() => <FontAwesome name="youtube-play" size={24} color="#FF0000" />}
              onPress={() => Linking.openURL(item.streamingLinks.youtube!)}
            />
          )}
          {item.streamingLinks.tidal && (
            <IconButton
              icon={() => <FontAwesome name="music" size={24} color="#000000" />}
              onPress={() => Linking.openURL(item.streamingLinks.tidal!)}
            />
          )}
          {item.streamingLinks.instagram && (
            <IconButton
              icon={() => <FontAwesome name="instagram" size={24} color="#E4405F" />}
              onPress={() => Linking.openURL(item.streamingLinks.instagram!)}
            />
          )}
          {item.streamingLinks.twitter && (
            <IconButton
              icon={() => <FontAwesome name="twitter" size={24} color="#1DA1F2" />}
              onPress={() => Linking.openURL(item.streamingLinks.twitter!)}
            />
          )}
        </View>

        {/* Video Info Overlay */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        >
          <View style={styles.videoInfo}>
            <Text style={styles.artistName}>{item.artist}</Text>
            <Text style={styles.songName}>{item.songName}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </LinearGradient>

        {/* Floating Share Button */}
        <Animated.View
          style={[
            styles.floatingShare,
            { transform: [{ rotate: spin }] },
          ]}
        >
          <IconButton
            icon="share-variant"
            size={24}
            iconColor="#fff"
            onPress={() => {
              // Implement share functionality
            }}
          />
        </Animated.View>
      </View>
    );
  };

  return (
    <FlatList
      data={videos}
      renderItem={renderVideoItem}
      keyExtractor={(item) => item.id}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={({ changed }) => {
        if (changed[0]?.isViewable && typeof changed[0]?.index === 'number') {
          setActiveVideoIndex(changed[0].index as number);
        }
      }}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 50,
      }}
    />
  );
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  videoContainer: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  videoInfo: {
    position: 'absolute',
    bottom: 80,
    left: 16,
    right: 16,
  },
  artistName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  songName: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
  },
  description: {
    color: '#fff',
    fontSize: 14,
  },
  streamingLinks: {
    position: 'absolute',
    right: 16,
    top: '40%',
    transform: [{ translateY: -100 }],
    alignItems: 'center',
  },
  floatingShare: {
    position: 'absolute',
    top: 48,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 30,
    padding: 8,
  },
}); 