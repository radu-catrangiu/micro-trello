import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import VueCookies from 'vue-cookies'

Vue.use(BootstrapVue)
Vue.use(VueCookies)

if (process.env.NODE_ENV === "production") {
  Vue.prototype.apiUrl = location.origin + "/api/"
  Vue.prototype.authUrl = location.origin + "/auth/"
} else {
  Vue.prototype.apiUrl = "http://localhost:8081/api/"
  Vue.prototype.authUrl = "http://localhost:8082/auth/"
}

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
