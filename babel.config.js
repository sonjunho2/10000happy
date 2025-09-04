module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo']
    // ❌ 'react-native-reanimated/plugin' 사용 안 함
  };
};
