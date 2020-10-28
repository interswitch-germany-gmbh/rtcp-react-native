import UserNotifications

public class RTCP {
    static let EXTENSION_SUFFIX = "RTCPNotificationServiceExtension"

    static var contentHandler: ((UNNotificationContent) -> Void)?
    static var request: UNNotificationRequest?

    public class func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
        // store request and contentHandler for possible later use in expire function
        RTCP.request = request
        RTCP.contentHandler = contentHandler

        if let bestAttemptContent = (request.content.mutableCopy() as? UNMutableNotificationContent) {

            // --- ADD OPTIONAL MEDIA ---
            if let appData = request.content.userInfo["app_data"] as? [String: AnyObject],  // check for payload "app_data"
               let mediaURLString = appData["media_url"] as? String,                        // and media_url in it
               let mediaURL = URL(string: mediaURLString),                                  // create URL off image_url
               let data = try? Data(contentsOf: mediaURL) {                                 // and download its content to memory

                // write image from memory to local temporary file
                let destinationUrl = URL(fileURLWithPath: NSTemporaryDirectory()).appendingPathComponent(mediaURL.lastPathComponent)
                try? data.write(to: destinationUrl)
                if let attachment = try? UNNotificationAttachment(identifier: "", url: destinationUrl) {
                    bestAttemptContent.attachments = [attachment]
                }
            }

            bestAttemptContent.title = "\(bestAttemptContent.title) [v2]"
            contentHandler(bestAttemptContent)
        }

        // --- DELIVERY RECEIPT ---
        if let appData = request.content.userInfo["app_data"] as? [String: AnyObject],  // check for payload "app_data"
           let pushID = appData["push_id"] as? String,                                  // and a valid push_id in it

           let bundle = Bundle.main.bundleIdentifier,                                   // get extension bundle ID
           bundle.hasSuffix(RTCP.EXTENSION_SUFFIX),                                     // check extension bundle ID for correct naming
           let bundleBase = bundle.prefix(upTo: bundle.index(                           // remove extension name suffix from bundle ID
                                            bundle.endIndex,
                                            offsetBy: -(RTCP.EXTENSION_SUFFIX.count + 1))) as Substring?,
           let userDefaults = UserDefaults(suiteName: "group." + bundleBase + ".rtcp"), // get shared configuration by app group

           let baseUrl    = userDefaults.string(forKey: "rtcp_base_url"),               // get base_url, app_id and hardware_id from storage (saved by main app on start)
           let appID      = userDefaults.string(forKey: "rtcp_app_id"),
           let hardwareID = userDefaults.string(forKey: "rtcp_hardware_id") {

            // send reception info to server
            RTCPApi.appID = appID
            RTCPApi.baseUrl = baseUrl
            RTCPApi.updateNotificationRemoteStatus(hardwareID: hardwareID, pushIDs: pushID, status: "received")
        }

    }

    public class func serviceExtensionTimeWillExpire() {
        // not implemented
    }
}


