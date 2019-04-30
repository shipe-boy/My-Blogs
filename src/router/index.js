import Vue from 'vue'
import Router from 'vue-router'

//数据请求
import Axios from 'axios'
Vue.prototype.$ajax = Axios

//组件
import Start from '../views/start'
import Index from '../views/index'
import LinkPage from '../views/link'
import MsgBoard from '../views/msgboard'
import Articles from '../components/articles'
// import Login from '../views/login'
// import Register from '../views/register'
import User from '../views/user'
import ArticleList from '../components/articleList'
import ArticleDetails from '../components/articleDetails'
import Publish from '../views/publish'
import Userinfo from '../views/userinfo'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    //初始页面
    {
      path: '/',
      name: 'start',
      component: Start
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      redirect: '/index/articles',
      children: [
        {
          path: 'articles',
          name: 'articles',
          component: Articles,
          redirect: 'articles/articleList',
          children: [
            {
              path: 'articleList',
              name: "articleList",
              component: ArticleList
            },
            {
              path: 'articleDetails/:id',
              name: "articleDetails",
              component: ArticleDetails
            }
          ]
        },
        {
          path: 'linkpage',
          name: 'linkpage',
          component: LinkPage
        },
        {
          path: 'msgboard',
          name: 'msgboard',
          component: MsgBoard
        },
        /* {
          path: 'login',
          name: 'login',
          component: Login
        },
        {
          path: 'register',
          name: 'register',
          component: Register
        }, */
        {
          path: 'user',
          name: 'user',
          component: User
        },
        {
          path: 'publish',
          name: 'publish',
          component: Publish
        },
        {
          path: 'userinfo',
          name: 'userinfo',
          component: Userinfo
        }
      ]
    }
  ]
})
