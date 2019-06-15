const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const dirs = {
  dev: "src",
  prod: "prod"
}

const config = {
  entry: path.resolve(__dirname, dirs.dev, "ts", "index.ts"),
  output: {
    path: path.resolve(__dirname, dirs.prod)
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, dirs.dev, "html", "index.html"),
      filename: "index.html"
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, dirs.dev, "css"),
        to: path.resolve(__dirname, dirs.prod, "css")
      }
    ])
  ]
};

module.exports = { config, dirs }
