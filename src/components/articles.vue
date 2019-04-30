<!--  -->
<template>
    <div class="doc-container" id="doc-container">
        <div class="container-fixed">
            <div class="col-content">
                <div class="inner">
                    <!-- 文章列表页 -->
                    <!-- <article-list></article-list> -->
                    <!-- 文章详情页 -->
                    <!-- <article-details></article-details> -->
                    <router-view></router-view>
                </div>
            </div>
            <!-- 侧栏导航 -->
            <side-bar></side-bar>
        </div>
    </div>
</template>

<script>
import SideBar from './sideBar'
import ArticleList from './articleList'
import ArticleDetails from './articleDetails'
export default {
    name: 'articles',
    components: {
        SideBar,
        ArticleList,
        ArticleDetails
    },
    data () {
        return {
        }
    },
    mounted(){
        // document.documentElement.scrollTop = 0;
    }
}

</script>
<style scoped>
.container-fixed{width:1280px;margin-left:auto;margin-right:auto;position:relative}
.doc-container{position:relative;padding-top:60px;-webkit-transition:all .2s;transition:all .2s;min-height:100vh}
.artcle{transition:animation .3s linear}
.zoomIn{animation:zoomIn 1s both}
@keyframes zoomIn{0%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}
50%{opacity:1}
}
@media screen and (max-width:1366px){.container-fixed{width:90%}
}
@media screen and (max-width:1024px){
.container-fixed{width:90%}
} 
</style>