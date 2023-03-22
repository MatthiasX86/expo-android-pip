import * as React from 'react';

import { ExpoAndroidPipViewProps } from './ExpoAndroidPip.types';

export default function ExpoAndroidPipView(props: ExpoAndroidPipViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
