const path = require("path");
const APP_DIR = path.resolve(__dirname, "../src");
const MONACO_DIR = path.resolve(__dirname, "../node_modules/monaco-editor");

module.exports = [
  {
    test: /\.(t|j)sx?$/,
    exclude: /node_modules/,
    loader: "babel-loader",
    options: {
      presets: [
        "@babel/preset-typescript",
        ["@babel/preset-env", { modules: "commonjs" }],
        "@babel/preset-react",
      ],
      plugins: [
        "@babel/plugin-transform-runtime",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-object-rest-spread",
      ],
    },
  },
  {
    test: /\.(css|less)$/,
    include: APP_DIR,
    use: [
      { loader: "style-loader" },
      { loader: "css-loader", options: { sourceMap: true } },
      {
        loader: "less-loader",
        options: {
          sourceMap: true,
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    ],
  },
  {
    test: /\.css$/,
    include: MONACO_DIR,
    use: ["style-loader", "css-loader"],
  },
  {
    test: /\.svg$/,
    use: [
      {
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "images/",
        },
      },
    ],
  },
  {
    test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      {
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "fonts/",
        },
      },
    ],
  },
];
