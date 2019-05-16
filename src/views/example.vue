<!--  -->
<template>
  <div>
    <div class="doc-container" id="doc-container">
      <div class="container-fixed">
        <div class="container-inner">
          <ul class="layui-timeline">
            <li class="layui-timeline-item" v-for="(item,index) in exampleList" :key="index">
              <i class="layui-icon layui-timeline-axis"></i>
              <div class="layui-timeline-content layui-text">
                <h3 class="layui-timeline-title">{{item.time}}</h3>
                <p v-html="item.content"></p>
                <transition name="fade">
                  <div v-if="item.isOpen">
                    <fieldset class="layui-elem-field layui-field-title">
                      <legend>仅供参考</legend>
                    </fieldset>
                    <p v-html="item.answer"></p>
                  </div>
                </transition>
                <p v-if="haha"></p>
                <button style="display:block; margin-top: 8px;" class="layui-btn"
                  @click="open(item)">{{item.isOpen ? '收起答案':'查看答案'}}</button>
              </div>
            </li>
          </ul>
          <div class="load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"
            infinite-scroll-distance="40">
            <img v-if="loading" src="./../assets/loading-svg/loading-spinning-bubbles.svg" alt="">
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<script>
  export default {
    data() {
      return {
        page: 1,
        exampleList: [],
        haha: false,
        busy: true, //false启用加载，true关闭加载
        loading: false
      }
    },
    methods: {
      init(flag) {
        this.loading = true;
        console.log(this.page)
        this.$ajax.get('/article/examAll', {
          params: {
            page: this.page
          }
        }).then(res => {
          this.loading = false;
          if (res.data.status == 0) {
            if (flag) { //分页时  数据要累加
              this.exampleList = this.exampleList.concat(res.data.result);

              if (res.data.result.length == 0) {    //判断是否加载完
                this.busy = true;
              } else {
                this.busy = false;
              }

            } else { //初次加载
              this.exampleList = res.data.result;
              this.busy = false;
            }
            // console.log(this.exampleList)
            this.exampleList.forEach(item => {
              item.isOpen = false;
            })
          }
          // console.log(this.exampleList)
        }).catch(err => {
          console.log(err)
        })
      },
      open(item) {
        // console.log(item,item.isOpen)
        item.isOpen = !item.isOpen;
        this.haha = !this.haha;
        console.log(item.isOpen)
      },
      loadMore() {
        this.busy = true;
        setTimeout(() => {
          this.page++;
          this.init(true)
        }, 500);
      }
    },
    mounted() {
      this.init()
    }
  }

</script>
<style scoped>
  .doc-container {
    position: relative;
    padding-top: 60px;
    -webkit-transition: all .2s;
    transition: all .2s;
    min-height: 100vh
  }

  .container-fixed {
    width: 1000px;
    padding-top: 20px;
    margin-left: auto;
    margin-right: auto;
    position: relative
  }

  @media screen and (max-width:1366px) {
    .container-fixed {
      width: 90%
    }
  }

  @media screen and (max-width:1024px) {
    .container-fixed {
      width: 90%
    }
  }

  .fade-enter-active {
    transition: all 0.5s linear;
  }

  .fade-enter {
    height: 0;
  }

  .fade-leave-active {
    transition: all 0.5s linear;
    height: 0;
  }

</style>
