Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
let react_native = require("react-native");
let react_native_Libraries_vendor_emitter_EventEmitter = require("react-native/Libraries/vendor/emitter/EventEmitter");
react_native_Libraries_vendor_emitter_EventEmitter = __toESM(react_native_Libraries_vendor_emitter_EventEmitter);
//#region notifee/packages/react-native/src/types/NotificationAndroid.ts
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
let AndroidNotificationSetting = /* @__PURE__ */ function(AndroidNotificationSetting) {
	/**
	* This setting is not supported on this device. Usually this means that the Android version required
	* for this setting has not been met.
	*/
	AndroidNotificationSetting[AndroidNotificationSetting["NOT_SUPPORTED"] = -1] = "NOT_SUPPORTED";
	/**
	* This setting is currently disabled by the user.
	*/
	AndroidNotificationSetting[AndroidNotificationSetting["DISABLED"] = 0] = "DISABLED";
	/**
	* This setting is currently enabled.
	*/
	AndroidNotificationSetting[AndroidNotificationSetting["ENABLED"] = 1] = "ENABLED";
	return AndroidNotificationSetting;
}({});
/**
* Enum used to define how a notification badge is displayed in badge mode.
*
* View the [Badges](/react-native/android/appearance#badges) documentation for more information.
*
* @platform android
*/
let AndroidBadgeIconType = /* @__PURE__ */ function(AndroidBadgeIconType) {
	/**
	* No badge is displayed, will always show as a number.
	*/
	AndroidBadgeIconType[AndroidBadgeIconType["NONE"] = 0] = "NONE";
	/**
	* Shows the badge as the notifications `smallIcon`.
	*/
	AndroidBadgeIconType[AndroidBadgeIconType["SMALL"] = 1] = "SMALL";
	/**
	* Shows the badge as the notifications `largeIcon` (if available).
	*
	* This is the default value used by a notification if not provided.
	*/
	AndroidBadgeIconType[AndroidBadgeIconType["LARGE"] = 2] = "LARGE";
	return AndroidBadgeIconType;
}({});
/**
* Enum used to describe the category of a notification.
*
* Setting a category on a notification helps the device to understand what the notification is for,
* or what impact it will have on the user. The category can be used for ranking and filtering
* the notification, however has no visual impact on the notification.
*
* @platform android
*/
let AndroidCategory = /* @__PURE__ */ function(AndroidCategory) {
	AndroidCategory["ALARM"] = "alarm";
	AndroidCategory["CALL"] = "call";
	AndroidCategory["EMAIL"] = "email";
	AndroidCategory["ERROR"] = "error";
	AndroidCategory["EVENT"] = "event";
	AndroidCategory["MESSAGE"] = "msg";
	AndroidCategory["NAVIGATION"] = "navigation";
	AndroidCategory["PROGRESS"] = "progress";
	AndroidCategory["PROMO"] = "promo";
	AndroidCategory["RECOMMENDATION"] = "recommendation";
	AndroidCategory["REMINDER"] = "reminder";
	AndroidCategory["SERVICE"] = "service";
	AndroidCategory["SOCIAL"] = "social";
	AndroidCategory["STATUS"] = "status";
	/**
	* Avoid using - generally used by the system.
	*/
	AndroidCategory["SYSTEM"] = "sys";
	AndroidCategory["TRANSPORT"] = "transport";
	return AndroidCategory;
}({});
/**
* A set or predefined colors which can be used with Android Notifications.
*
* View the [Color](/react-native/android/appearance#color) documentation to learn more.
*
* @platform android
*/
let AndroidColor = /* @__PURE__ */ function(AndroidColor) {
	AndroidColor["RED"] = "red";
	AndroidColor["BLUE"] = "blue";
	AndroidColor["GREEN"] = "green";
	AndroidColor["BLACK"] = "black";
	AndroidColor["WHITE"] = "white";
	AndroidColor["CYAN"] = "cyan";
	AndroidColor["MAGENTA"] = "magenta";
	AndroidColor["YELLOW"] = "yellow";
	AndroidColor["LIGHTGRAY"] = "lightgray";
	AndroidColor["DARKGRAY"] = "darkgray";
	AndroidColor["GRAY"] = "gray";
	AndroidColor["LIGHTGREY"] = "lightgrey";
	AndroidColor["DARKGREY"] = "darkgrey";
	AndroidColor["AQUA"] = "aqua";
	AndroidColor["FUCHSIA"] = "fuchsia";
	AndroidColor["LIME"] = "lime";
	AndroidColor["MAROON"] = "maroon";
	AndroidColor["NAVY"] = "navy";
	AndroidColor["OLIVE"] = "olive";
	AndroidColor["PURPLE"] = "purple";
	AndroidColor["SILVER"] = "silver";
	AndroidColor["TEAL"] = "teal";
	return AndroidColor;
}({});
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
let AndroidDefaults = /* @__PURE__ */ function(AndroidDefaults) {
	/**
	* All options will be used, where possible.
	*/
	AndroidDefaults[AndroidDefaults["ALL"] = -1] = "ALL";
	/**
	* The notification will use lights to alert the user.
	*/
	AndroidDefaults[AndroidDefaults["LIGHTS"] = 4] = "LIGHTS";
	/**
	* The notification will use sound to alert the user.
	*/
	AndroidDefaults[AndroidDefaults["SOUND"] = 1] = "SOUND";
	/**
	* The notification will vibrate to alert the user.
	*/
	AndroidDefaults[AndroidDefaults["VIBRATE"] = 2] = "VIBRATE";
	return AndroidDefaults;
}({});
/**
* Enum used to set any additional flags supported on Android.
* See Android's [setFlag()](https://developer.android.com/reference/android/app/Notification.Builder#setFlag(int,%20boolean)) documentation.
*/
let AndroidFlags = /* @__PURE__ */ function(AndroidFlags) {
	/**
	* The audio will be repeated until the notification is cancelled or the notification window is opened.
	* This will be set for you by setting `loopSound`.
	*/
	AndroidFlags[AndroidFlags["FLAG_INSISTENT"] = 4] = "FLAG_INSISTENT";
	/**
	* Prevents the notification from being canceled when the user clicks the Clear all button.
	* This will be set for you by setting `ongoing`.
	*/
	AndroidFlags[AndroidFlags["FLAG_NO_CLEAR"] = 32] = "FLAG_NO_CLEAR";
	return AndroidFlags;
}({});
/**
* Enum used to describe how a notification alerts the user when it apart of a group.
*
* View the [Grouping & Sorting](/react-native/android/grouping-and-sorting#group-behaviour) documentation to
* learn more.
*
* @platform android
*/
let AndroidGroupAlertBehavior = /* @__PURE__ */ function(AndroidGroupAlertBehavior) {
	/**
	* All notifications will alert.
	*/
	AndroidGroupAlertBehavior[AndroidGroupAlertBehavior["ALL"] = 0] = "ALL";
	/**
	* Only the summary notification will alert the user when displayed. The children of the group will not alert.
	*/
	AndroidGroupAlertBehavior[AndroidGroupAlertBehavior["SUMMARY"] = 1] = "SUMMARY";
	/**
	* Children of a group will alert the user. The summary notification will not alert when displayed.
	*/
	AndroidGroupAlertBehavior[AndroidGroupAlertBehavior["CHILDREN"] = 2] = "CHILDREN";
	return AndroidGroupAlertBehavior;
}({});
/**
* Available Android Notification Styles.
*
* View the [Styles](/react-native/android/styles) documentation to learn more with example usage.
*
* @platform android
*/
let AndroidStyle = /* @__PURE__ */ function(AndroidStyle) {
	AndroidStyle[AndroidStyle["BIGPICTURE"] = 0] = "BIGPICTURE";
	AndroidStyle[AndroidStyle["BIGTEXT"] = 1] = "BIGTEXT";
	AndroidStyle[AndroidStyle["INBOX"] = 2] = "INBOX";
	AndroidStyle[AndroidStyle["MESSAGING"] = 3] = "MESSAGING";
	return AndroidStyle;
}({});
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
let AndroidVisibility = /* @__PURE__ */ function(AndroidVisibility) {
	/**
	* Show the notification on all lockscreens, but conceal sensitive or private information on secure lockscreens.
	*/
	AndroidVisibility[AndroidVisibility["PRIVATE"] = 0] = "PRIVATE";
	/**
	* Show this notification in its entirety on all lockscreens.
	*/
	AndroidVisibility[AndroidVisibility["PUBLIC"] = 1] = "PUBLIC";
	/**
	* Do not reveal any part of this notification on a secure lockscreen.
	*
	* Useful for notifications showing sensitive information such as banking apps.
	*/
	AndroidVisibility[AndroidVisibility["SECRET"] = -1] = "SECRET";
	return AndroidVisibility;
}({});
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
let AndroidImportance = /* @__PURE__ */ function(AndroidImportance) {
	/**
	* The default importance applied to a channel/notification.
	*
	* The application small icon will show in the device statusbar. When the user pulls down the
	* notification shade, the notification will show in it's expanded state (if applicable).
	*/
	AndroidImportance[AndroidImportance["DEFAULT"] = 3] = "DEFAULT";
	/**
	* The highest importance level applied to a channel/notification.
	*
	* The notifications will appear on-top of applications, allowing direct interaction without pulling
	* down the notification shade. This level should only be used for urgent notifications, such as
	* incoming phone calls, messages etc, which require immediate attention.
	*/
	AndroidImportance[AndroidImportance["HIGH"] = 4] = "HIGH";
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
	AndroidImportance[AndroidImportance["LOW"] = 2] = "LOW";
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
	AndroidImportance[AndroidImportance["MIN"] = 1] = "MIN";
	/**
	* The notification will not be shown. This has the same effect as the user disabling notifications
	* in the application settings.
	*/
	AndroidImportance[AndroidImportance["NONE"] = 0] = "NONE";
	return AndroidImportance;
}({});
/**
* An enum representing the various flags that can be passed along to `launchActivityFlags` on `NotificationPressAction`.
*
* These flags are added to the Android [Intent](https://developer.android.com/reference/android/content/Intent.html) that launches your activity.
*
* These are only required if you need to customise the behaviour of your activities, in most cases you might not need these.
*
* @platform android
*/
let AndroidLaunchActivityFlag = /* @__PURE__ */ function(AndroidLaunchActivityFlag) {
	/**
	* See [FLAG_ACTIVITY_NO_HISTORY](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_NO_HISTORY) on the official Android documentation for more information.
	*/
	AndroidLaunchActivityFlag[AndroidLaunchActivityFlag["NO_HISTORY"] = 0] = "NO_HISTORY";
	/**
	* See [FLAG_ACTIVITY_SINGLE_TOP](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_SINGLE_TOP) on the official Android documentation for more information.
	*/
	AndroidLaunchActivityFlag[AndroidLaunchActivityFlag["SINGLE_TOP"] = 1] = "SINGLE_TOP";
	/**
	* See [FLAG_ACTIVITY_NEW_TASK](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_NEW_TASK) on the official Android documentation for more information.
	*/
	AndroidLaunchActivityFlag[AndroidLaunchActivityFlag["NEW_TASK"] = 2] = "NEW_TASK";
	/**
	* See [FLAG_ACTIVITY_MULTIPLE_TASK](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_MULTIPLE_TASK) on the official Android documentation for more information.
	*/
	AndroidLaunchActivityFlag[AndroidLaunchActivityFlag["MULTIPLE_TASK"] = 3] = "MULTIPLE_TASK";
	/**
	* See [FLAG_ACTIVITY_CLEAR_TOP](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_CLEAR_TOP) on the official Android documentation for more information.
	*/
	AndroidLaunchActivityFlag[AndroidLaunchActivityFlag["CLEAR_TOP"] = 4] = "CLEAR_TOP";
	/**
	* See [FLAG_ACTIVITY_FORWARD_RESULT](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_FORWARD_RESULT) on the official Android documentation for more information.
	*/
	AndroidLaunchActivityFlag[AndroidLaunchActivityFlag["FORWARD_RESULT"] = 5] = "FORWARD_RESULT";
	/**
	* See [FLAG_ACTIVITY_PREVIOUS_IS_TOP](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_PREVIOUS_IS_TOP) on the official Android documentation for more information.
	*/
	AndroidLaunchActivityFlag[AndroidLaunchActivityFlag["PREVIOUS_IS_TOP"] = 6] = "PREVIOUS_IS_TOP";
	/**
	* See [FLAG_ACTIVITY_EXCLUDE_FROM_RECENTS](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_EXCLUDE_FROM_RECENTS) on the official Android documentation for more information.
	*/
	AndroidLaunchActivityFlag[AndroidLaunchActivityFlag["EXCLUDE_FROM_RECENTS"] = 7] = "EXCLUDE_FROM_RECENTS";
	/**
	* See [FLAG_ACTIVITY_BROUGHT_TO_FRONT](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_BROUGHT_TO_FRONT) on the official Android documentation for more information.
	*/
	AndroidLaunchActivityFlag[AndroidLaunchActivityFlag["BROUGHT_TO_FRONT"] = 8] = "BROUGHT_TO_FRONT";
	/**
	* See [FLAG_ACTIVITY_RESET_TASK_IF_NEEDED](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_RESET_TASK_IF_NEEDED) on the official Android documentation for more information.
	*/
	AndroidLaunchActivityFlag[AndroidLaunchActivityFlag["RESET_TASK_IF_NEEDED"] = 9] = "RESET_TASK_IF_NEEDED";
	/**
	* See [FLAG_ACTIVITY_LAUNCHED_FROM_HISTORY](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_LAUNCHED_FROM_HISTORY) on the official Android documentation for more information.
	*/
	AndroidLaunchActivityFlag[AndroidLaunchActivityFlag["LAUNCHED_FROM_HISTORY"] = 10] = "LAUNCHED_FROM_HISTORY";
	/**
	* See [FLAG_ACTIVITY_CLEAR_WHEN_TASK_RESET](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_CLEAR_WHEN_TASK_RESET) on the official Android documentation for more information.
	*/
	AndroidLaunchActivityFlag[AndroidLaunchActivityFlag["CLEAR_WHEN_TASK_RESET"] = 11] = "CLEAR_WHEN_TASK_RESET";
	/**
	* See [FLAG_ACTIVITY_NEW_DOCUMENT](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_NEW_DOCUMENT) on the official Android documentation for more information.
	*/
	AndroidLaunchActivityFlag[AndroidLaunchActivityFlag["NEW_DOCUMENT"] = 12] = "NEW_DOCUMENT";
	/**
	* See [FLAG_ACTIVITY_NO_USER_ACTION](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_NO_USER_ACTION) on the official Android documentation for more information.
	*/
	AndroidLaunchActivityFlag[AndroidLaunchActivityFlag["NO_USER_ACTION"] = 13] = "NO_USER_ACTION";
	/**
	* See [FLAG_ACTIVITY_REORDER_TO_FRONT](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_REORDER_TO_FRONT) on the official Android documentation for more information.
	*/
	AndroidLaunchActivityFlag[AndroidLaunchActivityFlag["REORDER_TO_FRONT"] = 14] = "REORDER_TO_FRONT";
	/**
	* See [FLAG_ACTIVITY_NO_ANIMATION](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_NO_ANIMATION) on the official Android documentation for more information.
	*/
	AndroidLaunchActivityFlag[AndroidLaunchActivityFlag["NO_ANIMATION"] = 15] = "NO_ANIMATION";
	/**
	* See [FLAG_ACTIVITY_CLEAR_TASK](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_CLEAR_TASK) on the official Android documentation for more information.
	*/
	AndroidLaunchActivityFlag[AndroidLaunchActivityFlag["CLEAR_TASK"] = 16] = "CLEAR_TASK";
	/**
	* See [FLAG_ACTIVITY_TASK_ON_HOME](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_TASK_ON_HOME) on the official Android documentation for more information.
	*/
	AndroidLaunchActivityFlag[AndroidLaunchActivityFlag["TASK_ON_HOME"] = 17] = "TASK_ON_HOME";
	/**
	* See [FLAG_ACTIVITY_RETAIN_IN_RECENTS](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_RETAIN_IN_RECENTS) on the official Android documentation for more information.
	*/
	AndroidLaunchActivityFlag[AndroidLaunchActivityFlag["RETAIN_IN_RECENTS"] = 18] = "RETAIN_IN_RECENTS";
	/**
	* See [FLAG_ACTIVITY_LAUNCH_ADJACENT](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_LAUNCH_ADJACENT) on the official Android documentation for more information.
	*/
	AndroidLaunchActivityFlag[AndroidLaunchActivityFlag["LAUNCH_ADJACENT"] = 19] = "LAUNCH_ADJACENT";
	/**
	* See [FLAG_ACTIVITY_MATCH_EXTERNAL](https://developer.android.com/reference/android/content/Intent.html#FLAG_ACTIVITY_MATCH_EXTERNAL) on the official Android documentation for more information.
	*/
	AndroidLaunchActivityFlag[AndroidLaunchActivityFlag["MATCH_EXTERNAL"] = 20] = "MATCH_EXTERNAL";
	return AndroidLaunchActivityFlag;
}({});
/**
* Enum used to set the foreground service types identifying the work done by the service.
* See Android's [foreground service types](https://developer.android.com/develop/background-work/services/fg-service-types) documentation.
*
* @platform android
*/
let AndroidForegroundServiceType = /* @__PURE__ */ function(AndroidForegroundServiceType) {
	AndroidForegroundServiceType[AndroidForegroundServiceType["FOREGROUND_SERVICE_TYPE_CAMERA"] = 64] = "FOREGROUND_SERVICE_TYPE_CAMERA";
	AndroidForegroundServiceType[AndroidForegroundServiceType["FOREGROUND_SERVICE_TYPE_CONNECTED_DEVICE"] = 16] = "FOREGROUND_SERVICE_TYPE_CONNECTED_DEVICE";
	AndroidForegroundServiceType[AndroidForegroundServiceType["FOREGROUND_SERVICE_TYPE_DATA_SYNC"] = 1] = "FOREGROUND_SERVICE_TYPE_DATA_SYNC";
	AndroidForegroundServiceType[AndroidForegroundServiceType["FOREGROUND_SERVICE_TYPE_HEALTH"] = 256] = "FOREGROUND_SERVICE_TYPE_HEALTH";
	AndroidForegroundServiceType[AndroidForegroundServiceType["FOREGROUND_SERVICE_TYPE_LOCATION"] = 8] = "FOREGROUND_SERVICE_TYPE_LOCATION";
	AndroidForegroundServiceType[AndroidForegroundServiceType["FOREGROUND_SERVICE_TYPE_MEDIA_PLAYBACK"] = 2] = "FOREGROUND_SERVICE_TYPE_MEDIA_PLAYBACK";
	AndroidForegroundServiceType[AndroidForegroundServiceType["FOREGROUND_SERVICE_TYPE_MEDIA_PROJECTION"] = 32] = "FOREGROUND_SERVICE_TYPE_MEDIA_PROJECTION";
	AndroidForegroundServiceType[AndroidForegroundServiceType["FOREGROUND_SERVICE_TYPE_MEDIA_PROCESSING"] = 8192] = "FOREGROUND_SERVICE_TYPE_MEDIA_PROCESSING";
	AndroidForegroundServiceType[AndroidForegroundServiceType["FOREGROUND_SERVICE_TYPE_MICROPHONE"] = 128] = "FOREGROUND_SERVICE_TYPE_MICROPHONE";
	AndroidForegroundServiceType[AndroidForegroundServiceType["FOREGROUND_SERVICE_TYPE_PHONE_CALL"] = 4] = "FOREGROUND_SERVICE_TYPE_PHONE_CALL";
	AndroidForegroundServiceType[AndroidForegroundServiceType["FOREGROUND_SERVICE_TYPE_REMOTE_MESSAGING"] = 512] = "FOREGROUND_SERVICE_TYPE_REMOTE_MESSAGING";
	AndroidForegroundServiceType[AndroidForegroundServiceType["FOREGROUND_SERVICE_TYPE_SHORT_SERVICE"] = 2048] = "FOREGROUND_SERVICE_TYPE_SHORT_SERVICE";
	AndroidForegroundServiceType[AndroidForegroundServiceType["FOREGROUND_SERVICE_TYPE_SPECIAL_USE"] = 1073741824] = "FOREGROUND_SERVICE_TYPE_SPECIAL_USE";
	AndroidForegroundServiceType[AndroidForegroundServiceType["FOREGROUND_SERVICE_TYPE_SYSTEM_EXEMPTED"] = 1024] = "FOREGROUND_SERVICE_TYPE_SYSTEM_EXEMPTED";
	AndroidForegroundServiceType[AndroidForegroundServiceType["FOREGROUND_SERVICE_TYPE_MANIFEST"] = -1] = "FOREGROUND_SERVICE_TYPE_MANIFEST";
	return AndroidForegroundServiceType;
}({});
//#endregion
//#region notifee/packages/react-native/src/types/Notification.ts
/**
* An enum representing an event type, defined on [`Event`](/react-native/reference/event).
*
* View the [Events](/react-native/events) documentation to learn more about foreground and
* background events.
*/
let EventType = /* @__PURE__ */ function(EventType) {
	/**
	* An unknown event was received.
	*
	* This event type is a failsafe to catch any unknown events from the device. Please
	* report an issue with a reproduction so it can be correctly handled.
	*/
	EventType[EventType["UNKNOWN"] = -1] = "UNKNOWN";
	/**
	* Event type is sent when the user dismisses a notification. This is triggered via the user swiping
	* the notification from the notification shade.
	*
	* On Android, the event is also sent when performing "Clear all" notifications unlike on iOS.
	*
	* This event is **not** sent when a notification is cancelled or times out.
	*/
	EventType[EventType["DISMISSED"] = 0] = "DISMISSED";
	/**
	* Event type is sent when a notification has been pressed by the user.
	*
	* On Android, notifications must include an `android.pressAction` property for this event to trigger.
	*
	* On iOS, this event is always sent when the user presses a notification.
	*/
	EventType[EventType["PRESS"] = 1] = "PRESS";
	/**
	* Event type is sent when a user presses a notification action.
	*/
	EventType[EventType["ACTION_PRESS"] = 2] = "ACTION_PRESS";
	/**
	* Event type sent when a notification has been delivered to the device. For trigger notifications,
	* this event is sent at the point when the trigger executes, not when a the trigger notification is created.
	*
	* It's important to note even though a notification has been delivered, it may not be shown to the
	* user. For example, they may have notifications disabled on the device/channel/app.
	*/
	EventType[EventType["DELIVERED"] = 3] = "DELIVERED";
	/**
	* Event is sent when the user changes the notification blocked state for the entire application or
	* when the user opens the application settings.
	*
	* @platform android API Level >= 28
	*/
	EventType[EventType["APP_BLOCKED"] = 4] = "APP_BLOCKED";
	/**
	* Event type is sent when the user changes the notification blocked state for a channel in the application.
	*
	* @platform android API Level >= 28
	*/
	EventType[EventType["CHANNEL_BLOCKED"] = 5] = "CHANNEL_BLOCKED";
	/**
	* Event type is sent when the user changes the notification blocked state for a channel group in the application.
	*
	* @platform android API Level >= 28
	*/
	EventType[EventType["CHANNEL_GROUP_BLOCKED"] = 6] = "CHANNEL_GROUP_BLOCKED";
	/**
	* Event type is sent when a notification trigger is created.
	*/
	EventType[EventType["TRIGGER_NOTIFICATION_CREATED"] = 7] = "TRIGGER_NOTIFICATION_CREATED";
	/**
	* **ANDROID ONLY**
	*
	* Event type is sent when a notification wants to start a foreground service but a foreground service is already started.
	*/
	EventType[EventType["FG_ALREADY_EXIST"] = 8] = "FG_ALREADY_EXIST";
	return EventType;
}({});
/**
* An enum representing the notification authorization status for this app on the device.
*
* Value is greater than 0 if authorized, compare against an exact status (e.g. PROVISIONAL) for a more
* granular status.
*
*/
let AuthorizationStatus = /* @__PURE__ */ function(AuthorizationStatus) {
	/**
	* The app user has not yet chosen whether to allow the application to create notifications. Usually
	* this status is returned prior to the first call of `requestPermission`.
	*
	* @platform ios
	*/
	AuthorizationStatus[AuthorizationStatus["NOT_DETERMINED"] = -1] = "NOT_DETERMINED";
	/**
	* The app is not authorized to create notifications.
	*/
	AuthorizationStatus[AuthorizationStatus["DENIED"] = 0] = "DENIED";
	/**
	* The app is authorized to create notifications.
	*/
	AuthorizationStatus[AuthorizationStatus["AUTHORIZED"] = 1] = "AUTHORIZED";
	/**
	* The app is currently authorized to post non-interrupting user notifications
	* @platform ios iOS >= 12
	*/
	AuthorizationStatus[AuthorizationStatus["PROVISIONAL"] = 2] = "PROVISIONAL";
	return AuthorizationStatus;
}({});
//#endregion
//#region notifee/packages/react-native/src/NotifeeJSEventEmitter.ts
const emitter = new react_native_Libraries_vendor_emitter_EventEmitter.default();
//#endregion
//#region notifee/packages/react-native/src/NotifeeNativeModule.ts
var NotifeeNativeModule = class {
	_moduleConfig;
	_nativeModule;
	_nativeEmitter;
	constructor(config) {
		this._nativeModule = null;
		this._moduleConfig = Object.assign({}, config);
		this._nativeEmitter = new react_native.NativeEventEmitter(this.native);
		for (let i = 0; i < config.nativeEvents.length; i++) {
			const eventName = config.nativeEvents[i];
			this._nativeEmitter.addListener(eventName, (payload) => {
				this.emitter.emit(eventName, payload);
			});
		}
	}
	get emitter() {
		return emitter;
	}
	get native() {
		if (this._nativeModule) return this._nativeModule;
		this._nativeModule = react_native.NativeModules[this._moduleConfig.nativeModuleName];
		if (this._nativeModule == null) throw new Error("Notifee native module not found.");
		return this._nativeModule;
	}
};
//#endregion
//#region notifee/packages/react-native/src/utils/id.ts
const CHARACTERS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
function generateId() {
	let newId = "";
	for (let i = 0; i < 20; i++) newId += CHARACTERS.charAt(Math.floor(Math.random() * 62));
	return newId;
}
//#endregion
//#region notifee/packages/react-native/src/utils/validate.ts
function isNull(value) {
	return value === null;
}
function isObject(value) {
	return value ? typeof value === "object" && !Array.isArray(value) && !isNull(value) : false;
}
function isFunction(value) {
	return value ? typeof value === "function" : false;
}
function isString(value) {
	return typeof value === "string";
}
function isNumber(value) {
	return typeof value === "number";
}
function isBoolean(value) {
	return typeof value === "boolean";
}
function isArray(value) {
	return Array.isArray(value);
}
function isArrayOfStrings(value) {
	if (!isArray(value)) return false;
	for (let i = 0; i < value.length; i++) if (!isString(value[i])) return false;
	return true;
}
function isUndefined(value) {
	return value === void 0;
}
function isValidEnum(value, enumType) {
	if (!Object.values(enumType).includes(value)) return false;
	return true;
}
//#endregion
//#region notifee/packages/react-native/src/utils/index.ts
function objectHasProperty(target, property) {
	return Object.hasOwnProperty.call(target, property);
}
const isIOS = react_native.Platform.OS === "ios";
const isAndroid = react_native.Platform.OS === "android";
const isWeb = react_native.Platform.OS === "web";
const kReactNativeNotifeeForegroundServiceHeadlessTask = "app.notifee.foreground-service-headless-task";
const kReactNativeNotifeeNotificationEvent = "app.notifee.notification-event";
const kReactNativeNotifeeNotificationBackgroundEvent = "app.notifee.notification-event-background";
let NotificationType = /* @__PURE__ */ function(NotificationType) {
	NotificationType[NotificationType["ALL"] = 0] = "ALL";
	NotificationType[NotificationType["DISPLAYED"] = 1] = "DISPLAYED";
	NotificationType[NotificationType["TRIGGER"] = 2] = "TRIGGER";
	return NotificationType;
}({});
//#endregion
//#region notifee/packages/react-native/src/validators/validate.ts
/**
* Validates any hexadecimal (optional transparency)
* @param color
* @returns {boolean}
*/
function isValidColor(color) {
	if (Object.values(AndroidColor).includes(color)) return true;
	if (!color.startsWith("#")) return false;
	const length = color.length - 1;
	return length === 6 || length === 8;
}
/**
* Checks the timestamp is at some point in the future.
* @param timestamp
* @returns {boolean}
*/
function isValidTimestamp(timestamp) {
	return timestamp > 0;
}
/**
* Ensures all values in the pattern are valid
* @param pattern {array}
*/
function isValidVibratePattern(pattern) {
	if (pattern.length % 2 !== 0) return false;
	for (let i = 0; i < pattern.length; i++) {
		const ms = pattern[i];
		if (!isNumber(ms)) return false;
		if (ms <= 0) return false;
	}
	return true;
}
function isValidLightPattern(pattern) {
	const [color, onMs, offMs] = pattern;
	if (!isValidColor(color)) return [false, "color"];
	if (!isNumber(onMs)) return [false, "onMs"];
	if (!isNumber(offMs)) return [false, "offMs"];
	if (onMs < 1) return [false, "onMs"];
	if (offMs < 1) return [false, "offMs"];
	return [true];
}
//#endregion
//#region notifee/packages/react-native/src/validators/validateAndroidStyle.ts
/**
* Validates a BigPictureStyle
*/
function validateAndroidBigPictureStyle(style) {
	if (!isString(style.picture) && !isNumber(style.picture) && !isObject(style.picture) || isString(style.picture) && !style.picture.length) throw new Error("'notification.android.style' BigPictureStyle: 'picture' expected a number or object created using the 'require()' method or a valid string URL.");
	const out = {
		type: AndroidStyle.BIGPICTURE,
		picture: style.picture
	};
	if (isNumber(style.picture) || isObject(style.picture)) out.picture = react_native.Image.resolveAssetSource(style.picture).uri;
	if (objectHasProperty(style, "largeIcon")) {
		if (style.largeIcon !== null && !isString(style.largeIcon) && !isNumber(style.largeIcon) && !isObject(style.largeIcon)) throw new Error("'notification.android.style' BigPictureStyle: 'largeIcon' expected a React Native ImageResource value or a valid string URL.");
		if (isNumber(style.largeIcon) || isObject(style.largeIcon)) out.largeIcon = react_native.Image.resolveAssetSource(style.largeIcon).uri;
		else out.largeIcon = style.largeIcon;
	}
	if (objectHasProperty(style, "title")) {
		if (!isString(style.title)) throw new Error("'notification.android.style' BigPictureStyle: 'title' expected a string value.");
		out.title = style.title;
	}
	if (objectHasProperty(style, "summary")) {
		if (!isString(style.summary)) throw new Error("'notification.android.style' BigPictureStyle: 'summary' expected a string value.");
		out.summary = style.summary;
	}
	return out;
}
/**
* Validates a BigTextStyle
*/
function validateAndroidBigTextStyle(style) {
	if (!isString(style.text) || !style.text) throw new Error("'notification.android.style' BigTextStyle: 'text' expected a valid string value.");
	const out = {
		type: AndroidStyle.BIGTEXT,
		text: style.text
	};
	if (objectHasProperty(style, "title")) {
		if (!isString(style.title)) throw new Error("'notification.android.style' BigTextStyle: 'title' expected a string value.");
		out.title = style.title;
	}
	if (objectHasProperty(style, "summary")) {
		if (!isString(style.summary)) throw new Error("'notification.android.style' BigTextStyle: 'summary' expected a string value.");
		out.summary = style.summary;
	}
	return out;
}
/**
* Validates a InboxStyle
*/
function validateAndroidInboxStyle(style) {
	if (!isArray(style.lines)) throw new Error("'notification.android.style' InboxStyle: 'lines' expected an array.");
	for (let i = 0; i < style.lines.length; i++) {
		const line = style.lines[i];
		if (!isString(line)) throw new Error(`'notification.android.style' InboxStyle: 'lines' expected a string value at array index ${i}.`);
	}
	const out = {
		type: AndroidStyle.INBOX,
		lines: style.lines
	};
	if (objectHasProperty(style, "title")) {
		if (!isString(style.title)) throw new Error("'notification.android.style' InboxStyle: 'title' expected a string value.");
		out.title = style.title;
	}
	if (objectHasProperty(style, "summary")) {
		if (!isString(style.summary)) throw new Error("'notification.android.style' InboxStyle: 'summary' expected a string value.");
		out.summary = style.summary;
	}
	return out;
}
/**
* Validates an AndroidPerson
*/
function validateAndroidPerson(person) {
	if (!isString(person.name)) throw new Error("'person.name' expected a string value.");
	const out = {
		name: person.name,
		bot: false,
		important: false
	};
	if (objectHasProperty(person, "id")) {
		if (!isString(person.id)) throw new Error("'person.id' expected a string value.");
		out.id = person.id;
	}
	if (objectHasProperty(person, "bot")) {
		if (!isBoolean(person.bot)) throw new Error("'person.bot' expected a boolean value.");
		out.bot = person.bot;
	}
	if (objectHasProperty(person, "important")) {
		if (!isBoolean(person.important)) throw new Error("'person.important' expected a boolean value.");
		out.important = person.important;
	}
	if (objectHasProperty(person, "icon")) {
		if (!isString(person.icon)) throw new Error("'person.icon' expected a string value.");
		out.icon = person.icon;
	}
	if (objectHasProperty(person, "uri")) {
		if (!isString(person.uri)) throw new Error("'person.uri' expected a string value.");
		out.uri = person.uri;
	}
	return out;
}
function validateAndroidMessagingStyleMessage(message) {
	if (!isString(message.text)) throw new Error("'message.text' expected a string value.");
	if (!isNumber(message.timestamp)) throw new Error("'message.timestamp' expected a number value.");
	const out = {
		text: message.text,
		timestamp: message.timestamp
	};
	if (objectHasProperty(message, "person") && message.person !== void 0) try {
		out.person = validateAndroidPerson(message.person);
	} catch (e) {
		throw new Error(`'message.person' is invalid. ${e.message}`);
	}
	return out;
}
/**
* Validates a MessagingStyle
*/
function validateAndroidMessagingStyle(style) {
	if (!isObject(style.person)) throw new Error("'notification.android.style' MessagingStyle: 'person' an object value.");
	let person;
	const messages = [];
	try {
		person = validateAndroidPerson(style.person);
	} catch (e) {
		throw new Error(`'notification.android.style' MessagingStyle: ${e.message}.`);
	}
	if (!isArray(style.messages)) throw new Error("'notification.android.style' MessagingStyle: 'messages' expected an array value.");
	for (let i = 0; i < style.messages.length; i++) try {
		messages.push(validateAndroidMessagingStyleMessage(style.messages[i]));
	} catch (e) {
		throw new Error(`'notification.android.style' MessagingStyle: invalid message at index ${i}. ${e.message}`);
	}
	const out = {
		type: AndroidStyle.MESSAGING,
		person,
		messages,
		group: false
	};
	if (objectHasProperty(style, "title")) {
		if (!isString(style.title)) throw new Error("'notification.android.style' MessagingStyle: 'title' expected a string value.");
		out.title = style.title;
	}
	if (objectHasProperty(style, "group")) {
		if (!isBoolean(style.group)) throw new Error("'notification.android.style' MessagingStyle: 'group' expected a boolean value.");
		out.group = style.group;
	}
	return out;
}
//#endregion
//#region notifee/packages/react-native/src/validators/validateAndroidPressAction.ts
const LAUNCH_ACTIVITY_DEFAULT_VALUE$1 = "default";
const PRESS_ACTION_DEFAULT_VALUE$1 = "default";
function validateAndroidPressAction(pressAction) {
	if (!isObject(pressAction)) throw new Error("'pressAction' expected an object value.");
	if (!isString(pressAction.id) || pressAction.id.length === 0) throw new Error("'id' expected a non-empty string value.");
	const out = { id: pressAction.id };
	if (!isUndefined(pressAction.launchActivity)) {
		if (!isString(pressAction.launchActivity)) throw new Error("'launchActivity' expected a string value.");
		out.launchActivity = pressAction.launchActivity;
	} else if (pressAction.id === PRESS_ACTION_DEFAULT_VALUE$1) out.launchActivity = LAUNCH_ACTIVITY_DEFAULT_VALUE$1;
	if (!isUndefined(pressAction.launchActivityFlags)) {
		if (!isArray(pressAction.launchActivityFlags)) throw new Error("'launchActivityFlags' must be an array of `AndroidLaunchActivityFlag` values.");
		if (pressAction.launchActivityFlags.length) {
			if (!isNumber(pressAction.launchActivityFlags[0])) throw new Error("'launchActivityFlags' must be an array of `AndroidLaunchActivityFlag` values.");
		}
		out.launchActivityFlags = pressAction.launchActivityFlags;
	}
	if (!isUndefined(pressAction.mainComponent)) {
		if (!isString(pressAction.mainComponent)) throw new Error("'mainComponent' expected a string value.");
		out.mainComponent = pressAction.mainComponent;
	}
	return out;
}
//#endregion
//#region notifee/packages/react-native/src/validators/validateAndroidFullScreenAction.ts
const LAUNCH_ACTIVITY_DEFAULT_VALUE = "default";
const PRESS_ACTION_DEFAULT_VALUE = "default";
function validateAndroidFullScreenAction(fullScreenAction) {
	if (!isObject(fullScreenAction)) throw new Error("'fullScreenAction' expected an object value.");
	if (!isString(fullScreenAction.id) || fullScreenAction.id.length === 0) throw new Error("'id' expected a non-empty string value.");
	const out = { id: fullScreenAction.id };
	if (!isUndefined(fullScreenAction.launchActivity)) {
		if (!isString(fullScreenAction.launchActivity)) throw new Error("'launchActivity' expected a string value.");
		out.launchActivity = fullScreenAction.launchActivity;
	} else if (fullScreenAction.id === PRESS_ACTION_DEFAULT_VALUE) out.launchActivity = LAUNCH_ACTIVITY_DEFAULT_VALUE;
	if (!isUndefined(fullScreenAction.launchActivityFlags)) {
		if (!isArray(fullScreenAction.launchActivityFlags)) throw new Error("'launchActivityFlags' must be an array of `AndroidLaunchActivityFlag` values.");
		if (fullScreenAction.launchActivityFlags.length) {
			if (!isNumber(fullScreenAction.launchActivityFlags[0])) throw new Error("'launchActivityFlags' must be an array of `AndroidLaunchActivityFlag` values.");
		}
		out.launchActivityFlags = fullScreenAction.launchActivityFlags;
	}
	if (!isUndefined(fullScreenAction.mainComponent)) {
		if (!isString(fullScreenAction.mainComponent)) throw new Error("'mainComponent' expected a string value.");
		out.mainComponent = fullScreenAction.mainComponent;
	}
	return out;
}
//#endregion
//#region notifee/packages/react-native/src/validators/validateAndroidInput.ts
function validateAndroidInput(input) {
	const out = {
		allowFreeFormInput: true,
		allowGeneratedReplies: true
	};
	if (!input) return out;
	if (objectHasProperty(input, "allowFreeFormInput")) {
		if (!isBoolean(input.allowFreeFormInput)) throw new Error("'input.allowFreeFormInput' expected a boolean value.");
		out.allowFreeFormInput = input.allowFreeFormInput;
	}
	if (objectHasProperty(input, "allowGeneratedReplies")) {
		if (!isBoolean(input.allowGeneratedReplies)) throw new Error("'input.allowGeneratedReplies' expected a boolean value.");
		out.allowGeneratedReplies = input.allowGeneratedReplies;
	}
	if (!out.allowFreeFormInput && (!input.choices || input.choices.length === 0)) throw new Error("'input.allowFreeFormInput' when false, you must provide at least one choice.");
	if (objectHasProperty(input, "choices")) {
		if (!isArrayOfStrings(input.choices) || input.choices.length === 0) throw new Error("'input.choices' expected an array of string values.");
		out.choices = input.choices;
	}
	if (objectHasProperty(input, "editableChoices")) {
		if (!isBoolean(input.editableChoices)) throw new Error("'input.editableChoices' expected a boolean value.");
		out.editableChoices = input.editableChoices;
	}
	if (objectHasProperty(input, "placeholder")) {
		if (!isString(input.placeholder)) throw new Error("'input.placeholder' expected a string value.");
		out.placeholder = input.placeholder;
	}
	if (out.editableChoices && !out.allowFreeFormInput) throw new Error("'input.editableChoices' when true, allowFreeFormInput must also be true.");
	return out;
}
//#endregion
//#region notifee/packages/react-native/src/validators/validateAndroidAction.ts
function validateAndroidAction(action) {
	if (!isObject(action)) throw new Error("'action' expected an object value.");
	if (!isString(action.title) || !action.title) throw new Error("'action.title' expected a string value.");
	let pressAction;
	try {
		pressAction = validateAndroidPressAction(action.pressAction);
	} catch (e) {
		throw new Error(`'action' ${e.message}.`);
	}
	const out = {
		title: action.title,
		pressAction
	};
	if (objectHasProperty(action, "icon") && !isUndefined(action.icon)) {
		if (!isString(action.icon) || !action.icon) throw new Error("'action.icon' expected a string value.");
		out.icon = action.icon;
	}
	if (objectHasProperty(action, "input") && !isUndefined(action.input)) if (action.input === true) out.input = validateAndroidInput();
	else try {
		out.input = validateAndroidInput(action.input);
	} catch (e) {
		throw new Error(`'action.input' ${e.message}.`);
	}
	return out;
}
//#endregion
//#region notifee/packages/react-native/src/validators/validateAndroidNotification.ts
function validateAndroidNotification(android) {
	const out = {
		autoCancel: true,
		asForegroundService: false,
		lightUpScreen: false,
		badgeIconType: AndroidBadgeIconType.LARGE,
		colorized: false,
		chronometerDirection: "up",
		defaults: [AndroidDefaults.ALL],
		groupAlertBehavior: AndroidGroupAlertBehavior.ALL,
		groupSummary: false,
		localOnly: false,
		ongoing: false,
		loopSound: false,
		onlyAlertOnce: false,
		importance: AndroidImportance.DEFAULT,
		showTimestamp: false,
		smallIcon: "ic_launcher",
		showChronometer: false,
		visibility: AndroidVisibility.PRIVATE,
		circularLargeIcon: false
	};
	if (isIOS && !__DEV__) return out;
	if (isUndefined(android)) return out;
	if (!isUndefined(android) && !isObject(android)) throw new Error("'notification.android' expected an object value.");
	/**
	* actions
	*/
	if (objectHasProperty(android, "actions") && android.actions !== void 0) {
		if (!isArray(android.actions)) throw new Error("'notification.android.actions' expected an array of AndroidAction types.");
		const actions = [];
		try {
			for (let i = 0; i < android.actions.length; i++) actions.push(validateAndroidAction(android.actions[i]));
		} catch (e) {
			throw new Error(`'notification.android.actions' invalid AndroidAction. ${e.message}.`);
		}
		if (actions.length) out.actions = actions;
	}
	/**
	* asForegroundService
	*/
	if (objectHasProperty(android, "asForegroundService")) {
		if (!isBoolean(android.asForegroundService)) throw new Error("'notification.android.asForegroundService' expected a boolean value.");
		out.asForegroundService = android.asForegroundService;
	}
	/**
	* lightUpScreen
	*/
	if (objectHasProperty(android, "lightUpScreen")) {
		if (!isBoolean(android.lightUpScreen)) throw new Error("'notification.android.lightUpScreen' expected a boolean value.");
		out.lightUpScreen = android.lightUpScreen;
	}
	/**
	* autoCancel
	*/
	if (objectHasProperty(android, "autoCancel")) {
		if (!isBoolean(android.autoCancel)) throw new Error("'notification.android.autoCancel' expected a boolean value.");
		out.autoCancel = android.autoCancel;
	}
	/**
	* badgeCount
	*/
	if (objectHasProperty(android, "badgeCount")) {
		if (!isNumber(android.badgeCount)) throw new Error("'notification.android.badgeCount' expected a number value.");
		out.badgeCount = android.badgeCount;
	}
	/**
	* badgeIconType
	*/
	if (objectHasProperty(android, "badgeIconType") && !isUndefined(android.badgeIconType)) {
		if (!Object.values(AndroidBadgeIconType).includes(android.badgeIconType)) throw new Error("'notification.android.badgeIconType' expected a valid AndroidBadgeIconType.");
		out.badgeIconType = android.badgeIconType;
	}
	/**
	* category
	*/
	if (objectHasProperty(android, "category") && !isUndefined(android.category)) {
		if (!Object.values(AndroidCategory).includes(android.category)) throw new Error("'notification.android.category' expected a valid AndroidCategory.");
		out.category = android.category;
	}
	/**
	* channelId
	*/
	if (!isString(android.channelId)) throw new Error("'notification.android.channelId' expected a string value.");
	out.channelId = android.channelId;
	/**
	* color
	*/
	if (objectHasProperty(android, "color") && !isUndefined(android.color)) {
		if (!isString(android.color)) throw new Error("'notification.android.color' expected a string value.");
		if (!isValidColor(android.color)) throw new Error("'notification.android.color' invalid color. Expected an AndroidColor or hexadecimal string value.");
		out.color = android.color;
	}
	/**
	* colorized
	*/
	if (objectHasProperty(android, "colorized")) {
		if (!isBoolean(android.colorized)) throw new Error("'notification.android.colorized' expected a boolean value.");
		out.colorized = android.colorized;
	}
	/**
	* chronometerDirection
	*/
	if (objectHasProperty(android, "chronometerDirection")) {
		if (!isString(android.chronometerDirection)) throw new Error("'notification.android.chronometerDirection' expected a string value.");
		if (android.chronometerDirection !== "up" && android.chronometerDirection !== "down") throw new Error(`'notification.android.chronometerDirection' must be one of "up" or "down".`);
		out.chronometerDirection = android.chronometerDirection;
	}
	/**
	* defaults
	*/
	if (objectHasProperty(android, "defaults") && !isUndefined(android.defaults)) {
		if (!isArray(android.defaults)) throw new Error("'notification.android.defaults' expected an array.");
		if (android.defaults.length === 0) throw new Error("'notification.android.defaults' expected an array containing AndroidDefaults.");
		const defaults = Object.values(AndroidDefaults);
		for (let i = 0; i < android.defaults.length; i++) if (!defaults.includes(android.defaults[i])) throw new Error("'notification.android.defaults' invalid array value, expected an AndroidDefaults value.");
		out.defaults = android.defaults;
	}
	/**
	* groupId
	*/
	if (objectHasProperty(android, "groupId")) {
		if (!isString(android.groupId)) throw new Error("'notification.android.groupId' expected a string value.");
		out.groupId = android.groupId;
	}
	/**
	* groupAlertBehavior
	*/
	if (objectHasProperty(android, "groupAlertBehavior") && !isUndefined(android.groupAlertBehavior)) {
		if (!Object.values(AndroidGroupAlertBehavior).includes(android.groupAlertBehavior)) throw new Error("'notification.android.groupAlertBehavior' expected a valid AndroidGroupAlertBehavior.");
		out.groupAlertBehavior = android.groupAlertBehavior;
	}
	/**
	* groupSummary
	*/
	if (objectHasProperty(android, "groupSummary")) {
		if (!isBoolean(android.groupSummary)) throw new Error("'notification.android.groupSummary' expected a boolean value.");
		out.groupSummary = android.groupSummary;
	}
	if (objectHasProperty(android, "inputHistory")) {
		if (!isArrayOfStrings(android.inputHistory)) throw new Error("'notification.android.inputHistory' expected an array of string values.");
		out.inputHistory = android.inputHistory;
	}
	/**
	* largeIcon
	*/
	if (objectHasProperty(android, "largeIcon")) {
		if (!isNumber(android.largeIcon) && !isString(android.largeIcon) && !isObject(android.largeIcon) || isString(android.largeIcon) && !android.largeIcon.length) throw new Error("'notification.android.largeIcon' expected a React Native ImageResource value or a valid string URL.");
		if (isNumber(android.largeIcon) || isObject(android.largeIcon)) out.largeIcon = react_native.Image.resolveAssetSource(android.largeIcon).uri;
		else out.largeIcon = android.largeIcon;
		if (isBoolean(android.circularLargeIcon)) out.circularLargeIcon = android.circularLargeIcon;
	}
	/**
	* lights
	*/
	if (objectHasProperty(android, "lights") && !isUndefined(android.lights)) {
		if (!isArray(android.lights)) throw new Error("'notification.android.lights' expected an array value containing the color, on ms and off ms.");
		const [valid, property] = isValidLightPattern(android.lights);
		if (!valid) switch (property) {
			case "color": throw new Error("'notification.android.lights' invalid color. Expected an AndroidColor or hexadecimal string value.");
			case "onMs": throw new Error(`'notification.android.lights' invalid "on" millisecond value, expected a number greater than 0.`);
			case "offMs": throw new Error(`'notification.android.lights' invalid "off" millisecond value, expected a number greater than 0.`);
		}
		out.lights = android.lights;
	}
	/**
	* localOnly
	*/
	if (objectHasProperty(android, "localOnly")) {
		if (!isBoolean(android.localOnly)) throw new Error("'notification.android.localOnly' expected a boolean value.");
		out.localOnly = android.localOnly;
	}
	/**
	* ongoing
	*/
	if (objectHasProperty(android, "ongoing")) {
		if (!isBoolean(android.ongoing)) throw new Error("'notification.android.ongoing' expected a boolean value.");
		out.ongoing = android.ongoing;
	}
	/**
	* loopSound
	*/
	if (objectHasProperty(android, "loopSound")) {
		if (!isBoolean(android.loopSound)) throw new Error("'notification.android.loopSound' expected a boolean value.");
		out.loopSound = android.loopSound;
	}
	/**
	* foregroundServiceTypes
	*/
	if (objectHasProperty(android, "foregroundServiceTypes") && !isUndefined(android.foregroundServiceTypes)) {
		if (!isArray(android.foregroundServiceTypes)) throw new Error("'notification.android.foregroundServiceTypes' expected an array.");
		if (android.foregroundServiceTypes.length === 0) throw new Error("'notification.android.foregroundServiceTypes' expected a non empty array containing AndroidForegroundServiceType.");
		const defaults = Object.values(AndroidForegroundServiceType);
		for (let i = 0; i < android.foregroundServiceTypes.length; i++) if (!defaults.includes(android.foregroundServiceTypes[i])) throw new Error("'notification.android.foregroundServiceTypes' invalid array value, expected an AndroidForegroundServiceType value.");
		out.foregroundServiceTypes = android.foregroundServiceTypes;
	}
	/**
	* flags
	*/
	if (objectHasProperty(android, "flags") && !isUndefined(android.flags)) {
		if (!isArray(android.flags)) throw new Error("'notification.android.flags' expected an array.");
		if (android.flags.length === 0) throw new Error("'notification.android.flags' expected an array containing AndroidDefaults.");
		const defaults = Object.values(AndroidFlags);
		for (let i = 0; i < android.flags.length; i++) if (!defaults.includes(android.flags[i])) throw new Error("'notification.android.flags' invalid array value, expected an AndroidFlags value.");
		out.flags = android.flags;
	}
	/**
	* onlyAlertOnce
	*/
	if (objectHasProperty(android, "onlyAlertOnce")) {
		if (!isBoolean(android.onlyAlertOnce)) throw new Error("'notification.android.onlyAlertOnce' expected a boolean value.");
		out.onlyAlertOnce = android.onlyAlertOnce;
	}
	/**
	* pressAction
	*/
	if (objectHasProperty(android, "pressAction") && !isUndefined(android.pressAction)) try {
		out.pressAction = validateAndroidPressAction(android.pressAction);
	} catch (e) {
		throw new Error(`'notification.android.pressAction' ${e.message}`);
	}
	/**
	* fullScreenAction
	*/
	if (objectHasProperty(android, "fullScreenAction") && !isUndefined(android.fullScreenAction)) try {
		out.fullScreenAction = validateAndroidFullScreenAction(android.fullScreenAction);
	} catch (e) {
		throw new Error(`'notification.android.fullScreenAction' ${e.message}`);
	}
	/**
	* importance
	*/
	if (objectHasProperty(android, "importance") && !isUndefined(android.importance)) {
		if (!Object.values(AndroidImportance).includes(android.importance)) throw new Error("'notification.android.importance' expected a valid Importance.");
		out.importance = android.importance;
	}
	/**
	* progress
	*/
	if (objectHasProperty(android, "progress") && !isUndefined(android.progress)) {
		if (!isObject(android.progress)) throw new Error("'notification.android.progress' expected an object value.");
		const progress = { indeterminate: false };
		if (objectHasProperty(android.progress, "indeterminate")) {
			if (!isBoolean(android.progress.indeterminate)) throw new Error("'notification.android.progress.indeterminate' expected a boolean value.");
			progress.indeterminate = android.progress.indeterminate;
		}
		if (!isUndefined(android.progress.max)) {
			if (!isNumber(android.progress.max) || android.progress.max < 0) throw new Error("'notification.android.progress.max' expected a positive number value.");
			if (isUndefined(android.progress.current)) throw new Error("'notification.android.progress.max' when providing a max value, you must also specify a current value.");
			progress.max = android.progress.max;
		}
		if (!isUndefined(android.progress.current)) {
			if (!isNumber(android.progress.current) || android.progress.current < 0) throw new Error("'notification.android.progress.current' expected a positive number value.");
			if (isUndefined(android.progress.max)) throw new Error("'notification.android.progress.current' when providing a current value, you must also specify a `max` value.");
			progress.current = android.progress.current;
		}
		if (!isUndefined(progress.max) && !isUndefined(progress.current)) {
			if (progress.current > progress.max) throw new Error("'notification.android.progress' the current value cannot be greater than the max value.");
		}
		out.progress = progress;
	}
	/**
	* showTimestamp
	*/
	if (objectHasProperty(android, "showTimestamp")) {
		if (!isBoolean(android.showTimestamp)) throw new Error("'notification.android.showTimestamp' expected a boolean value.");
		out.showTimestamp = android.showTimestamp;
	}
	/**
	* smallIcon
	*/
	if (objectHasProperty(android, "smallIcon") && !isUndefined(android.smallIcon)) {
		if (!isString(android.smallIcon)) throw new Error("'notification.android.smallIcon' expected value to be a string.");
		out.smallIcon = android.smallIcon;
	}
	/**
	* smallIconLevel
	*/
	if (objectHasProperty(android, "smallIconLevel") && !isUndefined(android.smallIcon)) {
		if (!isNumber(android.smallIconLevel)) throw new Error("'notification.android.smallIconLevel' expected value to be a number.");
		out.smallIconLevel = android.smallIconLevel;
	}
	/**
	* sortKey
	*/
	if (objectHasProperty(android, "sortKey")) {
		if (!isString(android.sortKey)) throw new Error("'notification.android.sortKey' expected a string value.");
		out.sortKey = android.sortKey;
	}
	/**
	* style
	*/
	if (objectHasProperty(android, "style") && !isUndefined(android.style)) {
		if (!isObject(android.style)) throw new Error("'notification.android.style' expected an object value.");
		switch (android.style.type) {
			case AndroidStyle.BIGPICTURE:
				out.style = validateAndroidBigPictureStyle(android.style);
				break;
			case AndroidStyle.BIGTEXT:
				out.style = validateAndroidBigTextStyle(android.style);
				break;
			case AndroidStyle.INBOX:
				out.style = validateAndroidInboxStyle(android.style);
				break;
			case AndroidStyle.MESSAGING:
				out.style = validateAndroidMessagingStyle(android.style);
				break;
			default: throw new Error("'notification.android.style' style type must be one of AndroidStyle.BIGPICTURE, AndroidStyle.BIGTEXT, AndroidStyle.INBOX or AndroidStyle.MESSAGING.");
		}
	}
	/**
	* tag
	*/
	if (objectHasProperty(android, "tag") && android.tag !== void 0) {
		if (!isString(android.tag)) throw new Error("'notification.android.tag' expected a string value.");
		if (android.tag.includes("|")) throw new Error(`'notification.android.tag' tag cannot contain the "|" (pipe) character.`);
		out.tag = android.tag;
	}
	/**
	* ticker
	*/
	if (objectHasProperty(android, "ticker")) {
		if (!isString(android.ticker)) throw new Error("'notification.android.ticker' expected a string value.");
		out.ticker = android.ticker;
	}
	/**
	* timeoutAfter
	*/
	if (objectHasProperty(android, "timeoutAfter") && android.timeoutAfter !== void 0) {
		if (!isNumber(android.timeoutAfter)) throw new Error("'notification.android.timeoutAfter' expected a number value.");
		if (!isValidTimestamp(android.timeoutAfter)) throw new Error("'notification.android.timeoutAfter' invalid millisecond timestamp.");
		out.timeoutAfter = android.timeoutAfter;
	}
	/**
	* showChronometer
	*/
	if (objectHasProperty(android, "showChronometer")) {
		if (!isBoolean(android.showChronometer)) throw new Error("'notification.android.showChronometer' expected a boolean value.");
		out.showChronometer = android.showChronometer;
	}
	/**
	* vibrationPattern
	*/
	if (objectHasProperty(android, "vibrationPattern") && android.vibrationPattern !== void 0) {
		if (!isArray(android.vibrationPattern) || !isValidVibratePattern(android.vibrationPattern)) throw new Error("'notification.android.vibrationPattern' expected an array containing an even number of positive values.");
		out.vibrationPattern = android.vibrationPattern;
	}
	/**
	* visibility
	*/
	if (objectHasProperty(android, "visibility") && android.visibility !== void 0) {
		if (!Object.values(AndroidVisibility).includes(android.visibility)) throw new Error("'notification.android.visibility' expected a valid AndroidVisibility value.");
		out.visibility = android.visibility;
	}
	/**
	* timestamp
	*/
	if (objectHasProperty(android, "timestamp") && android.timestamp !== void 0) {
		if (!isNumber(android.timestamp)) throw new Error("'notification.android.timestamp' expected a number value.");
		if (!isValidTimestamp(android.timestamp)) throw new Error("'notification.android.timestamp' invalid millisecond timestamp, date must be a positive number");
		out.timestamp = android.timestamp;
	}
	/**
	* sound
	*/
	if (objectHasProperty(android, "sound") && android.sound !== void 0) {
		if (!isString(android.sound)) throw new Error("'notification.sound' expected a valid sound string.");
		out.sound = android.sound;
	}
	return out;
}
//#endregion
//#region notifee/packages/react-native/src/validators/iosCommunicationInfo/validateIOSCommunicationInfoPerson.ts
function validateIOSCommunicationInfoPerson(person) {
	if (!isObject(person)) throw new Error("'person' expected an object.");
	if (!isString(person.id) || person.id.length === 0) throw new Error("\"person.id\" expected a valid string value.");
	if (!isString(person.displayName) || person.displayName.length === 0) throw new Error("\"person.displayName\" expected a valid string value.");
	const out = {
		id: person.id,
		displayName: person.displayName
	};
	if (objectHasProperty(person, "avatar") && !isUndefined(person.avatar)) {
		if (!isString(person.avatar)) throw new Error("\"person.avatar\" expected a valid object value.");
		out.avatar = person.avatar;
	}
	return out;
}
//#endregion
//#region notifee/packages/react-native/src/validators/iosCommunicationInfo/validateIOSCommunicationInfo.ts
function validateIOSCommunicationInfo(communicationInfo) {
	if (!isObject(communicationInfo)) throw new Error("expected an object.");
	if (!isString(communicationInfo.conversationId) || communicationInfo.conversationId.length === 0) throw new Error("'conversationId' expected a valid string value.");
	if (!communicationInfo.sender || !isObject(communicationInfo.sender)) throw new Error("'sender' expected a valid object value.");
	let sender;
	try {
		sender = validateIOSCommunicationInfoPerson(communicationInfo.sender);
	} catch (e) {
		throw new Error(`'sender' ${e.message}.`);
	}
	const out = {
		conversationId: communicationInfo.conversationId,
		sender
	};
	if (communicationInfo.body) {
		if (!isString(communicationInfo.body)) throw new Error("'body' expected a valid string value.");
		out.body = communicationInfo.body;
	}
	if (communicationInfo.groupName) {
		if (!isString(communicationInfo.groupName)) throw new Error("'groupName' expected a valid string value.");
		out.groupName = communicationInfo.groupName;
	}
	if (communicationInfo.groupAvatar) {
		if (!isString(communicationInfo.groupAvatar)) throw new Error("'groupAvatar' expected a valid string value.");
		out.groupAvatar = communicationInfo.groupAvatar;
	}
	return out;
}
//#endregion
//#region notifee/packages/react-native/src/validators/validateIOSAttachment.ts
function validateIOSAttachment(attachment) {
	if (!isObject(attachment)) throw new Error("'attachment' expected an object value.");
	if (!isString(attachment.url) && !isNumber(attachment.url) && !isObject(attachment.url) || isString(attachment.url) && !attachment.url.length) throw new Error("'attachment.url' expected a React Native ImageResource value or a valid string URL.");
	const out = {
		url: attachment.url,
		thumbnailHidden: false
	};
	if (isNumber(attachment.url) || isObject(attachment.url)) out.url = react_native.Image.resolveAssetSource(attachment.url).uri;
	if (objectHasProperty(attachment, "id") && !isUndefined(attachment.id)) {
		if (!isString(attachment.id)) throw new Error("'attachment.id' expected a string value.");
		out.id = attachment.id;
	} else out.id = generateId();
	if (objectHasProperty(attachment, "typeHint") && !isUndefined(attachment.typeHint)) {
		if (!isString(attachment.typeHint)) throw new Error("'attachment.typeHint' expected a string value.");
		out.typeHint = attachment.typeHint;
	}
	if (objectHasProperty(attachment, "thumbnailClippingRect") && !isUndefined(attachment.thumbnailClippingRect)) try {
		out.thumbnailClippingRect = validateThumbnailClippingRect(attachment.thumbnailClippingRect);
	} catch (e) {
		throw new Error(`'attachment.thumbnailClippingRect' is invalid. ${e.message}`);
	}
	if (objectHasProperty(attachment, "thumbnailHidden") && !isUndefined(attachment.thumbnailHidden)) {
		if (!isBoolean(attachment.thumbnailHidden)) throw new Error("'attachment.thumbnailHidden' must be a boolean value if specified.");
		out.thumbnailHidden = attachment.thumbnailHidden;
	}
	if (objectHasProperty(attachment, "thumbnailTime") && !isUndefined(attachment.thumbnailTime)) if (!isNumber(attachment.thumbnailTime)) throw new Error("'attachment.thumbnailTime' must be a number value if specified.");
	else out.thumbnailTime = attachment.thumbnailTime;
	return out;
}
/**
* Validates a ThumbnailClippingRect
*/
function validateThumbnailClippingRect(thumbnailClippingRect) {
	if (objectHasProperty(thumbnailClippingRect, "x")) {
		if (!isNumber(thumbnailClippingRect.x)) throw new Error("'thumbnailClippingRect.x' expected a number value.");
	}
	if (objectHasProperty(thumbnailClippingRect, "y")) {
		if (!isNumber(thumbnailClippingRect.y)) throw new Error("'thumbnailClippingRect.y' expected a number value.");
	}
	if (objectHasProperty(thumbnailClippingRect, "width")) {
		if (!isNumber(thumbnailClippingRect.width)) throw new Error("'thumbnailClippingRect.width' expected a number value.");
	}
	if (objectHasProperty(thumbnailClippingRect, "height")) {
		if (!isNumber(thumbnailClippingRect.height)) throw new Error("'thumbnailClippingRect.height' expected a number value.");
	}
	return {
		x: thumbnailClippingRect.x,
		y: thumbnailClippingRect.y,
		height: thumbnailClippingRect.height,
		width: thumbnailClippingRect.width
	};
}
//#endregion
//#region notifee/packages/react-native/src/validators/validateIOSNotification.ts
function validateIOSNotification(ios) {
	const out = { foregroundPresentationOptions: {
		alert: true,
		badge: true,
		sound: true,
		banner: true,
		list: true
	} };
	if (isUndefined(ios)) return out;
	if (isAndroid && !__DEV__) return out;
	/**
	* attachments
	*/
	if (objectHasProperty(ios, "attachments")) {
		if (!isArray(ios.attachments)) throw new Error("'notification.ios.attachments' expected an array value.");
		const attachments = [];
		for (let i = 0; i < ios.attachments.length; i++) try {
			attachments.push(validateIOSAttachment(ios.attachments[i]));
		} catch (e) {
			throw new Error(`'notification.ios.attachments' invalid IOSNotificationAttachment. ${e.message}.`);
		}
		if (attachments.length) out.attachments = attachments;
	}
	/**
	* communicationInfo
	*/
	if (objectHasProperty(ios, "communicationInfo") && !isUndefined(ios.communicationInfo)) try {
		out.communicationInfo = validateIOSCommunicationInfo(ios.communicationInfo);
	} catch (e) {
		throw new Error(`'ios.communicationInfo' ${e.message}`);
	}
	/**
	* interruptionLevel
	*/
	if (objectHasProperty(ios, "interruptionLevel")) if (isString(ios.interruptionLevel) && [
		"active",
		"critical",
		"passive",
		"timeSensitive"
	].includes(ios.interruptionLevel)) out.interruptionLevel = ios.interruptionLevel;
	else throw new Error("'notification.ios.interruptionLevel' must be a string value: 'active','critical','passive','timeSensitive'.");
	/**
	* critical
	*/
	if (objectHasProperty(ios, "critical")) if (!isBoolean(ios.critical)) throw new Error("'notification.ios.critical' must be a boolean value if specified.");
	else out.critical = ios.critical;
	/**
	* criticalVolume
	*/
	if (objectHasProperty(ios, "criticalVolume")) if (!isNumber(ios.criticalVolume)) throw new Error("'notification.ios.criticalVolume' must be a number value if specified.");
	else {
		if (ios.criticalVolume < 0 || ios.criticalVolume > 1) throw new Error("'notification.ios.criticalVolume' must be a float value between 0.0 and 1.0.");
		out.criticalVolume = ios.criticalVolume;
	}
	/**
	* sound
	*/
	if (objectHasProperty(ios, "sound")) if (isString(ios.sound)) out.sound = ios.sound;
	else throw new Error("'notification.sound' must be a string value if specified.");
	/**
	* badgeCount
	*/
	if (objectHasProperty(ios, "badgeCount")) {
		if (!isNumber(ios.badgeCount) || ios.badgeCount < 0) throw new Error("'notification.ios.badgeCount' expected a number value >=0.");
		out.badgeCount = ios.badgeCount;
	}
	/**
	* categoryId
	*/
	if (objectHasProperty(ios, "categoryId")) {
		if (!isString(ios.categoryId)) throw new Error("'notification.ios.categoryId' expected a of string value");
		out.categoryId = ios.categoryId;
	}
	/**
	* groupId
	*/
	if (objectHasProperty(ios, "threadId")) {
		if (!isString(ios.threadId)) throw new Error("'notification.ios.threadId' expected a string value.");
		out.threadId = ios.threadId;
	}
	/**
	* summaryArgument
	*/
	if (objectHasProperty(ios, "summaryArgument")) {
		if (!isString(ios.summaryArgument)) throw new Error("'notification.ios.summaryArgument' expected a string value.");
		out.summaryArgument = ios.summaryArgument;
	}
	/**
	* summaryArgumentCount
	*/
	if (objectHasProperty(ios, "summaryArgumentCount")) {
		if (!isNumber(ios.summaryArgumentCount) || ios.summaryArgumentCount <= 0) throw new Error("'notification.ios.summaryArgumentCount' expected a positive number greater than 0.");
		out.summaryArgumentCount = ios.summaryArgumentCount;
	}
	/**
	* launchImageName
	*/
	if (objectHasProperty(ios, "launchImageName")) {
		if (!isString(ios.launchImageName)) throw new Error("'notification.ios.launchImageName' expected a string value.");
		out.launchImageName = ios.launchImageName;
	}
	/**
	* sound
	*/
	if (objectHasProperty(ios, "sound")) {
		if (!isString(ios.sound)) throw new Error("'notification.ios.sound' expected a string value.");
		out.sound = ios.sound;
	}
	/**
	* ForegroundPresentationOptions
	*/
	if (objectHasProperty(ios, "foregroundPresentationOptions")) {
		if (!isObject(ios.foregroundPresentationOptions)) throw new Error("'notification.ios.foregroundPresentationOptions' expected a valid IOSForegroundPresentationOptions object.");
		if (objectHasProperty(ios.foregroundPresentationOptions, "alert")) {
			if (!isBoolean(ios.foregroundPresentationOptions.alert)) throw new Error("'notification.ios.foregroundPresentationOptions.alert' expected a boolean value.");
			out.foregroundPresentationOptions.alert = ios.foregroundPresentationOptions.alert;
		}
		if (objectHasProperty(ios.foregroundPresentationOptions, "sound")) {
			if (!isBoolean(ios.foregroundPresentationOptions.sound)) throw new Error("'notification.ios.foregroundPresentationOptions.sound' expected a boolean value.");
			out.foregroundPresentationOptions.sound = ios.foregroundPresentationOptions.sound;
		}
		if (objectHasProperty(ios.foregroundPresentationOptions, "badge")) {
			if (!isBoolean(ios.foregroundPresentationOptions.badge)) throw new Error("'notification.ios.foregroundPresentationOptions.badge' expected a boolean value.");
			out.foregroundPresentationOptions.badge = ios.foregroundPresentationOptions.badge;
		}
		if (objectHasProperty(ios.foregroundPresentationOptions, "banner")) {
			if (!isBoolean(ios.foregroundPresentationOptions.banner)) throw new Error("'notification.ios.foregroundPresentationOptions.banner' expected a boolean value.");
			out.foregroundPresentationOptions.banner = ios.foregroundPresentationOptions.banner;
		}
		if (objectHasProperty(ios.foregroundPresentationOptions, "list")) {
			if (!isBoolean(ios.foregroundPresentationOptions.list)) throw new Error("'notification.ios.foregroundPresentationOptions.list' expected a boolean value.");
			out.foregroundPresentationOptions.list = ios.foregroundPresentationOptions.list;
		}
	}
	return out;
}
//#endregion
//#region notifee/packages/react-native/src/validators/validateNotification.ts
/**
* Validate platform-specific notification
*
* Only throws a validation error if the device is on the same platform
* Otherwise, will show a debug log in the console
*/
const validatePlatformSpecificNotification = (out, specifiedPlatform) => {
	try {
		if (specifiedPlatform === "ios") return validateIOSNotification(out.ios);
		else return validateAndroidNotification(out.android);
	} catch (error) {
		if (specifiedPlatform === react_native.Platform.OS) throw error;
		else {
			console.debug(`Invalid ${specifiedPlatform} notification ->`, error);
			return {};
		}
	}
};
function validateNotification(notification) {
	if (!isObject(notification)) throw new Error("'notification' expected an object value.");
	const out = {
		id: "",
		data: {}
	};
	if (isAndroid)
 /* istanbul ignore next */
	out.android = {};
	else if (isIOS) out.ios = {};
	/**
	* id
	*/
	if (objectHasProperty(notification, "id")) {
		if (!isString(notification.id) || !notification.id) throw new Error("'notification.id' invalid notification ID, expected a unique string value.");
		out.id = notification.id;
	} else out.id = generateId();
	/**
	* title
	*/
	if (objectHasProperty(notification, "title")) {
		if (notification.title !== void 0 && !isString(notification.title)) throw new Error("'notification.title' expected a string value or undefined.");
		out.title = notification.title;
	}
	/**
	* body
	*/
	if (objectHasProperty(notification, "body")) {
		if (notification.body !== void 0 && !isString(notification.body)) throw new Error("'notification.body' expected a string value or undefined.");
		out.body = notification.body;
	}
	/**
	* subtitle
	*/
	if (objectHasProperty(notification, "subtitle")) {
		if (notification.subtitle !== void 0 && !isString(notification.subtitle)) throw new Error("'notification.subtitle' expected a string value or undefined.");
		out.subtitle = notification.subtitle;
	}
	/**
	* data
	*/
	if (objectHasProperty(notification, "data") && notification.data !== void 0) {
		if (!isObject(notification.data)) throw new Error("'notification.data' expected an object value containing key/value pairs.");
		const entries = Object.entries(notification.data);
		for (let i = 0; i < entries.length; i++) {
			const [key, value] = entries[i];
			if (!isString(value) && !isNumber(value) && !isObject(value)) throw new Error(`'notification.data' value for key "${key}" is invalid, expected a string value.`);
		}
		out.data = notification.data;
	}
	/**
	* android
	*/
	const validatedAndroid = validatePlatformSpecificNotification(notification, "android");
	if (isAndroid) out.android = validatedAndroid;
	/**
	* ios
	*/
	const validatedIOS = validatePlatformSpecificNotification(notification, "ios");
	if (isIOS) out.ios = validatedIOS;
	return out;
}
//#endregion
//#region notifee/packages/react-native/src/types/Trigger.ts
/**
* An interface representing the different alarm types which can be used with `TimestampTrigger.alarmManager.type`.
*
* View the [Triggers](/react-native/triggers) documentation to learn more.
*/
let AlarmType = /* @__PURE__ */ function(AlarmType) {
	AlarmType[AlarmType["SET"] = 0] = "SET";
	AlarmType[AlarmType["SET_AND_ALLOW_WHILE_IDLE"] = 1] = "SET_AND_ALLOW_WHILE_IDLE";
	AlarmType[AlarmType["SET_EXACT"] = 2] = "SET_EXACT";
	AlarmType[AlarmType["SET_EXACT_AND_ALLOW_WHILE_IDLE"] = 3] = "SET_EXACT_AND_ALLOW_WHILE_IDLE";
	AlarmType[AlarmType["SET_ALARM_CLOCK"] = 4] = "SET_ALARM_CLOCK";
	return AlarmType;
}({});
/**
* An interface representing the different frequencies which can be used with `TimestampTrigger.repeatFrequency`.
*
* View the [Triggers](/react-native/triggers) documentation to learn more.
*/
let RepeatFrequency = /* @__PURE__ */ function(RepeatFrequency) {
	RepeatFrequency[RepeatFrequency["NONE"] = -1] = "NONE";
	RepeatFrequency[RepeatFrequency["HOURLY"] = 0] = "HOURLY";
	RepeatFrequency[RepeatFrequency["DAILY"] = 1] = "DAILY";
	RepeatFrequency[RepeatFrequency["WEEKLY"] = 2] = "WEEKLY";
	return RepeatFrequency;
}({});
/**
* An interface representing the different units of time which can be used with `IntervalTrigger.timeUnit`.
*
* View the [Triggers](/react-native/triggers) documentation to learn more.
*/
let TimeUnit = /* @__PURE__ */ function(TimeUnit) {
	TimeUnit["SECONDS"] = "SECONDS";
	TimeUnit["MINUTES"] = "MINUTES";
	TimeUnit["HOURS"] = "HOURS";
	TimeUnit["DAYS"] = "DAYS";
	return TimeUnit;
}({});
/**
* Available Trigger Types.
*
* View the [Triggers](/react-native/triggers) documentation to learn more with example usage.
*/
let TriggerType = /* @__PURE__ */ function(TriggerType) {
	TriggerType[TriggerType["TIMESTAMP"] = 0] = "TIMESTAMP";
	TriggerType[TriggerType["INTERVAL"] = 1] = "INTERVAL";
	return TriggerType;
}({});
//#endregion
//#region notifee/packages/react-native/src/validators/validateTrigger.ts
const MINIMUM_INTERVAL = 15;
function isMinimumInterval(interval, timeUnit) {
	switch (timeUnit) {
		case TimeUnit.SECONDS: return interval / 60 >= MINIMUM_INTERVAL;
		case TimeUnit.MINUTES: return interval >= MINIMUM_INTERVAL;
		case TimeUnit.HOURS: return interval >= 1;
		case TimeUnit.DAYS: return interval >= 1;
	}
	return true;
}
function validateTrigger(trigger) {
	if (!isObject(trigger)) throw new Error("'trigger' expected an object value.");
	switch (trigger.type) {
		case TriggerType.TIMESTAMP: return validateTimestampTrigger(trigger);
		case TriggerType.INTERVAL: return validateIntervalTrigger(trigger);
		default: throw new Error("Unknown trigger type");
	}
}
function validateTimestampTrigger(trigger) {
	if (!isNumber(trigger.timestamp)) throw new Error("'trigger.timestamp' expected a number value.");
	const now = Date.now();
	if (trigger.timestamp <= now) throw new Error("'trigger.timestamp' date must be in the future.");
	const out = {
		type: trigger.type,
		timestamp: trigger.timestamp,
		repeatFrequency: -1
	};
	if (objectHasProperty(trigger, "repeatFrequency") && !isUndefined(trigger.repeatFrequency)) {
		if (!isValidEnum(trigger.repeatFrequency, RepeatFrequency)) throw new Error("'trigger.repeatFrequency' expected a RepeatFrequency value.");
		out.repeatFrequency = trigger.repeatFrequency;
	}
	if (objectHasProperty(trigger, "alarmManager") && !isUndefined(trigger.alarmManager)) if (isBoolean(trigger.alarmManager)) {
		if (trigger.alarmManager) out.alarmManager = validateTimestampAlarmManager();
	} else try {
		out.alarmManager = validateTimestampAlarmManager(trigger.alarmManager);
	} catch (e) {
		throw new Error(`'trigger.alarmManager' ${e.message}.`);
	}
	return out;
}
function validateTimestampAlarmManager(alarmManager) {
	const out = { type: AlarmType.SET_EXACT };
	if (!alarmManager) return out;
	if (isBoolean(alarmManager.allowWhileIdle) && alarmManager.allowWhileIdle) out.type = AlarmType.SET_EXACT_AND_ALLOW_WHILE_IDLE;
	if (objectHasProperty(alarmManager, "type") && !isUndefined(alarmManager.type)) {
		if (!isValidEnum(alarmManager.type, AlarmType)) throw new Error("'alarmManager.type' expected a AlarmType value.");
		out.type = alarmManager.type;
	}
	return out;
}
function validateIntervalTrigger(trigger) {
	if (!isNumber(trigger.interval)) throw new Error("'trigger.interval' expected a number value.");
	const out = {
		type: trigger.type,
		interval: trigger.interval,
		timeUnit: TimeUnit.SECONDS
	};
	if (objectHasProperty(trigger, "timeUnit") && !isUndefined(trigger.timeUnit)) {
		if (!isValidEnum(trigger.timeUnit, TimeUnit)) throw new Error("'trigger.timeUnit' expected a TimeUnit value.");
		out.timeUnit = trigger.timeUnit;
	}
	if (!isMinimumInterval(trigger.interval, out.timeUnit)) throw new Error("'trigger.interval' expected to be at least 15 minutes.");
	return out;
}
//#endregion
//#region notifee/packages/react-native/src/validators/validateAndroidChannel.ts
function validateAndroidChannel(channel) {
	if (!isObject(channel)) throw new Error("'channel' expected an object value.");
	/**
	* id
	*/
	if (!isString(channel.id)) throw new Error("'channel.id' expected a string value.");
	if (!channel.id) throw new Error("'channel.id' expected a valid string id.");
	/**
	* name
	*/
	if (!isString(channel.name)) throw new Error("'channel.name' expected a string value.");
	if (!channel.name) throw new Error("'channel.name' expected a valid channel name.");
	/**
	* Defaults
	*/
	const out = {
		id: channel.id,
		name: channel.name,
		bypassDnd: false,
		lights: true,
		vibration: true,
		badge: true,
		importance: AndroidImportance.DEFAULT,
		visibility: AndroidVisibility.PRIVATE
	};
	/**
	* badge
	*/
	if (objectHasProperty(channel, "badge")) {
		if (!isBoolean(channel.badge)) throw new Error("'channel.badge' expected a boolean value.");
		out.badge = channel.badge;
	}
	/**
	* bypassDnd
	*/
	if (objectHasProperty(channel, "bypassDnd")) {
		if (!isBoolean(channel.bypassDnd)) throw new Error("'channel.bypassDnd' expected a boolean value.");
		out.bypassDnd = channel.bypassDnd;
	}
	/**
	* description
	*/
	if (objectHasProperty(channel, "description")) {
		if (!isString(channel.description)) throw new Error("'channel.description' expected a string value.");
		out.description = channel.description;
	}
	/**
	* lights
	*/
	if (objectHasProperty(channel, "lights")) {
		if (!isBoolean(channel.lights)) throw new Error("'channel.lights' expected a boolean value.");
		out.lights = channel.lights;
	}
	/**
	* vibration
	*/
	if (objectHasProperty(channel, "vibration")) {
		if (!isBoolean(channel.vibration)) throw new Error("'channel.vibration' expected a boolean value.");
		out.vibration = channel.vibration;
	}
	/**
	* groupId
	*/
	if (objectHasProperty(channel, "groupId")) {
		if (!isString(channel.groupId)) throw new Error("'channel.groupId' expected a string value.");
		out.groupId = channel.groupId;
	}
	/**
	* importance
	*/
	if (objectHasProperty(channel, "importance") && channel.importance !== void 0) {
		if (!Object.values(AndroidImportance).includes(channel.importance)) throw new Error("'channel.importance' expected an Importance value.");
		out.importance = channel.importance;
	}
	/**
	* lightColor
	*/
	if (objectHasProperty(channel, "lightColor") && channel.lightColor !== void 0) {
		if (!isString(channel.lightColor)) throw new Error("'channel.lightColor' expected a string value.");
		if (!isValidColor(channel.lightColor)) throw new Error("'channel.lightColor' invalid color. Expected an AndroidColor or hexadecimal string value");
		out.lightColor = channel.lightColor;
	}
	/**
	* visibility
	*/
	if (objectHasProperty(channel, "visibility") && channel.visibility !== void 0) {
		if (!Object.values(AndroidVisibility).includes(channel.visibility)) throw new Error("'channel.visibility' expected visibility to be an AndroidVisibility value.");
		out.visibility = channel.visibility;
	}
	/**
	* sound
	*/
	if (objectHasProperty(channel, "sound") && channel.sound !== void 0) {
		if (!isString(channel.sound)) throw new Error("'channel.sound' expected a string value.");
		out.sound = channel.sound;
	}
	/**
	* vibrationPattern
	*/
	if (objectHasProperty(channel, "vibrationPattern") && channel.vibrationPattern !== void 0) {
		if (!isArray(channel.vibrationPattern)) throw new Error("'channel.vibrationPattern' expected an array.");
		if (!isValidVibratePattern(channel.vibrationPattern)) throw new Error("'channel.vibrationPattern' expected an array containing an even number of positive values.");
		out.vibrationPattern = channel.vibrationPattern;
	}
	return out;
}
//#endregion
//#region notifee/packages/react-native/src/validators/validateAndroidChannelGroup.ts
function validateAndroidChannelGroup(group) {
	if (!isObject(group)) throw new Error("'group' expected an object value.");
	/**
	* id
	*/
	if (!isString(group.id) || !group.id) throw new Error("'group.id' expected a string value.");
	/**
	* name
	*/
	if (!isString(group.name) || !group.name) throw new Error("'group.name' expected a string value.");
	/**
	* Defaults
	*/
	const out = {
		id: group.id,
		name: group.name
	};
	/**
	* description
	*/
	if (objectHasProperty(group, "description")) {
		if (!isString(group.description)) throw new Error("'group.description' expected a string value.");
		out.description = group.description;
	}
	return out;
}
//#endregion
//#region notifee/packages/react-native/src/types/NotificationIOS.ts
/**
* An enum representing the show previews notification setting for this app on the device.
*
* Value is greater than 0 if previews are to be shown, compare against an exact value
* (e.g. WHEN_AUTHENTICATED) for more granular control.
*
* @platform ios
*/
let IOSShowPreviewsSetting = /* @__PURE__ */ function(IOSShowPreviewsSetting) {
	/**
	* This setting is not supported on this device. Usually this means that the iOS version required
	* for this setting (iOS 11+) has not been met.
	*/
	IOSShowPreviewsSetting[IOSShowPreviewsSetting["NOT_SUPPORTED"] = -1] = "NOT_SUPPORTED";
	/**
	* Never show previews.
	*/
	IOSShowPreviewsSetting[IOSShowPreviewsSetting["NEVER"] = 0] = "NEVER";
	/**
	* Always show previews even if the device is currently locked.
	*/
	IOSShowPreviewsSetting[IOSShowPreviewsSetting["ALWAYS"] = 1] = "ALWAYS";
	/**
	* Only show previews when the device is unlocked.
	*/
	IOSShowPreviewsSetting[IOSShowPreviewsSetting["WHEN_AUTHENTICATED"] = 2] = "WHEN_AUTHENTICATED";
	return IOSShowPreviewsSetting;
}({});
/**
* An enum representing a notification setting for this app on the device.
*
* Value is greater than 0 if setting enabled, compare against an exact value (e.g. NOT_SUPPORTED) for more
* granular control.
*
* @platform ios
*/
let IOSNotificationSetting = /* @__PURE__ */ function(IOSNotificationSetting) {
	/**
	* This setting is not supported on this device. Usually this means that the iOS version required
	* for this setting has not been met.
	*/
	IOSNotificationSetting[IOSNotificationSetting["NOT_SUPPORTED"] = -1] = "NOT_SUPPORTED";
	/**
	* This setting is currently disabled by the user.
	*/
	IOSNotificationSetting[IOSNotificationSetting["DISABLED"] = 0] = "DISABLED";
	/**
	* This setting is currently enabled.
	*/
	IOSNotificationSetting[IOSNotificationSetting["ENABLED"] = 1] = "ENABLED";
	return IOSNotificationSetting;
}({});
/**
* TODO docs, used to provide context to Siri
*
* @platform ios
*/
let IOSIntentIdentifier = /* @__PURE__ */ function(IOSIntentIdentifier) {
	IOSIntentIdentifier[IOSIntentIdentifier["START_AUDIO_CALL"] = 0] = "START_AUDIO_CALL";
	IOSIntentIdentifier[IOSIntentIdentifier["START_VIDEO_CALL"] = 1] = "START_VIDEO_CALL";
	IOSIntentIdentifier[IOSIntentIdentifier["SEARCH_CALL_HISTORY"] = 2] = "SEARCH_CALL_HISTORY";
	IOSIntentIdentifier[IOSIntentIdentifier["SET_AUDIO_SOURCE_IN_CAR"] = 3] = "SET_AUDIO_SOURCE_IN_CAR";
	IOSIntentIdentifier[IOSIntentIdentifier["SET_CLIMATE_SETTINGS_IN_CAR"] = 4] = "SET_CLIMATE_SETTINGS_IN_CAR";
	IOSIntentIdentifier[IOSIntentIdentifier["SET_DEFROSTER_SETTINGS_IN_CAR"] = 5] = "SET_DEFROSTER_SETTINGS_IN_CAR";
	IOSIntentIdentifier[IOSIntentIdentifier["SET_SEAT_SETTINGS_IN_CAR"] = 6] = "SET_SEAT_SETTINGS_IN_CAR";
	IOSIntentIdentifier[IOSIntentIdentifier["SET_PROFILE_IN_CAR"] = 7] = "SET_PROFILE_IN_CAR";
	IOSIntentIdentifier[IOSIntentIdentifier["SAVE_PROFILE_IN_CAR"] = 8] = "SAVE_PROFILE_IN_CAR";
	IOSIntentIdentifier[IOSIntentIdentifier["START_WORKOUT"] = 9] = "START_WORKOUT";
	IOSIntentIdentifier[IOSIntentIdentifier["PAUSE_WORKOUT"] = 10] = "PAUSE_WORKOUT";
	IOSIntentIdentifier[IOSIntentIdentifier["END_WORKOUT"] = 11] = "END_WORKOUT";
	IOSIntentIdentifier[IOSIntentIdentifier["CANCEL_WORKOUT"] = 12] = "CANCEL_WORKOUT";
	IOSIntentIdentifier[IOSIntentIdentifier["RESUME_WORKOUT"] = 13] = "RESUME_WORKOUT";
	IOSIntentIdentifier[IOSIntentIdentifier["SET_RADIO_STATION"] = 14] = "SET_RADIO_STATION";
	IOSIntentIdentifier[IOSIntentIdentifier["SEND_MESSAGE"] = 15] = "SEND_MESSAGE";
	IOSIntentIdentifier[IOSIntentIdentifier["SEARCH_FOR_MESSAGES"] = 16] = "SEARCH_FOR_MESSAGES";
	IOSIntentIdentifier[IOSIntentIdentifier["SET_MESSAGE_ATTRIBUTE"] = 17] = "SET_MESSAGE_ATTRIBUTE";
	IOSIntentIdentifier[IOSIntentIdentifier["SEND_PAYMENT"] = 18] = "SEND_PAYMENT";
	IOSIntentIdentifier[IOSIntentIdentifier["REQUEST_PAYMENT"] = 19] = "REQUEST_PAYMENT";
	IOSIntentIdentifier[IOSIntentIdentifier["SEARCH_FOR_PHOTOS"] = 20] = "SEARCH_FOR_PHOTOS";
	IOSIntentIdentifier[IOSIntentIdentifier["START_PHOTO_PLAYBACK"] = 21] = "START_PHOTO_PLAYBACK";
	IOSIntentIdentifier[IOSIntentIdentifier["LIST_RIDE_OPTIONS"] = 22] = "LIST_RIDE_OPTIONS";
	IOSIntentIdentifier[IOSIntentIdentifier["REQUEST_RIDE"] = 23] = "REQUEST_RIDE";
	IOSIntentIdentifier[IOSIntentIdentifier["GET_RIDE_STATUS"] = 24] = "GET_RIDE_STATUS";
	return IOSIntentIdentifier;
}({});
//#endregion
//#region notifee/packages/react-native/src/validators/validateIOSInput.ts
function validateIOSInput(input) {
	const out = {};
	if (!input) return out;
	if (isBoolean(input)) return out;
	if (!isObject(input)) throw new Error("expected an object value.");
	if (objectHasProperty(input, "buttonText") && !isUndefined(input.buttonText)) {
		if (!isString(input.buttonText)) throw new Error("'buttonText' expected a string value.");
		out.buttonText = input.buttonText;
	}
	if (objectHasProperty(input, "placeholderText") && !isUndefined(input.placeholderText)) {
		if (!isString(input.placeholderText)) throw new Error("'placeholderText' expected a string value.");
		out.placeholderText = input.placeholderText;
	}
	return out;
}
//#endregion
//#region notifee/packages/react-native/src/validators/validateIOSCategoryAction.ts
function validateIOSCategoryAction(action) {
	if (!isObject(action)) throw new Error("\"action\" expected an object value");
	if (!isString(action.id) || action.id.length === 0) throw new Error("\"action.id\" expected a valid string value.");
	if (!isString(action.title) || action.title.length === 0) throw new Error("\"action.title\" expected a valid string value.");
	const out = {
		id: action.id,
		title: action.title,
		destructive: false,
		foreground: false,
		authenticationRequired: false
	};
	if (objectHasProperty(action, "input") && !isUndefined(action.input)) if (action.input === true) out.input = true;
	else try {
		out.input = validateIOSInput(action.input);
	} catch (e) {
		throw new Error(`'action' ${e.message}.`);
	}
	if (objectHasProperty(action, "destructive")) {
		if (!isBoolean(action.destructive)) throw new Error("'destructive' expected a boolean value.");
		out.destructive = action.destructive;
	}
	if (objectHasProperty(action, "foreground")) {
		if (!isBoolean(action.foreground)) throw new Error("'foreground' expected a boolean value.");
		out.foreground = action.foreground;
	}
	if (objectHasProperty(action, "authenticationRequired")) {
		if (!isBoolean(action.authenticationRequired)) throw new Error("'authenticationRequired' expected a boolean value.");
		out.authenticationRequired = action.authenticationRequired;
	}
	return out;
}
//#endregion
//#region notifee/packages/react-native/src/validators/validateIOSCategory.ts
function validateIOSCategory(category) {
	if (!isObject(category)) throw new Error("'category' expected an object value.");
	/**
	* id
	*/
	if (!isString(category.id)) throw new Error("'category.id' expected a string value.");
	if (!category.id) throw new Error("'category.id' expected a valid string id.");
	const out = {
		id: category.id,
		allowInCarPlay: false,
		allowAnnouncement: false,
		hiddenPreviewsShowTitle: false,
		hiddenPreviewsShowSubtitle: false
	};
	/**
	* summaryFormat
	*/
	if (objectHasProperty(category, "summaryFormat")) {
		if (!isString(category.summaryFormat)) throw new Error("'category.summaryFormat' expected a string value.");
		out.summaryFormat = category.summaryFormat;
	}
	/**
	* allowInCarPlay
	*/
	if (objectHasProperty(category, "allowInCarPlay")) {
		if (!isBoolean(category.allowInCarPlay)) throw new Error("'category.allowInCarPlay' expected a boolean value.");
		out.allowInCarPlay = category.allowInCarPlay;
	}
	/**
	* allowAnnouncement
	*/
	if (objectHasProperty(category, "allowAnnouncement")) {
		if (!isBoolean(category.allowAnnouncement)) throw new Error("'category.allowAnnouncement' expected a boolean value.");
		out.allowAnnouncement = category.allowAnnouncement;
	}
	/**
	* hiddenPreviewsShowTitle
	*/
	if (objectHasProperty(category, "hiddenPreviewsShowTitle")) {
		if (!isBoolean(category.hiddenPreviewsShowTitle)) throw new Error("'category.hiddenPreviewsShowTitle' expected a boolean value.");
		out.hiddenPreviewsShowTitle = category.hiddenPreviewsShowTitle;
	}
	/**
	* hiddenPreviewsShowSubtitle
	*/
	if (objectHasProperty(category, "hiddenPreviewsShowSubtitle")) {
		if (!isBoolean(category.hiddenPreviewsShowSubtitle)) throw new Error("'category.hiddenPreviewsShowSubtitle' expected a boolean value.");
		out.hiddenPreviewsShowSubtitle = category.hiddenPreviewsShowSubtitle;
	}
	/**
	* summaryFormat
	*/
	if (objectHasProperty(category, "hiddenPreviewsBodyPlaceholder")) {
		if (!isString(category.hiddenPreviewsBodyPlaceholder)) throw new Error("'category.hiddenPreviewsBodyPlaceholder' expected a string value.");
		out.hiddenPreviewsBodyPlaceholder = category.hiddenPreviewsBodyPlaceholder;
	}
	/**
	* intentIdentifiers
	*/
	if (objectHasProperty(category, "intentIdentifiers")) {
		if (!isArray(category.intentIdentifiers)) throw new Error("'category.intentIdentifiers' expected an array value.");
		const identifiers = Object.values(IOSIntentIdentifier);
		for (let i = 0; i < category.intentIdentifiers.length; i++) {
			const intentIdentifier = category.intentIdentifiers[i];
			if (!identifiers.includes(intentIdentifier)) throw new Error(`'category.intentIdentifiers' unexpected intentIdentifier "${intentIdentifier}" at array index "${i}".`);
		}
		out.intentIdentifiers = category.intentIdentifiers;
	}
	/**
	* actions
	*/
	if (objectHasProperty(category, "actions")) {
		if (!isArray(category.actions)) throw new Error("'category.actions' expected an array value.");
		const actions = [];
		for (let i = 0; i < category.actions.length; i++) try {
			actions[i] = validateIOSCategoryAction(category.actions[i]);
		} catch (e) {
			throw new Error(`'category.actions' invalid action at index "${i}". ${e}`);
		}
		out.actions = actions;
	}
	return out;
}
//#endregion
//#region notifee/packages/react-native/src/validators/validateIOSPermissions.ts
function validateIOSPermissions(permissions) {
	const out = {
		alert: true,
		badge: true,
		sound: true,
		carPlay: true,
		provisional: false,
		announcement: false,
		criticalAlert: false
	};
	if (!permissions) return out;
	if (objectHasProperty(permissions, "alert")) {
		if (!isBoolean(permissions.alert)) throw new Error("'alert' expected a boolean value.");
		out.alert = permissions.alert;
	}
	if (objectHasProperty(permissions, "badge")) {
		if (!isBoolean(permissions.badge)) throw new Error("'alert' badge a boolean value.");
		out.badge = permissions.badge;
	}
	if (objectHasProperty(permissions, "sound")) {
		if (!isBoolean(permissions.sound)) throw new Error("'sound' expected a boolean value.");
		out.sound = permissions.sound;
	}
	if (objectHasProperty(permissions, "carPlay")) {
		if (!isBoolean(permissions.carPlay)) throw new Error("'carPlay' expected a boolean value.");
		out.carPlay = permissions.carPlay;
	}
	if (objectHasProperty(permissions, "provisional")) {
		if (!isBoolean(permissions.provisional)) throw new Error("'provisional' expected a boolean value.");
		out.provisional = permissions.provisional;
	}
	if (objectHasProperty(permissions, "announcement")) {
		if (!isBoolean(permissions.announcement)) throw new Error("'announcement' expected a boolean value.");
		out.announcement = permissions.announcement;
	}
	if (objectHasProperty(permissions, "criticalAlert")) {
		if (!isBoolean(permissions.criticalAlert)) throw new Error("'criticalAlert' expected a boolean value.");
		out.criticalAlert = permissions.criticalAlert;
	}
	return out;
}
//#endregion
//#region notifee/packages/react-native/src/NotifeeApiModule.ts
let backgroundEventHandler;
let registeredForegroundServiceTask;
if (isAndroid) react_native.AppRegistry.registerHeadlessTask(kReactNativeNotifeeForegroundServiceHeadlessTask, () => {
	if (!registeredForegroundServiceTask) {
		console.warn("[notifee] no registered foreground service has been set for displaying a foreground notification.");
		return () => Promise.resolve();
	}
	return ({ notification }) => registeredForegroundServiceTask(notification);
});
var NotifeeApiModule = class extends NotifeeNativeModule {
	constructor(config) {
		super(config);
		if (isAndroid) react_native.AppRegistry.registerHeadlessTask(kReactNativeNotifeeNotificationEvent, () => {
			return (event) => {
				if (!backgroundEventHandler) {
					console.warn("[notifee] no background event handler has been set. Set a handler via the \"onBackgroundEvent\" method.");
					return Promise.resolve();
				}
				return backgroundEventHandler(event);
			};
		});
		else if (isIOS) this.emitter.addListener(kReactNativeNotifeeNotificationBackgroundEvent, (event) => {
			if (!backgroundEventHandler) {
				console.warn("[notifee] no background event handler has been set. Set a handler via the \"onBackgroundEvent\" method.");
				return Promise.resolve();
			}
			return backgroundEventHandler(event);
		});
	}
	getTriggerNotificationIds = () => {
		if (isAndroid || isIOS) return this.native.getTriggerNotificationIds();
		return Promise.resolve([]);
	};
	getTriggerNotifications = () => {
		if (isAndroid || isIOS) return this.native.getTriggerNotifications();
		return Promise.resolve([]);
	};
	getDisplayedNotifications = () => {
		if (isAndroid || isIOS) return this.native.getDisplayedNotifications();
		return Promise.resolve([]);
	};
	isChannelBlocked = (channelId) => {
		if (!isString(channelId)) throw new Error("notifee.isChannelBlocked(*) 'channelId' expected a string value.");
		if (isWeb || isIOS || this.native.ANDROID_API_LEVEL < 26) return Promise.resolve(false);
		return this.native.isChannelBlocked(channelId);
	};
	isChannelCreated = (channelId) => {
		if (!isString(channelId)) throw new Error("notifee.isChannelCreated(*) 'channelId' expected a string value.");
		if (isWeb || isIOS || this.native.ANDROID_API_LEVEL < 26) return Promise.resolve(true);
		return this.native.isChannelCreated(channelId);
	};
	cancelAllNotifications = (notificationIds, tag) => {
		if (isAndroid || isIOS) {
			if (notificationIds) {
				if (isAndroid) return this.native.cancelAllNotificationsWithIds(notificationIds, NotificationType.ALL, tag);
				return this.native.cancelAllNotificationsWithIds(notificationIds);
			}
			return this.native.cancelAllNotifications();
		}
		return Promise.resolve();
	};
	cancelDisplayedNotifications = (notificationIds, tag) => {
		if (isAndroid || isIOS) {
			if (notificationIds) {
				if (isAndroid) return this.native.cancelAllNotificationsWithIds(notificationIds, NotificationType.DISPLAYED, tag);
				return this.native.cancelDisplayedNotificationsWithIds(notificationIds);
			}
			return this.native.cancelDisplayedNotifications();
		}
		return Promise.resolve();
	};
	cancelTriggerNotifications = (notificationIds) => {
		if (isAndroid || isIOS) {
			if (notificationIds) {
				if (isAndroid) return this.native.cancelAllNotificationsWithIds(notificationIds, NotificationType.TRIGGER, null);
				return this.native.cancelTriggerNotificationsWithIds(notificationIds);
			}
			return this.native.cancelTriggerNotifications();
		}
		return Promise.resolve();
	};
	cancelNotification = (notificationId, tag) => {
		if (!isString(notificationId)) throw new Error("notifee.cancelNotification(*) 'notificationId' expected a string value.");
		if (isAndroid) return this.native.cancelAllNotificationsWithIds([notificationId], NotificationType.ALL, tag);
		if (isIOS) return this.native.cancelNotification(notificationId);
		return Promise.resolve();
	};
	cancelDisplayedNotification = (notificationId, tag) => {
		if (!isString(notificationId)) throw new Error("notifee.cancelDisplayedNotification(*) 'notificationId' expected a string value.");
		if (isAndroid) return this.native.cancelAllNotificationsWithIds([notificationId], NotificationType.DISPLAYED, tag);
		if (isIOS) return this.native.cancelDisplayedNotification(notificationId);
		return Promise.resolve();
	};
	cancelTriggerNotification = (notificationId) => {
		if (!isString(notificationId)) throw new Error("notifee.cancelTriggerNotification(*) 'notificationId' expected a string value.");
		if (isAndroid) return this.native.cancelAllNotificationsWithIds([notificationId], NotificationType.TRIGGER, null);
		if (isIOS) return this.native.cancelTriggerNotification(notificationId);
		return Promise.resolve();
	};
	createChannel = (channel) => {
		let options;
		try {
			options = validateAndroidChannel(channel);
		} catch (e) {
			throw new Error(`notifee.createChannel(*) ${e.message}`);
		}
		if (isAndroid) {
			if (this.native.ANDROID_API_LEVEL < 26) return Promise.resolve(options.id);
			return this.native.createChannel(options).then(() => {
				return options.id;
			});
		}
		return Promise.resolve("");
	};
	createChannels = (channels) => {
		if (!isArray(channels)) throw new Error("notifee.createChannels(*) 'channels' expected an array of AndroidChannel.");
		const options = [];
		try {
			for (let i = 0; i < channels.length; i++) options[i] = validateAndroidChannel(channels[i]);
		} catch (e) {
			throw new Error(`notifee.createChannels(*) 'channels' a channel is invalid: ${e.message}`);
		}
		if (isAndroid && this.native.ANDROID_API_LEVEL >= 26) return this.native.createChannels(options);
		return Promise.resolve();
	};
	createChannelGroup = (channelGroup) => {
		let options;
		try {
			options = validateAndroidChannelGroup(channelGroup);
		} catch (e) {
			throw new Error(`notifee.createChannelGroup(*) ${e.message}`);
		}
		if (isAndroid) {
			if (this.native.ANDROID_API_LEVEL < 26) return Promise.resolve(options.id);
			return this.native.createChannelGroup(options).then(() => {
				return options.id;
			});
		}
		return Promise.resolve("");
	};
	createChannelGroups = (channelGroups) => {
		if (!isArray(channelGroups)) throw new Error("notifee.createChannelGroups(*) 'channelGroups' expected an array of AndroidChannelGroup.");
		const options = [];
		try {
			for (let i = 0; i < channelGroups.length; i++) options[i] = validateAndroidChannelGroup(channelGroups[i]);
		} catch (e) {
			throw new Error(`notifee.createChannelGroups(*) 'channelGroups' a channel group is invalid: ${e.message}`);
		}
		if (isAndroid && this.native.ANDROID_API_LEVEL >= 26) return this.native.createChannelGroups(options);
		return Promise.resolve();
	};
	deleteChannel = (channelId) => {
		if (!isString(channelId)) throw new Error("notifee.deleteChannel(*) 'channelId' expected a string value.");
		if (isAndroid && this.native.ANDROID_API_LEVEL >= 26) return this.native.deleteChannel(channelId);
		return Promise.resolve();
	};
	deleteChannelGroup = (channelGroupId) => {
		if (!isString(channelGroupId)) throw new Error("notifee.deleteChannelGroup(*) 'channelGroupId' expected a string value.");
		if (isAndroid && this.native.ANDROID_API_LEVEL >= 26) return this.native.deleteChannelGroup(channelGroupId);
		return Promise.resolve();
	};
	displayNotification = (notification) => {
		let options;
		try {
			options = validateNotification(notification);
		} catch (e) {
			throw new Error(`notifee.displayNotification(*) ${e.message}`);
		}
		if (isIOS || isAndroid) return this.native.displayNotification(options).then(() => {
			return options.id;
		});
		return Promise.resolve("");
	};
	openAlarmPermissionSettings = () => {
		if (isAndroid) return this.native.openAlarmPermissionSettings();
		return Promise.resolve();
	};
	createTriggerNotification = (notification, trigger) => {
		let options;
		let triggerOptions;
		try {
			options = validateNotification(notification);
		} catch (e) {
			throw new Error(`notifee.createTriggerNotification(*) ${e.message}`);
		}
		try {
			triggerOptions = validateTrigger(trigger);
		} catch (e) {
			throw new Error(`notifee.createTriggerNotification(*) ${e.message}`);
		}
		if (isIOS || isAndroid) return this.native.createTriggerNotification(options, triggerOptions).then(() => {
			return options.id;
		});
		return Promise.resolve("");
	};
	getChannel = (channelId) => {
		if (!isString(channelId)) throw new Error("notifee.getChannel(*) 'channelId' expected a string value.");
		if (isAndroid && this.native.ANDROID_API_LEVEL >= 26) return this.native.getChannel(channelId);
		return Promise.resolve(null);
	};
	getChannels = () => {
		if (isAndroid && this.native.ANDROID_API_LEVEL >= 26) return this.native.getChannels();
		return Promise.resolve([]);
	};
	getChannelGroup = (channelGroupId) => {
		if (!isString(channelGroupId)) throw new Error("notifee.getChannelGroup(*) 'channelGroupId' expected a string value.");
		if (isAndroid || this.native.ANDROID_API_LEVEL >= 26) return this.native.getChannelGroup(channelGroupId);
		return Promise.resolve(null);
	};
	getChannelGroups = () => {
		if (isAndroid || this.native.ANDROID_API_LEVEL >= 26) return this.native.getChannelGroups();
		return Promise.resolve([]);
	};
	getInitialNotification = () => {
		if (isIOS || isAndroid) return this.native.getInitialNotification();
		return Promise.resolve(null);
	};
	onBackgroundEvent = (observer) => {
		if (!isFunction(observer)) throw new Error("notifee.onBackgroundEvent(*) 'observer' expected a function.");
		backgroundEventHandler = observer;
	};
	onForegroundEvent = (observer) => {
		if (!isFunction(observer)) throw new Error("notifee.onForegroundEvent(*) 'observer' expected a function.");
		const subscriber = this.emitter.addListener(kReactNativeNotifeeNotificationEvent, ({ type, detail }) => {
			observer({
				type,
				detail
			});
		});
		return () => {
			subscriber.remove();
		};
	};
	openNotificationSettings = (channelId) => {
		if (!isUndefined(channelId) && !isString(channelId)) throw new Error("notifee.openNotificationSettings(*) 'channelId' expected a string value.");
		if (isAndroid) return this.native.openNotificationSettings(channelId || null);
		return Promise.resolve();
	};
	requestPermission = (permissions = {}) => {
		if (isAndroid) return this.native.requestPermission().then(({ authorizationStatus, android }) => {
			return {
				authorizationStatus,
				android,
				ios: {
					alert: 1,
					badge: 1,
					criticalAlert: 1,
					showPreviews: 1,
					sound: 1,
					carPlay: 1,
					lockScreen: 1,
					announcement: 1,
					notificationCenter: 1,
					inAppNotificationSettings: 1,
					authorizationStatus
				},
				web: {}
			};
		});
		if (isIOS) {
			let options;
			try {
				options = validateIOSPermissions(permissions);
			} catch (e) {
				throw new Error(`notifee.requestPermission(*) ${e.message}`);
			}
			return this.native.requestPermission(options).then(({ authorizationStatus, ios }) => {
				return {
					authorizationStatus,
					ios,
					android: { alarm: AndroidNotificationSetting.ENABLED },
					web: {}
				};
			});
		}
		return Promise.resolve({
			authorizationStatus: AuthorizationStatus.NOT_DETERMINED,
			android: { alarm: AndroidNotificationSetting.ENABLED },
			ios: {
				alert: 1,
				badge: 1,
				criticalAlert: 1,
				showPreviews: 1,
				sound: 1,
				carPlay: 1,
				lockScreen: 1,
				announcement: 1,
				notificationCenter: 1,
				inAppNotificationSettings: 1,
				authorizationStatus: AuthorizationStatus.NOT_DETERMINED
			},
			web: {}
		});
	};
	registerForegroundService(runner) {
		if (!isFunction(runner)) throw new Error("notifee.registerForegroundService(_) 'runner' expected a function.");
		if (isAndroid) registeredForegroundServiceTask = runner;
	}
	setNotificationCategories = (categories) => {
		if (!isIOS) return Promise.resolve();
		if (!isArray(categories)) throw new Error("notifee.setNotificationCategories(*) 'categories' expected an array of IOSCategory.");
		const options = [];
		try {
			for (let i = 0; i < categories.length; i++) options[i] = validateIOSCategory(categories[i]);
		} catch (e) {
			throw new Error(`notifee.setNotificationCategories(*) 'categories' a category is invalid: ${e.message}`);
		}
		return this.native.setNotificationCategories(categories);
	};
	getNotificationCategories = () => {
		if (!isIOS) return Promise.resolve([]);
		return this.native.getNotificationCategories();
	};
	getNotificationSettings = () => {
		if (isAndroid) return this.native.getNotificationSettings().then(({ authorizationStatus, android }) => {
			return {
				authorizationStatus,
				android,
				ios: {
					alert: 1,
					badge: 1,
					criticalAlert: 1,
					showPreviews: 1,
					sound: 1,
					carPlay: 1,
					lockScreen: 1,
					announcement: 1,
					notificationCenter: 1,
					inAppNotificationSettings: 1,
					authorizationStatus
				},
				web: {}
			};
		});
		if (isIOS) return this.native.getNotificationSettings().then(({ authorizationStatus, ios }) => {
			return {
				authorizationStatus,
				ios,
				android: { alarm: AndroidNotificationSetting.ENABLED }
			};
		});
		return Promise.resolve({
			authorizationStatus: AuthorizationStatus.NOT_DETERMINED,
			android: { alarm: AndroidNotificationSetting.ENABLED },
			ios: {
				alert: 1,
				badge: 1,
				criticalAlert: 1,
				showPreviews: 1,
				sound: 1,
				carPlay: 1,
				lockScreen: 1,
				announcement: 1,
				notificationCenter: 1,
				inAppNotificationSettings: 1,
				authorizationStatus: AuthorizationStatus.NOT_DETERMINED
			},
			web: {}
		});
	};
	getBadgeCount = () => {
		if (!isIOS) return Promise.resolve(0);
		return this.native.getBadgeCount();
	};
	setBadgeCount = (count) => {
		if (!isIOS) return Promise.resolve();
		if (!isNumber(count) || count < 0) throw new Error("notifee.setBadgeCount(*) 'count' expected a number value greater than 0.");
		return this.native.setBadgeCount(Math.round(count));
	};
	incrementBadgeCount = (incrementBy) => {
		if (!isIOS) return Promise.resolve();
		let value = 1;
		if (!isUndefined(incrementBy)) {
			if (!isNumber(incrementBy) || incrementBy < 1) throw new Error("notifee.decrementBadgeCount(*) 'incrementBy' expected a number value greater than 1.");
			value = incrementBy;
		}
		return this.native.incrementBadgeCount(Math.round(value));
	};
	decrementBadgeCount = (decrementBy) => {
		if (!isIOS) return Promise.resolve();
		let value = 1;
		if (!isUndefined(decrementBy)) {
			if (!isNumber(decrementBy) || decrementBy < 1) throw new Error("notifee.decrementBadgeCount(*) 'decrementBy' expected a number value greater than 1.");
			value = decrementBy;
		}
		return this.native.decrementBadgeCount(Math.round(value));
	};
	isBatteryOptimizationEnabled = () => {
		if (!isAndroid) return Promise.resolve(false);
		return this.native.isBatteryOptimizationEnabled();
	};
	openBatteryOptimizationSettings = () => {
		if (!isAndroid) return Promise.resolve();
		return this.native.openBatteryOptimizationSettings();
	};
	getPowerManagerInfo = () => {
		if (!isAndroid) return Promise.resolve({
			manufacturer: react_native.Platform.OS,
			activity: null
		});
		return this.native.getPowerManagerInfo();
	};
	openPowerManagerSettings = () => {
		if (!isAndroid) return Promise.resolve();
		return this.native.openPowerManagerSettings();
	};
	stopForegroundService = () => {
		if (!isAndroid) return Promise.resolve();
		return this.native.stopForegroundService();
	};
	hideNotificationDrawer = () => {
		if (!isAndroid) return;
		return this.native.hideNotificationDrawer();
	};
};
//#endregion
//#region notifee/packages/react-native/src/version.ts
const version = "9.1.8";
//#endregion
//#region notifee/packages/react-native/src/index.ts
const apiModule = new NotifeeApiModule({
	version,
	nativeModuleName: "NotifeeApiModule",
	nativeEvents: isIOS ? [kReactNativeNotifeeNotificationEvent, kReactNativeNotifeeNotificationBackgroundEvent] : [kReactNativeNotifeeNotificationEvent]
});
const statics = { SDK_VERSION: version };
//#endregion
//#region notifee-bundle.ts
var notifee_bundle_default = Object.assign(apiModule, statics);
//#endregion
exports.AlarmType = AlarmType;
exports.AndroidBadgeIconType = AndroidBadgeIconType;
exports.AndroidCategory = AndroidCategory;
exports.AndroidColor = AndroidColor;
exports.AndroidDefaults = AndroidDefaults;
exports.AndroidFlags = AndroidFlags;
exports.AndroidForegroundServiceType = AndroidForegroundServiceType;
exports.AndroidGroupAlertBehavior = AndroidGroupAlertBehavior;
exports.AndroidImportance = AndroidImportance;
exports.AndroidLaunchActivityFlag = AndroidLaunchActivityFlag;
exports.AndroidNotificationSetting = AndroidNotificationSetting;
exports.AndroidStyle = AndroidStyle;
exports.AndroidVisibility = AndroidVisibility;
exports.AuthorizationStatus = AuthorizationStatus;
exports.EventType = EventType;
exports.IOSIntentIdentifier = IOSIntentIdentifier;
exports.IOSNotificationSetting = IOSNotificationSetting;
exports.IOSShowPreviewsSetting = IOSShowPreviewsSetting;
exports.RepeatFrequency = RepeatFrequency;
exports.TimeUnit = TimeUnit;
exports.TriggerType = TriggerType;
exports.default = notifee_bundle_default;

//# sourceMappingURL=notifee.js.map