import ExpoAndroidPipModule from "./ExpoAndroidPipModule";

export function hello(): string {
  return ExpoAndroidPipModule.activate();
  // return ExpoAndroidPipModule.getDeviceVersion();
  // return ExpoAndroidPipModule.getActivity();
}
