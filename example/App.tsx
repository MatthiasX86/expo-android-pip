import { Button, StyleSheet, Text, View } from "react-native";

import * as ExpoAndroidPip from "expo-android-pip";

export default function App() {
  return (
    <View style={styles.container}>
      <Button title="Press me" onPress={() => ExpoAndroidPip.hello()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
