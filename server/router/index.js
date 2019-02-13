const router = require('koa-router')()

router.prefix('/commend');

router.get('/', async (ctx, next) => {
  await ctx.render('index');
})

module.exports = router;