import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VeeValidate from 'vee-validate';

const moment = require('moment')
require('moment/locale/zh-cn')
Vue.use(require('vue-moment'), { moment });

import VuePrism from 'vue-prism'
Vue.use(VuePrism)

import 'prismjs/themes/prism.css'


import router from './router';
import store from './store';

import App from './App.vue';

window._ = require('lodash');
window.APIUrl = 'http://www.yaoin.net/wp-json';
window.axios = require('axios');
// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['Content-Type'] = 'application/json';
// Add a request interceptor
window.axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (localStorage.getItem('token')) {
    config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});


Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VeeValidate);

import titleMixin from './mixins/titleMixin'
Vue.mixin(titleMixin)

const app = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
