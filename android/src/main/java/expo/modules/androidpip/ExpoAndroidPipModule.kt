package expo.modules.androidpip
import android.Manifest
import android.app.Activity

import android.app.PictureInPictureParams
import android.graphics.Rect
import android.os.Build
import android.util.Log
import android.util.Rational
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoAndroidPipModule: Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoAndroidPip")
    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("activate") {

      PipController().activate(appContext)
    }

    Function("getDeviceVersion") {
      PipController().getDeviceVersion()
    }

//    Function("isSupported") {
//      getPackageManager().hasSystemFeature(PackageManager.FEATURE_PICTURE_IN_PICTURE)
//    }
    Function("getActivity") {
      return@Function appContext.activityProvider?.currentActivity.toString()
    }
  }
}

class PipController: Activity() {
  val ratio = Rational(16, 9)
  val rect = Rect()

  fun getDeviceVersion(): Int {
    return Build.VERSION.SDK_INT
  }
  fun activate(appContext: AppContext) {
    // https://developer.android.com/studio/releases/platforms
    Log.d("xfhei - a", Build.VERSION.SDK_INT.toString())
    Log.d("xfhei - b", Build.VERSION_CODES.S.toString())

    val activity = appContext.activityProvider?.currentActivity
    val applicationContext = activity?.applicationContext

    Log.d("xfhei - c", applicationContext.toString())

    if (applicationContext != null) {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) { // version 12 or newer

        val params = PictureInPictureParams
                .Builder()
                .setAspectRatio(ratio)
                .setAutoEnterEnabled(true)
                .build()

        Log.d("xfhei - c", params.toString())

        activity.setPictureInPictureParams(params)

        activity.enterPictureInPictureMode(params)
      } else if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) { // version 8 - 12
        Log.d("PIP - ver 8 - 11", Build.VERSION.SDK_INT.toString())
        val params = PictureInPictureParams
                .Builder()
                .setAspectRatio(ratio)
                .setSourceRectHint(rect)
                .build()

        activity.enterPictureInPictureMode(params)
      } else if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) { // version 7 or older
        Log.d("PIP - ver below 8", Build.VERSION.SDK_INT.toString())
        activity.enterPictureInPictureMode()
      }
    }
  }
}

