const path = require('path');

module.exports = {
  devServer: {
    // contentBase: path.join(__dirname, 'build'),
    publicPath: '/build/',
    // port: 8080,
    proxy: {
      '/': 'http://localhost:3000',
      '/resources': 'http://localhost:3000',
    },
  },
  entry: './client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(s*)css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

};
