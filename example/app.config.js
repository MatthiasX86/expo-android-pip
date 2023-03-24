// import * as dotenv from "dotenv"

// dotenv.config()

export default {
  expo: {
    name: "media-player-poc",
    slug: "media-player-poc",
    owner: "ligonier",
    currentFullName: "@ligonier/media-player-poc",
    originalFullName: "@ligonier/media-player-poc",
    version: "1.0.0",
    orientation: "portrait",
    privacy: "hidden",
    icon: "./assets/images/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    runtimeVersion: {
      policy: "appVersion",
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "org.ligonier.mediaplayerpoc",
      infoPlist: {
        UIBackgroundModes: ["audio"],
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "org.ligonier.mediaplayerpoc",
    },
    updates: {
      enabled: true,
      checkAutomatically: "ON_LOAD",
      fallbackToCacheTimeout: 15000,
      url: "https://u.expo.dev/02a7a93d-57c9-4d9b-ab1c-d61796251363",
    },
    extra: {
      eas: {
        projectId: "02a7a93d-57c9-4d9b-ab1c-d61796251363",
      },
    },
  }
}