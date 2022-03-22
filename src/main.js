import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueCookie from 'vue-cookie'
import router from './router/router'
import store from './store'
import navbar from './components/common/navbar.vue'

Vue.use(VueResource);
Vue.use(VueCookie);

import VueSimpleAlert from "vue-simple-alert";

Vue.use(VueSimpleAlert);

Vue.component('app-navbar', navbar)
import loadingScreen from "./components/loadingScreen.vue";

Vue.component('loading-screen', loadingScreen)

Vue.http.interceptors.push(function (request, next) {
  if (this.$store.getters.token) {
    request.headers.set('Authorization', this.$store.getters.token)
  }
  this.$store.dispatch("troggle_on_loading");
  next(function (response) {
    console.log(response.body)
    this.$store.dispatch("troggle_off_loading");
  });
});

import { ValidationProvider, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';


Vue.component('validation-provider', ValidationProvider);

extend('required', {
  ...required,
  message: 'This field is required'
});

import moment from 'moment'

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YY')
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
