# rtcp-react-native

© Interswitch Germany GmbH

## About

This is a React Native module for integrating Push Notifications with Interswitch's [RTCP Platform](https://rtcp.vanso.com)

## Installation

Add the module to your React Native app (as yet requires access to the private repository):

```sh
# using yarn
yarn add https://<your_organization_user>@github.com/interswitch-germany-gmbh/rtcp-react-native.git

# using npm
npm install https://<your_organization_user>@github.com/interswitch-germany-gmbh/rtcp-react-native.git
```

Add all required peerDependencies:

```sh
# using yarn
yarn add react-native-device-info react-native-push-notification react-native-default-preference @react-native-community/push-notification-ios
# using npm
npm install react-native-device-info react-native-push-notification react-native-default-preference @react-native-community/push-notification-ios
```

### Android Setup

Set up your app for use with Google Firebase Cloud Messaging. See the [official documentation](https://firebase.google.com/docs/cloud-messaging/android/client) on how to do this. Here's a short summary:

- Sign in to [Firebase Console](console.firebase.google.com), create a Firebase project and register your app.
- Download the `google-services.json` file and put it into the folder `/android/app/` of your React Native app.
- Follow the Gradle instructions to integrate the Firebase SDK
  - Add the Google Services Gradle plugin to your app

    in `/android/build.gradle`:

    ```gradle
    buildscript {
    ...
        dependencies {
            ...
            // Add the following line:
            classpath 'com.google.gms:google-services:4.3.4'  // Google Services plugin
    ```

  - Apply the Google Services Gradle plugin and declare the dependency for the Firebase Cloud Messaging Android library

    in `/android/app/build.gradle`:
    ```gradle
    ...
    // Add the following line:
    apply plugin: 'com.google.gms.google-services'  // Google Services plugin
    ...
    dependencies {
        ...
        // Import the BoM for the Firebase platform
        implementation platform('com.google.firebase:firebase-bom:26.0.0')

        // Declare the dependencies for the Firebase Cloud Messaging and Analytics libraries
        // When using the BoM, you don't specify versions in Firebase library dependencies
        implementation 'com.google.firebase:firebase-messaging'
        implementation 'com.google.firebase:firebase-analytics'
    ```

Follow the remaining [instructions](https://github.com/zo0r/react-native-push-notification#android-manual-installation) on how to set up the `react-native-push-notification` module.

- Enable the service extension for message handling:

  in `android/app/src/main/AndroidManifest.xml`:

  ```xml
  <manifest ...
      ...
      <application ...
      ...
          <!-- add this section -->
          <service
              android:name="com.dieam.reactnativepushnotification.modules.RNPushNotificationListenerService"
              android:exported="false" >
              <intent-filter>
                  <action android:name="com.google.firebase.MESSAGING_EVENT" />
              </intent-filter>
          </service>
  ```

## Usage

Import and initialize the module in your application's main file:

```javascript
import RTCP from 'rtcp-react-native';

// do this outside of any component
RTCP.init({
  appID: '1234567890abcdef'
});
```

> ❗ Make sure to initialize this module **outside of any component** (even `App`) or handlers will not be triggered correctly. Best is to do this at top level of you main application file.
