module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          "@tests": "./src/tests",
          "@assets": "./src/assets",
          "@pages": "./src/pages",
          "@components": "./src/components",
          "@styles": "./src/styles",
          "@modules": "./src/modules",
          "@hooks": "./src/hooks",
          "@interfaces": "./src/interfaces",
          "@redux": "./src/redux",
          "@utils": "./src/utils",
          "@navigation": "./src/navigation",
        },
      },
    ],
  ],
};
