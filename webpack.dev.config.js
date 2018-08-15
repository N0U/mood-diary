const merge = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    host: '0.0.0.0',
    port: 8080,
    historyApiFallback: true,
  },
});


