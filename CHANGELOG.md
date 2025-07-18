# Changelog

## 2.2.1 / 2025-07-15

* Implement new delete_all API endpoint
* minor README updates

## 2.2.0 / 2023-07-19

* Add support for Android 13 / API Level >= 33 (runtime permission for notifications)
* Various bugfixes. Please see [updated README](https://github.com/interswitch-germany-gmbh/rtcp-react-native/blob/f4e29eec697681b9226dc0110b93b818424f6c27/README.md?plain=1#L212) for augmenting AppDelegate on iOS and adjust accordingly!

## 2.1.2 / 2023-06-15

* fix bug in unregisterDevice
* Add support for RN 0.71

## 2.1.1 / 2023-04-25

* fix retrieval of hardware ID with newer versions of device-info

## 2.1.0 / 2023-01-26

* Add possibility to use multiple appIDs in one app

## 2.0.3 / 2022-11-21

* Add support for "tapped" state

## 2.0.2 / 2022-06-22

* Use `FastImage` in `RTCPInbox`

## 2.0.1 / 2022-06-22

* Fix ref issue in custom renderItem

## 2.0.0 / 2022-06-15

* Add api and components for ads

## 1.3.0 / 2022-06-09

* Animate deletions
* Support swipe-out to delete

## 1.2.2 / 2021-11-04

* Add refreshControlProps to RTCPInboxList
* Convert old notification payload to new when fetching Notifications from server

## 1.2.1 / 2021-10-25

* Add documentation and example for `RTCPInboxList` component

## 1.2.0 / 2021-10-22

* Add support to delete notifications from the inbox
* Add Inbox Component for easier integration (`RTCPInboxList`)

## 1.1.0 / 2021-10-14

* Add support for Deep Linking

## 1.0.0 / 2021-10-11

* First release
* Send registration on any registration data change including SDK version, not just on changed push token
* Send module version as SDK version to server

## 1.0.0-beta1 / 2021-04-13
