import Foundation
import RNCPushNotificationIOS


@objc public class RTCP: NSObject {

    // called when device push notification registration was successful
    @objc public class func didRegisterForRemoteNotifications(withDeviceToken deviceToken: Data) {
        // forward to push-notification-ios module
        RNCPushNotificationIOS.didRegisterForRemoteNotifications(withDeviceToken: deviceToken)
    }

    // called when device push notification registration failed
    @objc public class func didFailToRegisterForRemoteNotifications(withError error: Error) {
        // forward to push-notification-ios module
        RNCPushNotificationIOS.didFailToRegisterForRemoteNotificationsWithError(error)
    }

    @objc public class func didReceiveRemoteNotification(_ userInfo: [AnyHashable : Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
        var delay = 0.0;
        if UIApplication.shared.applicationState == .background {
            // delay execution to give app time to start up when killed
            // this enables us to receive and process silent push notification in JS when the app has been killed
            delay = 5;
            // TODO: currently ".background" is true for both, when the app was killed or in background. maybe find a way to detect if it was killed
        }
        DispatchQueue.main.asyncAfter(deadline: .now() + delay) {
            RNCPushNotificationIOS.didReceiveRemoteNotification(userInfo, fetchCompletionHandler:completionHandler)
        }
    }

    @objc public class func didReceiveRemoteNotification(_ userInfo: [AnyHashable : Any]) {
        RNCPushNotificationIOS.didReceiveRemoteNotification(userInfo)
    }

    @objc public class func didFinishLaunching(withOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]) {
        // register for remote notification on every app start
        // actually, the push-notification-ios module calls this, but too late after appstart for making silent-pushes-when-app-killed being processed
        UIApplication.shared.registerForRemoteNotifications()
    }

    @objc public class func didReceiveNotificationResponse(_ response: UNNotificationResponse, withCompletionHandler completionHandler: @escaping () -> Void) {
        // forward to push-notification-ios module
        RNCPushNotificationIOS.didReceive(response)
    }
}
