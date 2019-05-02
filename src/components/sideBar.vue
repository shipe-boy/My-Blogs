<!--  -->
<template>
    <div class="col-other">
        <div class="inner">
            <div class="other-item" id="categoryandsearch">
                <div class="search">
                    <label class="search-wrap">
                        <input type="text" id="searchtxt" placeholder="输入关键字搜索" />
                        <span class="search-icon">
                            <i class="fa fa-search"></i>
                        </span>
                    </label>
                    <ul class="search-result"></ul>
                </div>
                <ul class="category mt20" id="category">
                    <li data-index="0" class="slider"></li>
                    <li data-index="1"><a @click='chengeList()'>全部文章</a></li>
                    <li data-index="2"><a @click='chengeList("HTML5和CSS3")'>HTML5和CSS3</a></li>
                    <li data-index="3"><a @click='chengeList("JavaScript")'>JavaScript</a></li>
                    <li data-index="4"><a @click='chengeList("Vue")'>Vue</a></li>
                    <li data-index="5"><a @click='chengeList("Node")'>Node</a></li>
                    <li data-index="6"><a @click='chengeList("React")'>React</a></li>
                    <li data-index="6"><a @click='chengeList("其他")'>其他</a></li>
                </ul>
            </div>

            <!-- 热门文章排名 -->
            <div class="other-item">
                <h5 class="other-item-title">热门文章</h5>
                <div class="inner">
                    <ul class="hot-list-article">
                            <li> <a href="javascript:;">个人简历</a></li>
                            <li> <a href="javascript:;">Vue简易的电商网站</a></li>
                            <li> <a href="javascript:;">原生javaScript实现的打飞机</a></li>
                            <li> <a href="javascript:;">layui框架的使用</a></li>
                            <li> <a href="javascript:;">Elmentui真好用</a></li>
                            <li> <a href="javascript:;">我的github项目</a></li>
                            <li> <a href="javascript:;">我的服务器地址</a></li>
                            <li> <a href="javascript:;">node如何在服务器部署</a></li>
                    </ul>
                </div>
            </div>

            <!-- 置顶推荐 -->
            <!-- <div class="other-item">
                <h5 class="other-item-title">置顶推荐</h5>
                <div class="inner">
                    <ul class="hot-list-article">
                            <li> <a href="/Blog/Read/16">个人博客的制作</a></li>
                            <li> <a href="/Blog/Read/14">vue脚手架工具</a></li>
                            <li> <a href="/Blog/Read/9">node的express工具搭建的服务器</a></li>
                    </ul>
                </div>
            </div> -->

            <!-- 最近访客 -->
            <!-- <div class="other-item">
                <h5 class="other-item-title">最近访客</h5>
                <div class="inner">
                    <dl class="vistor">
                            <dd><a href="javasript:;"><img src="../assets/user3.jpg"><cite>Anonymous</cite></a></dd>
                            <dd><a href="javasript:;"><img src="../assets/user4.jpg"><cite>Dekstra</cite></a></dd>
                            <dd><a href="javasript:;"><img src="../assets/user5.jpg"><cite>惜i</cite></a></dd>
                            <dd><a href="javasript:;"><img src="../assets/user6.jpg"><cite>↙Aㄨ计划 ◆莪↘</cite></a></dd>
                            <dd><a href="javasript:;"><img src="../assets/user7.jpg"><cite>.</cite></a></dd>
                            <dd><a href="javasript:;"><img src="../assets/user8.jpg"><cite>Lambert.</cite></a></dd>
                            <dd><a href="javasript:;"><img src="../assets/user9.jpg"><cite>64ღ</cite></a></dd>
                            <dd><a href="javasript:;"><img src="../assets/user10.jpg"><cite>doBoor</cite></a></dd>
                            <dd><a href="javasript:;"><img src="../assets/user11.jpg"><cite>毛毛小妖</cite></a></dd>
                            <dd><a href="javasript:;"><img src="../assets/user12.jpg"><cite>NULL</cite></a></dd>
                            <dd><a href="javasript:;"><img src="../assets/user13.jpg"><cite>吓一跳</cite></a></dd>
                            <dd><a href="javasript:;"><img src="../assets/user14.jpg"><cite>如初</cite></a></dd>
                    </dl>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import connect from './Bus.js'
export default {
  data () {
    return {
    }
  },
  methods:{
      chengeList(type){
          this.$router.push('/index')
          connect.$emit('type',type)
          /* if(type){
            this.$ajax.get("/article/articles/"+type).then( res => {
                connect.$emit('type',res.data.result)
            }).catch((err) => {
                console.log(err)
            })
          }else{
            connect.$emit('all')
          } */
      }
  }
}

</script>
<style scoped>
#category li{cursor: pointer;}
</style>