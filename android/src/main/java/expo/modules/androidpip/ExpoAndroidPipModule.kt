package expo.modules.androidpip

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoAndroidPipModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoAndroidPip")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("activate") { "Hello world!!!! 👋" }
  }
}
