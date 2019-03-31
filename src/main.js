import Vue from 'vue';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VeeValidate from 'vee-validate';

import router from './router';
import store from './store';
import App from './App.vue';

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);

import titleMixin from './mixins/titleMixin';

const moment = require('moment');
require('moment/locale/zh-cn');
Vue.use(require('vue-moment'), { moment });

window._ = require('lodash');

window.APIUrl = process.env.VUE_APP_API_URL;
window.axios = require('axios');
// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['Content-Type'] = 'application/json';

// Do something before request is sent
if ( localStorage.getItem('token') ) {
  window.axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  axios.post( APIUrl + '/jwt-auth/v1/token/validate').then((response) => {

  }).catch((error) => {
    console.log(error)
    localStorage.removeItem('token')
  })
}

// Add a request interceptor
window.axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  // Do something before request is sent
  if ( localStorage.getItem('token') ) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});



Vue.config.productionTip = false;

Vue.use(VeeValidate);
Vue.mixin(titleMixin);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
