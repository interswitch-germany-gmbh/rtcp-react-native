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

This module uses the [@react-native-community/push-notification-ios](https://github.com/react-native-push-notification-ios/push-notification-ios) module for iOS. Here is what's required to set it up. On issues please look for updated instructions on its website.

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
  Modify the file `/ios/<yourReactNativeProject>/AppDelegate.h`

  ```obj-c
  // --> add this to the top of the file
  #import <UserNotifications/UNUserNotificationCenter.h>
  ```

  ```obj-c
  // --> add 'UNUserNotificationCenterDelegate' in this line
  @interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, UNUserNotificationCenterDelegate>
  ```

  Modify the file `/ios/<yourReactNativeProject>/AppDelegate.m`

  ```obj-c
  // --> add this to the top of the file
  #import <UserNotifications/UserNotifications.h>
  #import <RNCPushNotificationIOS.h>
  ```

  ```obj-c
  // - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
  // {
  //   ...
    // --> add the following two lines before "return YES;" in the "didFinishLaunchingWithOptions" method
    UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
    center.delegate = self;
  //
  //   return YES;
  // }  
  ```

  ```obj-c
  // --> add these lines before "@end" at the end of the file

  // Called when a notification is delivered to a foreground app.
  -(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
  {
    completionHandler(UNNotificationPresentationOptionSound | UNNotificationPresentationOptionAlert | UNNotificationPresentationOptionBadge);
  }

  // Required for the register event.
  - (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
  {
  [RNCPushNotificationIOS didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
  }
  // Required for the notification event. You must call the completion handler after handling the remote notification.
  - (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
  fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
  {
    [RNCPushNotificationIOS didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
  }
  // Required for the registrationError event.
  - (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
  {
  [RNCPushNotificationIOS didFailToRegisterForRemoteNotificationsWithError:error];
  }
  // Required for localNotification event
  - (void)userNotificationCenter:(UNUserNotificationCenter *)center
  didReceiveNotificationResponse:(UNNotificationResponse *)response
          withCompletionHandler:(void (^)(void))completionHandler
  {
    [RNCPushNotificationIOS didReceiveNotificationResponse:response];
  }

  // @end
  ```

In order to make extended features, like Rich Push and Delivery Receipt, working, you need to set up the *Notification Service Extension* in your project:

- Add a Notification Service Extension:
  - Open your .xcworkspace. In the menu select *File -> New -> Target...*
  - Choose *Notification Service Extension*
  - For *Product Name* enter: `RTCPNotificationServiceExtension`
  - Ensure `Swift` is selected as *Language*
  - Choose *Finish* and at the following popup dialog do not activate the scheme, click *Cancel* instead
  - Select the new target `RTCPNotificationServiceExtension` in the project and targets list, go to *General*. Under *Deployment Info* choose `iOS 10.0`
  - In *Project Explorer* open `RTCPNotificationServiceExtension/NotificationService.swift` and replace its entire content with:

    ```swift
    import UserNotifications
    import RTCP

    class NotificationService: UNNotificationServiceExtension {
        override func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
            RTCP.didReceive(request, withContentHandler: contentHandler)
        }

        override func serviceExtensionTimeWillExpire() {
            RTCP.serviceExtensionTimeWillExpire()
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
- Add the RTCP Pod libary to the Notification Service Extension
  - Add this to the end of your Podfile at `/ios/Podfile`:

    ```ruby
    target 'RTCPNotificationServiceExtension' do
      pod 'RTCP', path: '../node_modules/rtcp-react-native'
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

```javascript
import RTCP from 'rtcp-react-native';

// do this outside of any component
RTCP.init({
  appID: '1234567890abcdef'
});
```

> ❗ Make sure to initialize this module **outside of any component** (even `App`) or handlers will not be triggered correctly. Best is to do this at top level of your main application file.
