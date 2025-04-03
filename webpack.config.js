const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devtool: 'eval-source-map',
  devServer: {
    watchFiles: ['./src/template.html'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',
    }),
    new Dotenv({
      path: './.env', // assuming you have a .env file in your root directory
    }),
    new webpack.EnvironmentPlugin({
      API_KEY: 'KCTHAJZQZNWSG2EP9Y3X7XBBB',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    fallback: {
      process: require.resolve('process/browser'),
      path: false,
      crypto: false,
      os: false,
      buffer: false,
      stream: false,
      vm: false,
    },
  },
};
