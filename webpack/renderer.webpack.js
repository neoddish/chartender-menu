const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = {
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".json", ".svg"],
  },
  module: {
    rules: require("./rules.webpack"),
  },
  plugins: [
    new MonacoWebpackPlugin({
      // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
      languages: ["json"],
    }),
  ],
};
