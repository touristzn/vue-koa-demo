import Vue from 'vue'
import fastclick from 'fastclick'
import router from '../router'
import store from '../store'
import App from '../app'
import VueLazyload from 'vue-lazyload'

import '../static/less/common'

//消除点击延时
fastclick.attach(document.body)

//懒加载
Vue.use(VueLazyload, {
    loading: require('../static/images/loading.svg')
})

new Vue({
    el: "#wrapper",  //模板中的id
    render: (h) => h(App),
    store,
    router
})
