const path = require("path");
const common = require("./webpack.config");
const {
  merge
} = require("webpack-merge");


module.exports = merge(common, {
  mode: "development",
  devServer: {
    watchFiles: ["src/**/*"],
  },
  module: {
    rules: [{
      test: /\.(s[ac]|c)ss$/i,
      include: path.resolve(__dirname, "src"),
      use: [
        "style-loader",
        "css-loader",
        "postcss-loader",
        'sass-loader',
      ],
    }, ],
  },
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "dist"),
  },
});