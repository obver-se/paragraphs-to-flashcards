const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.config.js');

module.exports = merge(common, {
  mode: "development",
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    watchContentBase: true
  }
});
