/**
 * 配置server端，不同发布环境的一些信息
 */

var APP_ENV = process.env.APP_ENV || 'local'
var configs = {}

var common = {
  env: APP_ENV,
  debug: 'app:*',
  port: '5001',

  // i18n资源文件读取目录：temp, fixed
  i18nDir: 'fixed'
}

// local
configs['local'] = Object.assign({}, common, {
  port: '3000',
  i18nDir: 'fixed', // temp, fixed
})

// test
configs['test'] = Object.assign({}, common, {
  port: '5002',
  i18nDir: 'fixed', // temp, fixed
})

// prod
configs['prod'] = Object.assign({}, common, {
  port: '5003',
  i18nDir: 'fixed', // temp, fixed
})

module.exports = configs[APP_ENV]
