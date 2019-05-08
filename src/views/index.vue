<!--  -->
<template>
  <div>
		<!-- <div class="header">
		</div> -->
        <bg></bg>

		<!-- 头部 -->
		<header-nav></header-nav>
		
        <transition name="fade" mode="out-in">
		<router-view></router-view>
        </transition>
		<!-- 内容区域 -->
		<!-- <articles></articles> -->
		<!-- 留言板 -->
		<!-- <msg-board></msg-board> -->
		<!-- 友情链接 -->
		<!-- <link-page></link-page> -->
		<!-- 个人中心 -->
		<!-- <users></users> -->
		<!-- 文章发表页 -->
		<!-- <publish></publish> -->
		<!-- 底部 -->
		<footer-nav></footer-nav>
        <back-top></back-top>
  </div>
</template>

<script>
import Bg from '../components/bg'

//组件
import Articles from '../components/articles' //文章组件
import LinkPage from './link'  //友情链接
import MsgBoard from './msgboard'  //留言板
import User from './user' //用户管理页面
import Publish from './publish'   //文章发表页

import BackTop from '../components/backTop';    //回到顶部

export default {
	name: 'index',
	components: {
		Articles,
		LinkPage,
		MsgBoard,
		User,
        Publish,
        Bg,
        BackTop
	},
	data () {
		return {
		}
    }
}

</script>
<style scoped>
/* .header{margin:0 auto;width:100%;height:100%;background-color:#000;position:fixed!important;background-image:url('../assets/bg3.jpg');background-size:100% 100%} */
.fade-enter-active {
    transition: all .5s;
  }
  .fade-enter {
    opacity: 0;
  }
  .fade-leave-active {
    transition: all .5s;
    opacity: 0;
  }
</style>