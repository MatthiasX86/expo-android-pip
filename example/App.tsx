import { Button, StyleSheet, Text, View } from "react-native";

import * as ExpoAndroidPip from "expo-android-pip";
import Player from "./components/Player";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <Providers>
      {/* <View style={styles.container}> */}
      {/*   <Button title="Press me" onPress={() => ExpoAndroidPip.hello()} /> */}
      {/* </View> */}
      <Player />
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
