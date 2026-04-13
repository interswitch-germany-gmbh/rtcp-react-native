/*
 * This implementation is to show push notifications when the app is in the foreground on iOS.
 *
 * On iOS, push notifications are not shown when the app is in the foreground. Instead, the app receives the notification
 * via the method `userNotificationCenter:willPresentNotification:withCompletionHandler:` of the `UNUserNotificationCenterDelegate`.
 * This implementation intercepts this delegate method and shows the notification. This technique does not require the user to change their AppDelegate.
 * We could also have react-native-firebase handle this, but it is disabled by default and we don't want the user to have
 * to create a firebase.json configuration file.
 * Note: The push notification is still being processed by the Notification Service Extension, so it is not required to process it in the app.
 */

#import "RTCP+UNUserNotificationCenter.h"

@implementation RTCPUNUserNotificationCenter {
    id<UNUserNotificationCenterDelegate> _originalDelegate;
    struct {
        unsigned int willPresentNotification : 1;
        unsigned int didReceiveNotificationResponse : 1;
        unsigned int openSettingsForNotification : 1;
    } _originalDelegateRespondsTo;
}

+ (instancetype)sharedInstance {
    static dispatch_once_t once;
    static RTCPUNUserNotificationCenter *sharedInstance;
    dispatch_once(&once, ^{
        sharedInstance = [[RTCPUNUserNotificationCenter alloc] init];
    });
    return sharedInstance;
}

// This is called when the app is instantiated
+ (void)load {
    // We listen to the UIApplicationDidFinishLaunchingNotification to wait for the app to finish launching before we proxy the UNUserNotificationCenter delegate.
    // This is necessary because users might set the UNUserNotificationCenter delegate in the didFinishLaunchingWithOptions method of the AppDelegate,
    // which happens later and would then override our proxy. So we have to wait for it to be set before we can proxy it.
    [[NSNotificationCenter defaultCenter] addObserverForName:UIApplicationDidFinishLaunchingNotification object:nil queue:nil usingBlock:^(NSNotification *note) {
        [[RTCPUNUserNotificationCenter sharedInstance] observe];
    }];
}

// Above we registered this method to be called when the app finishes launching.
// In this method we proxy the UNUserNotificationCenter delegate to intercept the willPresentNotification method and show the notification.
- (void)observe {
    static dispatch_once_t once;
    dispatch_once(&once, ^{
        UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
        if (center.delegate != nil) {
            _originalDelegate = center.delegate;
            _originalDelegateRespondsTo.willPresentNotification = (unsigned int)[_originalDelegate respondsToSelector:@selector(userNotificationCenter:willPresentNotification:withCompletionHandler:)];
            _originalDelegateRespondsTo.didReceiveNotificationResponse = (unsigned int)[_originalDelegate respondsToSelector:@selector(userNotificationCenter:didReceiveNotificationResponse:withCompletionHandler:)];
            _originalDelegateRespondsTo.openSettingsForNotification = (unsigned int)[_originalDelegate respondsToSelector:@selector(userNotificationCenter:openSettingsForNotification:)];
        }
        center.delegate = self;
    });
}

#pragma mark - UNUserNotificationCenterDelegate

- (void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler {
    // Calling the completion handler with these options will show the notification.
    completionHandler(UNNotificationPresentationOptionSound | UNNotificationPresentationOptionAlert | UNNotificationPresentationOptionBadge);

    // We also forward the call to the original delegate if it implements the method, so that the original functionality is not broken.
    if (_originalDelegate && _originalDelegateRespondsTo.willPresentNotification) { [_originalDelegate userNotificationCenter:center willPresentNotification:notification withCompletionHandler:completionHandler]; }
}

// Since we proxy the delegate, we have to forward all delegate methods to not break the original functionality.
- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)(void))completionHandler {
    if (_originalDelegate && _originalDelegateRespondsTo.didReceiveNotificationResponse) { [_originalDelegate userNotificationCenter:center didReceiveNotificationResponse:response withCompletionHandler:completionHandler]; } else if (completionHandler) { completionHandler(); }
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center openSettingsForNotification:(nullable UNNotification *)notification {
    if (_originalDelegate && _originalDelegateRespondsTo.openSettingsForNotification) { [_originalDelegate userNotificationCenter:center openSettingsForNotification:notification]; }
}

@end
