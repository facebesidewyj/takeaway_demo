// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from 'components/goods/goods.vue';
import ratings from 'components/ratings/ratings.vue';
import seller from 'components/seller/seller.vue';
import VueBus from './common/js/vue-bus.js';
import 'common/stylus/index.styl';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueBus);

let routes = [
  { path: '/goods', component: goods },
  { path: '/ratings', component: ratings },
  { path: '/seller', component: seller },
  { path: '*', component: goods }
];

let router = new VueRouter({
  routes,
  linkActiveClass: 'active'
});

// 注册组件
Vue.component('app', App);

/* eslint "no-new": 0 */
new Vue({
  el: '#app',
  router
});

// 初始化默认跳转地址
router.push({ path: '/goods' });
