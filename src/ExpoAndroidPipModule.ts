import { Platform, requireNativeModule } from "expo-modules-core";

type ModuleExport = { activate: () => void } | undefined;

let DefaultExport: ModuleExport = undefined;

switch (Platform.OS) {
  case "ios":
    break;
  case "android":
    // It loads the native module object from the JSI or falls back to
    // the bridge module (from NativeModulesProxy) if the remote debugger is on.
    DefaultExport = requireNativeModule("ExpoAndroidPip");
    break;
}

export default DefaultExport;
