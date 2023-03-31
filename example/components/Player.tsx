import React, { useEffect, useRef, useState } from "react";
import {
  TouchableWithoutFeedback,
  TouchableHighlight,
  ImageBackground,
  PanResponder,
  StyleSheet,
  SafeAreaView,
  Image,
  View,
  Text,
  Dimensions,
  PanResponderInstance,
} from "react-native";
import Video, {
  OnLoadData,
  OnProgressData,
  OnSeekData,
} from "react-native-video";
// import { LoadingIndicator } from './LoadingIndicator';

const SCREEN_WIDTH = Dimensions.get("screen").width;
const SCREEN_HEIGHT = Dimensions.get("screen").height;
const SCRUBBER_TOLERANCE = 100;

const bufferConfig = {
  minBufferMs: 100,
  maxBufferMs: 50000,
  bufferForPlaybackMs: 100,
  bufferForPlaybackAfterRebufferMs: 100,
};

interface Props {
  start: number;
  onFinished: () => void;
}

export const VideoPlayer: React.FC<Props> = function ({ start, onFinished }) {
  const [loading, setLoading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [seekerPosition, setSeekerPosition] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [duration, setDuration] = useState(0);
  const [scrubbing, setScrubbing] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const [isPip, setIsPip] = useState(false);

  const seekerWidth = useRef(0);
  const primaryRef = useRef<Video>(null);
  const seekPanResponder = useRef<PanResponderInstance>();

  const onLoadStart = () => {
    setLoading(true);
    if (start) {
      seek(start);
    }
  };

  const onLoadHandler = (data: OnLoadData) => {
    setDuration(data.duration);
    setLoading(false);
  };

  const onError = () => {
    setHasError(true);
    setLoading(false);
  };

  const setPosition = (position: number) => {
    const newPosition = Math.max(0, Math.min(seekerWidth.current, position));
    setSeekerPosition(newPosition);
    return newPosition;
  };

  const onProgress = (data: OnProgressData) => {
    setCurrentTime(data.currentTime);
    if (!scrubbing) {
      setPosition(seekerWidth.current * (data.currentTime / duration));
    }
  };

  const onSeek = (data: OnSeekData) => {
    setSeeking(false);
    setCurrentTime(data.currentTime);

    // Scrubbing ended while waiting for seek to finish

    if (!scrubbing) {
      setIsPaused(userPaused);
    }
  };

  const seek = (time: number) => {
    primaryRef.current?.seek(time, SCRUBBER_TOLERANCE);
  };

  useEffect(() => {
    seekPanResponder.current = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: (event, _gestureState) => {
        setPosition(event.nativeEvent.locationX);

        setIsPaused(true);
        setScrubbing(true);
      },

      onPanResponderMove: (event, _gestureState) => {
        const newPosition = setPosition(event.nativeEvent.locationX);

        if (seeking) {
          return;
        }

        const newTime = duration * (newPosition / seekerWidth.current);

        const timeDifference = Math.abs(currentTime - newTime) * 1000;
        if (timeDifference >= SCRUBBER_TOLERANCE) {
          setSeeking(true);
          setTimeout(() => seek(newTime), 1);
        }
      },

      onPanResponderRelease: (event, _gestureState) => {
        setScrubbing(false);
        const newPosition = setPosition(event.nativeEvent.locationX);

        // Drag to end

        const newTime = duration * (newPosition / seekerWidth.current);
        if (newTime === duration) {
          setIsPaused(true);
          onFinished();
          return;
        }

        // Pending seek

        if (seeking) {
          return;
        }

        // Set final seek position

        seek(newTime);
        setIsPaused(userPaused);
      },
    });
  });

  const renderControl = (
    children: JSX.Element | JSX.Element[],
    onPress: null | (() => void),
    style = {}
  ) => {
    return (
      <TouchableHighlight
        underlayColor="transparent"
        activeOpacity={0.3}
        onPress={() => {
          onPress?.();
        }}
        style={[styles.controls.control, style]}
      >
        {children}
      </TouchableHighlight>
    );
  };

  const renderBack = () => {
    return (
      <View style={[styles.controls.top]}>
        <ImageBackground
          source={require("../assets/top-vignette.png")}
          style={[styles.controls.column]}
          imageStyle={styles.controls.vignette}
        >
          <SafeAreaView style={styles.controls.topControlGroup}>
            {renderControl(
              <Image source={require("../assets/back.png")} />,
              () => onFinished()
            )}
            <View style={styles.controls.pullRight} />
          </SafeAreaView>
        </ImageBackground>
      </View>
    );
  };

  const renderScrubber = () => {
    if (loading) {
      // return <LoadingIndicator loading />;
      return <Text>Loading...</Text>;
    }

    const timerControl = renderTimer();
    const seekbarControl = renderSeekbar();
    const playPauseControl = renderPlayPause();
    const PipControl = renderControl(
      <Text style={{ color: "red" }}>Pip</Text>,
      () => {
        console.log("we are changing the state...", isPip);
        setIsPip(!isPip);
      },
      styles.controls.playPause
    );

    return (
      <View style={[styles.controls.bottom]}>
        <ImageBackground
          source={require("../assets/bottom-vignette.png")}
          style={[styles.controls.column]}
          imageStyle={[styles.controls.vignette]}
        >
          {seekbarControl}
          <SafeAreaView
            style={[styles.controls.row, styles.controls.bottomControlGroup]}
          >
            {playPauseControl}
            {PipControl}
            {timerControl}
          </SafeAreaView>
        </ImageBackground>
      </View>
    );
  };

  const renderSeekbar = () => {
    return (
      <View
        style={styles.seekbar.container}
        collapsable={false}
        {...seekPanResponder.current?.panHandlers}
      >
        <View
          style={styles.seekbar.track}
          onLayout={(event) =>
            (seekerWidth.current = event.nativeEvent.layout.width)
          }
          pointerEvents={"none"}
        >
          <View
            style={[
              styles.seekbar.fill,
              {
                width: seekerPosition,
              },
            ]}
            pointerEvents={"none"}
          />
        </View>
        <View
          style={[styles.seekbar.handle, { left: seekerPosition }]}
          pointerEvents={"none"}
        >
          <View
            style={[styles.seekbar.circle, { backgroundColor: "#ffffff" }]}
            pointerEvents={"none"}
          />
        </View>
      </View>
    );
  };

  const renderPlayPause = () => {
    let image =
      isPaused === true
        ? require("../assets/play.png")
        : require("../assets/pause.png");

    const toggle = () => {
      setIsPaused(!isPaused);
      setUserPaused(!isPaused);
    };

    return renderControl(
      <Image source={image} />,
      toggle,
      styles.controls.playPause
    );
  };

  const formatTime = (time: number) => {
    time = Math.min(Math.max(time, 0), duration);
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  const renderTimer = () => {
    const time = formatTime(currentTime);
    return renderControl(
      <Text allowFontScaling={false} style={styles.controls.timerText}>
        {time}
      </Text>,
      null,
      styles.controls.timer
    );
  };

  const renderError = () => {
    if (!hasError) {
      return null;
    }

    return (
      <View style={styles.error.container}>
        <Image
          source={require("../assets/error-icon.png")}
          style={styles.error.icon}
        />
        <Text allowFontScaling={false} style={styles.error.text}>
          Video unavailable
        </Text>
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback style={styles.player.container}>
      <View style={styles.player.container}>
        <Video
          source={{
            uri: "https://cdn81168665.blazingcdn.net/timeline/hartley-e001-s001a-01-2b6d4c/stream/index.m3u8",
          }}
          ref={primaryRef}
          resizeMode={"contain"}
          paused={isPaused}
          muted={false}
          rate={1.0}
          pictureInPicture={isPip}
          onLoadStart={onLoadStart}
          onProgress={onProgress}
          onError={onError}
          onLoad={onLoadHandler}
          onEnd={onFinished}
          onSeek={onSeek}
          onPictureInPictureStatusChanged={() => {
            console.log("test");
          }}
          onRestoreUserInterfaceForPictureInPictureStop={() => {
            console.log("test");
          }}
          style={styles.player.video}
          progressUpdateInterval={250}
          ignoreSilentSwitch={"ignore"}
          automaticallyWaitsToMinimizeStalling={false}
          onAudioBecomingNoisy={() => setIsPaused(true)}
          bufferConfig={bufferConfig}
        />
        {renderError()}
        {renderBack()}
        {renderScrubber()}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = {
  player: StyleSheet.create({
    container: {
      overflow: "hidden",
      backgroundColor: "#000",
      flex: 1,
      alignSelf: "stretch",
      justifyContent: "space-between",
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    },
    video: {
      overflow: "hidden",
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      opacity: 1,
    },
  }),
  error: StyleSheet.create({
    container: {
      backgroundColor: "rgba( 0, 0, 0, 0.5 )",
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      justifyContent: "center",
      alignItems: "center",
    },
    icon: {
      marginBottom: 16,
    },
    text: {
      backgroundColor: "transparent",
      color: "#f27474",
    },
  }),
  loader: StyleSheet.create({
    container: {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      alignItems: "center",
      justifyContent: "center",
    },
  }),
  controls: StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    column: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
    },
    vignette: {
      resizeMode: "stretch",
    },
    control: {
      padding: 16,
    },
    text: {
      backgroundColor: "transparent",
      color: "#ffffff",
      fontSize: 14,
      textAlign: "center",
    },
    pullRight: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    top: {
      flex: 1,
      alignItems: "stretch",
      justifyContent: "flex-start",
    },
    bottom: {
      alignItems: "stretch",
      flex: 2,
      justifyContent: "flex-end",
    },
    topControlGroup: {
      alignSelf: "stretch",
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      margin: 12,
      marginBottom: 18,
    },
    bottomControlGroup: {
      alignSelf: "stretch",
      alignItems: "center",
      justifyContent: "space-between",
      marginLeft: 12,
      marginRight: 12,
      marginBottom: 0,
    },
    playPause: {
      position: "relative",
      width: 80,
      zIndex: 0,
    },
    timer: {
      width: 80,
    },
    timerText: {
      backgroundColor: "transparent",
      color: "#ffffff",
      fontSize: 11,
      textAlign: "right",
    },
  }),
  seekbar: StyleSheet.create({
    container: {
      alignSelf: "stretch",
      height: 28,
      marginLeft: 20,
      marginRight: 20,
    },
    track: {
      backgroundColor: "#333",
      height: 12,
      position: "relative",
      top: 7,
      width: "100%",
      borderRadius: 5,
    },
    fill: {
      backgroundColor: "#666666",
      height: 12,
      width: "100%",
      borderBottomStartRadius: 5,
      borderTopStartRadius: 5,
    },
    handle: {
      position: "absolute",
      marginLeft: -7,
      height: 28,
      width: 28,
    },
    circle: {
      borderRadius: 12,
      position: "relative",
      top: 5,
      left: 5,
      height: 18,
      width: 18,
    },
  }),
};

export default VideoPlayer;

// Based on https://github.com/itsnubix/react-native-video-controls, MIT Licensed, Copyright (c) 2016 Nubix Inc.
