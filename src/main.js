// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import '../static/css/gloable.css'
import '../static/css/blog.css'
import '../static/layui/css/layui.css'
import '../static/font-awesome/css/font-awesome.min.css'
import '../static/css/animate.min.css'

Vue.use(Vuex)

Vue.use(ElementUI);

Vue.config.productionTip = false


const store = new Vuex.Store({
  state: {
    username: '',
    userface: '',
  },
  mutations: {
    userName(state, username){
      state.username = username;
    },
    userFace(state, userface){
      state.userface = userface;
    }
  }
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
