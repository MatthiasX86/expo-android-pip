import ExpoAndroidPipModule from "./ExpoAndroidPipModule";

export function enterPipMode() {
  if (!ExpoAndroidPipModule) {
    return;
  }

  return ExpoAndroidPipModule.activate();
}
