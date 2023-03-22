package expo.modules.androidpip

import android.app.Activity
import expo.modules.core.interfaces.Package
import expo.modules.core.interfaces.ReactActivityLifecycleListener

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoAndroidPipModule : Module() {
//  override fun createReactActivityLifecycleListeners(activityContext: Context): List<ReactActivityLifecycleListener> {
//    return listOf(MyLibReactActivityLifecycleListener())
//  }
  override fun definition() = ModuleDefinition {
    Name("ExpoAndroidPip")
    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("activate") {
      val activity = appContext.activityProvider?.currentActivity
      val applicationContext = activity?.applicationContext
      
      if (applicationContext != null) {
        activity.setPictureInPictureParams()
      }
    }
  }
}
