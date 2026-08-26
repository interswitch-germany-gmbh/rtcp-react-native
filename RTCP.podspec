require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name           = 'RTCP'
  s.version        = package['version']
  s.summary        = package['description']
  s.description    = package['description']
  s.license        = package['license']
  s.author         = package['author']
  s.homepage       = package['homepage']
  s.source         = { http: package['repository'] }

  s.platform       = :ios, '13.0'
  s.swift_version  = '5.0'

  s.preserve_paths = 'LICENSE', 'package.json', 'index.js'

  s.source_files = [
    'ios/RTCP/**/*',
    'notifee/packages/react-native/ios/RNNotifee/*.{h,m}',
    'notifee/ios/NotifeeCore/*.{h,m}'
  ]
  s.pod_target_xcconfig = {
    'HEADER_SEARCH_PATHS' => '$(PODS_TARGET_SRCROOT)/notifee/ios'
  }
  s.dependency 'React-Core'

end
