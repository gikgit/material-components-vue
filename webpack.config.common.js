const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const root = path.join(__dirname)
const demo = path.join(root + '/demo/')
const dist = path.join(root + '/dist/')
const nodeModules = path.join(root, '/node_modules/')

module.exports = {
  entry: {
    app: [path.resolve(demo + 'index.js')]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [demo, path.join(nodeModules, '@material')],
        options: {
          cacheDirectory: true
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          preserveWhitespace: false,
          loaders: {
            scss: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: false,
                    importLoaders: 1
                  }
                },
                {
                  loader: 'postcss-loader'
                },
                {
                  loader: 'sass-loader',
                  options: {
                    includePaths: [nodeModules]
                  }
                }
              ]
            })
          }
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/,
        options: {
          minimize: true
        }
      },
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },
  resolve: {
    alias: {
      panels: path.resolve(demo + '/panels/'),
      views: path.resolve(demo + '/views/'),
      modules: path.resolve(demo + '/store/modules/'),
      routes: path.resolve(demo + '/router/routes/')
    },
    extensions: ['.js', '.json', '.css', '.scss', '.vue']
  },
  plugins: [
    new webpack.ProvidePlugin({
      Promise: 'core-js/fn/promise'
    }),
    new CleanWebpackPlugin(['public']),
    new HtmlWebpackPlugin({
      template: path.resolve(demo + 'index.html'),
      chunksSortMode: 'dependency'
      // hash: true
    }),
    // new ScriptExtHtmlWebpackPlugin({
    // prefetch: {
    // test: /\.js$/,
    // chunks: 'async'
    // }
    // }),
    new ExtractTextPlugin({
      filename: '[name].[chunkhash].min.css',
      allChunks: false
    })
  ],
  stats: {
    all: false,
    assets: true,
    chunkModules: true,
    chunkOrigins: true,
    errors: true,
    errorDetails: true,
    colors: true
  }
}
