// Re-exports the notifee library from its local submodule so it can be bundled alongside this package.
import notifee from './notifee/packages/react-native/src/index';
export * from './notifee/packages/react-native/src/index';
export default notifee;
