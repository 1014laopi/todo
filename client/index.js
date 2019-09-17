import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'
import Vuex from 'vuex'

import './assets/styles/global.styl'
import createRouter from './config/router'
import createStore from './store/store';

Vue.use(VueRouter);
Vue.use(Vuex);
const router = createRouter();
const store = createStore();

store.registerModule('c', {
  state: {
    text: 3
  }
})

// store.watch((state) => state.count + 10, (newCount) => {
//   console.log('new count watched', newCount);
// })

// 观察者模式
// store.subscribe((mutation, state) => {
//   console.log(mutation.type, mutation.payload);
// })
// store.subscribeAction((action, state) => {
//   console.log(action.type, action.payload);
// })

// 全局路由守卫
router.beforeEach((to, from, next) => {
  // console.log('before each invoked');
  // if(to.fullPath === '/app') {
  //   next('/login')
  // } else {
  //   next();
  // }
  next()
})

router.beforeResolve((to, from, next) => {
  // console.log(to, 'before resolve invoked');
  next()
})

router.afterEach((to, from) => {
  // console.log('after each invoked');
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
