// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

import iView from 'iview'
import 'iview/dist/styles/iview.css';    // 使用 CSS
Vue.use(iView);

import App from './App.vue'
import  routes from './config/routes'

//bind api to public
import api from './config/api'
Vue.prototype.$api = api;

Vue.config.productionTip = false;

//register public component
Vue.component('navigation',require('./page/navigation.vue'));

const router = new VueRouter({
  routes
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
