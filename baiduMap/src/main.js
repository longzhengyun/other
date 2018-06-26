import Vue from 'vue'
import VueRouter from 'vue-router'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import store from './store/index'
import routes from './router/index'
import App from './App.vue'

import 'swiper/dist/css/swiper.css'

Vue.use(VueRouter)
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

const router = new VueRouter({
  routes
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')