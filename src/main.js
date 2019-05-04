// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//博客样式
import '../static/css/gloable.css'
import '../static/css/blog.css'
import '../static/layui/css/layui.css'
import '../static/font-awesome/css/font-awesome.min.css'
// import '../static/css/animate.min.css'
//富文本编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
//代码高亮
import 'highlight.js/styles/xcode.css'

import infiniteScroll from 'vue-infinite-scroll' //滚动加载
// import VueLazyLoad from 'vue-lazyload' //图片加载动画
Vue.use(infiniteScroll)
    /* Vue.use(VueLazyLoad, {
        loading: "./static/loading-svg/loading-bars.svg"
    }) */

Vue.use(Vuex)

Vue.use(ElementUI);

Vue.config.productionTip = false


const store = new Vuex.Store({
    state: {
        username: '',
        userface: '',
    },
    mutations: {
        userName(state, username) {
            state.username = username;
        },
        userFace(state, userface) {
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