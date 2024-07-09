const { getDefaultConfig } = require('@expo/metro-config');
const { mergeConfig } = require('@react-native/metro-config');

const config = async () => {
  const expoDefaultConfig = await getDefaultConfig(__dirname);
  
  return mergeConfig(expoDefaultConfig, {
    server: {
      port: 8082, // Keep your custom port
    },
    // Any additional customizations can be added here
  });
};

module.exports = config();