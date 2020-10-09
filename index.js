import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';
import {Platform} from 'react-native';

const RTCP_BASE_URL_TEST = "https://rtcp-staging.vanso.com/api/";
const RTCP_BASE_URL_PRODUCTION = "https://rtcp.vanso.com/api/";

function log() {
  let i;
  let string = '';
  for (i = 0; i < arguments.length; i++) {
    if (typeof arguments[i] === 'object')
      string += JSON.stringify(arguments[i]);
    else if (typeof arguments[i] === 'number')
      string += arguments[i].toString();
    else if (typeof arguments[i] === 'string') string += arguments[i];
    else console.log('Wrong Type: ', typeof arguments[i]);
    if (string[string.length - 1] !== ' ') string += ' ';
  }
  console.log('[rtcp-react-native] ' + string);
}

class RTCP {
  constructor() {
    log("Initializing rtcp-react-native");

    // set defaults
    this.baseurl = RTCP_BASE_URL_TEST;
    this.appID = 'testid';


    PushNotification.configure({
      onRegister: (token) => {
        log("Registered with FCM/APNs. Token: ", token);
        this.register(token);
      },

      onNotification: (notification) => {
        log("NOTIFICATION: ", notification);
        PushNotification.localNotification({
          channelId: "default-channel-id",
          title: "testtitle",
          message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          bigText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          ticker: "this is some ticker",
          largeIconUrl: "https://www.interswitchgroup.com/images/default-source/default-album/interswitchngnew.png",
          bigPictureUrl: "https://www.interswitchgroup.com/images/default-source/default-album/interswitchngnew.png"
        })
      }
    });

    PushNotification.createChannel(
      {
        channelId: "default-channel-id", // (required)
        channelName: `Default channel`, // (required)
        channelDescription: "A default channel", // (optional) default: undefined.
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      (created) => log(`createChannel 'default-channel-id' returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }

  async register(token) {
    await AsyncStorage.setItem('rtcp__push_token', token.token);

    // check if token has changed. if not, do not register again to reduce server load
    const value = await AsyncStorage.getItem('rtcp__push_token');
    if (value !== null && value === token.token) {
      log("Token is unchanged. Not registering with RTCP");
      return;
    }

    // create registration data
    let data = {
      device: {
        hardware_id: DeviceInfo.getUniqueId(),
        push_token: token,
        platform_type:
          Platform.OS === 'ios' ? 'IosPlatform' : 'AndroidPlatform',
        device_type: 'phone',
        api_version: '2'
      }
    };

    // send registration to RTCP
    try {
      const response = await fetch("blafasel" + baseurl + 'devices/register_device', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'AUTH-APP-ID': this.appID
        },
        body: JSON.stringify(data)
      });
    } catch (error) {
      log("Error registering with RTCP: ", error);
    }



  }
}

export default new RTCP();
