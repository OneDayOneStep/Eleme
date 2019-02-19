import Vue from 'vue/dist/vue.js'
import VueRouter from 'vue-router'
import './cube-ui'
import App from './App.vue'
import Goods from './components/Goods'
import Ratings from './components/Ratings'
import Seller from './components/Seller'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.extend({
  template: App
})

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
  router
}).$mount('#app')
