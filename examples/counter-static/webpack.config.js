var path = require('path')
var webpack = require('webpack')
var IsomorphicPlugin = require('webpack-isomorphic-tools/plugin');
var makeIsomorphicConfig = require('./common/isomorphic.config');

var isomorphicPlugin = new IsomorphicPlugin(makeIsomorphicConfig('.'));
isomorphicPlugin.development(true);

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'babel-polyfill',
    'reflect-metadata',
    'webpack-hot-middleware/client',
    './client/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    isomorphicPlugin
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        include: __dirname,
        query: {
          presets: [ 'react-hmre' ]
        }
      }
    ]
  }
}
