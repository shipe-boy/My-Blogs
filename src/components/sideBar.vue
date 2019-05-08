<!--  -->
<template>
  <div class="col-other">
    <div class="inner">
      <div class="other-item" id="categoryandsearch">
        <div class="search">
          <label class="search-wrap">
            <input type="text" id="searchtxt" placeholder="输入关键字搜索" v-model.trim="search" @keyup.enter="goSearch" />
            <span class="search-icon" @click="goSearch">
              <i class="fa fa-search"></i>
            </span>
          </label>
          <ul v-if="isShow" class="search-result" @mouseleave="leave" @mouseenter="enter">
            <li v-if="artTitle.length == 0">未找到相关内容</li>
            <li v-if="artTitle.length !== 0" v-for="(item,index) in artTitle" :key="index" @click="details(item._id,item.title)">
              {{item.title}}</li>
          </ul>
        </div>
        <ul class="category mt20" id="category">
          <li data-index="0" class="slider"></li>
          <li data-index="1" @click="checked"><a @click='chengeList("all")'>全部文章</a></li>
          <li data-index="2" @click="checked"><a @click='chengeList("HTML5和CSS3")'>HTML5和CSS3</a></li>
          <li data-index="3" @click="checked"><a @click='chengeList("JavaScript")'>JavaScript</a></li>
          <li data-index="4" @click="checked"><a @click='chengeList("Vue")'>Vue</a></li>
          <li data-index="5" @click="checked"><a @click='chengeList("Node")'>Node</a></li>
          <li data-index="6" @click="checked"><a @click='chengeList("React")'>React</a></li>
          <li data-index="7" @click="checked"><a @click='chengeList("其他")'>其他</a></li>
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
    data() {
      return {
        search: '',
        isShow: false,
        artTitle: [], //搜索的文章数组
        index: 0
      }
    },
    methods: {
      chengeList(type) {
        this.$router.push('/index')
        connect.$emit('type', type)
      },
      //选中样式切换
      checked(e) {
        //   console.log(e)
        let target;
        if (e.target.nodeName == 'A') {
          target = e.target.parentNode;
        } else {
          target = e.target;
        }
        let index = target.getAttribute('data-index');
        let checkLi = document.querySelector(".other-item .category li.slider");
        checkLi.style.top = (index - 1) * 40 + 'px';
      },
      goSearch() {
        if (this.search.length > 0) {
          this.$ajax.post('/article/search', {
            search: this.search
          }).then(res => {
            if (res.data.status == 0) {
              this.artTitle = res.data.result;
              this.isShow = true;
            }
          }).catch(err => {

          })
        }

      },
      details(id, title) {
        this.isShow = false;
        this.search = title;
        connect.$emit('change', id)
        // this.$router.push("/index/articles/Details/" + id)
      },
      leave(){
          let that = this;
          this.index = setTimeout(function(){
              that.isShow = false;
          }, 1000)
      },
      enter(){
          clearTimeout(this.index)
      }
    }
  }

</script>
<style scoped>
  #category li {
    cursor: pointer;
  }

  .other-item .category li.slider {
    border-right: 6px solid #484947;
    height: 40px;
    background-color: #f8f9f7;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 0;
    transition: top .3s
  }

  .search .search-result {
    position: absolute;
    top: 62px;
    left: 20px;
    right: 20px;
    z-index: 3;
    /* height: 10px; */
    padding: 5px 0;
    background-color: #fff;
    max-height: 280px;
    overflow-y: auto;
    border-radius: 5px;
  }

  .search-result li {
    box-sizing: border-box;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    padding-left: 10px;
    color: #424242;
  }

  .search-result li:hover {
    background-color: #eee;
  }

</style>
