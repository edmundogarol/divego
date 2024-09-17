module.exports = function (api) {
  api.cache(false);

  return {
    presets: ["module:@react-native/babel-preset"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          envName: "APP_ENV",
          moduleName: "@env",
          path: ".env.dev",
        },
      ],
      "react-native-reanimated/plugin",
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
};
