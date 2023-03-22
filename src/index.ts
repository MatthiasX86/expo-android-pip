import ExpoAndroidPipModule from "./ExpoAndroidPipModule";

// Get the native constant value.
export const PI = ExpoAndroidPipModule.PI;

export function hello(): string {
  return ExpoAndroidPipModule.activate();
}
