/* eslint-env jest */
jest.mock('react-native-keyboard-controller', () =>
  require('react-native-keyboard-controller/jest'),
);

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest'),
);

require('react-native/Libraries/Animated/NativeAnimatedAllowlist').allowStyleProp(
  'shadowOffset',
);

jest.mock('@shopify/flash-list', () => {
  const { FlatList } = require('react-native');
  return {
    ...jest.requireActual('@shopify/flash-list'),
    FlashList: FlatList,
  };
});
