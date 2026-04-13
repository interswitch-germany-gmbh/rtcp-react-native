#import <Foundation/Foundation.h>
#import <UserNotifications/UserNotifications.h>

NS_ASSUME_NONNULL_BEGIN

@interface RTCPUNUserNotificationCenter : NSObject <UNUserNotificationCenterDelegate>
+ (instancetype)sharedInstance;
@end

NS_ASSUME_NONNULL_END
