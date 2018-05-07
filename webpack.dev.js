const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: [
      __dirname,
      path.resolve(__dirname, '../')
    ],
    proxy: {
      '/api/**': {
        target: 'http://localhost:1337',
        // target: 'http://ubicomp-web.d2.comp.nus.edu.sg:1337/',
        secure: false
      },
      '/subgraphs/**': {
        target: 'http://ubicomp-web.d2.comp.nus.edu.sg:5002/',
        secure: false
      }
    }
  }
})
