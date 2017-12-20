const path = require('path');

const config = {
  entry: './lib/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.(js)$/, exclude: /node_modules/, use: 'babel-loader' },
      {test: /(\.css)$/, use: ['style', 'css']},
    ]
  }
};

module.exports = config;
