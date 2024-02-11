/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  // TODO: Fix webpack config for alias
  //   webpack: (config) => {
  //     config.resolve.alias["@"] = path.join(__dirname, "src");
  //     return config;
  //   },
};

module.exports = nextConfig;
