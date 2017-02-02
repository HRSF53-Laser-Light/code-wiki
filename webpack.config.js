var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/app/components', 'app.jsx'),
  output: {
    path: path.resolve(__dirname, 'src/public/build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: path.resolve(__dirname, 'src/app/components'),
        loader: 'babel'
      }
    ]
  },

  devtool: 'source-map'
};