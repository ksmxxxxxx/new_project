var path = require('path');
var sass = require('node-sass');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
module.exports = [
  {
    entry: ['./source/app.js'],
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
  },

  {
    entry: ['./source/stylesheets/master.scss'],
    output: {
      filename: 'bundle.css',
      path: path.resolve(__dirname, 'dist/stylesheets')
    },
    module: {
      rules: [{
        test: /\.scss/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader','sass-loader?outputStyle=expanded']
        })
      }]
    },
    plugins:[
      new ExtractTextPlugin('bundle.css')
    ],
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 9000
    }
  }
];
