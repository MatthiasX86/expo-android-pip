import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoAndroidPip.web.ts
// and on native platforms to ExpoAndroidPip.ts
import ExpoAndroidPipModule from './ExpoAndroidPipModule';
import ExpoAndroidPipView from './ExpoAndroidPipView';
import { ChangeEventPayload, ExpoAndroidPipViewProps } from './ExpoAndroidPip.types';

// Get the native constant value.
export const PI = ExpoAndroidPipModule.PI;

export function hello(): string {
  return ExpoAndroidPipModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoAndroidPipModule.setValueAsync(value);
}

const emitter = new EventEmitter(ExpoAndroidPipModule ?? NativeModulesProxy.ExpoAndroidPip);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ExpoAndroidPipView, ExpoAndroidPipViewProps, ChangeEventPayload };
