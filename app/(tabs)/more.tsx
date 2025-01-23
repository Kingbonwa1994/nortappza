import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet, View, TouchableOpacity, Text, FlatList, Dimensions, Image } from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons'; // Using FontAwesome and Feather for icons
import { LinearGradient } from 'expo-linear-gradient';



const videoSource = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

const VIDEOS = Array(20).fill(videoSource); // Example array with 20 entries of the same video

export default function VideoScreen() {
  return (
    <FlatList 
      data={VIDEOS}
      renderItem={({ item, index }) => <VideoItem item={item} />}
      keyExtractor={(item, index) => index.toString()}
      onEndReached={() => {
        // Here you can fetch more videos if needed
        console.log("Load more videos");
      }}
      onEndReachedThreshold={0.5}
      style={styles.list}
    />
  );
}

function VideoItem({ item } : { item: string }) {
  const player = useVideoPlayer(item, player => {
    player.loop = true;
    player.play();
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  const togglePlayPause = () => {
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
  };

  return (
    <View style={styles.videoContainer}>
       <LinearGradient
           colors={['#6B21A8', '#C026D3', '#FB923C']}
           start={{ x: 0, y: 0 }}
           end={{ x: 1, y: 0 }}
        >
        <View style={styles.musicIconsContainer}>
       
      <VideoView style={styles.fullscreenVideo} player={player} allowsFullscreen allowsPictureInPicture />

      {/* Music platform icons */}
    
        <TouchableOpacity style={styles.iconButton}><FontAwesome name="spotify" size={24} color="white" /></TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}><FontAwesome name="apple" size={24} color="white" /></TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}><Feather name="cloud" size={24} color="white" /></TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}><Feather name="youtube" size={24} color="white" /></TouchableOpacity>
     
       
        </View>

      {/* User info and follow button */}
      <View style={styles.userInfoContainer}>
        <Image source={{ uri: 'https://via.placeholder.com/40' }} style={styles.avatar} />
        <Text style={styles.username}>@user</Text>
        <TouchableOpacity style={styles.followButton}><Text style={styles.followText}>Follow</Text></TouchableOpacity>
      </View>

      {/* Description and sound info */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>This is a cool video #trending</Text>
        <View style={styles.soundContainer}>
          <Feather name="music" size={16} color="white" />
          <Text style={styles.soundText}>Original Sound - User</Text>
        </View>
      </View>

      {/* Reactions and share buttons */}
      <View style={styles.reactionsContainer}>
        <TouchableOpacity style={styles.iconButton}><FontAwesome name="heart" size={24} color="white" /></TouchableOpacity>
        <Text style={styles.reactionCount}>1234</Text>

        <TouchableOpacity style={styles.iconButton}><Feather name="message-circle" size={24} color="white" /></TouchableOpacity>
        <Text style={styles.reactionCount}>567</Text>

        <TouchableOpacity style={styles.iconButton}><Feather name="share" size={24} color="white" /></TouchableOpacity>
        <Text style={styles.reactionCount}>89</Text>
      </View>

      {/* Play/Pause Button */}
      <TouchableOpacity style={styles.playPauseButton} onPress={togglePlayPause}>
        <Text style={styles.playPauseText}>{isPlaying ? 'Pause' : 'Play'}</Text>
      </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  videoContainer: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  fullscreenVideo: {
    ...StyleSheet.absoluteFillObject,
  },
  musicIconsContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 50,
    padding: 10,
  },
  userInfoContainer: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
  },
  username: {
    color: 'white',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  followButton: {
    marginLeft: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  followText: {
    color: 'white',
    fontWeight: 'bold',
  },
  descriptionContainer: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    right: 80,
  },
  description: {
    color: 'white',
    marginBottom: 5,
  },
  soundContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  soundText: {
    color: 'white',
    marginLeft: 5,
  },
  reactionsContainer: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    alignItems: 'center',
  },
  reactionCount: {
    color: 'white',
    fontSize: 12,
    marginVertical: 5,
  },
  playPauseButton: {
    position: 'absolute',
    bottom: 20,
    left: Dimensions.get('window').width / 2 - 50,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  playPauseText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
