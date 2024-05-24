// config-overrides.js
const path = require("path");

module.exports = function override(config, env) {
  // Add an alias for "@/layouts"
  config.resolve.alias["@"] = path.resolve(__dirname, "src");

  return config;
};
