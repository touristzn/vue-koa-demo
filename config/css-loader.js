const ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      sourceMap: options.sourceMap,
      plugins: [
        require('postcss-cssnext')()
      ]
    }
  }

  const lessLoader = {
    loader: 'less-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const loaders = [cssLoader, postcssLoader, lessLoader];

  if (options.extract) {
    return ExtractTextPlugin.extract({
      use: loaders,
      fallback: 'style-loader'
    })
  } else {
    return ['style-loader'].concat(loaders)
  }
}