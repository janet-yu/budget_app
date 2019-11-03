const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './src/js/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'), // where our bundle should be
    filename: 'js/bundle.js'
  },
  devServer: {
    contentBase: './dist' // where the server will serve content from
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/, // tests for a .js at the end of a file
        exclude: /node_modules/,
        use: { // if test is true, apply the babel-loader
          loader: 'babel-loader',
        }
      },
    ]
  },
  mode: 'development'
}
