import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',   //开启HTML5的history模式 url中不含#
    routes: [
      {
        path: '/',
        redirect: '/commend'
      },
      {
        path: '/commend',
        component: require('../components/recommend').default
      },
      {
        path: '/singer',
        component: require('../components/singer').default
      },
      {
        path: '/rank',
        component: require('../components/rank').default
      },
      {
        path: '/search',
        component: require('../components/rank').default
      }
    ]
})

export default router;