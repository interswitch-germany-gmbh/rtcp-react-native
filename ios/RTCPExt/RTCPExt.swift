import UserNotifications
import UIKit

// Class for Notification Service Extension
public class RTCPExt {
    static let EXTENSION_SUFFIX = "RTCPNotificationServiceExtension"

    static var contentHandler: ((UNNotificationContent) -> Void)?
    static var request: UNNotificationRequest?

    public class func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
        // store request and contentHandler for possible later use in expire function
        RTCPExt.request = request
        RTCPExt.contentHandler = contentHandler

        // get app group shared userDefaults
        if let bundle = Bundle.main.bundleIdentifier,                                                        // get extension bundle ID
           bundle.hasSuffix(RTCPExt.EXTENSION_SUFFIX),                                                       // check extension bundle ID for correct naming
           let bundleBase = bundle.prefix(upTo: bundle.index(bundle.endIndex, offsetBy: -(RTCPExt.EXTENSION_SUFFIX.count + 1))) as Substring?,  // remove extension name suffix from bundle ID
           let userDefaults = UserDefaults(suiteName: "group." + bundleBase + ".rtcp")                       // get shared configuration by app group
        {
            var data = request.content.userInfo

            // compatibility to old RTCP payload - convert to new style
            data["message"] = data["message"] ?? ((data["aps"] as? [String: Any])?["alert"] as? [String: String])?["body"]
            data["title"]   = data["title"]   ?? ((data["aps"] as? [String: Any])?["alert"] as? [String: String])?["title"]
            data["push_id"] = data["push_id"] ?? (data["app_data"] as? [String: Any])?["push_id"] as? String
            if var app_data = data["app_data"] as? [String: Any] {  // remove push_id from app_data
                app_data["push_id"] = nil
                data["app_data"] = app_data
            }

            if let bestAttemptContent = (request.content.mutableCopy() as? UNMutableNotificationContent) {

                // --- ADD OPTIONAL MEDIA ATTACHMENT ---
                if let mediaURLString = data["media_url"] as? String,                                        // check for payload "media_url"
                   let mediaURL = URL(string: mediaURLString),                                               // create URL off image_url
                   let data = try? Data(contentsOf: mediaURL)                                                // and download its content to memory
                {
                    let destinationUrl = URL(fileURLWithPath: NSTemporaryDirectory()).appendingPathComponent(mediaURL.lastPathComponent)  // create temp file
                    try? data.write(to: destinationUrl)                                                      // write image from memory into temp file
                    if let attachment = try? UNNotificationAttachment(identifier: "", url: destinationUrl) { // create attachment
                        bestAttemptContent.attachments = [attachment]                                        // add attachment to notification
                    }
                }

                if let inboxJSON = userDefaults.string(forKey: "rtcp_inbox"),                                // load inbox from userdefaults
                   let _inbox = try? JSONSerialization.jsonObject(with: Data(inboxJSON.utf8)) as? [Any],     // JSON parse inbox
                   var inbox = _inbox {                                                                      // unwrap inbox

                    let inboxSize = Int(userDefaults.string(forKey: "rtcp_inbox_size") ?? "25") ?? 25        // get inbox size limit

                    // --- ADD MESSAGE TO INBOX ---
                    data["read"] = data["read"] ?? false;                                                    // set messsage to unread
                    data["time"] = data["time"] ?? ISO8601DateFormatter().string(from: Date());              // add time if not present
                    data["aps"] = nil;                                                                       // remove "aps"

                    if data["not_in_inbox"] == nil {
                        if data["replace"] != nil {
                            if let index = inbox.firstIndex(where: { (($0 as? [String: Any])?["push_id"] as? String) == data["replace"] as? String }) {  // find element to replace
                                inbox[index] = data                                                          // replace inbox element
                            }
                        } else {
                            inbox.insert(data, at: 0);                                                       // new element, prepend to inbox
                            if inbox.count > inboxSize { inbox = Array(inbox.prefix(inboxSize)) }            // cut inbox size
                        }

                        if let inboxData = try? JSONSerialization.data(withJSONObject: inbox as Any) {       // JSON stringify inbox
                          userDefaults.set(String(data: inboxData, encoding: .utf8), forKey: "rtcp_inbox");  // write inbox to userDefaults
                        }
                    }

                    // ---- SET BADGE COUNT ---
                    if userDefaults.string(forKey: "rtcp_enable_badge") == "true" {                          // check if badge is enabled
                        bestAttemptContent.badge = inbox.filter({ !(($0 as? [String: Any])?["read"] as? Bool ?? false) }).count as NSNumber; // count unread messages and set badge
                    }
                }

                // add info that push notification has been processed by NSE
                bestAttemptContent.userInfo.updateValue("true", forKey: "rtcp_nse_processed")
                contentHandler(bestAttemptContent)
            }

            // --- SEND DELIVERY RECEIPT ---
            if let pushID = data["push_id"] as? String,                            // check for push_id to be present
               let baseUrl    = userDefaults.string(forKey: "rtcp_base_url"),      // get base_url, app_id and hardware_id from storage (saved by main app on start)
               let appID      = userDefaults.string(forKey: "rtcp_app_id"),
               let hardwareID = userDefaults.string(forKey: "rtcp_hardware_id") {

                // send reception info to server
                RTCPApi.appID = appID
                RTCPApi.baseUrl = baseUrl
                RTCPApi.updateNotificationRemoteStatus(hardwareID: hardwareID, pushIDs: pushID, status: "received")
            }
        }
    }

    public class func serviceExtensionTimeWillExpire() {
        // not implemented
    }
}
