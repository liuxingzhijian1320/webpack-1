process.env.VUE_ENV = 'server';
const webpack = require('webpack')
var path = require('path');
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf');
const VueSSRPlugin = require('vue-ssr-webpack-plugin')
const config = require('../config');
const utils = require('./utils');

const webpackConfig = merge(baseWebpackConfig, {
  target: 'node',
  entry: './src/entry-server.js',
  module: {
    rules: utils.styleLoaders({
      sourceMap: false,
      extract: false,
    }),
  },
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    alias: {
      'create-api': path.resolve(__dirname, '../src/config/create-api-server.js'),
    },
  },
  // 所有包从node_modules里读取
  externals: Object.keys(require('../package.json').dependencies),
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.build.env,
      'process.env.VUE_ENV': '"server"'
    }),
    new VueSSRPlugin()
  ],
});

module.exports = webpackConfig;
