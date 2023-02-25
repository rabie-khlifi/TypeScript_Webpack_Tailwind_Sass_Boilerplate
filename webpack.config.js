const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: {
    bundle: path.resolve(__dirname, "src/js/index.ts"),
  },
  mode: "development",
  devServer: {
    watchFiles: ["src/**/*"],
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin(),
    ]
  },
  module: {
    rules: [{
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        include: path.resolve(__dirname, "src"),
        use: [
          // could replace the next line with "style-loader" here for inline css
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack App',
      filename: 'index.html',
      template: 'src/index.html',
      inject: 'body' // adds script to bottom of body
      // chunks: [], // use this to apply js files to certain files

    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].css"
    }),

  ],
  output: {
    filename: "js/[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};