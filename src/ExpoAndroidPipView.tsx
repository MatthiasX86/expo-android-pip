import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoAndroidPipViewProps } from './ExpoAndroidPip.types';

const NativeView: React.ComponentType<ExpoAndroidPipViewProps> =
  requireNativeViewManager('ExpoAndroidPip');

export default function ExpoAndroidPipView(props: ExpoAndroidPipViewProps) {
  return <NativeView {...props} />;
}
