import { useRef, useReducer, Reducer } from "react";
import { StyleSheet, View, Text, Button, Dimensions, TouchableHighlight } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import Video from "react-native-video";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/* Types */
interface PlayerStatus {
  isPlaying: boolean;
  isPiPMode: boolean;
}

/* Constants */
const { width: device_width, height } = Dimensions.get("window");
const { height: screenHeight, width: screenWidth } = Dimensions.get("screen");
const fontSize = 14;
const device_height = (height * 2.0) / 5.0 - fontSize * 2;
const initPlayerStatus = {
  isPlaying: false,
  isPiPMode: false
}

export default () => {
  const videoRef = useRef<Video | null>(null);
  const [playerStatus, setPlayerStatus] = useReducer<Reducer<PlayerStatus, Partial<PlayerStatus>>>(
    (prevState, action) => ({ ...prevState, ...action }), 
    initPlayerStatus
  )
  const insets = useSafeAreaInsets();
  
  return (
    <View style={styles.container}>
      <Video
        source={{ 
          uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" 
        }}
        ref={videoRef}
        paused={!playerStatus.isPlaying}
        pictureInPicture={playerStatus.isPiPMode}
        style={[styles.video, { marginBottom: insets.bottom + insets.top }]}
        resizeMode="contain"
      />
      <View style={styles.controls}>
        <TouchableHighlight
          underlayColor="#FFF8ED"
          onPress={() => setPlayerStatus({ isPlaying: !playerStatus.isPlaying })}
        >
          {playerStatus.isPlaying ? (
            <AntDesign name="pause" size={24} color="white" />
          ) : (
            <AntDesign name="play" size={24} color="white" />
          )}
        </TouchableHighlight>
        <TouchableHighlight 
          onPress={() => setPlayerStatus({ isPiPMode: !playerStatus.isPiPMode} )}
        >
          {playerStatus.isPiPMode ? (
            <MaterialIcons name="cancel" size={24} color="white" />
          ) : (
            <MaterialIcons name="picture-in-picture-alt" size={24} color="black" />
          )}
        </TouchableHighlight>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  video: {
    maxWidth: device_width,
    height: device_height,
    width: device_width,
  },
  controls: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  button: {
    backgroundColor: "#FFF8ED",
  },
});