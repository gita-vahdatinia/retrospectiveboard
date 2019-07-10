const path = require('path');

module.exports = {
  node: {
    fs: 'empty',
    net: 'empty'
  },
  entry: './src/index.js',
  output: {
    path: path.resolve('public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
      test: /\.css$/,
      use: [
        { loader: 'style-loader', options: {insertAt: 'top'}, },
        { loader: 'css-loader', options:{sourceMap: true}, },
      ]
    },
    ]
  }
};
