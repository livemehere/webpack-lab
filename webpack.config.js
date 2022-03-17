const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  mode: "production",
  context: __dirname + "/src",
  entry: "./app.ts",
  output: {
    path: __dirname + "/dist",
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  resolve: {
    //Import, export 할때 확장자 명 생략하도록 해줌
    extensions: [".tsx", ".ts", ".js"],
  },
  devServer: {
    static: __dirname + "/dist",
    port: 5252,
    hot: true,
    liveReload: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        test: /\.js(\?.*)?$/i,
      }),
    ],
  },
};
