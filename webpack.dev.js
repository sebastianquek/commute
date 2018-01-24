const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: [
      __dirname,
      path.resolve(__dirname, '../')
    ]
  }
})
