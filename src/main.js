import Vue from 'vue'
import moment from 'moment'
import VueResource from 'vue-resource'
import VueSimpleAlert from 'vue-simple-alert'
import device from "vue-device-detector"



import App from '@/App'
import router from '@/router/index.js'
import loadingScreen from '@/components/loadingScreen.vue'

import store from '@/store'
import navbar from '@/components/common/navBar.vue'

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(VueSimpleAlert)
Vue.use(device)

Vue.component('loading-screen', loadingScreen)
Vue.component('app-navbar', navbar)

Vue.http.interceptors.push(function (request, next) {
  if (this.$store.getters.token) {
    request.headers.set('Authorization', this.$store.getters.token)
  }
  this.$store.dispatch('troggle_on_loading')
  next(function (response) {
    console.log(response.body)
    this.$store.dispatch('troggle_off_loading')
  })
})

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YY')
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
