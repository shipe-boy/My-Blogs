<!--  -->
<template>
  <article class="article-list bloglist" id="LAY_bloglist" style="overflow:hidden;">
    <transition-group name="fade">
      <section v-if="articleList.length !== 0" class="article-item article" v-for="(item) in articleList" :key="item.i">
        <div class="fc-flag" v-show="item.isTop">置顶</div>
        <h5 class="title">
          {{item.title}}
        </h5>
        <div class="time">
          <span class="day">{{  item.time ? item.time.slice(8,10) : '' }}</span>
          <span class="month fs-18">{{  item.time ? item.time.slice(5, 7) : '' }}<span class="fs-14">月</span></span>
          <span class="year fs-18 ml10">{{  item.time ? item.time.slice(0, 4) : '' }}</span>
        </div>
        <div class="content  ql-editor">
          <router-link style="position:absolute;width:100%;height:100%;"
            :to="{name:'articleDetails',params:{id:item._id}}" v-html="item.content">

          </router-link>
        </div>
        <!-- 类型标签 -->
        <aside class="f-oh footer">
          <div class="f-fl tags" v-for="(type,index1) in item.types" :key="index1">
            <span class="fa fa-tags fs-16"></span>
            <a class="tag">{{ type }}</a>
          </div>
          <div class="f-fr">
            <span class="read">
              <i class="fa fa-eye fs-16"></i>
              <i class="num">{{item.readNum}}</i>
            </span>
            <span class="ml20">
              <i class="fa fa-comments fs-16"></i>
              <i class="num fc-grey">{{item.commentNum}}</i>
            </span>
          </div>
        </aside>
      </section>
    </transition-group>
    <section v-if="articleList.length == 0" class="article-item article">
      <p>还没有相关类型的文章</p>
    </section>
    <section v-if="articleList.length !== 0" class="article-item article page">
      <el-pagination class="big" @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="pageIndex" background :page-size="5" layout="total, prev, pager, next, jumper" :total="maxNum">
      </el-pagination>
      <el-pagination class="small" @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="pageIndex" background :page-size="5" small layout="prev, pager, next" :total="maxNum">
      </el-pagination>
    </section>
  </article>
</template>

<script>
  import connect from "./Bus";
  export default {
    data() {
      return {
        pageIndex: 1,
        maxNum: 0,
        articleList: []
      };
    },
    methods: {
      getList() {
        let type = this.$route.params.type;
        type = type || "all";
        this.$ajax
          .get("/article/list/" + type + "/" + this.pageIndex)
          .then(res => {
            if (res.data.status == 0) {
              // console.log(res)
              this.articleList = res.data.result.artList;
              //动画
              this.articleList.forEach((item, i) => {
                item.i = i;
              })
              this.maxNum = res.data.result.maxNum;
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.pageIndex = val;
        document.documentElement.scrollTop = 0;
        this.getList();
      }
    },
    mounted() {
      this.getList();
      document.documentElement.scrollTop = 0;
        
      connect.$on("type", type => {
        // console.log(type)
        this.$router.push('/art/'+ type); //返回首页
        this.pageIndex = 1;
        this.getList();
      });
    }
  };

</script>
<style scoped>
  @media screen and (min-width:1025px) {
    .small {
      display: none
    }

    .big {
      display: block
    }
  }

  @media screen and (max-width:1366px) {
    .small {
      display: none
    }

    .big {
      display: block
    }
  }

  @media screen and (max-width:1024px) {
    .page {
      padding: 20px 0 25px 0;
    }

    .small {
      display: block
    }

    .big {
      display: none
    }
  }

  .doc-container .content {
    max-height: 200px;
    margin-bottom: 20px;
    cursor: pointer;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 7;
  }

  .doc-container .content a {
    color: #424242;
    text-decoration: none;
  }

  .fade-enter-active {
    transition: all 0.5s;
  }

  .fade-enter {
    opacity: 0;
    transform: translateX(100%);
  }

  .fade-leave-active {
    transition: all 0.5s;
    opacity: 1;
    transform: translateX(-100%);
  }

</style>
