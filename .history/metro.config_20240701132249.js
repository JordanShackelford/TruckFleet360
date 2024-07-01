// metro.config.js
const { getDefaultConfig } = require('@react-native/metro-config');

module.exports = getDefaultConfig(__dirname, {
  server: {
    port: 8082,
  },
});
