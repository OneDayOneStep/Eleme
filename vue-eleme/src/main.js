import VueRouter from 'vue-router'
import VueAxios from 'vue-axios'
import Axios from 'axios'

import Vue from 'vue/dist/vue.js'
import './cube-ui'

import App from './App.vue'
import Goods from 'components/goods/Goods'
import Ratings from 'components/ratings/Ratings'
import Seller from 'components/seller/Seller'

import 'common/styles/Styles.scss'

Vue.config.productionTip = false
Vue.use(VueAxios, Axios)
Vue.use(VueRouter)

let app = Vue.extend(App)
let router = new VueRouter({
  routes: [{
    path: '/goods',
    component: Goods
  }, {
    path: '/ratings',
    component: Ratings
  }, {
    path: '/seller',
    component: Seller
  }]
})
new Vue({
  router,
  render: i => i(app)
}).$mount('#entry')
