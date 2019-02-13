const path = require('path')

const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const CleanWebpack = require('clean-webpack-plugin')
const UglifyJsPlugin = require('webpack-parallel-uglify-plugin')
const baseWebpackConfig = require('./webpack.base.config')

module.exports = merge(baseWebpackConfig, {
  output: {
    filename: 'js/[name].[chunkhash:5].js',
    chunkFilename: 'js/[name].[chunkhash:5].js'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),

    new UglifyJsPlugin({
      cacheDir: '.cache/',
      uglifyJS:{
        output: {
          comments: false
        },
        compress: {
          warnings: false
        }
      }
    }),

    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),

    new webpack.NoEmitOnErrorsPlugin(),

    //将css文件打包成独立文件
    new ExtractTextPlugin({
      filename: 'css/[name].[contentHash:5].css',
      allChunks: false
    }),

    //清除打包目录
    new CleanWebpack(path.resolve(__dirname, '../dist'))
  ]
})