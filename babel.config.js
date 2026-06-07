module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'babel-plugin-react-compiler',
    [
      'module:react-native-dotenv',
      {
        safe: true,
      },
    ],
    'react-native-worklets/plugin',
  ],
};
