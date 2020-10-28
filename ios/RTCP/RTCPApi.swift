//
//  RTCPApi.swift
//  RTCP
//
//  Created by Hubert Nusser on 27.10.20.
//
import Foundation

class RTCPApi {
    static let RTCP_BASE_URL_TEST = "https://rtcp-staging.vanso.com/api/"
    static let RTCP_BASE_URL_PROD = "https://rtcp.vanso.com/api/"

    static var baseUrl = RTCP_BASE_URL_TEST
    static var appID = ""

    class func updateNotificationRemoteStatus(hardwareID: String, pushIDs: String, status: String) {
        if !(status == "received" || status == "read") { return }

        var request = URLRequest(url: URL(string: RTCPApi.baseUrl + "read_receipt/" + status)!)
        request.setValue(RTCPApi.appID, forHTTPHeaderField: "AUTH-APP-ID")
        request.setValue("application/json; charset=utf-8", forHTTPHeaderField: "Content-Type")
        request.httpMethod = "POST"
        request.httpBody = try? JSONSerialization.data(withJSONObject: [
                                                        "hardware_id": hardwareID,
                                                        "push_id"    : pushIDs,
                                                        "time"       : ISO8601DateFormatter().string(from: Date()) ])

        // send request to the server without caring about the result (we cannot do anything about errors anyway)
        URLSession.shared.dataTask(with: request).resume()
    }
}
