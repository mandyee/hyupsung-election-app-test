require('dotenv').config();
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './client/app.js',
  mode: process.env.MODE,
  output: {
    filename: 'bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'client/dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader','css-loader'],
        include: [/src/, /node_modules/]
      }, {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-2']
        }
      }, {
        test: /\.json$/,
        loader: 'json-loader',
        include: '/build/contracts/'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'LOCAL_NODE': JSON.stringify(process.env.LOCAL_NODE),
        'MODE':JSON.stringify(process.env.MODE),
      }
    })
  ],
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },
  externals:[{
    xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}'
  }]
};
