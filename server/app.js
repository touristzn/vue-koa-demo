"use strict";

/**
 * 项目主文件
 */
const path = require('path');
const config = require('../config/server/env.config');

// env
process.env.DEBUG = config.debug;

const http = require('http')
const koa = require('koa')
const staticServe = require('koa-static')
const views = require('koa-views')
const bodyParser = require('koa-body')
const error = require('koa-error')
const compress = require('koa-compress')
const connectHistory = require('koa-connect-history-api-fallback')
const proxy = require('koa-proxy')

const NODE_ENV = process.env.NODE_ENV;

// new app
const app = new koa();

if (NODE_ENV === 'development') {
  //刷新当前页面显示not found，from需要重定向到首页，此方法必须放在最前面，否则只有首页组件能热更新
  app.use(connectHistory({
    rewrites: [
      { from: /^\/commend$/, to: '/' }
    ]
  }))
}

if (NODE_ENV !== 'production') {
  // compiler callback
  let lastHash = null;
  function compilerCallback(err, stats) {
    if (err) {
      // Do not keep cache anymore
      compiler.purgeInputFileSystem();
    }

    if (err) {
      lastHash = null;
      console.error(err.stack || err);
      if (err.details) console.error(err.details);
    }

    if (stats.hash !== lastHash) {
      lastHash = stats.hash;
      let statsString = stats.toString();
      if (statsString) process.stdout.write(statsString + "\n");
    }
  }

  const webpack = require('webpack');
  const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware')
  const webpackConfig = require('../config/webpack.dev.config');
  const compiler = webpack(webpackConfig);

  Object.keys(webpackConfig.entry).forEach(function (key) {
    let val = webpackConfig.entry[key];
    val.unshift('webpack-hot-middleware/client?noInfo=true&reload=true')
  });

  app.use(devMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true },
    noInfo: false
  }))

  app.use(hotMiddleware(compiler, {
    log: console.log
  }));
}

// compress
app.use(compress({
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH
}));

// 静态文件
app.use(staticServe(path.join(__dirname, '../dist')));
app.use(views(path.resolve(__dirname, '../dist'), {
  extension: 'html'
}));

// body
app.use(bodyParser({
  multipart: true,
  jsonLimit: '1mb',
  formLimit: '500kb',
}));

//proxy
app.use(proxy({
  host: 'https://c.y.qq.com',
  match: /^\/api\//,
  map: function (path) {
    return path.replace('/api', '')
  }
}));

// 加载路由
app.use(require('./router/index').routes())

// not found
app.use(async (ctx, next) => {
  console.log(ctx.path)
  ctx.throw('Not Found!', 404);
});

// 开启监听服务
const server = app.listen(config.port);

console.log(`=====server listen on: ${config.port}=====`);