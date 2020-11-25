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

  s.platform       = :ios, '10.0'
  s.swift_version  = '5.0'

  s.preserve_paths = 'LICENSE', 'package.json', 'index.js'

  s.subspec 'RTCP' do |ss|
    ss.source_files = 'ios/RTCP/**/*'
    ss.dependency 'RNCPushNotificationIOS'
  end

  s.subspec 'RTCPApi' do |ss|
    ss.source_files = 'ios/RTCPApi/**/*'
  end

  s.subspec 'RTCPExt' do |ss|
    ss.source_files = 'ios/RTCPExt/**/*'
    ss.dependency 'RTCP/RTCPApi'
  end
end
