import Vue from 'vue'
import Router from 'vue-router'

//数据请求
import Axios from 'axios'
Vue.prototype.$ajax = Axios

//组件
import LinkPage from '../views/link'
import MsgBoard from '../views/msgboard'
import Articles from '../components/articles'
import Example from '../views/example'
import User from '../views/user'
import ArticleList from '../components/articleList'
import ArticleDetails from '../components/articleDetails'
import Publish from '../views/publish'
import Userinfo from '../views/userinfo'
import ExPublish from '../views/exPublish'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        //初始页面
        {
            path: '/',
            name: 'index',
            redirect: '/art/all',
        }, {
            path: '/art',
            name: 'articles',
            component: Articles,
            redirect: '/art/all',
            children: [{
                    path: ':type',
                    name: "articleList",
                    component: ArticleList
                },
                {
                    path: 'Details/:id',
                    name: "articleDetails",
                    component: ArticleDetails
                }
            ]
        }, {
            path: '/linkpage',
            name: 'linkpage',
            component: LinkPage
        }, {
            path: '/msgboard',
            name: 'msgboard',
            component: MsgBoard
        }, {
            path: '/example',
            name: 'example',
            component: Example
        }, {
            path: '/user',
            name: 'user',
            component: User
        }, {
            path: '/publish',
            name: 'publish',
            component: Publish
        }, {
            path: '/exPublish',
            name: 'exPublish',
            component: ExPublish
        }, {
            path: '/userinfo',
            name: 'userinfo',
            component: Userinfo
        },

    ]
})