//#region notifee/packages/react-native/src/types/NotificationIOS.d.ts
/**
 * The interface for iOS specific options which are applied to a notification.
 *
 * To learn more about iOS notifications, view the [iOS](/react-native/iOS/introduction)
 * documentation for full examples and usage.
 *
 * @platform ios
 */
interface NotificationIOS {
  /**
   * Optional array of [IOSNotificationAttachment](/react-native/reference/iosnotificationattachment) interfaces.
   *
   * Attachments allow audio, image, or video content to be displayed with the notification, enriching the user's experience.
   *
   * View the [Attachments](/react-native/ios/appearances#attachments) documentation for more information
   * and usage examples.
   */
  attachments?: IOSNotificationAttachment[];
  /**
   * The application badge count number. Set to null to indicate no change, or 0 to hide.
   */
  badgeCount?: number | null;
  /**
   * The id of a registered `IOSCategory` (via the `setNotificationCategories` API) that will be used to determine the
   * appropriate actions to display for the notification.
   */
  categoryId?: string;
  /**
   * The launch image that will be used when the app is opened from this notification.
   */
  launchImageName?: string;
  /**
   * The name of the sound file to be played. The sound must be in the Library/Sounds folder of the
   * app's data container or the Library/Sounds folder of an app group data container.
   *
   * If the file is not found in a container, the system will look in the app's bundle.
   *
   * Use 'default' to use the default system sound.
   */
  sound?: string;
  /**
   * Value that indicate the importance and delivery timing of a notification.
   *
   * @platform ios iOS >= 15
   */
  interruptionLevel?: IOSNotificationInterruptionLevel;
  /**
   * If the notification is a critical alert set this property to true; critical alerts will bypass
   * the mute switch and also bypass Do Not Disturb.
   *
   * @platform ios iOS >= 12
   */
  critical?: boolean;
  /**
   * The optional audio volume of the critical sound; a float value between 0.0 and 1.0.
   *
   * This property is not used unless the `critical: true` option is also set.
   *
   * @platform ios iOS >= 12
   */
  criticalVolume?: number;
  /**
   * A unique id for the thread or conversation related to this notification.
   * This will be used to visually group notifications together.
   */
  threadId?: string;
  /**
   * The argument that is inserted in the IOSCategory.summaryFormat for this notification.
   *
   * See `IOSCategory.summaryFormat`.
   *
   * @platform ios iOS >= 12
   */
  summaryArgument?: string;
  /**
   * A number that indicates how many items in the summary are being represented.
   *
   * For example if a messages app sends one notification for 3 new messages in a group chat,
   * the summaryArgument could be the name of the group chat and the summaryArgumentCount should be 3.
   *
   * If set, value cannot be 0 or less.
   *
   * See `IOSCategory.summaryFormat`.
   *
   * @platform ios iOS >= 12
   */
  summaryArgumentCount?: number;
  /**
   * The identifier for the window to be opened when the user taps a notification.
   *
   * This value determines the window brought forward when the user taps this notification on iPadOS.
   *
   * @platform ios iOS >= 13
   */
  targetContentId?: string;
  /**
   * Optional property to customise how notifications are presented when the app is in the foreground.
   *
   * By default, Notifee will show iOS notifications in heads-up mode if your app is currently in the foreground.
   */
  foregroundPresentationOptions?: IOSForegroundPresentationOptions;
  /**
   * Optional property for communication notifications
   *
   * @platform ios iOS >= 15
   */
  communicationInfo?: IOSCommunicationInfo;
}
/**
 * An interface to support communication notifications on iOS 15 and above
 *
 * @platform ios
 */
interface IOSCommunicationInfo {
  conversationId: string;
  body?: string;
  groupName?: string;
  groupAvatar?: string;
  sender: IOSCommunicationInfoPerson;
}
interface IOSCommunicationInfoPerson {
  id: string;
  displayName: string;
  avatar?: string;
}
/**
 * An interface to customise how notifications are shown when the app is in the foreground.
 *
 * By default, Notifee will show iOS notifications in heads-up mode if your app is currently in the foreground.
 *
 * View the [Foreground Notifications](/react-native/ios/appearance#foreground-notifications) to learn
 * more.
 *
 * @platform ios
 */
interface IOSForegroundPresentationOptions {
  /**
   * App in foreground dialog box which indicates when a decision has to be made
   *
   * Defaults to true
   * @deprecated Use `banner` and `list` instead
   */
  alert?: boolean;
  /**
   * App in foreground notification sound
   *
   * Defaults to true
   */
  sound?: boolean;
  /**
   * App in foreground badge update
   *
   * Defaults to true
   */
  badge?: boolean;
  /**
   * Present the notification as a banner
   *
   * For iOS 13 and lower, will be equivalent to setting `alert` to true
   *
   * Defaults to true
   */
  banner?: boolean;
  /**
   * Show the notification in Notification Center
   *
   * For iOS 13 and lower, will be equivalent to setting `alert` to true
   *
   * Defaults to true
   */
  list?: boolean;
}
/**
 * An interface representing all the available permissions that can be requested by your app via
 * the [`requestPermission`](/react-native/reference/requestpermission) API.
 *
 * View the [Permissions](/react-native/ios/permissions) to learn
 * more.
 *
 * @platform ios
 */
interface IOSNotificationPermissions {
  /**
   * Request permission to display alerts.
   *
   * Defaults to true.
   */
  alert?: boolean;
  /**
   * Request permission to display critical notifications.
   *
   * View the [Critical Notifications](/react-native/ios/behaviour#critical-notifications) documentation for more information
   * and usage examples.
   *
   * Defaults to false.
   */
  criticalAlert?: boolean;
  /**
   * Request permission to update the application badge.
   *
   * Defaults to true.
   */
  badge?: boolean;
  /**
   * Request permission to play sounds.
   *
   * Defaults to true.
   */
  sound?: boolean;
  /**
   * Request permission to display notifications in a CarPlay environment.
   *
   * Defaults to true.
   */
  carPlay?: boolean;
  /**
   * Request permission to provisionally create non-interrupting notifications.
   *
   * Defaults to false.
   *
   * @platform ios iOS >= 12
   */
  provisional?: boolean;
  /**
   * Request permission for Siri to automatically read out notification messages over AirPods.
   *
   * Defaults to false.
   *
   * @platform ios iOS >= 13
   */
  announcement?: boolean;
}
/**
 * An enum representing the show previews notification setting for this app on the device.
 *
 * Value is greater than 0 if previews are to be shown, compare against an exact value
 * (e.g. WHEN_AUTHENTICATED) for more granular control.
 *
 * @platform ios
 */
declare enum IOSShowPreviewsSetting {
  /**
   * This setting is not supported on this device. Usually this means that the iOS version required
   * for this setting (iOS 11+) has not been met.
   */
  NOT_SUPPORTED = -1,
  /**
   * Never show previews.
   */
  NEVER = 0,
  /**
   * Always show previews even if the device is currently locked.
   */
  ALWAYS = 1,
  /**
   * Only show previews when the device is unlocked.
   */
  WHEN_AUTHENTICATED = 2
}
/**
 * An enum representing a notification setting for this app on the device.
 *
 * Value is greater than 0 if setting enabled, compare against an exact value (e.g. NOT_SUPPORTED) for more
 * granular control.
 *
 * @platform ios
 */
declare enum IOSNotificationSetting {
  /**
   * This setting is not supported on this device. Usually this means that the iOS version required
   * for this setting has not been met.
   */
  NOT_SUPPORTED = -1,
  /**
   * This setting is currently disabled by the user.
   */
  DISABLED = 0,
  /**
   * This setting is currently enabled.
   */
  ENABLED = 1
}
/**
 * An interface representing the current authorization status and notification-related settings for your app.
 *
 * This interface is returned from [`requestPermission`](/react-native/reference/requestpermission)
 * and [`getNotificationSettings`](/react-native/reference/getnotificationsettings).
 *
 * View the [Observing Settings](/react-native/ios/permissions#observing-settings) documentation to learn more.
 *
 * @platform ios
 */
interface IOSNotificationSettings {
  /**
   * Enum describing if notifications will alert the user.
   */
  alert: IOSNotificationSetting;
  /**
   * Enum describing if notifications can update the application badge.
   */
  badge: IOSNotificationSetting;
  /**
   * Enum describing if critical notifications are allowed.
   */
  criticalAlert: IOSNotificationSetting;
  /**
   * Enum describing if notification previews will be shown.
   */
  showPreviews: IOSShowPreviewsSetting;
  /**
   * Enum describing if notifications can trigger a sound.
   */
  sound: IOSNotificationSetting;
  /**
   * Enum describing if notifications can be displayed in a CarPlay environment.
   */
  carPlay: IOSNotificationSetting;
  /**
   * Enum describing if notifications will be displayed on the lock screen.
   */
  lockScreen: IOSNotificationSetting;
  /**
   * Enum describing if notifications can be announced to the user
   * via 3rd party services such as Siri.
   *
   * For example, if the notification can be automatically read by Siri
   * while the user is wearing AirPods.
   */
  announcement: IOSNotificationSetting;
  /**
   * Enum describing if notifications will be displayed in the notification center.
   */
  notificationCenter: IOSNotificationSetting;
  inAppNotificationSettings: IOSNotificationSetting;
  /**
   * Overall notification authorization status for the application.
   */
  authorizationStatus: AuthorizationStatus;
}
/**
 * TODO docs, used to provide context to Siri
 *
 * @platform ios
 */
declare enum IOSIntentIdentifier {
  START_AUDIO_CALL = 0,
  START_VIDEO_CALL = 1,
  SEARCH_CALL_HISTORY = 2,
  SET_AUDIO_SOURCE_IN_CAR = 3,
  SET_CLIMATE_SETTINGS_IN_CAR = 4,
  SET_DEFROSTER_SETTINGS_IN_CAR = 5,
  SET_SEAT_SETTINGS_IN_CAR = 6,
  SET_PROFILE_IN_CAR = 7,
  SAVE_PROFILE_IN_CAR = 8,
  START_WORKOUT = 9,
  PAUSE_WORKOUT = 10,
  END_WORKOUT = 11,
  CANCEL_WORKOUT = 12,
  RESUME_WORKOUT = 13,
  SET_RADIO_STATION = 14,
  SEND_MESSAGE = 15,
  SEARCH_FOR_MESSAGES = 16,
  SET_MESSAGE_ATTRIBUTE = 17,
  SEND_PAYMENT = 18,
  REQUEST_PAYMENT = 19,
  SEARCH_FOR_PHOTOS = 20,
  START_PHOTO_PLAYBACK = 21,
  LIST_RIDE_OPTIONS = 22,
  REQUEST_RIDE = 23,
  GET_RIDE_STATUS = 24
}
/**
 * A interface representing a notification category created via [`setNotificationCategories`](/react-native/reference/setnotificationcategories).
 *
 * At minimum, a category must be created with a unique identifier, all other properties are optional.
 *
 * View the [Categories](/react-native/ios/categories) documentation to learn more.
 *
 * @platform ios
 */
interface IOSNotificationCategory {
  /**
   * The unique ID for the category.
   */
  id: string;
  /**
   * Specify a custom format for the summary text, which is visible when notifications are grouped together.
   *
   * View the [Summary Text](/react-native/ios/categories#category-summary-text) documentation to learn more.
   */
  summaryFormat?: string;
  /**
   * Allow notifications in this category to be displayed in a CarPlay environment.
   *
   * Defaults to `false`.
   */
  allowInCarPlay?: boolean;
  allowAnnouncement?: boolean;
  hiddenPreviewsShowTitle?: boolean;
  hiddenPreviewsShowSubtitle?: boolean;
  hiddenPreviewsBodyPlaceholder?: string;
  intentIdentifiers?: IOSIntentIdentifier[];
  actions?: IOSNotificationCategoryAction[];
}
/**
 * The interface used to describe a notification quick action for iOS.
 *
 * Quick actions allow users to interact with notifications, allowing you to handle events
 * within your application. When an action completes (e.g. pressing an action, or filling out an input
 * box) an event is sent.
 *
 * View the [Quick Actions](/react-native/ios/interaction#quick-actions) documentation to learn more.
 *
 * @platform ios
 */
interface IOSNotificationCategoryAction {
  id: string;
  /**
   * The title of the action, e.g. "Reply", "Mark as read" etc.
   */
  title: string;
  /**
   * If provided, the action accepts custom user input.
   *
   * If `true`, the user will be able to provide free text input when the action is pressed.
   *
   * The placeholder and button text can be customized by providing an object
   * of type [`IOSInput`](/react-native/reference/iosinput).
   *
   * View the [Action Input](/react-native/ios/interaction#action-input) documentation to
   * learn more.
   */
  input?: true | IOSInput;
  /**
   * Makes the action red, indicating that the action is destructive.
   */
  destructive?: boolean;
  /**
   * Whether this action should cause the application to launch in the foreground.
   */
  foreground?: boolean;
  /**
   * Whether this action should require unlocking before being performed.
   */
  authenticationRequired?: boolean;
}
/**
 * The interface used to enable advanced user input on a notification.
 *
 * View the [Action input](/react-native/ios/interaction#action-input) documentation to learn more.
 *
 * @platform ios
 */
interface IOSInput {
  /**
   * Overrides the default button text "Send", next to the input box.
   */
  buttonText?: string;
  /**
   * The placeholder text displayed in the text input field for this action.
   */
  placeholderText?: string;
}
/**
 * An interface for describing an iOS Notification Attachment.
 *
 * View the [Attachments](/react-native/ios/appearance#attachments) documentation to learn more.
 *
 * @platform ios
 */
interface IOSNotificationAttachment {
  /**
   * A optional unique identifier of the attachment.
   * If no `id` is provided, a unique id is created for you.
   */
  id?: string;
  /**
   * A URL to the media file to display.
   *
   * The value can be any of the following:
   *
   *  - An absolute path to a file on the device
   *  - iOS resource
   *
   * For a list of supported file types, see [Supported File Types](https://developer.apple.com/documentation/usernotifications/unnotificationattachment#1682051) on the official Apple documentation for more information.
   */
  url: string;
  /**
   * An optional hint about an attachment’s file type, as as Uniform Type Identifier (UTI).
   *
   * A list of UTI values can be found [here](https://developer.apple.com/library/archive/documentation/Miscellaneous/Reference/UTIRef/Articles/System-DeclaredUniformTypeIdentifiers.html) e.g. for JPEG you'd use `public.jpeg` as the `typeHint` value.
   *
   * If you do not include this key, the attachment’s filename extension is used to determine its type.
   */
  typeHint?: string;
  /**
   * When set to `true` the thumbnail will be hidden.
   * Defaults to `false`.
   */
  thumbnailHidden?: boolean;
  /**
   * An optional clipping rectangle for a thumbnail image.
   */
  thumbnailClippingRect?: IOSAttachmentThumbnailClippingRect;
  /**
   * The frame number of an animation to use as the thumbnail.
   *
   * For a video, it is the time (in seconds) into the video from which to
   * grab the thumbnail image.
   *
   * For a GIF, it is the frame number of the animation to use
   * as a thumbnail image.
   */
  thumbnailTime?: number;
}
/**
 * The interface used to specify the portion of your image that you want to be displayed as the thumbnail
 *
 * Values are in the range 0.0 to 1.0.
 *
 * For example, specifying an origin (x,y) of (0.25, 0.25) and a size (width, height) of (0.5, 0.5)
 * defines a clipping rectangle that shows only the center portion of the image.
 *
 * @platform ios
 */
interface IOSAttachmentThumbnailClippingRect {
  x: number;
  y: number;
  width: number;
  height: number;
}
/**
 * Constants that indicate the importance and delivery timing of a notification.
 * https://developer.apple.com/documentation/usernotifications/unnotificationinterruptionlevel
 *
 * @platform ios
 */
type IOSNotificationInterruptionLevel = 'active' | 'critical' | 'passive' | 'timeSensitive';
//#endregion
//#region notifee/packages/react-native/src/types/NotificationAndroid.d.ts
/**
 * The interface for Android specific options which are applied to a notification.
 *
 * To learn more about Android notifications, view the [Android](/react-native/android/introduction)
 * documentation for full examples and usage.
 *
 * @platform android
 */
interface NotificationAndroid {
  /**
   * An array of [AndroidAction](/react-native/reference/androidaction) interfaces.
   *
   * Adds quick actions to a notification. Quick Actions enable users to interact with your application
   * directly from the notification body, providing an overall greater user experience.
   *
   * View the [Quick Actions](/react-native/android/interaction#quick-actions) documentation for more information.
   */
  actions?: AndroidAction[];
  /**
   * When set to `true` this notification will be shown as a foreground service.
   *
   * The application can only display one foreground service notification at once. If a
   * foreground service notification is already running and a new notification with this flag set to
   * `true` is provided, the service will stop the existing service and start a new one.
   *
   * Ensure a foreground service runner function has been provided to `registerForegroundService`.
   * Without one, the notification will not be displayed.
   *
   * View the [Foreground Service](/react-native/android/foreground-service) documentation for more information.
   *
   * Defaults to `false`.
   */
  asForegroundService?: boolean;
  /**
   * When set to `true` the screen will light up when the notification is displayed.
   *
   * Defaults to `false`.
   */
  lightUpScreen?: boolean;
  /**
   * Setting this flag will make it so the notification is automatically canceled when the user
   * presses it in the panel.
   *
   * By default when the user taps a notification it is automatically removed from the notification
   * panel. Setting this to `false` will keep the notification in the panel.
   *
   * If `false`, the notification will persist in the notification panel after being pressed. It will
   * remain there until the user removes it (e.g. swipes away) or is cancelled via
   * [`cancelNotification`](/react-native/reference/cancelNotification).
   *
   * Defaults to `true`.
   */
  autoCancel?: boolean;
  /**
   * Overrides the current number of active notifications shown on the device.
   *
   * If no number is provided, the system displays the current number of active notifications.
   */
  badgeCount?: number;
  /**
   * Sets the type of badge used when the notification is being displayed in badge mode.
   *
   * View the [Badges](/react-native/android/appearance#badges) documentation for more information
   * and usage examples.
   *
   * Defaults to `AndroidBadgeIconType.LARGE`.
   *
   * @platform android API Level >= 26
   */
  badgeIconType?: AndroidBadgeIconType;
  /**
   * Assigns the notification to a category. Use the one which best describes the notification.
   *
   * The category may be used by the device for ranking and filtering. It has no visual or behavioural
   * impact.
   */
  category?: AndroidCategory;
  /**
   * Specifies the `AndroidChannel` which the notification will be delivered on.
   *
   * On Android 8.0 (API 26) the channel ID is required. Providing a invalid channel ID will throw
   * an error. View the [Channels & Groups](/react-native/android/channels) documentation for
   * more information and usage examples.
   */
  channelId?: string;
  /**
   * Set an custom accent color for the notification. If not provided, the default notification
   * system color will be used.
   *
   * The color can be a predefined system `AndroidColor` or [hexadecimal](https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4).
   *
   * View the [Color](/react-native/android/appearance#color) documentation for more information.
   */
  color?: AndroidColor | string;
  /**
   * When `asForegroundService` is `true`, the notification will use the provided `color` property
   * to set a background color on the notification. This property has no effect when `asForegroundService`
   * is `false`.
   *
   * This should only be used for high priority ongoing tasks like navigation, an ongoing call,
   * or other similarly high-priority events for the user.
   *
   * View the [Foreground Service](/react-native/android/foreground-service) documentation for more information.
   *
   * Defaults to `false`.
   */
  colorized?: boolean;
  /**
   * If `showChronometer` is `true`, the direction of the chronometer can be changed to count down instead of up.
   *
   * Has no effect if `showChronometer` is `false`.
   *
   * Defaults to `up`.
   */
  chronometerDirection?: 'up' | 'down';
  /**
   * For devices without notification channel support, this property sets the default behaviour
   * for a notification.
   *
   * On API Level >= 26, this has no effect.
   *
   * See [AndroidDefaults](/react-native/reference/androiddefaults) for more information.
   *
   * @platform android API Level < 26
   */
  defaults?: AndroidDefaults[];
  /**
   * Set this notification to be part of a group of notifications sharing the same key. Grouped notifications may
   * display in a cluster or stack on devices which support such rendering.
   *
   * On some devices, the system may automatically group notifications.
   *
   * View the [Android Grouping & Sorting guide](/react-native/android/grouping-and-sorting) documentation to
   * learn more.
   */
  groupId?: string;
  /**
   * Sets the group alert behavior for this notification. Use this method to mute this notification
   * if alerts for this notification's group should be handled by a different notification. This is
   * only applicable for notifications that belong to a `groupId`. This must be called on all notifications
   * you want to mute. For example, if you want only the summary of your group to make noise, all
   * children in the group should have the group alert behavior `AndroidGroupAlertBehavior.SUMMARY`.
   *
   * View the [Android Grouping & Sorting guide](/react-native/android/grouping-and-sorting#group-behaviour)
   * documentation to learn more.
   */
  groupAlertBehavior?: AndroidGroupAlertBehavior;
  /**
   * Whether this notification should be a group summary.
   *
   * If `true`, Set this notification to be the group summary for a group of notifications. Grouped notifications may display in
   * a cluster or stack on devices which support such rendering. Requires a `groupId` key to be set.
   *
   * Defaults to `false`.
   */
  groupSummary?: boolean;
  /**
   * The local user input history for this notification.
   *
   * Input history is shown on supported devices below the main notification body. History of the
   * users input with the notification should be shown when receiving action input by updating
   * the existing notification. It is recommended to clear the history when it is no longer
   * relevant (e.g. someone has responded to the users input).
   */
  inputHistory?: string[];
  /**
   * A local file path using the 'require()' method or a remote http to the picture to display.
   *
   * Sets a large icon on the notification.
   *
   * View the [Android Appearance](/react-native/android/appearance#large-icons) documentation to learn
   * more about this property.
   */
  largeIcon?: string | number | object;
  /**
   * Whether the large icon should be circular.
   *
   * If `true`, the large icon will be rounded in the shape of a circle.
   *
   * Defaults to `false`.
   */
  circularLargeIcon?: boolean;
  /**
   * Sets the color and frequency of the light pattern. This only has effect on supported devices.
   *
   * The option takes an array containing a hexadecimal color value or predefined `AndroidColor`,
   * along with the number of milliseconds to show the light, and the number of milliseconds to
   * turn off the light. The light frequency pattern is repeated.
   *
   * View the [Lights](/react-native/android/behaviour#lights) documentation for more information.
   */
  lights?: [AndroidColor | string, number, number];
  /**
   * Sets whether the notification will only appear on the local device.
   *
   * Users who have connected devices which support notifications (such as a smart watch) will
   * receive an alert for the notification on that device. If set to `true`, the notification will
   * only alert on the main device.
   *
   * Defaults to `false`.
   */
  localOnly?: boolean;
  /**
   * Set whether this is an on-going notification.
   *
   * Setting this value to `true` changes the default behaviour of a notification:
   *
   * - Ongoing notifications are sorted above the regular notifications in the notification panel.
   * - Ongoing notifications do not have an 'X' close button, and are not affected by the "Clear all" button.
   *
   * View the [Ongoing](/react-native/android/behaviour#ongoing) documentation for more information.
   */
  ongoing?: boolean;
  /**
   * Set whether the sound should loop, by default, the sound will only play once.
   *
   * This property is useful if you have an ongoing notification.
   */
  loopSound?: boolean;
  /**
   * Set any additional flags
   */
  flags?: AndroidFlags[];
  /**
   * Notifications with the same `id` will only show a single instance at any one time on your device,
   * however will still alert the user (for example, by making a sound).
   *
   * If this flag is set to `true`, notifications with the same `id` will only alert the user once whilst
   * the notification is visible.
   *
   * This property is commonly used when frequently updating a notification (such as updating the progress bar).
   */
  onlyAlertOnce?: boolean;
  /**
   * By default notifications have no behaviour when a user presses them. The
   * `pressAction` property allows you to set what happens when a user presses
   * the notification.
   *
   * View the [Interaction](/react-native/android/interaction) documentation to learn
   * more.
   */
  pressAction?: NotificationPressAction;
  /**
   * The `fullScreenAction` property allows you to show a custom UI
   * in full screen when the notification is displayed.
   *
   * View the [FullScreenAction](/react-native/android/behaviour#full-screen) documentation to learn
   * more.
   */
  fullScreenAction?: NotificationFullScreenAction;
  /**
   * Set the foreground service types identifying the work done by the service
   *
   * View the [Foreground service types](https://developer.android.com/develop/background-work/services/fg-service-types) documentation to learn
   * more.
   */
  foregroundServiceTypes?: AndroidForegroundServiceType[];
  /**
   * Set a notification importance for devices without channel support.
   *
   * Devices using Android API Level < 26 have no channel support, meaning incoming notifications
   * won't be assigned an importance level from the channel. If your application supports devices
   * without channel support, set this property to directly assign an importance level to the incoming
   * notification.
   *
   * Defaults to `AndroidImportance.DEFAULT`.
   *
   * View the [Appearance](/react-native/android/appearance#importance) documentation to learn
   * more.
   *
   * @platform android API Level < 26
   */
  importance?: AndroidImportance;
  /**
   * A notification can show current progress of a task. The progress state can either be fixed or
   * indeterminate (unknown).
   *
   * View the [Progress Indicators](/react-native/android/progress-indicators) documentation
   * to learn more.
   */
  progress?: AndroidProgress;
  /**
   * Sets whether the `timestamp` provided is shown in the notification.
   *
   * Setting this field is useful for notifications which are more informative with a timestamp,
   * such as an E-Mail.
   *
   * If no `timestamp` is set, this field has no effect.
   *
   * View the [Timestamps](/react-native/android/timers#timestamps) documentation to learn more.
   */
  showTimestamp?: boolean;
  /**
   * The small icon to show in the heads-up notification.
   *
   * View the [Icons](/react-native/android/appearance#small-icons) documentation to learn
   * more.
   */
  smallIcon?: string;
  /**
   * An additional level parameter for when the icon is an instance of a Android `LevelListDrawable`.
   */
  smallIconLevel?: number;
  /**
   * Set a sort key that orders this notification among other notifications from the same package.
   * This can be useful if an external sort was already applied and an app would like to preserve
   * this. Notifications will be sorted lexicographically using this value, although providing
   * different priorities in addition to providing sort key may cause this value to be ignored.
   *
   * If a `groupId` has been set, the sort key can also be used to order members of a notification group.
   *
   * View the [Android Grouping & Sorting](/react-native/android/grouping-and-sorting#sorting)
   * documentation to learn more.
   */
  sortKey?: string;
  /**
   * Styled notifications provide users with more informative content and additional functionality.
   *
   * Android supports different styles, however only one can be used with a notification.
   *
   * View the [Styles](/react-native/android/styles) documentation to learn more
   * view usage examples.
   **/
  style?: AndroidBigPictureStyle | AndroidBigTextStyle | AndroidInboxStyle | AndroidMessagingStyle;
  /**
   * Text that summarizes this notification for accessibility services. As of the Android L release, this
   * text is no longer shown on screen, but it is still useful to accessibility services
   * (where it serves as an audible announcement of the notification's appearance).
   *
   * Ticker text does not show in the notification.
   */
  ticker?: string;
  /**
   * Sets the time in milliseconds at which the notification should be
   * automatically cancelled once displayed, if it is not already cancelled.
   */
  timeoutAfter?: number;
  /**
   * Shows a counting timer on the notification, useful for on-going notifications such as a phone call.
   *
   * If no `timestamp` is provided, a counter will display on the notification starting from 00:00. If a `timestamp` is
   * provided, the number of hours/minutes/seconds since that have elapsed since that value will be shown instead.
   *
   * Defaults to `false`.
   *
   * View the [Timers](/react-native/android/timers#timers) documentation to learn more.
   */
  showChronometer?: boolean;
  /**
   * Sets the vibration pattern the notification uses when displayed. Must be an even amount of numbers.
   *
   * View the [Vibration](/react-native/android/behaviour#vibration) documentation to learn more.
   */
  vibrationPattern?: number[];
  /**
   * Sets the visibility for this notification. This may be used for apps which show user
   * sensitive information (e.g. a banking app).
   *
   * Defaults to `AndroidVisibility.PRIVATE`.
   *
   * View the [Visibility](/react-native/android/appearance#visibility) documentation to learn
   * more.
   */
  visibility?: AndroidVisibility;
  /**
   * Sets a tag on the notification.
   *
   * Tags can be used to query groups notifications by the tag value. Setting a tag has no
   * impact on the notification itself.
   */
  tag?: string;
  /**
   * The timestamp in milliseconds for this notification. Notifications in the panel are sorted by this time.
   *
   * The timestamp can be used with other properties to change the behaviour of a notification:
   *
   * - Use with `showTimestamp` to show the timestamp to the users.
   * - Use with `showChronometer` to create a on-going timer.
   *
   * View the [Timers](/react-native/android/timers) documentation to learn more.
   */
  timestamp?: number;
  /**
   * Overrides the sound the notification is displayed with.
   *
   * The default value is to play no sound. To play the default system sound use 'default'.
   *
   * This setting has no behaviour on Android after API level version 26, instead you can set the
   * sound on the notification channels.
   *
   * View the [Sound](/react-native/android/behaviour#sound) documentation for more information.
   *
   * @platform android API Level < 26
   */
  sound?: string;
}
/**
 * An interface representing the current android only notification-related settings for your app.
 *
 * This interface is returned from [`requestPermission`](/react-native/reference/requestpermission)
 * and [`getNotificationSettings`](/react-native/reference/getnotificationsettings).
 *
 * View the [Permissions](/react-native/android/permissions) documentation to learn more.
 *
 * @platform android
 */
declare enum AndroidNotificationSetting {
  /**
   * This setting is not supported on this device. Usually this means that the Android version required
   * for this setting has not been met.
   */
  NOT_SUPPORTED = -1,
  /**
   * This setting is currently disabled by the user.
   */
  DISABLED = 0,
  /**
   * This setting is currently enabled.
   */
  ENABLED = 1
}
interface AndroidNotificationSettings {
  /**
   * Enum describing if you can create triggers
   *
   * For Android < 12 / API < 31, this will default to true
   *
   * View the [Trigger](/react-native/android/triggers#android-12-limitations) documentation for more information.
   */
  alarm: AndroidNotificationSetting;
}
/**
 * The interface used to describe a notification quick action for Android.
 *
 * Notification actions allow users to interact with notifications, allowing you to handle events
 * within your application. When an action completes (e.g. pressing an action, or filling out an input
 * box) an event is sent.
 *
 * View the [Quick Actions](/react-native/android/interaction#quick-actions) documentation to learn more.
 *
 * @platform android
 */
interface AndroidAction {
  /**
   * The press action interface describing what happens when an action completes.
   *
   * Note; unlike the `pressAction` in the notification body, an action does not need to open the application
   * and can perform background tasks. See the [AndroidPressAction](/react-native/reference/androidpressaction) reference
   * or [Quick Actions](/react-native/android/interaction#quick-actions) documentation to learn more.
   */
  pressAction: NotificationPressAction;
  /**
   * The title of the action, e.g. "Reply", "Mark as read" etc.
   */
  title: string;
  /**
   * An remote http or local icon path representing the action. Newer devices may not show the icon.
   *
   * Recommended icon size is 24x24 px.
   */
  icon?: string;
  /**
   * If provided, the action accepts user input.
   *
   * If `true`, the user will be able to provide free text input when the action is pressed. This
   * property can be further configured for advanced inputs.
   *
   * View the [Action Input](/react-native/android/interaction#action-input) documentation to
   * learn more.
   */
  input?: true | AndroidInput;
}
/**
 * The interface used to enable advanced user input on a notification.
 *
 * View the [Action Input](/react-native/android/interaction#action-input) documentation to learn more.
 *
 * @platform android
 */
interface AndroidInput {
  /**
   * Sets whether the user can freely enter text into the input.
   *
   * This value changes the behaviour of the notification:
   *
   * - If `true`, when an action is pressed this allows the user to type free form text into the input area.
   * - If `false`, you must provide an array of `choices` the user is allowed to use as the input.
   *
   * Defaults to `true`.
   */
  allowFreeFormInput?: boolean;
  /**
   * Sets whether generated replies can be added to the action.
   *
   * Generated replies will only be shown if the input has `choices` and whether the device
   * is able to generate replies.
   *
   * Defaults to `true`.
   */
  allowGeneratedReplies?: boolean;
  /**
   * An array of pre-defined input choices the user can select.
   *
   * If `allowFreeFormInput` is `false`, this property must contain at least one choice.
   */
  choices?: string[];
  /**
   * If `true`, the user will be able to edit the selected choice before sending the action event, however
   * `allowFreeFormInput` must also be `true`.
   *
   * By default, the platform will decide whether choices can be editable. To explicitly enable or disable
   * this, provide `true` or `false`.
   */
  editableChoices?: boolean;
  /**
   * The placeholder text to display inside of the user input area.
   */
  placeholder?: string;
}
/**
 * The interface used when displaying a Big Picture Style notification.
 *
 * <Vimeo id="android-style-bigpicture" caption="Android Big Picture Style" />
 *
 * View the [Big Picture](/react-native/android/styles#big-picture) documentation to learn more.
 *
 * @platform android
 */
interface AndroidBigPictureStyle {
  /**
   * Constant enum value used to identify the style type.
   */
  type: AndroidStyle.BIGPICTURE;
  /**
   * A local file path using the 'require()' method or a HTTP or file URL to the picture to display.
   *
   * The image will be automatically resized depending on the device and it's size. If the image could
   * not be found a blank space will appear.
   */
  picture: string | number | object;
  /**
   * If set, overrides the main notification `title` when the notification is expanded.
   */
  title?: string;
  /**
   * A local file path using the 'require()' method or a HTTP or file URL to the picture to display.
   *
   * If set, overrides the main notification `largeIcon` when the notification is expanded.
   *
   * To hide the `largeIcon` when the notification is expanded, set to null. Similar to `thumbnailHidden` for attachments on iOS.
   */
  largeIcon?: string | number | object | null;
  /**
   * If set, overrides the main notification `summary` when the notification is expanded.
   */
  summary?: string;
}
/**
 * The interface used when displaying a Big Text Style notification.
 *
 * <Vimeo id="android-style-bigtext" caption="Android Big Text Style" />
 *
 * View the [Big Text](/react-native/android/styles#big-text) documentation to learn more.
 *
 * @platform android
 */
interface AndroidBigTextStyle {
  /**
   * Constant enum value used to identify the style type.
   */
  type: AndroidStyle.BIGTEXT;
  /**
   * The text to display when the notification is expanded.
   */
  text: string;
  /**
   * If set, overrides the main notification `title` when the notification is expanded.
   */
  title?: string;
  /**
   * If set, overrides the main notification `summary` when the notification is expanded.
   */
  summary?: string;
}
/**
 * The interface used when displaying a Inbox Style notification.
 *
 * <Vimeo id="android-style-inbox" caption="Android Inbox Style" />
 *
 * View the [Inbox](/react-native/android/styles#inbox) documentation to learn more.
 *
 * @platform android
 */
interface AndroidInboxStyle {
  /**
   * Constant enum value used to identify the style type.
   */
  type: AndroidStyle.INBOX;
  /**
   * An array of messages to display, in order provided.
   *
   * The device will automatically handle displaying the lines visible depending on space in the notification
   * shade.
   */
  lines: string[];
  /**
   * If set, overrides the main notification `title` when the notification is expanded.
   */
  title?: string;
  /**
   * If set, overrides the main notification `summary` when the notification is expanded.
   */
  summary?: string;
}
/**
 * The interface used when displaying a Messaging Style notification.
 *
 * <Vimeo id="android-style-messaging" caption="Android Messaging Style" />
 *
 * View the [Messaging](/react-native/android/styles#messaging) documentation to learn more.
 *
 * @platform android
 */
interface AndroidMessagingStyle {
  /**
   * Constant enum value used to identify the style type.
   */
  type: AndroidStyle.MESSAGING;
  /**
   * The person who is receiving a message on the current device.
   */
  person: AndroidPerson;
  /**
   * An array of messages to display inside the notification.
   */
  messages: AndroidMessagingStyleMessage[];
  /**
   * If set, overrides the main notification `title` when the notification is expanded.
   */
  title?: string;
  /**
   * Sets whether this conversation notification represents a group (3 or more persons).
   */
  group?: boolean;
}
/**
 * The interface for messages when constructing a Messaging Style notification.
 *
 * <Vimeo id="android-style-messaging" caption="Android Messaging Style" />
 *
 * View the [`AndroidMessagingStyle`](/react-native/reference/androidmessagingstyle) reference
 * and [Messaging](/react-native/android/styles#messaging) documentation to learn more.
 *
 * @platform android
 */
interface AndroidMessagingStyleMessage {
  /**
   * The content of the message.
   */
  text: string;
  /**
   * The timestamp of when the message arrived in milliseconds.
   */
  timestamp: number;
  /**
   * The sender of this message. See [`AndroidPerson`](/react-native/reference/androidperson) reference
   * for more information on the properties available.
   *
   * This property should only be provided if the message is from an external person, and not the person receiving the message.
   */
  person?: AndroidPerson;
}
/**
 * The interface used to describe a person shown in notifications.
 *
 * Currently used with [`AndroidMessagingStyle`](/react-native/reference/androidmessagingstyle) notifications.
 *
 * @platform android
 */
interface AndroidPerson {
  /**
   * The name of the person.
   *
   * If no `id` is provided, the name will be used as the unique identifier.
   */
  name: string;
  /**
   * An optional unique ID of the person. Setting this property is preferred for unique identification,
   * however not required. If no value is provided, the `name` will be used instead..
   */
  id?: string;
  /**
   * If `true` this person represents a machine rather than a human. This is used primarily for testing and automated tooling.
   *
   * Defaults to `false`.
   */
  bot?: boolean;
  /**
   * If `true` this person will be marked as important.
   *
   * Important users are those who frequently contact the receiving person. If the app is in
   * "Do not disturb" mode, a notification containing an important person may override this mode
   * if the person has been whitelisted on the device.
   *
   * Defaults to `false`.
   */
  important?: boolean;
  /**
   * The icon to display next to the person in the notification. The icon can be URL or local
   * Android resource.
   *
   * If not provided, an icon will be automatically creating using the `name` property.
   */
  icon?: string;
  /**
   * URI contact of the person.
   *
   * The URI can be any of the following:
   *
   *  - The representation of a contact URI, e.g. `android.provider.ContactsContract.Contacts#CONTENT_LOOKUP_URI`
   *  - A `mailto:` string
   *  - A `tel:` string
   */
  uri?: string;
}
/**
 * Interface for defining the progress of an Android Notification.
 *
 * <Vimeo id="android-progress-summary" caption="Android Progress (w/ Big Picture Style)" />
 *
 * View the [Progress Indicators](/react-native/android/progress-indicators) documentation to learn more.
 *
 * @platform android
 */
interface AndroidProgress {
  /**
   * The maximum progress number. E.g `10`.
   *
   * Must be greater than the `current` value.
   */
  max?: number;
  /**
   * The current progress value.
   *
   * E.g. setting to `4` with a `max` value of `10` would set a fixed progress bar on the notification at 40% complete.
   */
  current?: number;
  /**
   * If `true`, overrides the `max` and `current` values and displays an unknown progress style. Useful when you have no
   * knowledge of a tasks completion state.
   *
   * Defaults to `false`.
   */
  indeterminate?: boolean;
}
/**
 * An interface for describing an Android Channel.
 *
 * Channels override any individual notification preferences (e.g. lights/vibration) and the user
 * has final control over the setting. Once created, only channel metadata can be updated (e.g. name).
 *
 * View the [Channels & Groups](/react-native/android/channels) documentation to learn more.
 *
 * @platform android
 */
interface AndroidChannel {
  /**
   * The unique channel ID.
   */
  id: string;
  /**
   * The channel name. This is shown to the user so must be descriptive and relate to the notifications
   * which will be delivered under this channel.
   *
   * This setting can be updated after creation.
   */
  name: string;
  /**
   * Sets whether badges are enabled for the channel.
   *
   * View the [Badges](/react-native/android/appearance#badges) documentation to learn more.
   *
   * Defaults to `true`.
   *
   * This setting cannot be overridden once the channel is created.
   */
  badge?: boolean;
  /**
   * Sets whether or not notifications posted to this channel can interrupt the user in
   * 'Do Not Disturb' mode.
   *
   * Defaults to `false`.
   *
   * This setting cannot be overridden once the channel is created.
   *
   * @platform android API Level >= 29
   */
  bypassDnd?: boolean;
  /**
   * Sets the user visible description of this channel.
   *
   * The recommended maximum length is 300 characters; the value may be truncated if it is too long.
   *
   * This setting can be updated after creation.
   *
   * @platform android API Level >= 28
   */
  description?: string;
  /**
   * Sets whether notifications posted to this channel should display notification lights, on devices that support that feature.
   *
   * Defaults to `true`.
   *
   * This setting cannot be overridden once the channel is created.
   */
  lights?: boolean;
  /**
   * Sets whether notification posted to this channel should vibrate.
   *
   * Defaults to `true`.
   *
   * This setting cannot be overridden once the channel is created.
   */
  vibration?: boolean;
  /**
   * Sets what group this channel belongs to. Group information is only used for presentation, not for behavior.
   *
   * Groups can be created via via [`createChannelGroup`](/react-native/reference/createchannelgroup).
   *
   * This setting cannot be overridden once the channel is created.
   */
  groupId?: string;
  /**
   * Sets the level of interruption of this notification channel.
   *
   * Defaults to `AndroidImportance.DEFAULT`.
   *
   * This setting can only be set to a lower importance level once set.
   */
  importance?: AndroidImportance;
  /**
   * If lights are enabled (via `lights`), sets/overrides the light color for notifications
   * posted to this channel.
   *
   * This setting cannot be overridden once the channel is created.
   */
  lightColor?: AndroidColor | string;
  /**
   * Sets whether notifications posted to this channel appear on the lockscreen or not,
   * and if so, whether they appear in a redacted form.
   *
   * Defaults to `AndroidVisibility.PRIVATE`.
   *
   * This setting cannot be overridden once the channel is created.
   */
  visibility?: AndroidVisibility;
  /**
   * Sets/overrides the vibration pattern for notifications posted to this channel.
   *
   * The pattern in milliseconds. Must be an even amount of numbers.
   *
   * This setting cannot be overridden once the channel is created.
   */
  vibrationPattern?: number[];
  /**
   * Overrides the sound the notification is displayed with.
   *
   * The default value is to play no sound. To play the default system sound use 'default'.
   *
   * This setting cannot be overridden once the channel is created.
   */
  sound?: string;
  /**
   * The URI of the notification sound associated with the channel, if any.
   *
   * This is a read-only value, and is under user control after the channel is created
   */
  soundURI?: string;
}
/**
 * An interface which describes a channel which has been fetched from the device.
 *
 * Contains additional information which is only available when fetching the channel from the device.
 *
 * @platform android
 */
interface NativeAndroidChannel extends AndroidChannel {
  blocked: boolean;
}
/**
 * An interface for describing an Android Channel Group.
 *
 * Channel groups have no impact on the notification, they are used to help group channels in the applications
 * settings UI.
 *
 * View the [Channels & Groups](/react-native/android/channels) documentation to learn more.
 *
 * @platform android API Level >= 26
 */
interface AndroidChannelGroup {
  /**
   * Unique id for this channel group.
   */
  id: string;
  /**
   * The name of the group. This is visible to the user so should be a descriptive name which
   * categorizes other channels (e.g. reminders).
   *
   * The recommended maximum length is 40 characters; the value may be truncated if it is too long.
   */
  name: string;
  /**
   * An optional description of the group. This is visible to the user.
   *
   * On Android APIs less than 28 this will always be undefined.
   *
   * @platform android API Level >= 28
   */
  description?: string;
}
/**
 * An interface which describes a channel group which has been fetched from the device.
 *
 * Contains additional information which is only available when fetching the channel group from the device.
 *
 * @platform android API Level >= 26
 */
interface NativeAndroidChannelGroup extends AndroidChannelGroup {
  /**
   * Returns whether or not notifications posted to a Channel belonging to this group are
   * blocked by the user.
   *
   * On API levels < 28, returns `false`.
   *
   * View the [Listening to channel events](/react-native/android/channels#listening-to-channel-events)
   * documentation to learn more about subscribing to when a channel is blocked by the user.
   *
   * @platform android API Level >= 28
   */
  blocked: boolean;
  /**
   * Returns a list of channels assigned to this channel group.
   */
  channels: NativeAndroidChannel[];
}
/**
 * Enum used to define how a notification badge is displayed in badge mode.
 *
 * View the [Badges](/react-native/android/appearance#badges) documentation for more information.
 *
 * @platform android
 */
declare enum AndroidBadgeIconType {
  /**
   * No badge is displayed, will always show as a number.
   */
  NONE = 0,
  /**
   * Shows the badge as the notifications `smallIcon`.
   */
  SMALL = 1,
  /**
   * Shows the badge as the notifications `largeIcon` (if available).
   *
   * This is the default value used by a notification if not provided.
   */
  LARGE = 2
}
/**
 * Enum used to describe the category of a notification.
 *
 * Setting a category on a notification helps the device to understand what the notification is for,
 * or what impact it will have on the user. The category can be used for ranking and filtering
 * the notification, however has no visual impact on the notification.
 *
 * @platform android
 */
declare enum AndroidCategory {
  ALARM = "alarm",
  CALL = "call",
  EMAIL = "email",
  ERROR = "error",
  EVENT = "event",
  MESSAGE = "msg",
  NAVIGATION = "navigation",
  PROGRESS = "progress",
  PROMO = "promo",
  RECOMMENDATION = "recommendation",
  REMINDER = "reminder",
  SERVICE = "service",
  SOCIAL = "social",
  STATUS = "status",
  /**
   * Avoid using - generally used by the system.
   */
  SYSTEM = "sys",
  TRANSPORT = "transport"
}
/**
 * A set or predefined colors which can be used with Android Notifications.
 *
 * View the [Color](/react-native/android/appearance#color) documentation to learn more.
 *
 * @platform android
 */
declare enum AndroidColor {
  RED = "red",
  BLUE = "blue",
  GREEN = "green",
  BLACK = "black",
  WHITE = "white",
  CYAN = "cyan",
  MAGENTA = "magenta",
  YELLOW = "yellow",
  LIGHTGRAY = "lightgray",
  DARKGRAY = "darkgray",
  GRAY = "gray",
  LIGHTGREY = "lightgrey",
  DARKGREY = "darkgrey",
  AQUA = "aqua",
  FUCHSIA = "fuchsia",
  LIME = "lime",
  MAROON = "maroon",
  NAVY = "navy",
  OLIVE = "olive",
  PURPLE = "purple",
  SILVER = "silver",
  TEAL = "teal"
}
/**
 * On devices which do not support notification channels (API Level < 26), the notification
 * by default will use all methods to alert the user (depending on the importance).
 *
 * To override the default behaviour, provide an array of defaults to the notification.
 *
 * On API Levels >= 26, this has no effect and notifications will use the channel behaviour.
 *
 * @platform android API Level < 26
 */
declare enum AndroidDefaults {
  /**
   * All options will be used, where possible.
   */
  ALL = -1,
  /**
   * The notification will use lights to alert the user.
   */
  LIGHTS = 4,
  /**
   * The notification will use sound to alert the user.
   */
  SOUND = 1,
  /**
   * The notification will vibrate to alert the user.
   */
  VIBRATE = 2
}
/**
 * Enum used to set any additional flags supported on Android.
 * See Android's [setFlag()](https://developer.android.com/reference/android/app/Notification.Builder#setFlag(int,%20boolean)) documentation.
 */
declare enum AndroidFlags {
  /**
   * The audio will be repeated until the notification is cancelled or the notification window is opened.
   * This will be set for you by setting `loopSound`.
   */
  FLAG_INSISTENT = 4,
  /**
   * Prevents the notification from being canceled when the user clicks the Clear all button.
   * This will be set for you by setting `ongoing`.
   */
  FLAG_NO_CLEAR = 32
}
/**
 * Enum used to describe how a notification alerts the user when it apart of a group.
 *
 * View the [Grouping & Sorting](/react-native/android/grouping-and-sorting#group-behaviour) documentation to
 * learn more.
 *
 * @platform android
 */
declare enum AndroidGroupAlertBehavior {
  /**
   * All notifications will alert.
   */
  ALL = 0,
  /**
   * Only the summary notification will alert the user when displayed. The children of the group will not alert.
   */
  SUMMARY = 1,
  /**
   * Children of a group will alert the user. The summary notification will not alert when displayed.
   */
  CHILDREN = 2
}
/**
 * Available Android Notification Styles.
 *
 * View the [Styles](/react-native/android/styles) documentation to learn more with example usage.
 *
 * @platform android
 */
declare enum AndroidStyle {
  BIGPICTURE = 0,
  BIGTEXT = 1,
  INBOX = 2,
  MESSAGING = 3
}
/**
 * Interface used to define the visibility of an Android notification.
 *
 * Use with the `visibility` property on the notification.
 *
 * View the [Visibility](/react-native/android/appearance#visibility) documentation to learn more.
 *
 * Default value is `AndroidVisibility.PRIVATE`.
 *
 * @platform android
 */
declare enum AndroidVisibility {
  /**
   * Show the notification on all lockscreens, but conceal sensitive or private information on secure lockscreens.
   */
  PRIVATE = 0,
  /**
   * Show this notification in its entirety on all lockscreens.
   */
  PUBLIC = 1,
  /**
   * Do not reveal any part of this notification on a secure lockscreen.
   *
   * Useful for notifications showing sensitive information such as banking apps.
   */
  SECRET = -1
}
/**
 * The interface describing the importance levels of an incoming notification.
 *
 * The importance level can be set directly onto a notification channel for supported devices (API Level >= 26)
 * or directly onto the notification for devices which do not support channels.
 *
 * The importance is used to both change the visual prompt of a received notification
 * and also how it visually appears on the device.
 *
 * View the [Android Appearance](/react-native/android/appearance#importance) documentation to learn more.
 *
 * @platform android
 */
declare enum AndroidImportance {
  /**
   * The default importance applied to a channel/notification.
   *
   * The application small icon will show in the device statusbar. When the user pulls down the
   * notification shade, the notification will show in it's expanded state (if applicable).
   */
  DEFAULT = 3,
  /**
   * The highest importance level applied to a channel/notification.
   *
   * The notifications will appear on-top of applications, allowing direct interaction without pulling
   * down the notification shade. This level should only be used for urgent notifications, such as
   * incoming phone calls, messages etc, which require immediate attention.
   */
  HIGH = 4,
  /**
   * A low importance level applied to a channel/notification.
   *
   * On Android, the application small icon will show in the device statusbar, however the notification will not alert
   * the user (no sound or vibration). The notification will show in it's expanded state when the
   * notification shade is pulled down.
   *
   * On iOS, the notification will not display to the user or alert them. It will still be visible on the devices
   * notification center.
   */
  LOW = 2,
  /**
   * The minimum importance level applied to a channel/notification.
   *
   * The application small icon will not show up in the statusbar, or alert the user. The notification
   * will be in a collapsed state in the notification shade and placed at the bottom of the list.
   *
   * This level should be used when the notification requires no immediate attention. An example of this
   * importance level is the Google app providing weather updates and only being visible when the
   * user pulls the notification shade down,
   */
  MIN = 1,
  /**
   * The notification will not be shown. This has the same effect as the user disabling notifications
   * in the application settings.
   */
  NONE = 0
}
/**
 * An enum representing the various flags that can be passed along to `launchActivityFlags` on `NotificationPressAction`.
 *
 * These flags are added to the Android [Intent](https://developer.android.com/reference/android/content/Intent.html) that launches your activity.
 *
 * These are only required if you need to customise the behaviour of your activities, in most cases you might not need these.
 *
 * @platform android
 */
declare enum AndroidLaunchActivityFlag {
  /**
   * See [FLAG_ACTIVITY_NO_HISTORY](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_NO_HISTORY) on the official Android documentation for more information.
   */
  NO_HISTORY = 0,
  /**
   * See [FLAG_ACTIVITY_SINGLE_TOP](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_SINGLE_TOP) on the official Android documentation for more information.
   */
  SINGLE_TOP = 1,
  /**
   * See [FLAG_ACTIVITY_NEW_TASK](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_NEW_TASK) on the official Android documentation for more information.
   */
  NEW_TASK = 2,
  /**
   * See [FLAG_ACTIVITY_MULTIPLE_TASK](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_MULTIPLE_TASK) on the official Android documentation for more information.
   */
  MULTIPLE_TASK = 3,
  /**
   * See [FLAG_ACTIVITY_CLEAR_TOP](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_CLEAR_TOP) on the official Android documentation for more information.
   */
  CLEAR_TOP = 4,
  /**
   * See [FLAG_ACTIVITY_FORWARD_RESULT](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_FORWARD_RESULT) on the official Android documentation for more information.
   */
  FORWARD_RESULT = 5,
  /**
   * See [FLAG_ACTIVITY_PREVIOUS_IS_TOP](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_PREVIOUS_IS_TOP) on the official Android documentation for more information.
   */
  PREVIOUS_IS_TOP = 6,
  /**
   * See [FLAG_ACTIVITY_EXCLUDE_FROM_RECENTS](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_EXCLUDE_FROM_RECENTS) on the official Android documentation for more information.
   */
  EXCLUDE_FROM_RECENTS = 7,
  /**
   * See [FLAG_ACTIVITY_BROUGHT_TO_FRONT](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_BROUGHT_TO_FRONT) on the official Android documentation for more information.
   */
  BROUGHT_TO_FRONT = 8,
  /**
   * See [FLAG_ACTIVITY_RESET_TASK_IF_NEEDED](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_RESET_TASK_IF_NEEDED) on the official Android documentation for more information.
   */
  RESET_TASK_IF_NEEDED = 9,
  /**
   * See [FLAG_ACTIVITY_LAUNCHED_FROM_HISTORY](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_LAUNCHED_FROM_HISTORY) on the official Android documentation for more information.
   */
  LAUNCHED_FROM_HISTORY = 10,
  /**
   * See [FLAG_ACTIVITY_CLEAR_WHEN_TASK_RESET](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_CLEAR_WHEN_TASK_RESET) on the official Android documentation for more information.
   */
  CLEAR_WHEN_TASK_RESET = 11,
  /**
   * See [FLAG_ACTIVITY_NEW_DOCUMENT](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_NEW_DOCUMENT) on the official Android documentation for more information.
   */
  NEW_DOCUMENT = 12,
  /**
   * See [FLAG_ACTIVITY_NO_USER_ACTION](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_NO_USER_ACTION) on the official Android documentation for more information.
   */
  NO_USER_ACTION = 13,
  /**
   * See [FLAG_ACTIVITY_REORDER_TO_FRONT](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_REORDER_TO_FRONT) on the official Android documentation for more information.
   */
  REORDER_TO_FRONT = 14,
  /**
   * See [FLAG_ACTIVITY_NO_ANIMATION](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_NO_ANIMATION) on the official Android documentation for more information.
   */
  NO_ANIMATION = 15,
  /**
   * See [FLAG_ACTIVITY_CLEAR_TASK](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_CLEAR_TASK) on the official Android documentation for more information.
   */
  CLEAR_TASK = 16,
  /**
   * See [FLAG_ACTIVITY_TASK_ON_HOME](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_TASK_ON_HOME) on the official Android documentation for more information.
   */
  TASK_ON_HOME = 17,
  /**
   * See [FLAG_ACTIVITY_RETAIN_IN_RECENTS](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_RETAIN_IN_RECENTS) on the official Android documentation for more information.
   */
  RETAIN_IN_RECENTS = 18,
  /**
   * See [FLAG_ACTIVITY_LAUNCH_ADJACENT](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_LAUNCH_ADJACENT) on the official Android documentation for more information.
   */
  LAUNCH_ADJACENT = 19,
  /**
   * See [FLAG_ACTIVITY_MATCH_EXTERNAL](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_MATCH_EXTERNAL) on the official Android documentation for more information.
   */
  MATCH_EXTERNAL = 20
}
/**
 * Enum used to set the foreground service types identifying the work done by the service.
 * See Android's [foreground service types](https://developer.android.com/develop/background-work/services/fg-service-types) documentation.
 *
 * @platform android
 */
declare enum AndroidForegroundServiceType {
  FOREGROUND_SERVICE_TYPE_CAMERA = 64,
  FOREGROUND_SERVICE_TYPE_CONNECTED_DEVICE = 16,
  FOREGROUND_SERVICE_TYPE_DATA_SYNC = 1,
  FOREGROUND_SERVICE_TYPE_HEALTH = 256,
  FOREGROUND_SERVICE_TYPE_LOCATION = 8,
  FOREGROUND_SERVICE_TYPE_MEDIA_PLAYBACK = 2,
  FOREGROUND_SERVICE_TYPE_MEDIA_PROJECTION = 32,
  FOREGROUND_SERVICE_TYPE_MEDIA_PROCESSING = 8192,
  FOREGROUND_SERVICE_TYPE_MICROPHONE = 128,
  FOREGROUND_SERVICE_TYPE_PHONE_CALL = 4,
  FOREGROUND_SERVICE_TYPE_REMOTE_MESSAGING = 512,
  FOREGROUND_SERVICE_TYPE_SHORT_SERVICE = 2048,
  FOREGROUND_SERVICE_TYPE_SPECIAL_USE = 1073741824,
  FOREGROUND_SERVICE_TYPE_SYSTEM_EXEMPTED = 1024,
  FOREGROUND_SERVICE_TYPE_MANIFEST = -1
}
//#endregion
//#region notifee/packages/react-native/src/types/NotificationWeb.d.ts
/**
 * Empty at the moment but will contain web-specific settings as needed
 */
interface WebNotificationSettings {}
//#endregion
//#region notifee/packages/react-native/src/types/Notification.d.ts
/**
 * Interface for building a local notification for both Android & iOS devices.
 *
 * To learn more about displaying a notification, view the [Displaying a Notification](/react-native/displaying-a-notification)
 * documentation.
 *
 */
interface Notification {
  /**
   * A unique identifier for your notification.
   *
   * Notifications with the same ID will be created as the same instance, allowing you to update
   * a notification which already exists on the device.
   *
   * Defaults to a random string if not provided.
   */
  id?: string;
  /**
   * The notification title which appears above the body text.
   */
  title?: string | undefined;
  /**
   * The notification subtitle, which appears on a new line below/next the title.
   */
  subtitle?: string | undefined;
  /**
   * The main body content of a notification.
   */
  body?: string | undefined;
  /**
   * Additional data to store on the notification.
   *
   * Data can be used to provide additional context to your notification which can be retrieved
   * at a later point in time (e.g. via an event).
   */
  data?: {
    [key: string]: string | object | number;
  };
  /**
   * Android specific notification options. See the [`NotificationAndroid`](/react-native/reference/notificationandroid)
   * interface for more information and default options which are applied to a notification.
   *
   * @platform android
   */
  android?: NotificationAndroid;
  /**
   * iOS specific notification options. See the [`NotificationIOS`](/react-native/reference/notificationios)
   * interface for more information and default options which are applied to a notification.
   *
   * @platform ios
   */
  ios?: NotificationIOS;
  /**
   * Will be populated if it's a remote notification
   *
   * @platform ios
   */
  readonly remote?: {
    messageId: string;
    senderId: string;
    mutableContent?: number;
    contentAvailable?: number;
  };
}
/**
 * An interface representing a notification & action that launched the current app / or Android activity.
 *
 * View the [App open events](/react-native/events#app-open-events) documentation to learn more.
 *
 * This interface is returned from [`getInitialNotification`](/react-native/reference/getinitialnotification) when
 * an initial notification is available.
 *
 * Deprecated for iOS in favour of `onForegroundEvent`
 *
 * @platform android
 */
interface InitialNotification {
  /**
   * The notification which the user interacted with, which caused the application to open.
   */
  notification: Notification;
  /**
   * The press action which the user interacted with, on the notification, which caused the application to open.
   */
  pressAction: NotificationPressAction;
  /**
   * The input from a notification action.
   *
   * The input detail is available when the [`EventType`](/react-native/reference/eventtype) is:
   *
   * - [`EventType.ACTION_PRESS`](/react-native/reference/eventtype#action_press)
   * - The notification quick action has input enabled. View [`AndroidInput`](/react-native/reference/androidinput) for more details.
   *
   * @platform android API Level >= 20
   */
  input?: string;
}
/**
 * An interface representing a notification that is currently displayed in the notification tray.
 */
interface DisplayedNotification {
  /**
   * ID of the notification
   */
  id?: string;
  /**
   * Date the notification was shown to the user
   */
  date?: string;
  /**
   * The payload that was used to create the notification (if available)
   */
  notification: Notification;
  /**
   * The trigger that was used to schedule the notification (if available)
   *
   * @platform iOS
   */
  trigger: Trigger;
}
/**
 * An interface representing a notification that is pending.
 */
interface TriggerNotification {
  /**
   * The notification
   */
  notification: Notification;
  /**
   * The trigger that is used to schedule the notification
   */
  trigger: Trigger;
}
/**
 * An interface representing a Notifee event.
 *
 * View the [Events](/react-native/events) documentation to learn more about foreground and
 * background events.
 */
interface Event {
  /**
   * The type of notification event.
   */
  type: EventType;
  /**
   * An object containing event detail.
   */
  detail: EventDetail;
}
/**
 * A representation of a Foreground Service task registered via [`registerForegroundService`](/react-native/reference/registerforegroundservice).
 *
 * The task must resolve a promise once complete, and in turn removes the notification.
 *
 * View the [Foreground Service](/react-native/android/foreground-service) documentation to
 * learn more.
 *
 * @platform android
 */
type ForegroundServiceTask = (notification: Notification) => Promise<void>;
/**
 * The interface used to describe a press action for a notification.
 *
 * There are various ways a user can interact with a notification, the most common being pressing
 * the notification, pressing an action or providing text input. This interface defines what happens
 * when a user performs such interaction.
 *
 * On Android; when provided to a notification action, the action will only open you application if
 * a `launchActivity` and/or a `mainComponent` is provided.
 */
interface NotificationPressAction {
  /**
   * The unique ID for the action.
   *
   * The `id` property is used to differentiate between user press actions. When listening to notification
   * events, the ID can be read from the `event.detail.pressAction` object.
   */
  id: string;
  /**
   * The custom Android Activity to launch on a press action.
   *
   * This property can be used in advanced scenarios to launch a custom Android Activity when the user
   * performs a press action.
   *
   * View the [Android Interaction](/react-native/android/interaction) docs to learn more.
   *
   * @platform android
   */
  launchActivity?: string;
  /**
   * Custom flags that are added to the Android [Intent](https://developer.android.com/reference/android/content/Intent.html) that launches your Activity.
   *
   * These are only required if you need to customise the behaviour of how your activities are launched; by default these are not required.
   *
   * @platform android
   */
  launchActivityFlags?: AndroidLaunchActivityFlag[];
  /**
   * A custom registered React component to launch on press action.
   *
   * This property can be used to open a custom React component when the user performs a press action.
   * For this to correctly function on Android, a minor native code change is required.
   *
   * View the [Press Action](/react-native/android/interaction#press-action) document to learn more.
   *
   * @platform android
   */
  mainComponent?: string;
}
/**
 * The interface used to describe a full-screen action for a notification.
 *
 * By setting a `fullScreenAction`, when the notification is displayed, it will launch a full-screen intent.
 *
 * On Android; when provided to a notification action, the action will only open you application if
 * a `launchActivity` and/or a `mainComponent` is provided.
 *
 * Requires the following permission to be added to your `AndroidManifest.xml`:
 * ```xml
 * <uses-permission android:name="android.permission.USE_FULL_SCREEN_INTENT" />
 * ```
 *
 * Please see the [FullScreen Action](/react-native/android/behaviour#full-screen) document to learn more.
 */
interface NotificationFullScreenAction {
  /**
   * The unique ID for the action.
   *
   * The `id` property is used to differentiate between full-screen actions. When listening to notification
   * events, the ID can be read from the `event.detail.notification.android.fullScreenAction` object.
   */
  id: string;
  /**
   * The custom Android Activity to launch on a full-screen action.
   *
   * This property can be used in advanced scenarios to launch a custom Android Activity when the user
   * performs a full-screen action.
   *
   * View the [Android Full Screen](/react-native/android/behaviour#full-screen) docs to learn more.
   *
   * @platform android
   */
  launchActivity?: string;
  /**
   * Custom flags that are added to the Android [Intent](https://developer.android.com/reference/android/content/Intent.html) that launches your Activity.
   *
   * These are only required if you need to customise the behaviour of how your activities are launched; by default these are not required.
   *
   * @platform android
   */
  launchActivityFlags?: AndroidLaunchActivityFlag[];
  /**
   * A custom registered React component to launch on press action.
   *
   * This property can be used to open a custom React component when the notification is displayed.
   * For this to correctly function on Android, a minor native code change is required.
   *
   * View the [Full-screen Action](/react-native/android/behaviour#full-screen) document to learn more.
   *
   * @platform android
   */
  mainComponent?: string;
}
/**
 * An enum representing an event type, defined on [`Event`](/react-native/reference/event).
 *
 * View the [Events](/react-native/events) documentation to learn more about foreground and
 * background events.
 */
declare enum EventType {
  /**
   * An unknown event was received.
   *
   * This event type is a failsafe to catch any unknown events from the device. Please
   * report an issue with a reproduction so it can be correctly handled.
   */
  UNKNOWN = -1,
  /**
   * Event type is sent when the user dismisses a notification. This is triggered via the user swiping
   * the notification from the notification shade.
   *
   * On Android, the event is also sent when performing "Clear all" notifications unlike on iOS.
   *
   * This event is **not** sent when a notification is cancelled or times out.
   */
  DISMISSED = 0,
  /**
   * Event type is sent when a notification has been pressed by the user.
   *
   * On Android, notifications must include an `android.pressAction` property for this event to trigger.
   *
   * On iOS, this event is always sent when the user presses a notification.
   */
  PRESS = 1,
  /**
   * Event type is sent when a user presses a notification action.
   */
  ACTION_PRESS = 2,
  /**
   * Event type sent when a notification has been delivered to the device. For trigger notifications,
   * this event is sent at the point when the trigger executes, not when a the trigger notification is created.
   *
   * It's important to note even though a notification has been delivered, it may not be shown to the
   * user. For example, they may have notifications disabled on the device/channel/app.
   */
  DELIVERED = 3,
  /**
   * Event is sent when the user changes the notification blocked state for the entire application or
   * when the user opens the application settings.
   *
   * @platform android API Level >= 28
   */
  APP_BLOCKED = 4,
  /**
   * Event type is sent when the user changes the notification blocked state for a channel in the application.
   *
   * @platform android API Level >= 28
   */
  CHANNEL_BLOCKED = 5,
  /**
   * Event type is sent when the user changes the notification blocked state for a channel group in the application.
   *
   * @platform android API Level >= 28
   */
  CHANNEL_GROUP_BLOCKED = 6,
  /**
   * Event type is sent when a notification trigger is created.
   */
  TRIGGER_NOTIFICATION_CREATED = 7,
  /**
   * **ANDROID ONLY**
   *
   * Event type is sent when a notification wants to start a foreground service but a foreground service is already started.
   */
  FG_ALREADY_EXIST = 8
}
/**
 * An interface representing the different detail values which can be provided with a notification event.
 *
 * View the [Events](/react-native/events) documentation to learn more.
 */
interface EventDetail {
  /**
   * The notification this event relates to.
   *
   * The notification details is available when the [`EventType`](/react-native/reference/eventtype) is one of:
   *
   *  - [`EventType.DISMISSED`](/react-native/reference/eventtype#dismissed)
   *  - [`EventType.PRESS`](/react-native/reference/eventtype#press)
   *  - [`EventType.ACTION_PRESS`](/react-native/reference/eventtype#action_press)
   *  - [`EventType.DELIVERED`](/react-native/reference/eventtype#delivered)
   *  - [`EventType.TRIGGER_NOTIFICATION_CREATED`](/react-native/reference/eventtype#trigger_notification_created)
   *  - [`EventType.FG_ALREADY_EXIST`](/react-native/reference/eventtype#fg_already_exist)
   */
  notification?: Notification;
  /**
   * The press action which triggered the event.
   *
   * If a press action caused the event, this property will be available allowing you to retrieve the
   * action ID and perform logic.
   *
   * The press action details is available when the [`EventType`](/react-native/reference/eventtype) is one of:
   *
   * - [`EventType.PRESS`](/react-native/reference/eventtype#press)
   * - [`EventType.ACTION_PRESS`](/react-native/reference/eventtype#action_press)
   */
  pressAction?: NotificationPressAction;
  /**
   * The input from a notification action.
   *
   * The input detail is available when the [`EventType`](/react-native/reference/eventtype) is:
   *
   * - [`EventType.ACTION_PRESS`](/react-native/reference/eventtype#action_press)
   * - The notification quick action has input enabled. View [`AndroidInput`](/react-native/reference/androidinput) for more details.
   *
   * @platform android API Level >= 20
   */
  input?: string;
  /**
   * The channel that had its block state changed.
   *
   * Note that if the channel no longer exists during the time the event was sent the channel property will be undefined.
   *
   * The channel detail is available when the event type is [`EventType.CHANNEL_BLOCKED`](/react-native/reference/eventtype#channel_blocked).
   *
   * @platform android API Level >= 28
   */
  channel?: NativeAndroidChannel;
  /**
   * The channel group that had its block state changed.
   *
   * Note that if the channel no longer exists during the time the event was sent the channel group property will be undefined.
   *
   * The channel group detail is available when the event type is [`EventType.CHANNEL_GROUP_BLOCKED`](/react-native/reference/eventtype#channel_group_blocked).
   *
   * @platform android API Level >= 28
   */
  channelGroup?: NativeAndroidChannelGroup;
  /**
   * The notification blocked status of your entire application.
   *
   * The blocked detail is available when the event type is [`EventType.APP_BLOCKED`](/react-native/reference/eventtype#app_blocked).
   *
   * @platform android API Level >= 28
   */
  blocked?: boolean;
}
/**
 * An enum representing the notification authorization status for this app on the device.
 *
 * Value is greater than 0 if authorized, compare against an exact status (e.g. PROVISIONAL) for a more
 * granular status.
 *
 */
declare enum AuthorizationStatus {
  /**
   * The app user has not yet chosen whether to allow the application to create notifications. Usually
   * this status is returned prior to the first call of `requestPermission`.
   *
   * @platform ios
   */
  NOT_DETERMINED = -1,
  /**
   * The app is not authorized to create notifications.
   */
  DENIED = 0,
  /**
   * The app is authorized to create notifications.
   */
  AUTHORIZED = 1,
  /**
   * The app is currently authorized to post non-interrupting user notifications
   * @platform ios iOS >= 12
   */
  PROVISIONAL = 2
}
interface NotificationSettings {
  /**
   * Overall notification authorization status for the application.
   * On Android, `authorizationStatus` will return only either `AuthorizationStatus.DENIED` or `AuthorizationStatus.AUTHORIZED`.
   */
  authorizationStatus: AuthorizationStatus;
  /**
   * Overall notification settings for the application in iOS.
   * On non-iOS platforms, this will be populated with default values
   */
  ios: IOSNotificationSettings;
  /**
   * Overall notification settings for the application in android.
   * On non-Android platforms, this will be populated with default values
   */
  android: AndroidNotificationSettings;
  /**
   * Overall notification settings for the application in web.
   * On non-Web platforms, this will be populated with default values
   */
  web: WebNotificationSettings;
}
//#endregion
//#region notifee/packages/react-native/src/types/Trigger.d.ts
/**
 * Interface for building a trigger with a timestamp.
 *
 * View the [Triggers](/react-native/triggers) documentation to learn more.
 */
interface TimestampTrigger {
  /**
   * Constant enum value used to identify the trigger type.
   */
  type: TriggerType.TIMESTAMP;
  /**
   * The timestamp when the notification should first be shown, in milliseconds since 1970.
   */
  timestamp: number;
  /**
   * The frequency at which the trigger repeats.
   * If unset, the notification will only be displayed once.
   *
   * For example:
   *  if set to `RepeatFrequency.HOURLY`, the notification will repeat every hour from the timestamp specified.
   *  if set to `RepeatFrequency.DAILY`, the notification will repeat every day from the timestamp specified.
   *  if set to `RepeatFrequency.WEEKLY`, the notification will repeat every week from the timestamp specified.
   */
  repeatFrequency?: RepeatFrequency;
  /**
   * Choose to schedule your trigger notification with Android's AlarmManager API.
   *
   * By default, trigger notifications are created with Android's WorkManager API.
   *
   * @platform android
   */
  alarmManager?: boolean | TimestampTriggerAlarmManager | undefined;
}
/**
 * An interface representing the different alarm types which can be used with `TimestampTrigger.alarmManager.type`.
 *
 * View the [Triggers](/react-native/triggers) documentation to learn more.
 */
declare enum AlarmType {
  SET = 0,
  SET_AND_ALLOW_WHILE_IDLE = 1,
  SET_EXACT = 2,
  SET_EXACT_AND_ALLOW_WHILE_IDLE = 3,
  SET_ALARM_CLOCK = 4
}
/**
 * Interface to specify additional options for the AlarmManager which can be used with `TimestampTrigger.alarmManager`.
 *
 * View the [Triggers](/react-native/triggers) documentation to learn more.
 *
 * @platform android
 */
interface TimestampTriggerAlarmManager {
  /**
   * @deprecated use `type` instead
   * -----
   *
   * Sets whether your trigger notification should be displayed even when the system is in low-power idle modes.
   *
   * Defaults to `false`.
   */
  allowWhileIdle?: boolean;
  /** The type of alarm set by alarm manager of android */
  type?: AlarmType;
}
/**
 * An interface representing the different frequencies which can be used with `TimestampTrigger.repeatFrequency`.
 *
 * View the [Triggers](/react-native/triggers) documentation to learn more.
 */
declare enum RepeatFrequency {
  NONE = -1,
  HOURLY = 0,
  DAILY = 1,
  WEEKLY = 2
}
/**
 * Interface for building a trigger that repeats at a specified interval.
 *
 * View the [Triggers](/react-native/triggers) documentation to learn more.
 */
interface IntervalTrigger {
  /**
   * Constant enum value used to identify the trigger type.
   */
  type: TriggerType.INTERVAL;
  /**
   * How frequently the notification should be repeated.
   *
   * For example, if set to 30, the notification will be displayed every 30 minutes.
   *
   * Must be set to a minimum of 15 minutes.
   */
  interval: number;
  /**
   * The unit of time that the `interval` is measured in.
   *
   * For example, if set to `TimeUnit.DAYS` and repeat interval is set to 3, the notification will repeat every 3 days.
   *
   * Defaults to `TimeUnit.SECONDS`
   */
  timeUnit?: TimeUnit | TimeUnit.SECONDS;
}
/**
 * An interface representing the different units of time which can be used with `IntervalTrigger.timeUnit`.
 *
 * View the [Triggers](/react-native/triggers) documentation to learn more.
 */
declare enum TimeUnit {
  SECONDS = "SECONDS",
  MINUTES = "MINUTES",
  HOURS = "HOURS",
  DAYS = "DAYS"
}
/**
 * Available Trigger Types.
 *
 * View the [Triggers](/react-native/triggers) documentation to learn more with example usage.
 */
declare enum TriggerType {
  TIMESTAMP = 0,
  INTERVAL = 1
}
declare type Trigger = TimestampTrigger | IntervalTrigger;
//#endregion
//#region notifee/packages/react-native/src/types/PowerManagerInfo.d.ts
/**
 * The interface that represents the information returned from `getPowerManagerInfo()`.
 *
 * View the [Background Restrictions](/react-native/android/background-restrictions) documentation to learn more.
 *
 * @platform android
 */
interface PowerManagerInfo {
  /**
   * The device manufacturer.
   *
   * For example, Samsung.
   */
  manufacturer?: string;
  /**
   * The device model.
   *
   * For example, Galaxy S8
   */
  model?: string;
  /**
   * The Android version
   *
   * For example, Android 10
   */
  version?: string;
  /**
   * The activity that the user will be navigated to if `openPowerManagerSettings()` is called.
   *
   * Use this as an indicator of what steps the user may have to perform,
   * in-order to prevent your app from being killed.
   *
   * If no activity can be found, value will be null.
   */
  activity?: string | null;
}
//#endregion
//#region notifee/packages/react-native/src/types/Module.d.ts
interface Module {
  /**
   * API used to cancel all notifications.
   *
   * The `cancelAllNotifications` API removes any displayed notifications from the users device and
   * any pending trigger notifications.
   *
   * This method does not cancel Android [Foreground Service](/react-native/android/foreground-service)
   * notifications.
   * @param notificationIds An array of notifications IDs. This is automatically generated and returned
   * when creating a notification, or has been set manually via the `id` property.
   *
   * @param tag The tag set when creating the notification. This is only relative to Android.
   */
  cancelAllNotifications(notificationIds?: string[], tag?: string): Promise<void>;
  /**
   * API used to cancel any displayed notifications.
   *
   * This method does not cancel Android [Foreground Service](/react-native/android/foreground-service)
   * notifications.
   */
  cancelDisplayedNotifications(notificationIds?: string[]): Promise<void>;
  /**
   * API used to cancel any trigger notifications.
   */
  cancelTriggerNotifications(notificationIds?: string[]): Promise<void>;
  /**
   * API used to cancel a single notification.
   *
   * The `cancelNotification` API removes any displayed notifications or ones with triggers
   * set for the specified ID.
   *
   * This method does not cancel [Foreground Service](/react-native/android/foreground-service)
   * notifications.
   *
   * @param notificationId The unique notification ID. This is automatically generated and returned
   * when creating a notification, or has been set manually via the `id` property.
   *
   * @param tag The tag set when creating the notification. This is only relative to Android.
   */
  cancelNotification(notificationId: string, tag?: string): Promise<void>;
  /**
   * API used to cancel a single displayed notification.
   *
   *
   * This method does not cancel [Foreground Service](/react-native/android/foreground-service)
   * notifications.
   *
   * @param notificationId The unique notification ID. This is automatically generated and returned
   * when creating a notification, or has been set manually via the `id` property.
   *
   * @param tag The tag set when creating the notification. This is only relative to Android.
   */
  cancelDisplayedNotification(notificationId: string, tag?: string): Promise<void>;
  /**
   * API used to cancel a single trigger notification.
   *
   *
   * @param notificationId The unique notification ID. This is automatically generated and returned
   * when creating a notification, or has been set manually via the `id` property.
   */
  cancelTriggerNotification(notificationId: string): Promise<void>;
  /**
   * API to create and update channels on supported Android devices.
   *
   * Creates a new Android channel. Channels are used to collectively assign notifications to
   * a single responsible channel. Users can manage settings for channels, e.g. disabling sound or vibration.
   * Channels can be further organized into groups (see `createChannelGroup`).
   *
   * By providing a `groupId` property, channels can be assigned to groups created with
   * [`createChannelGroup`](/react-native/reference/createchannelgroup).
   *
   * The channel ID is returned once the operation has completed.
   *
   * View the [Channels & Groups](/react-native/android/channels) documentation for more information.
   *
   * @platform android
   * @param channel The [`AndroidChannel`](/react-native/reference/androidchannel) interface used to create/update a group.
   */
  createChannel(channel: AndroidChannel): Promise<string>;
  /**
   * API to create and update multiple channels on supported Android devices.
   *
   * This API is used to perform a single operation to create or update channels. See the
   * [`createChannel`](/react-native/reference/createchannel) documentation for more information.
   *
   * @platform android
   * @param channels An array of [`AndroidChannel`](/react-native/reference/androidchannel) interfaces.
   */
  createChannels(channels: AndroidChannel[]): Promise<void>;
  /**
   * API to create or update a channel group on supported Android devices.
   *
   * Creates a new Android channel group. Groups are used to further organize the appearance of your
   * channels in the settings UI. Groups allow users to easily identify and control multiple
   * notification channels.
   *
   * Channels can be assigned to groups during creation using the
   * [`createChannel`](/react-native/reference/createchannel) method.
   *
   * The channel group ID is returned once the operation has completed.
   *
   * View the [Channels & Groups](/react-native/android/channels) documentation for more information.
   *
   * @platform android
   * @param channelGroup The [`AndroidChannelGroup`](/react-native/reference/androidchannelgroup)
   * interface used to create/update a group.
   */
  createChannelGroup(channelGroup: AndroidChannelGroup): Promise<string>;
  /**
   * API to create and update multiple channel groups on supported Android devices.
   *
   * This API is used to perform a single operation to create or update channel groups. See the
   * [`createChannelGroup`](/react-native/reference/createchannelgroup) documentation for more information.
   *
   * @platform android
   * @param channelGroups An array of [`AndroidChannelGroup`](/react-native/reference/androidchannelgroup) interfaces.
   */
  createChannelGroups(channelGroups: AndroidChannelGroup[]): Promise<void>;
  /**
   * API used to delete a channel by ID on supported Android devices.
   *
   * Channels can be deleted using this API by providing the channel ID. Channel information (including
   * the ID) can be retrieved from the [`getChannels`](/react-native/reference/getchannels) API.
   *
   * > When a channel is deleted, notifications assigned to that channel will fail to display.
   *
   * View the [Channels & Groups](/react-native/android/channels) documentation for more information.
   *
   * @platform android
   * @param channelId The unique channel ID to delete.
   */
  deleteChannel(channelId: string): Promise<void>;
  /**
   * API used to delete a channel group by ID on supported Android devices.
   *
   * Channel groups can be deleted using this API by providing the channel ID. Channel information (including
   * the ID) can be retrieved from the [`getChannels`](/react-native/reference/getchannels) API.
   *
   * Deleting a group does not delete channels which are assigned to the group, they will instead be
   * unassigned the group and continue to function as expected.
   *
   * View the [Channels & Groups](/react-native/android/channels) documentation for more information.
   *
   * @platform android
   * @param channelGroupId The unique channel group ID to delete.
   */
  deleteChannelGroup(channelGroupId: string): Promise<void>;
  /**
   * API used to immediately display or update a notification on the users device.
   *
   * This API is used to display a notification on the users device. All
   * channels/categories should be created before triggering this method during the apps lifecycle.
   *
   * View the [Displaying a Notification](/react-native/displaying-a-notification)
   * documentation for more information.
   *
   * @param notification The [`Notification`](/react-native/reference/notification) interface used
   * to create a notification for both Android & iOS.
   */
  displayNotification(notification: Notification): Promise<string>;
  /**
   * API used to open the Android Alarm special access settings for the application.
   *
   * On Android >= 12 / API >= 31, the alarm special access settings screen is displayed, otherwise,
   * this is a no-op & instantly resolves.
   *
   * View the [Trigger](/react-native/android/triggers#android-12-limitations) documentation for more information.
   *
   * @platform android
   */
  openAlarmPermissionSettings(): Promise<void>;
  /**
   * API used to create a trigger notification.
   *
   * All channels/categories should be created before calling this method during the apps lifecycle.
   *
   * View the [Triggers](/react-native/triggers) documentation for more information.
   *
   * @param notification The [`Notification`](/react-native/reference/notification) interface used
   * to create a notification.
   *
   * @param trigger The [`Trigger`](/react-native/reference/trigger) interface used
   * to create a trigger.
   */
  createTriggerNotification(notification: Notification, trigger: Trigger): Promise<string>;
  /**
   * API used to return the ids of trigger notifications that are pending.
   *
   * View the [Triggers](/react-native/triggers) documentation for more information.
   */
  getTriggerNotificationIds(): Promise<string[]>;
  /**
   * API used to return the notifications that are displayed.
   */
  getDisplayedNotifications(): Promise<DisplayedNotification[]>;
  /**
   * API used to return the trigger notifications that are pending.
   */
  getTriggerNotifications(): Promise<TriggerNotification[]>;
  /**
   * API used to return a channel on supported Android devices.
   *
   * This API is used to return a `NativeAndroidChannel`. Returns `null` if no channel could be matched to
   * the given ID.
   *
   * A "native channel" also includes additional properties about the channel at the time it's
   * retrieved from the device. View the [`NativeAndroidChannel`](/react-native/reference/nativeandroidchannel)
   * documentation for more information.
   *
   * View the [Channels & Groups](/react-native/android/channels) documentation for more information.
   *
   * @platform android
   * @param channelId The channel ID created with [`createChannel`](/react-native/reference/createchannel). If
   * a unknown channel ID is provided, `null` is returned.
   */
  getChannel(channelId: string): Promise<NativeAndroidChannel | null>;
  /**
   * API used to check if a channel is created.
   *
   * On iOS, this will default to true
   *
   * @platform android
   */
  isChannelCreated(channelId: string): Promise<boolean>;
  /**
   * API used to check if a channel is blocked.
   *
   * On iOS, this will default to false
   *
   * @platform android
   */
  isChannelBlocked(channelId: string): Promise<boolean>;
  /**
   * API used to return all channels on supported Android devices.
   *
   * This API is used to return a `NativeAndroidChannel`. Returns an empty array if no channels
   * exist.
   *
   * A "native channel" also includes additional properties about the channel at the time it's
   * retrieved from the device. View the [`NativeAndroidChannel`](/react-native/reference/nativeandroidchannel)
   * documentation for more information.
   *
   * View the [Channels & Groups](/react-native/android/channels) documentation for more information.
   *
   * @platform android
   */
  getChannels(): Promise<NativeAndroidChannel[]>;
  /**
   * API used to return a channel group on supported Android devices.
   *
   * This API is used to return an `NativeAndroidChannelGroup`. Returns `null` if no channel could be matched to
   * the given ID.
   *
   * A "native channel group" also includes additional properties about the channel group at the time it's
   * retrieved from the device. View the [`NativeAndroidChannelGroup`](/react-native/reference/nativeandroidchannelgroup)
   * documentation for more information.
   *
   * View the [Channels & Groups](/react-native/android/channels) documentation for more information.
   *
   * @platform android
   * @param channelGroupId The channel ID created with [`createChannelGroup`](/react-native/reference/createchannelgroup). If
   * a unknown channel group ID is provided, `null` is returned.
   */
  getChannelGroup(channelGroupId: string): Promise<NativeAndroidChannelGroup | null>;
  /**
   * API used to return all channel groups on supported Android devices.
   *
   * This API is used to return a `NativeAndroidChannelGroup`. Returns an empty array if no channel
   * groups exist.
   *
   * A "native channel group" also includes additional properties about the channel group at the time it's
   * retrieved from the device. View the [`NativeAndroidChannelGroup`](/react-native/reference/nativeandroidchannelgroup)
   * documentation for more information.
   *
   * View the [Channels & Groups](/react-native/android/channels) documentation for more information.
   *
   * @platform android
   */
  getChannelGroups(): Promise<NativeAndroidChannelGroup[]>;
  /**
   * API used to fetch the notification which causes the application to open.
   *
   * This API can be used to fetch which notification & press action has caused the application to
   * open. The call returns a `null` value when the application wasn't launched by a notification.
   *
   * Once the initial notification has been consumed by this API, it is removed and will no longer
   * be available. It will also be removed if the user relaunches the application.
   *
   * View the [App open events](/react-native/events#app-open-events) documentation for more
   * information and example usage.
   *
   * Deprecated for iOS in favour of `onForegroundEvent` - you can still use this method on iOS
   * but you will also receive a `onForegroundEvent`
   */
  getInitialNotification(): Promise<InitialNotification | null>;
  /**
   * API used to handle events when the application is in a background state.
   *
   * Applications in a background state will use an event handler registered by this API method
   * to send events. The handler must return a Promise once complete and only a single event handler
   * can be registered for the application.
   *
   * View the [Background events](/react-native/events#background-events) documentation for more
   * information and example usage.
   *
   * To listen to foreground events, see the [`onForegroundEvent`](/react-native/reference/onforegroundevent) documentation.
   *
   * @param observer A Function which returns a Promise, called on a new event when the application
   * is in a background state.
   */
  onBackgroundEvent(observer: (event: Event) => Promise<void>): void;
  /**
   * API used to handle events when the application is in a foreground state.
   *
   * Applications in a foreground state will use an event handler registered by this API method
   * to send events. Multiple foreground observers can be registered throughout the applications
   * lifecycle. The method returns a function, used to unsubscribe from further events,
   *
   * View the [Foreground events](/react-native/events#foreground-events) documentation for more
   * information and example usage.
   *
   * To listen to background events, see the [`onBackgroundEvent`](/react-native/reference/onbackgroundevent) documentation.
   *
   * @param observer A Function which returns a Promise, called on a new event when the application
   * is in a foreground state.
   */
  onForegroundEvent(observer: (event: Event) => void): () => void;
  /**
   * API used to open the Android System settings for the application.
   *
   * If the API version is >= 26:
   * - With no `channelId`, the notification settings screen is displayed.
   * - With a `channelId`, the notification settings screen for the specific channel is displayed.
   *
   * If the API version is < 26, the application settings screen is displayed. The `channelId`
   * is ignored.
   *
   * If an invalid `channelId` is provided (e.g. does not exist), the settings screen will redirect
   * back to your application.
   *
   * On iOS, this is a no-op & instantly resolves.
   *
   * @platform android
   * @param channelId The ID of the channel which will be opened. Can be ignored/omitted to display the
   * overall notification settings.
   */
  openNotificationSettings(channelId?: string): Promise<void>;
  /**
   * API used to register a foreground service on Android devices.
   *
   * This method is used to register a long running task which can be used with Foreground Service
   * notifications.
   *
   * Only a single foreground service can exist for the application, and calling this method more
   * than once will update the existing task runner.
   *
   * View the [Foreground Service](/react-native/android/foreground-service) documentation for
   * more information.
   *
   * @platform android
   * @param task The runner function which runs for the duration of the service's lifetime.
   */
  registerForegroundService(task: ForegroundServiceTask): void;
  /**
   * Call this to stop the foreground service that is running
   *
   * @platform android
   *
   */
  stopForegroundService(): Promise<void>;
  /**
   * Request specific notification permissions for your application on the current device.
   *
   * Both iOS & Android return an `NotificationSettings` interface. To check whether overall
   * permission was granted, check the `authorizationStatus` property in the response:
   *
   * ```js
   * import notifee, { AuthorizationStatus } from '@notifee/react-native';
   *
   * const settings = await notifee.requestPermission(...);
   *
   * if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
   *   console.log('User denied permissions request');
   * } else if (settings.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
   *    console.log('User granted permissions request');
   * } else if (settings.authorizationStatus === AuthorizationStatus.PROVISIONAL) {
   *    console.log('User provisionally granted permissions request');
   * }
   * ```
   *
   * For iOS specific settings, use the `ios` properties to view which specific permissions were
   * authorized.
   *
   * On Android, `authorizationStatus` will return only either `AuthorizationStatus.DENIED` or `AuthorizationStatus.AUTHORIZED`
   * and all of the properties on the `ios` interface response return as `AUTHORIZED`.
   *
   * @param permissions
   */
  requestPermission(permissions?: IOSNotificationPermissions): Promise<NotificationSettings>;
  /**
   * Set the notification categories to be used on this Apple device.
   *
   * @platform ios
   *
   * @param categories
   */
  setNotificationCategories(categories: IOSNotificationCategory[]): Promise<void>;
  /**
   * Gets the currently set notification categories on this Apple device.
   *
   * Returns an empty array on Android.
   *
   *@platform ios
   */
  getNotificationCategories(): Promise<IOSNotificationCategory[]>;
  /**
   * Get the current notification settings for this application on the current device.
   * On Android, `authorizationStatus` will return only either `AuthorizationStatus.DENIED` or `AuthorizationStatus.AUTHORIZED`
   * and all of the properties on the `IOSNotificationSettings` interface response return as `AUTHORIZED`.
   */
  getNotificationSettings(): Promise<NotificationSettings>;
  /**
   * Get the current badge count value for this application on the current device.
   *
   * Returns `0` on Android.
   *
   * @platform ios
   */
  getBadgeCount(): Promise<number>;
  /**
   * Set the badge count value for this application on the current device.
   *
   * If set to zero, the badge count is removed from the device. The count must also
   * be a positive number.
   *
   * @platform ios
   *
   * @param count The number value to set as the badge count.
   */
  setBadgeCount(count: number): Promise<void>;
  /**
   * Increments the badge count for this application on the current device by a specified
   * value.
   *
   * Defaults to an increment of `1`.
   *
   * @platform ios
   *
   * @param incrementBy The value to increment the badge count by.
   */
  incrementBadgeCount(incrementBy?: number): Promise<void>;
  /**
   * Decrements the badge count for this application on the current device by a specified
   * value.
   *
   * Defaults to an decrement of `1`.
   *
   * @platform ios
   */
  decrementBadgeCount(decrementBy?: number): Promise<void>;
  /**
   * API used to open the Android System settings for the application.
   *
   * If the API version is >= 23, the battery optimization settings screen is displayed, otherwise,
   * this is a no-op & instantly resolves.
   *
   * View the [Background Restrictions](/react-native/android/behaviour#background-restrictions) documentation for more information.
   *
   * @platform android
   */
  openBatteryOptimizationSettings(): Promise<void>;
  /**
   * API used to check if battery optimization is enabled for your application.
   *
   * Supports API versions >= 23.
   *
   * View the [Background Restrictions](/react-native/android/behaviour#background-restrictions) documentation for more information.
   *
   * @platform android
   */
  isBatteryOptimizationEnabled(): Promise<boolean>;
  /**
   * API used to get information about the device and its power manager settings, including manufacturer, model, version and activity.
   *
   * If `activity` is `null`, `openPowerManagerSettings()` will be noop.
   *
   * On iOS, an instance of `PowerManagerInfo` will be returned with `activity` set to `null`.
   *
   * View the [Background Restrictions](/react-native/android/background-restrictions) documentation for more information.
   *
   * ```js
   * import notifee from `@notifee/react-native`;
   *
   * const powerManagerInfo = await notifee.getPowerManagerInfo();
   *
   * if (powerManagerInfo.activity) {
   *  // 1. ask the user to adjust their Power Manager settings
   *  // ...
   *
   *  // 2. open settings
   *  await notifee.openPowerManagerSettings();
   * }
   * ```
   *
   * @platform android
   */
  getPowerManagerInfo(): Promise<PowerManagerInfo>;
  /**
   * API used to navigate to the appropriate Android System settings for the device.
   *
   * Call `getPowerManagerInfo()` first to find out if the user's device is supported.
   *
   * View the [Background Restrictions](/react-native/android/background-restrictions) documentation for more information.
   *
   * ```js
   * import notifee from `@notifee/react-native`;
   *
   * const powerManagerInfo = await notifee.getPowerManagerInfo
   *
   * if (powerManagerInfo.activity) {
   * // 1. ask the user to adjust their Power Manager settings
   * // ...
   *
   * // 2. if yes, navigate them to settings
   * await notifee.openPowerManagerSettings();
   * }
   * ```
   *
   * @platform android
   */
  openPowerManagerSettings(): Promise<void>;
  /**
   * API used to hide the notification drawer, for example,
   * when the user presses one of the quick actions on the notification, you may wish to hide the drawer.
   *
   * Please use this functionality carefully as it could potentially be quite intrusive to the user.
   *
   * Requires the following permission to be added to your `AndroidManifest.xml`:
   * ```xml
   * <uses-permission android:name="android.permission.EXPAND_STATUS_BAR" />
   * ```
   *
   * ```js
   * import notifee from `@notifee/react-native`;
   *
   * notifee.hideNotificationDrawer();
   * ```
   *
   * @platform android
   */
  hideNotificationDrawer(): void;
}
/**
 * Interface describing the static properties available on the default `@notifee/react-native` export.
 *
 * ```js
 * import notifee from `@notifee/react-native`;
 *
 * console.log(notifee.SDK_VERSION);
 * ```
 */
interface ModuleStatics {
  /**
   * Returns the current Notifee SDK version in use.
   */
  SDK_VERSION: string;
}
interface ModuleWithStatics extends Module, ModuleStatics {}
//#endregion
//#region notifee/packages/react-native/src/types/Library.d.ts
/**
 * An Error that has occurred in native Android or iOS code converted into a JavaScript Error.
 */
interface NativeError extends Error {
  /**
   * Error code, e.g. `invalid-parameter`
   */
  readonly code: string;
  /**
   * Error message
   */
  readonly message: string;
  /**
   * The native returned error code, different per platform
   */
  readonly nativeErrorCode: string | number;
  /**
   * The native returned error message, different per platform
   */
  readonly nativeErrorMessage: string;
}
//#endregion
//#region notifee/packages/react-native/src/index.d.ts
declare const defaultExports: ModuleWithStatics;
//#endregion
export { AlarmType, AndroidAction, AndroidBadgeIconType, AndroidBigPictureStyle, AndroidBigTextStyle, AndroidCategory, AndroidChannel, AndroidChannelGroup, AndroidColor, AndroidDefaults, AndroidFlags, AndroidForegroundServiceType, AndroidGroupAlertBehavior, AndroidImportance, AndroidInboxStyle, AndroidInput, AndroidLaunchActivityFlag, AndroidMessagingStyle, AndroidMessagingStyleMessage, AndroidNotificationSetting, AndroidNotificationSettings, AndroidPerson, AndroidProgress, AndroidStyle, AndroidVisibility, AuthorizationStatus, DisplayedNotification, Event, EventDetail, EventType, ForegroundServiceTask, IOSAttachmentThumbnailClippingRect, IOSCommunicationInfo, IOSCommunicationInfoPerson, IOSForegroundPresentationOptions, IOSInput, IOSIntentIdentifier, IOSNotificationAttachment, IOSNotificationCategory, IOSNotificationCategoryAction, IOSNotificationInterruptionLevel, IOSNotificationPermissions, IOSNotificationSetting, IOSNotificationSettings, IOSShowPreviewsSetting, InitialNotification, IntervalTrigger, NativeAndroidChannel, NativeAndroidChannelGroup, NativeError, Notification, NotificationAndroid, NotificationFullScreenAction, NotificationIOS, NotificationPressAction, NotificationSettings, RepeatFrequency, TimeUnit, TimestampTrigger, TimestampTriggerAlarmManager, Trigger, TriggerNotification, TriggerType, defaultExports as default };
//# sourceMappingURL=notifee.d.ts.map