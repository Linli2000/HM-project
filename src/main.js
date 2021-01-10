import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'

import './vant'
Vue.config.productionTip = false


Vue.use(Vuex)
const store = new Vuex.Store({
state: {
  // 管理数据
  const:0,
  const2:2,
  const3:4,
}
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
