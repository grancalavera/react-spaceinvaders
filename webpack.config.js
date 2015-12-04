var path = require('path')
  , webpack = require('webpack')

module.exports = {
  entry: './src/index.jsx'
, output:
  {
    path: __dirname
  , filename: 'index.js'
  }
, module:
  {
    loaders:
    [
      {
        test: /.jsx?$/
      , loader: 'babel-loader'
      , exclude: /node_modules/
      , query:
        {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}
