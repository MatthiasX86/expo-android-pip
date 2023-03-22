import { StyleSheet, Text, View } from 'react-native';

import * as ExpoAndroidPip from 'expo-android-pip';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ExpoAndroidPip.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
