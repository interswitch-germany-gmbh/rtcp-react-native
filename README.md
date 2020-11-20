# rtcp-react-native

© Interswitch Germany GmbH

- [About](#about)
- [Installation](#installation)
  - [Android Setup](#android-setup)
  - [iOS Setup](#ios-setup)
- [Usage](#usage)
- [Reference - Core module](#reference---core-module)
  - [Configuration](#configuration)
  - [Methods](#methods)
  - [Events](#events)
- [Reference - Inbox module](#reference---inbox-module)
  - [Configuration](#configuration-1)

## About

This is a React Native module for integrating Push Notifications with Interswitch's [RTCP Platform](https://rtcp.vanso.com)

## Installation

- Add the module to your React Native app (as yet requires access to the private repository):

  ```sh
  # using yarn
  yarn add https://<your_organization_user>@github.com/interswitch-germany-gmbh/rtcp-react-native.git

  # using npm
  npm install https://<your_organization_user>@github.com/interswitch-germany-gmbh/rtcp-react-native.git
  ```

- Add all required peerDependencies:

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

This module uses the [react-native-push-notification](https://github.com/zo0r/react-native-push-notification) module. Here is what's required to set it up. On issues please look for updated instructions on its website.

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

### iOS Setup

This module uses the [@react-native-community/push-notification-ios](https://github.com/react-native-push-notification-ios/push-notification-ios) module for iOS. Setup slightly differs from their instructions.

- Adjust your `/ios/Podfile` to create module headers for *push-notification-ios*:
  
  ```ruby
  ...
  target '<yourReactNativeProject>' do
    ...
    # add this line
    pod 'RNCPushNotificationIOS', :path => '../node_modules/@react-native-community/push-notification-ios', :modular_headers => true
    ...
  ```
- Install the required Pods in your iOS project by running:

  ```sh
  npx pod-install

  # alternatively run this:
  cd ios && pod install
  ```

- Open your .xcworkspace in XCode. Add the following capabilities under "Signing & Capabilities":
  - *Background Modes*, then tick *Remote notifications*
  - *Push Notifications*
- Augment your Appdelegate  
  - Modify the file `/ios/<yourReactNativeProject>/AppDelegate.h`

    ```obj-c
    // --> add this to the top of the file
    #import <UserNotifications/UNUserNotificationCenter.h>
    ```

    ```obj-c
    // --> add ', UNUserNotificationCenterDelegate' to protocols in this line
    @interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, UNUserNotificationCenterDelegate>
    ```

  - Modify the file `/ios/<yourReactNativeProject>/AppDelegate.m`

    ```obj-c
    // --> add this to the top of the file
    #import <UserNotifications/UserNotifications.h>
    @import RTCP;
    ```

    ```obj-c
    // - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
    // {
    //   ...
      // --> add the following two lines before "return YES;" in the "didFinishLaunchingWithOptions" method
      [RTCP didFinishLaunchingWithOptions:launchOptions];
      UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
      center.delegate = self;
    //
    //   return YES;
    // }  
    ```

    ```obj-c
    // --> add these lines (before "@end" at the end of the file)
    - (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
        [RTCP didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
      }

    - (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
      [RTCP didFailToRegisterForRemoteNotificationsWithError:error];
    }

    - (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult result))completionHandler {
      [RTCP didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
    }
    // @end
    ```

In order to enable extended features like Rich Push and Delivery Receipt you need to set up a *Notification Service Extension* in your project:

- Add a Notification Service Extension:
  - Open your .xcworkspace. In the menu select *File -> New -> Target...*
  - Choose *Notification Service Extension*
  - For *Product Name* enter: `RTCPNotificationServiceExtension`
  - Ensure `Swift` is selected as *Language*
  - Choose *Finish*. At the following popup dialog do not activate the scheme, click *Cancel* instead
  - Select the new target `RTCPNotificationServiceExtension` in the *Project and Targets list*, go to *General*. Under *Deployment Info* choose: `iOS 10.0`
  - In *Project Explorer* open `RTCPNotificationServiceExtension/NotificationService.swift` and replace its entire content with:

    ```swift
    import UserNotifications
    import RTCP

    class NotificationService: UNNotificationServiceExtension {
        override func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
            RTCPExt.didReceive(request, withContentHandler: contentHandler)
        }

        override func serviceExtensionTimeWillExpire() {
            RTCPExt.serviceExtensionTimeWillExpire()
        }
    }
    ```

- Add an App Group to both the extension and the main app:
  - Under *TARGETS* select your main app and go to *Signing & Capabilities*
  - Add the capability *App Group*
  - Under the appearing *App Groups* add an App Group with the following name:

    ```text
    group.<your_bundle_id>.rtcp
    ```

    Hint: your bundle ID is shown right above under *Signing -> Bundle Identifier*

  - Under *TARGETS* now select the Extension `RTCPNotificationServiceExtension`
  - Add the capability *App Group* here as well
  - Under the shown list of *App Groups* tick the very same app group created above
- Add the RTCP library Pod to the Notification Service Extension
  - Add this to the end of your Podfile at `/ios/Podfile`:

    ```ruby
    target 'RTCPNotificationServiceExtension' do
      pod 'RTCP/RTCPExt', path: '../node_modules/rtcp-react-native'
    end
    ```

  - Have cocoapods install the Pod in the new target:

    ```sh
    npx pod-install

    # alternatively run this:
    cd ios && pod install
    ```

## Usage

Import and initialize the module in your application's main file:

> ❗ Make sure to initialize this module **outside of any component** (even `App`) or handlers will not be triggered correctly. Best is to do this at the top level of your main application file.

```javascript
import RTCP from 'rtcp-react-native';

// do this outside of any component
RTCP.init({
  appID: '1234567890abcdef' // <-- mandatory parameter
  production: false
});
```

If you want to use the integrated Inbox, you also need to initialize it and ensure this happens *after* the main initialization has finished:

```javascript
RTCP.init({
  appID: '1234567890abcdef'
  // ... possibly more options
}).then(() =>
  RTCPInbox.init({
    inboxSize: 25
  }),
);
```

## Reference - Core module

### Configuration

* **`appID`** *(String) - mandatory*  
The 16 characters hash string of your application in RTCP

* **`production`** *(Boolean) - optional, default: `false`*  
Whether to connect to RTCP Staging or Production

* **`enableLogging`** *(Boolean) - optional, default: `true`*  
If true, log actions to console.log

* **`clearOnStart`** *(Boolean) - optional, default: `true`*  
Remove all notifications from the OS's notification center when the app is opened.

* **`channelName`** *(String) - optional, default: `"Push Notifications"` - Android only*  
Currently, RTCP only supports one single notification channel for Android. You can define the name of the notification channel as is appears in Androids Notification Settings for your app

### Methods

- **`async init(options)`**  
  Initializes the rtcp-react-native module with the provided `options`.
  Besides general module configuration, this sets up your app to receive push notifications and registers your device with RTCP.  
  This method needs to be called outside of any component (even `App`)!  
  *Parameters*  
  - `options` *(Object)* - (hash) object containing module configuration (see *Configuration*)

- **`async sendReadReceipt(push_ids)`**  
  Sets the status of `push_ids` to "read" on the RTCP server.  
  *Parameters*
  - `push_ids` *(String / Array(String))* - one or more push_ids

- **`async getRecentNotifications(count = 10)`**  
  Get the `count` most recent notifications from the RTCP server.  
  *Parameters*  
  - `count` *(Number)* - number of notifications to fetch

  *Return Value*  
  - Array of notifications (see RTCP docs for details)

- **`registerEventHandler(event, handler)`**  
  Register a `handler` function to be called when `event` is emitted.  
  *Parameters*
  - `event` *(String)* - event to be registered for
  - `handler` *(Function)* - function to be called

- **`unregisterEventHandler(event, handler)`**  
  Removes a `handler` function from the `event` list.  
  *Parameters*
  - `event` *(String)* - event for which to be removed
  - `handler` *(Function)* - function to be removed

### Events
- **`"onRemoteNotification": (notification)`**  
  Called whenever a push notification is received from the RTCP server.  
  *Function parameters*  
  - `notification` *(Object)* - the received push notification as described in *zo0r/react-native-push-notification*

- **`"onNotificationTapped": (notification)`**  
  Called when the app is opened by the user having tapped a notification in the OS's notification center.  
  *Function parameters*  
  - `notification` *(Object)* - the received push notification as described in *zo0r/react-native-push-notification*

- **`"onRegister"`**  
  Called when the app has successfully been registered with the RTCP server.

## Reference - Inbox module

### Configuration

- **`enableBadge`** *(Boolean) - optional, default: `true`*  
  Show a badge with the count of unread messages on the app's icon (on Android this does not work with all launch center variants and settings).

- **`inboxSize`** *(Number) - optional, default: `25`*  
  The maximum size of inbox entries. This defines how many entries are stored locally on the phone and fetched from the server.

- **`syncOnAppstart`** *(Boolean) - optional, default: `false`*  
  If `true` the inbox gets synced from the server when the app is opened. Usually, this is not required, since push notifications are added to the local inbox as they come in.  
  Note that in order to reduce server load, the inbox is only synced if the last sync was longer than 10 seconds ago.
