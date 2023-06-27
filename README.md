# rtcp-react-native

© Interswitch Germany GmbH

- [About](#about)
- [Requirements](#requirements)
- [Installation](#installation)
  - [Android Setup](#android-setup)
  - [iOS Setup](#ios-setup)
- [Usage](#usage)
  - [Deep Linking](#deep-linking)
  - [Inbox Module](#inbox-module)
  - [Inbox List Component](#inbox-list-component)
    - [Customization](#customization)
  - [Ads Components](#ads-components)
- [Reference - Core Module](#reference---core-module)
  - [Configuration](#configuration)
  - [Methods](#methods)
  - [Events](#events)
  - [Advanced Methods](#advanced-methods)
- [Reference - Inbox Module](#reference---inbox-module)
  - [Configuration](#configuration-1)
  - [Methods](#methods-1)
  - [Events](#events-1)
- [Reference - Inbox Components](#reference---inbox-components)
  - [RTCPInboxList](#rtcpinboxlist)
  - [RTCPNotification](#rtcpnotification)
  - [RTCPNotificationBack](#rtcpnotificationback)
- [Reference - Ads Components](#reference---ads-components)
  - [RTCPAdImage](#rtcpadimage)
  - [RTCPAdsCarousel](#rtcpadscarousel)
- [Troubleshooting](#troubleshooting)
  - [Runtime permission introduced in Android 13](#runtime-permission-introduced-in-android-13)

## About

This is a React Native module for integrating Push Notifications with Interswitch's [RTCP Platform](https://rtcp.vanso.com)

## Requirements

- React-Native >= 0.60
- iOS:
  - iOS >= 10  
    Why: with iOS 10 notification handling has been majorly reworked by Apple to e.g. support media attachments
  - Cocoapods
  - Compilation of Swift code. If your app fails compiling with errors like "Could not find auto-linked library 'swiftFoundation'", add an empty dummy Swift file (see [here](https://stackoverflow.com/a/54586937/12079891) for instructions).

## Installation

- Add the module to your React Native app:

  ```sh
  # using yarn
  yarn add github:interswitch-germany-gmbh/rtcp-react-native

  # using npm
  npm install github:interswitch-germany-gmbh/rtcp-react-native
  ```

  To install and bind to a specific version add the version tag as hash:

  ```sh
  yarn add github:interswitch-germany-gmbh/rtcp-react-native#2.0.0
  ```

- Add all required peerDependencies, as they're not installed automatically ([why?](https://github.com/react-native-community/cli/issues/914#issuecomment-574759432)):

  ```sh
  # using yarn
  yarn add react-native-device-info react-native-push-notification react-native-default-preference @react-native-community/push-notification-ios

  # using npm
  npm install react-native-device-info react-native-push-notification react-native-default-preference @react-native-community/push-notification-ios
  ```

### Android Setup

Set up your app for use with Google Firebase Cloud Messaging. See the [official documentation](https://firebase.google.com/docs/cloud-messaging/android/client) on how to do this. Here's a short summary:

- If not done for your app already, sign in to [Firebase Console](console.firebase.google.com), create a Firebase project and register your app.
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
      <!-- required for API Level >= 33 (Android 13) -->
      <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
      ...
      <application ...
      ...
          <!-- add this section -->
          <service android:name="com.dieam.reactnativepushnotification.modules.RNPushNotificationListenerService" android:exported="false" >
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
  
  Objective-C (most common):
  - Modify the file `/ios/<yourReactNativeProject>/AppDelegate.h`

    ```obj-c
    // --> add this to the top of the file
    #import <UserNotifications/UNUserNotificationCenter.h>
    ```

    For RN v0.71 and above:

    ```obj-c
    // --> add ' <UNUserNotificationCenterDelegate>' to this line
    @interface AppDelegate : RCTAppDelegate <UNUserNotificationCenterDelegate>
    ```

    For RN v0.70 and below:

    ```obj-c
    // --> add ', UNUserNotificationCenterDelegate' to protocols in this line
    @interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, UNUserNotificationCenterDelegate>
    ```

  - Modify the file `/ios/<yourReactNativeProject>/AppDelegate.m` or `/ios/<yourReactNativeProject>/AppDelegate.mm`

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
    - (void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler {
        completionHandler(UNNotificationPresentationOptionSound | UNNotificationPresentationOptionAlert | UNNotificationPresentationOptionBadge);
      }

    - (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
        [RTCP didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
      }

    - (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
      [RTCP didFailToRegisterForRemoteNotificationsWithError:error];
    }

    - (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult result))completionHandler {
      [RTCP didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
    }

    - (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)(void))completionHandler {
      [RTCP didReceiveNotificationResponse:response withCompletionHandler:completionHandler];
    }
    // @end
    ```

  Swift - if you migrated your AppDelegate to Swift:
  - Modify the file `/ios/<yourReactNativeProject>/AppDelegate.swift`

    ```swift
    // --> add this to the top of the file
    @import RTCP
    ```

    ```swift
    // --> add ', UNUserNotificationCenterDelegate' to protocols in this line
    class AppDelegate: UIResponder, UIApplicationDelegate, UNUserNotificationCenterDelegate {
    ```

    ```swift
    // func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    //   ...
      // --> add the following two lines before "return true" in the "didFinishLaunchingWithOptions" application method
      RTCP.didFinishLaunching(withOptions: [UIApplication.LaunchOptionsKey: Any]())
      UNUserNotificationCenter.current().delegate = self
    //
    //   return true
    // }  
    ```

    ```swift
    // --> add these lines (before '}' (end of class) at the end of the file)
    func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data ) {
      RTCP.didRegisterForRemoteNotifications(withDeviceToken: deviceToken)
    }

    func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
      RTCP.didFailToRegisterForRemoteNotifications(withError: error)
    }

    func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable : Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
      RTCP.didReceiveRemoteNotification(userInfo, fetchCompletionHandler: completionHandler)
    }

    func userNotificationCenter(_ center: UNUserNotificationCenter, willPresent notification: UNNotification, withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
      completionHandler( [.alert, .badge, .sound])
    }

    func userNotificationCenter(_ center: UNUserNotificationCenter, didReceive response: UNNotificationResponse, withCompletionHandler completionHandler: @escaping () -> Void) {
      RTCP.didReceiveNotificationResponse(response, withCompletionHandler: completionHandler)
    }
    ```

In order to enable extended features like Rich Push and Delivery Status you need to set up a *Notification Service Extension* in your project:

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

- Add an *App Group* to both the extension and the main app:
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
- Add the RTCP library Pod to the Notification Service Extension target:
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

Import and initialize the core module in your application's main file:

> ❗ Make sure to initialize this module **before you register your root component with** `AppRegistry.registerComponent('Appname', () => App);`!

```javascript
import RTCP from 'rtcp-react-native';

// do this outside of any component
RTCP.init({
  appID: __DEV__ ? '1234567890abcdef' : 'fedcba0987654321', // <-- mandatory parameter
  production: !__DEV__
});
```

`rtcp-react-native` ships with an additional `RTCPInbox` module that manages an *In-App-Notifications-Inbox* and its synchronization with the RTCP Server for you. If you like to use the integrated inbox, initialize it and ensure this happens *after* the main initialization has finished:

```javascript
import RTCP from 'rtcp-react-native';
import RTCPInbox from 'rtcp-react-native/RTCPInbox';

RTCP.init({
  appID: __DEV__ ? '1234567890abcdef' : 'fedcba0987654321',
  production: !__DEV__,
  // ... possibly more options
}).then(() =>
  RTCPInbox.init({
    inboxSize: 25
  }),
);
```

With the rtcp-react-native module there is no difference in notification appearance if your app is in foreground or in background. Push notifications will always be shown as *heads-up notification*, even with the app in foreground.

If a user taps on a notification, you can react to that by registering to the `onNotificationTapped` event:

```js
RTCP.registerEventHandler("onNotificationTapped", (notification) => {
  // when user taps a notification, go to inbox screen
  this.props.navigation.navigate("inboxScreen")
});
```

Here is a sample notification object:

```js
{
  id: undefined,
  title: 'Notification title',
  message: 'Notification message',
  foreground: true,
  userInteraction: false,
  data:
   { remote: true,
     notificationId: 'B207A529-FFCC-48A0-8593-72B96C424C14',
     push_id: 'P1234',
     app_data: <custom rtcp push payload> },
  badge: undefined,
  soundName: 'default',
  finish: [Function: finish]
}
```

The Core Module copies all methods from `react-native-push-notification`, so all functions listed [there](https://github.com/zo0r/react-native-push-notification#local-notifications) can be used directly. Example:

```js
import RTCP from 'rtcp-react-native';

RTCP.removeAllDeliveredNotifications();
```

### Deep Linking

Deep Linking is enabled by default and can be disabled via the init parameter `deepLinking`.

When a notification containing a Deep Link is tapped, the `'url'` event is emitted the same way React Native's `Linking` class does when the app is opened via Deep Linking. 

If Deep Linking is set up in `react-navigation`, it listens to this event by default. Therefore, it will behave just like when a Deep Link is opened from a browser with no extra code being required.

To target Deep Links from the backend you need to upload a definition in JSON format that defines the paths and params. Its syntax is similar to the [`linking prop` in `react-navigation`](https://reactnavigation.org/docs/configuring-links). See below for a sample:

```json
[
   {
      "path":"myapp://quicktransfer",
      "description":"Quicktransfer",
      "params":{
         "pin":"PIN"
      }
   },
   {
      "path":"myapp://quickqr/:foo/:bar?",
      "description":"Quick QR",
      "params":{
         ":foo":"Foo Parameter",
         ":bar?":"Bar Parameter"
      }
   }
]
```

### Inbox Module

When using the Inbox Module, nothing else is usually required from the Core Module.

Integration of the inbox into your React Native screen can be done like this:

```jsx
import RTCPInbox from 'rtcp-react-native/RTCPInbox';

...

componentDidMount() {
  this.setState({ notifications: RTCPInbox.getInbox() });
  RTCPInbox.registerEventHandler("onInboxUpdate", this.updateInbox);
}

updateInbox(inbox) {
  this.setState({ notifications: inbox});
}
```

Though, instead of writing your own Component, we actually recommend using the shipped Inbox List Component below.

### Inbox List Component

`rtcp-react-native` ships with a ready-to-use list component called `RTCPInboxList` that can be integrated easily in your Inbox screen:

```jsx
import { RTCPInboxList } from "rtcp-react-native/RTCPInboxList";

export default class Notifications extends Component {
  render() {
    return (
      <View>
        <Text style={styles.myheader}>Notifications</Text>
        <RTCPInboxList />
      </View>
    )
  }
}
```

`RTCPInboxList` is based on [`SwipeListView`](https://github.com/jemise111/react-native-swipe-list-view#readme) and [`FlatList`](https://reactnative.dev/docs/flatlist). `RTCPInboxList` sets a few of their props which can be overridden by providing them as props to `RTCPInboxList`.
For the list's `renderItem` a custom component called `RTCPInboxNotification` is provided. When defining a custom `renderItem`, for animations to work it is required to forward the `ref` prop to the `RTCPInboxNotification`, which is provided as second argument alongside the `item` (see [example](examples)). The default `renderHiddenItem` is `RTCPInboxNotificationBack`. All provided props are forwarded to these two components, i.e. all props of `RTCPNotification` and `RTCPNotificationBack` can also be provided through `RTCPInboxList`.

#### Customization

`RTCPInboxList` is highly customizable to fit the styling needs of all types of apps. 
It comes with a set of default styles defined in [styles.js](styles.js) which are applied to the various items within `RTCPNotification` and `RTCPNotificationBack` and can be overridden by providing an object to the `styles` prop.

> ❗ Please note that provided styles get merged with existing default styles, so in order to unset a default style property you have to override it. See [styles.js](styles.js) for which properties are set by default.

> ❗ Using `ItemSeparatorComponent` doesn't work well with the swipe-to-delete animations. Use `marginBottom` on each renderItem instead.

See simplified pseudo-code below for layout and stylings of a notification:

```jsx
// RTCPNotification
<View> {/* styles.notification, styles.notificationUnread */}
  <View>
    <Text>{headerText}</Text>  {/* styles.header, styles.headerUnread */}
    <Text>{item.title}</Text>  {/* styles.title, styles.titleUnread} */}
    <Text>{item.message}</Text> {/* styles.message, styles.messageUnread */}
    <Text>{item.link}</Text> {/* styles.link */}
  </View>
  <View>
    <FastImage source={{ uri: item.image }} /> {/* styles.image */}
    <Modal> {/* Modal for fullscreen image */}
      <View>
        <FastImage source={{ uri: item.image }} /> {/* styles.fsImage */}
      </View>
    </Modal>
  </View>
</View>
```

```jsx
// RTCPNotificationBack
<View> {/* styles.hiddenItem */}
  <View> {/* styles.deleteView */}
    <Text>Delete</Text> {/* styles.deleteText */}
  </View>
</View>
```

The following sample would make the image show as circular image:

```jsx
<RTCPInboxList styles={{ image: { borderRadius: 25 } }}>
```

To customize the text of the header you can provide a function to the `headerText` prop returning a string (or component). The notification's `item` is provided as function parameter:

```jsx
import moment from "moment";
<RTCPInboxList headerText={(item) => moment(item.time).format("LLLL")}>
```

For the fullscreen image that is shown in a `Modal` when the user taps on the image, it is possible
 to provide a custom component by providing a function through the `renderFsImage` prop. This allows to adjust the image presentation and a possible 'Back' button to the app's stylings. The function takes the `item` and a function to be called to close the modal as arguments. Example:

```jsx
<RTCPInboxList
  renderFsImage={(item, close) => (
    <View>
      <FastImage style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={{uri: item.image}} />
      <TouchableOpacity style={{position: "absolute", top: 0, left: 0}} onPress={() => close()}>
        <Text style={{padding: 10, color: 'yellow'}}>❮ Back</Text>
      </TouchableOpacity>
    </View>
  )}
/>
```

To replace the default 'Delete' text in the SwipeList's hiddenItem, provide a component using the `renderDeleteItem` prop. The following will show a trash can icon instead:

```jsx
<RTCPInboxList
  renderDeleteItem={<Text style={color: 'white'}>🗑️</Text>}
/>
```

See the [examples folder](examples) for a full customization sample.

### Ads Components

The SDK provides two components to help integrate advertisements into an app:

- `RTCPAdImage`  
  This component can be used to show an ad as an image. The image (a.k.a. banner) shown will be selected and loaded from the backend, based on the ad zone id provided and its server-side settings (e.g. weight).
- `RTCPAdsCarousel`  
  This component loads all images from an ad zone and shows them as carousel. See the reference below for its settings.

See below for a basic sample:

```jsx
import { RTCPAdImage, RTCPAdsCarousel } from 'rtcp-react-native/RTCPAds';

...

<RTCPAdImage zoneId=123 />
<RTCPAdsCarousel zoneId=234 />
```

## Reference - Core Module

### Configuration

* **`appID`** *`(String) - mandatory`*  
The 16 characters hash string of your application in RTCP

* **`production`** *`(Boolean) - optional, default: false`*  
Whether to connect to RTCP Staging or Production

* **`enableLogging`** *`(Boolean) - optional, default: true`*  
If true, log actions to console.log.

* **`clearOnStart`** *`(Boolean) - optional, default: false`*  
Remove all notifications from the OS's notification center when the app is opened.

* **`clearAfter`** *`(Number) - optional, default: 2000`*  
Time in milliseconds after which to run `clearOnStart` if enabled.

* **`channelName`** *`(String) - optional, default: "Push Notifications" - Android only`*  
Currently, RTCP only supports one single notification channel for Android. You can define the name of that notification channel as is appears in Androids Notification Settings for your app

* **`openURL`** *`(Boolean) - optional, default: true`*  
Open URLs attached to the notification when the user opened the app by tapping the notification (uses `Linking.openURL()`).

* **`deepLinking`** *`(Boolean) - optional, default: true`*  
Handle Deep Links when a user taps a notification with a Deep Link attached (i.e. emit `'url'` event).

* **`autoRegister`** *`(Boolean) - optional, default: true`*  
Automatically register with backend when push token has been received.

* **`requestPermissions`** *`(Boolean) - optional, default: true`*  
Request for notification permissions on initialization. If set to `false` you'll have to call `requestNotificationPermissions()` manually.


### Methods

```js
async function init(options)
```

Initializes the rtcp-react-native module with the provided `options`.
Besides general module configuration, this sets up your app to receive push notifications and registers your device with RTCP.  
This method needs to be called before you register your root component with `AppRegistry.registerComponent('Appname', () => App);`!

*Parameters*  

- `options` *`(Object)`* - (hash) object containing module configuration (see *Configuration*)<br /><br />


```js
async function sendReadReceipt(push_ids)
```

Sets the status of `push_ids` to "read" on the RTCP server.  
Throws an error if the request failed.

*Parameters*  

- `push_ids` *`(String / Array(String))`* - one or more push_ids<br /><br />


```js
async function deleteNotification(push_id)
```

Remove push notification `push_id` from the inbox on the RTCP server.  

*Parameters*  

- `push_id` *`(String)`* - push_id to delete on server<br /><br />


```js
async function getRecentNotifications(count = 10)
```

Get the `count` most recent notifications from the RTCP server.  
Throws an error if the request failed.

*Parameters*  

- `count` *(Number)* - number of notifications to fetch

*Return Value*  

- Array of notifications (see RTCP docs for details)<br /><br />


```js
function registerEventHandler(event, handler)
```

Register a `handler` function to be called when `event` is emitted. For a list of possible events see below.

*Parameters*

- `event` *`(String)`* - event to be registered for
- `handler` *`(Function)`* - function to be called<br /><br />


```js
function unregisterEventHandler(event, handler)
```

Removes a `handler` function from the `event` list.

*Parameters*

- `event` *`(String)`* - event for which to be removed
- `handler` *`(Function)`* - function to be removed<br /><br />

### Events

- **`"onRegister"`**  
  Emitted when the app has successfully been registered with the RTCP server.

- **`"onRemoteNotification": (notification)`**  
  Emitted when a push notification is received from the RTCP server.  

  *Function parameters*  
  - `notification` *(Object)* - the received push notification as described in *zo0r/react-native-push-notification*

- **`"onNotificationTapped": (notification)`**  
  Emitted when the app is opened by the user having tapped a notification in the OS's notification center.  

  *Function parameters*  
  - `notification` *(Object)* - the received push notification as described in *zo0r/react-native-push-notification*

- **`"onChangeAppID": (newAppID, oldAppID)`**  
  Emitted when the the appID has changed through `registerDevice`  

  *Function parameters*  
  - `newAppID` *(String)* - the new appID the SDK has been set to
  - `oldAppID` *(String)* - the appID the SDK had used before

```js
async function requestNotificationPermissions(rationale = undefined)
```

Request user permission to receive notifications (iOS and Android API level >= 33 (Android 13)). If `requestPermissions` is true (default) this will be called automatically on initialization.

*Parameters*

- `rationale` *`(Object)`* - Rationale to be shown no Android as defined in [React Native Docs](https://reactnative.dev/docs/permissionsandroid#request)


### Advanced Methods

```js
function registerDevice(app_id = undefined)
```

Registers the device with the RTCP backend. If the device has already been registered and there are no changes
in registration data, no request will be sent to the backend.

This method is not required for normal operation since it is run automatically, unless `autoRegister` is set to false.
It is designed and only required for use with multiple different backend applications (appIDs).

To switch to another RTCP appID within a ReactNative application, call this method providing the new appID.
The SDK will then switch to that appID globally. If the appID provided is different from the global appID before,
the event `onChangeAppID` will be emitted.

*Parameters*

- `app_id` *`(String)`* - the 16 characters hash string of the RTCP application to switch to. If not provided, the
                          current global appID will be used.

```js
function unregisterDevice(app_id = undefined)
```

Unregisters a device from the backend. Use this method in multi-appID apps to unregister the device from a RTCP application.

*Parameters*

- `app_id` *`(String)`* - the 16 characters hash string of the RTCP application to unregister this device for.
                          If not provided, the current global appID will be used.

## Reference - Inbox Module

### Configuration

- **`enableBadge`** *`(Boolean) - optional, default: true`*  
  Show a badge with the count of unread messages on the app's icon (on Android this does not work with all launch center variants and settings).

- **`inboxSize`** *`(Number) - optional, default: 25`*  
  The maximum size of inbox entries. This defines how many entries are stored locally on the phone and fetched from the server.

- **`syncOnAppstart`** *`(Boolean) - optional, default: false`*  
  If `true` the inbox gets synced from the server when the app is opened. Usually, this is not required, since push notifications are added to the local inbox as they come in.  
  Note that in order to reduce server load, the inbox is only synced if the last sync was longer than 10 seconds ago.

### Methods

```js
async function init(options)
```

Initializes the inbox module with the provided `options`. Must be called after main module initialization has finished.

*Parameters*  

- `options` *`(Object)`* - (hash) object containing module configuration (see *Configuration*)<br /><br />

```js
async function syncInbox(force = false)
```

Loads the inbox from the RTCP server. To reduce server load (e.g. on repeated app activations), by default this is only executed if 10 seconds have passed since the last sync. Set `force` to `true` e.g. when using this method for *Pull-to-Refresh* user interactions.  
Throws an error if the request failed.

*Parameters*  

- `force` *`(Boolean)`* - run even if last sync was less than 10 seconds ago<br /><br />

```js
function getInbox()
```

Returns the inbox as an array of notifications.

*Return Value*

- Array of notifications<br /><br />

```js
function getUnreadCount()
```

Returns the number of unread notifications

*Return Value*

- Number<br /><br />

```js
function setRead(index)
```

Sets the notification at `index` to be read (`read = true`) and sends this state update to the RTCP server.  
To reduce server requests and load, these updates are queued up and send either 5 seconds after the last update has been made or when the app goes inactive.

*Parameters*

- `index` *`(Number)`* - inbox array index of notification to update<br /><br />

```js
function delete(index)
```

Remove the notification at `index` from the local inbox storage and send a request to also delete from the server's inbox.

*Parameters*

- `index` *`(Number)`* - inbox array index of notification to delete<br /><br />

```js
function registerEventHandler(event, handler)
```

Register a `handler` function to be called when `event` is emitted. For a list of possible events see below.

*Parameters*

- `event` *`(String)`* - event to be registered for
- `handler` *`(Function)`* - function to be called<br /><br />


```js
function unregisterEventHandler(event, handler)
```

Removes a `handler` function from the `event` list.

*Parameters*

- `event` *`(String)`* - event for which to be removed
- `handler` *`(Function)`* - function to be removed<br /><br />

### Events

- **`"onInboxUpdate": (inbox)`**  
  Emitted when the inbox has been changed  
  *Function parameters*  
  - `inbox` *`(Array)`* - inbox (array of notifications)

## Reference - Inbox Components

Note: props for `RTCPNotification` and `RTCPNotificationBack` can also be provided to `RTCPInboxList`, as all props are forwarded by `RTCPInboxList` to these two components.

### RTCPInboxList

In addition to everything from `SwipeListview` and `Flatlist`, the following props are available:

- **`onSyncError`** *`(function), default: Alert.alert("Error getting notifications from server. Please try again later.")`*  
  Function that is called when syncing the Inbox with the server on pull-to-refresh failed.

- **`disableDelete`** *`(Boolean), default: undefined (false)`*  
  If set to true, swiping will be disabled by not providing a `renderHiddenItem` to `SwipeListView`

- **`refreshControlProps`** *`(Object), default: undefined`*  
  Props to be forwarded to the `RefreshControl` component

### RTCPNotification

- **`headerText`** *`(function(item)), default: new Date(this.props.item.time).toLocaleString()`*  
  Function returning a string to be put as header of a notification. The current rendered `item` is provided as parameter.

- **`onLinkOpen`** *`(function(url)), default: (url) => { Linking.openURL(url) }`*  
  By default `Linking.openURL` is called when the user opens a link. If set the provided function will be called instead, allowing to e.g. open the link in an in-app-browser.

- **`styles`** *`(Object)`*  
  Allows to provide styles that are applied to the items within `RTCPNotification`. See [`styles.js`](styles.js) for available and default styles.

- **`renderFsImage`** *`(function(item, closeFunc))`*  
  Function returning a component to render the fullscreen image. The provided component is rendered within a `Modal` and shown when the user taps an image.
  The current `item` as well as a `closeFunc` to close the Modal e.g. on tapping a back button are provided as parameters.

### RTCPNotificationBack

- **`renderDeleteItem`** *`(Component), default: <Text style={[defaultStyles.deleteText, this.props.styles?.deleteText]}>Delete</Text>`*  
  Component to render as delete item within `RTCPNotificationBack`.

## Reference - Ads Components

### RTCPAdImage

This component is based on [`FastImage`](https://github.com/DylanVann/react-native-fast-image) to cache images and reduce server load.

- **`zoneId`** *`(Number) - mandatory`*  
  ID of the adserver zone to load images for

- **`styles`** *`(Object)`*  
  Allows to provide styles that are applied to the items within `RTCPAdImage`. See `adDefaultStyles` in [`styles.js`](styles.js) for available and default styles.

- **`touchableProps`** *`(Object), default: undefined`*  
  Props to forward to the `TouchableOpacity` component wrapped around the image.

- **`imageProps`** *`(Object), default: undefined`*  
  Props to forward to the `FastImage` component.

### RTCPAdsCarousel

This component is based on a `FlatList` with `RTCPAdImage`s as horizontal items.

- **`zoneId`** *`(Number) - mandatory`*  
  ID of the adserver zone to load images for

- **`styles`** *`(Object)`*  
  Allows to provide styles that are applied to the items within `RTCPAdsCarousel`. See `adDefaultStyles` in [`styles.js`](styles.js) for available and default styles.

- **`onLoad`** *`(function(adsJson)), default: undefined`*  
  Function that is called after the ad information has been retrieved from the server, with `adsJson` containing the JSON response.

- **`hideIndicatorDots`** *`(Boolean), default: undefined (false)`*  
  Defines whether or not to render indicator dots below the images.

- **`itemProps`** *`(Object), default: undefined`*  
  Props to forward to each image component.


## Troubleshooting

### Runtime permission introduced in Android 13

Starting with Android 13 showing notifications requires the user to explicitly grant permission through a popup dialog (see [Android Documentation](https://developer.android.com/develop/ui/views/notifications/notification-permission)). For this a new permission called `POST_NOTIFICATIONS` was introduced. Its definition has been added to React Native in version 0.70.7. If your API level is >= 33 using older versions with this module will generate an error.

To make it work with lower versions, you can manually add the permission definition to your React Native installation like this:

Modify file `node_modules/react-native/Libraries/PermissionsAndroid/NativePermissionsAndroid.js`:

```js
export type PermissionType =
  | 'android.permission.POST_NOTIFICATIONS'  // <- add this line
  | 'android.permission.READ_CALENDAR'
```

and file `node_modules/react-native/Libraries/PermissionsAndroid/PermissionsAndroid.js`:

```js
const PERMISSIONS = Object.freeze({
  POST_NOTIFICATIONS: 'android.permission.POST_NOTIFICATIONS',  // <- add this line
  READ_CALENDAR: 'android.permission.READ_CALENDAR',
```

There's a [ready-to-use patch](examples/react-native.patch) available in the examples folder. It can also be used with the [patch-package](https://github.com/ds300/patch-package/) module, simply copy the file to `patches/react-native+<your-rn-version>.patch`.
