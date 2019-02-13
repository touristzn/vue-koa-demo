const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const os = require('os')
const path = require('path')
const glob = require('glob')

const isProd = process.env.NODE_ENV === 'production';
const utils = require('./css-loader')

let htmlPlugins = [];

module.exports = aa = {
  entry: getEntry(),
  context: path.resolve(__dirname, "../"),

  output: {
    path: resolve('dist'),
    publicPath: '/'
  },

  devtool: isProd ? '#source-map' : 'eval-source-map',

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          'babelrc': false,
          'presets': [
            'env',
            'stage-2'
          ],
        },
        include: [resolve('app')]
      },

      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: [resolve('app')]
      },

      {
        test: /\.(css|less)$/,
        use: utils.cssLoaders({
          sourceMap: isProd ? false : true,
          extract: isProd
        })
      },

      {
        test: /\.(jpe?g|png|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'images/[name]-[hash:5].[ext]',
              limit: 1000
            }
          }
        ]
      },

      {
        test: /\.(eot|ttf|woff)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'iconfont/[name]-[hash:5].[ext]',
              limit: 5000
            }
          }
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx', '.vue', '.less', '.css']
  },

  plugins: [
    new VueLoaderPlugin(),

    //提取第三方库
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return (
          module.resource &&
          /\.(js|jsx|ttf|woff)$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),

    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),

    //提取公共代码和业务代码
    new webpack.optimize.CommonsChunkPlugin({
      name: ['common'],
      async: 'vendor-async',
      children: true,
      minChunks: 3
    })
  ]
    .concat(htmlPlugins)
}

/**
 * 获取entry文件夹下面的所有页面
 */
function getEntry() {
  let entry = {};
  //读取页面目录，并进行路径裁剪
  glob.sync(path.resolve(__dirname, '../app/entry/*.js'))
    .forEach(ele => {
      let name = ele.split('/').pop().replace(/\.jsx?/, '');
      entry[name] = [ele];
      //生成页面
      htmlPlugins.push(
        new HtmlWebpackPlugin({
          filename: name + '.html',
          template: './views/index.html',
          title: '学习vue',
          description: '学习vue',
          inject: 'body',
          chunksSortMode: 'dependency'
        })
      )
    });

  return entry;
}

/**
 * 获取绝对路径
 */
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}