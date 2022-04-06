module.exports = {
  resolve: {
    extensions: [".js", ".ts"],
  },
  entry: "./electron/main.ts",
  module: {
    rules: require("./rules.webpack"),
  },
};
