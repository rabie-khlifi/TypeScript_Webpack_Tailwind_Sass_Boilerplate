const path = require("path");
const common = require("./webpack.config");
const {
  merge
} = require("webpack-merge");

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {

          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              "imagemin-gifsicle",
              "imagemin-mozjpeg",
              "imagemin-pngquant",
              "imagemin-svgo",
            ],
          },
        },
        generator: [{
          // You can apply generator using `?as=webp`, you can use any name and provide more options
          preset: "webp",
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            // Please specify only one plugin here, multiple plugins will not work
            plugins: ["imagemin-webp"],
          },
        }, ],
      }),
    ]
  },
  module: {
    rules: [{
      test: /\.(s[ac]|c)ss$/i,
      include: path.resolve(__dirname, "src"),
      use: [
        // could replace the next line with "style-loader" here for inline css
        MiniCssExtractPlugin.loader,
        "css-loader",
        "postcss-loader",
        'sass-loader',
      ],
    }],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].css"
    }),

  ],
  output: {
    filename: "js/[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "assets/images/[name].[hash][ext]",
    clean: true,
  },
});