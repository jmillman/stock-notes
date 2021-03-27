const path = require('path');

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'static'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.(js)$/, exclude: /node_modules/, use: 'babel-loader' },
      {test: /(\.css)$/, use: ['style', 'css']},
    ]
  },
  mode: 'development',
};

module.exports = config;
