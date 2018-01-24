const path = require('path')
const Dotenv = require('dotenv-webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const BABEL_CONFIG = {
  presets: [
    'env',
    'react',
    'stage-2'
  ].map(function configMap (name) {
    return require.resolve(`babel-preset-${name}`)
  })
}

module.exports = {
  entry: {
    app: path.resolve('./src/index.js')
  },
  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(['build']),
    new HtmlWebpackPlugin({
      title: 'Commute',
      template: 'index.html'
    })
  ],
  module: {
    noParse: /(mapbox-gl)\.js$/,
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve('.')],
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: BABEL_CONFIG
        }]
      }, {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  }
}
