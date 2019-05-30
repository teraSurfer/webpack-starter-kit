const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

console.log(process.env.NODE_ENV);

const config = {
  entry: {
    app: './src/app.js',
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
         loader: 'babel-loader'
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "css/[name].css",
        chunkFilename: 'css/[id].css'
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: 'body',
    })
  ]
}

if(process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new OptimizeCssAssetsPlugin()
  );
}

module.exports = config;