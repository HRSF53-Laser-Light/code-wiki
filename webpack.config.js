var webpack = require('webpack');
var path = require('path');

// @QUESTION how do we get webpack to show errors during watch??
// This is what it looks like in terminal when you run 'webpack'
// ERROR in ./src/app/components/sideNav/sideNav.jsx
// Module build failed: SyntaxError: Unexpected token (8:17)

//    6 |     super();
//    7 |     this.state = {
// >  8 |       categories = []
//      |                  ^
//    9 |     }
//   10 |   }
//   11 | 

//  @ ./src/app/components/app.jsx 21:15-47

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