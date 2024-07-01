const { getDefaultConfig } = require('@expo/metro-config');

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);
  return {
    ...defaultConfig,
    server: {
      ...defaultConfig.server,
      port: 8082,
    },
    // Any additional customizations can be added here
  };
})();
