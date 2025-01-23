import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet, View, Button, FlatList, Dimensions } from 'react-native';

const videoSource =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

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

function VideoItem({ item }: { item: string }) {
  const player = useVideoPlayer(item, player => {
    player.loop = true;
    player.play();
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  return (
    <View style={styles.videoContainer}>
      <VideoView style={styles.fullscreenVideo} player={player} allowsFullscreen allowsPictureInPicture />
      <View style={styles.controlsContainer}>
        <Button
          title={isPlaying ? 'Pause' : 'Play'}
          onPress={() => {
            if (isPlaying) {
              player.pause();
            } else {
              player.play();
            }
          }}
        />
      </View>
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
  controlsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    padding: 10,
  },
});