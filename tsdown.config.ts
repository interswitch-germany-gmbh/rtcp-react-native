import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: { notifee: 'notifee-bundle.ts' },
  format: ['cjs'],
  outExtensions: () => ({ js: '.js', dts: '.d.ts' }),
  dts: true,
  sourcemap: true,
  clean: true,
  outDir: 'dist',
  external: [
    'react',
    'react-native',
    '@react-native-firebase/messaging',
    'react-native-device-info',
    'react-native-default-preference',
  ],
});
