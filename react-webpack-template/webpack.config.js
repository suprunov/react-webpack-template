const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: ['react-hot-loader/patch', path.join(__dirname, 'src', 'index.js')],
  output: {path: path.join(__dirname, 'build'), filename: 'index.bundle.js', publicPath: ''},
  mode: 'development',
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  devtool: 'eval',
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    host: '0.0.0.0',
    port: 3000,
    // disableHostCheck: true,
    watchOptions: {
      poll: true
    },
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: ['babel-loader', 'source-map-loader']
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ['file-loader']
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          format: {
            comments: false
          }
        },
        extractComments: false
      })
    ],
    moduleIds: 'deterministic',
    // nodeEnv: 'production',
    mangleWasmImports: true,
    removeAvailableModules: true,
    flagIncludedChunks: true,
    concatenateModules: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv(),
    new webpack.ids.DeterministicChunkIdsPlugin({maxLength: 5})
  ]
};
