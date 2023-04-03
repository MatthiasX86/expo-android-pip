import { Button, StyleSheet, Text, View } from "react-native";

import * as ExpoAndroidPip from "expo-android-pip";
import TrackPlayer from 'react-native-track-player';
import Player from "./components/Player";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { connectToDevTools } from "react-devtools-core";

if (__DEV__) {
  connectToDevTools({
    host: "localhost",
    port: 8081,
  });
}



export default function App() {
  return (
    <Providers>
      {/* <View style={styles.container}> */}
      {/*   <Button title="Press me" onPress={() => ExpoAndroidPip.hello()} /> */}
      {/* </View> */}
      <Player start={0} onFinished={() => console.log("video finished")} />
    </Providers>
  );
}

const Providers = (props: React.PropsWithChildren) => {
  return <SafeAreaProvider>{props.children}</SafeAreaProvider>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    position: "absolute",
  },
});
