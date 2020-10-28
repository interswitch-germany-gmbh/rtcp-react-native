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

  s.preserve_paths = 'LICENSE', 'package.json', 'index.js'
  s.source_files   = 'ios/RTCP/**/*'
end
