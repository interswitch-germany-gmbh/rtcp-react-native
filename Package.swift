// Package.swift
// untested SPM manifest generated with AI, kept as base for later implementation

// swift-tools-version: 5.9
import PackageDescription

// NOTE: React Native SPM support was introduced in 0.76.
// Verify the exact package name and React-Core product name against your
// React Native version's Package.swift before building.
let package = Package(
    name: "rtcp-react-native",
    platforms: [.iOS(.v13)],
    products: [
        // Add both to your main app target.
        .library(name: "RTCP", targets: ["RTCP"]),
        .library(name: "RNNotifee", targets: ["RNNotifee"]),
        // Add to both app and notification extension targets.
        .library(name: "RTCPApi", targets: ["RTCPApi"]),
        // Add to your Notification Service Extension target only.
        .library(name: "RTCPExt", targets: ["RTCPExt"]),
    ],
    dependencies: [
        .package(url: "https://github.com/facebook/react-native", from: "0.76.0"),
    ],
    targets: [
        // ── Vendored notifee (git subtree) ───────────────────────────────────

        // Core notification logic, no React dependency — safe for extensions.
        .target(
            name: "NotifeeCore",
            path: "notifee/ios/NotifeeCore",
            exclude: ["Info.plist"],
            publicHeadersPath: "."
        ),

        // React Native bridge for notifee. Main app target only.
        .target(
            name: "RNNotifee",
            dependencies: [
                "NotifeeCore",
                .product(name: "React-Core", package: "react-native"),
            ],
            path: "notifee/packages/react-native/ios/RNNotifee",
            publicHeadersPath: "."
        ),

        // ── RTCP ─────────────────────────────────────────────────────────────

        // Pure Swift API helper — shared between app and extension.
        .target(
            name: "RTCPApi",
            path: "ios/RTCPApi"
        ),

        // Foreground notification display proxy. Main app target only.
        // No React dependency — RTCP's ObjC code is self-contained.
        .target(
            name: "RTCP",
            path: "ios/RTCP",
            publicHeadersPath: "."
        ),

        // Notification Service Extension helper.
        // Depends on NotifeeCore only — keeps React out of the extension.
        .target(
            name: "RTCPExt",
            dependencies: ["RTCPApi", "NotifeeCore"],
            path: "ios/RTCPExt"
        ),
    ]
)
