var path = require('path')
  , webpack = require('webpack')

module.exports = {
  entry: './src/main.jsx'
, output:
  {
    path: __dirname
  , filename: 'space-invaders.js'
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
