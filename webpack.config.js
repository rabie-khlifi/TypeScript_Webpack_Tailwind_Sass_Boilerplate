const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: {
    bundle: path.resolve(__dirname, "src/js/index.ts"),
  },
  module: {
    rules: [{
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: [
          'html-loader',
          {
            loader: 'posthtml-loader',
            options: {
              plugins: [
                require('posthtml-include')({
                  // src inside partials shuld use the path as if its inside the file including it 
                  root: path.resolve(__dirname, 'src')
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack App',
      filename: 'index.html',
      template: 'src/index.html',
      inject: 'body' // adds script to bottom of body
      // chunks: [], // use this to apply js files to certain files

    })

  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  }
};