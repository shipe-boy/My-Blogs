<!--  -->
<template>
  <div>
    <div class="doc-container" id="doc-container">
      <div class="container-fixed">
        <div class="container-inner">
          <ul class="layui-timeline">
            <li class="layui-timeline-item">
              <i class="layui-icon layui-timeline-axis"></i>
              <div class="layui-timeline-content layui-text">
                <h3 class="layui-timeline-title">8月18日</h3>
                <p>
                  layui 2.0 的一切准备工作似乎都已到位。发布之弦，一触即发。
                  <br>不枉近百个日日夜夜与之为伴。因小而大，因弱而强。
                  <br>无论它能走多远，抑或如何支撑？至少我曾倾注全心，无怨无悔 <i class="layui-icon"></i>
                  <button  style="display:block;" class="layui-btn">查看答案</button>
                </p>
              </div>
            </li>
            <li class="layui-timeline-item">
              <i class="layui-icon layui-timeline-axis"></i>
              <div class="layui-timeline-content layui-text">
                <h3 class="layui-timeline-title">8月16日</h3>
                <p>杜甫的思想核心是儒家的仁政思想，他有<em>“致君尧舜上，再使风俗淳”</em>的宏伟抱负。个人最爱的名篇有：</p>
                <ul>
                  <li>《登高》</li>
                  <li>《茅屋为秋风所破歌》</li>
                </ul>
              </div>
            </li>
            <li class="layui-timeline-item">
              <i class="layui-icon layui-timeline-axis"></i>
              <div class="layui-timeline-content layui-text">
                <h3 class="layui-timeline-title">8月15日</h3>
                <p>
                  中国人民抗日战争胜利日
                  <br>常常在想，尽管对这个国家有这样那样的抱怨，但我们的确生在了最好的时代
                  <br>铭记、感恩
                  <br>所有为中华民族浴血奋战的英雄将士
                  <br>永垂不朽
                </p>
              </div>
            </li>
            <li class="layui-timeline-item">
              <i class="layui-icon layui-timeline-axis"></i>
              <div class="layui-timeline-content layui-text">
                <div class="layui-timeline-title">过去</div>
              </div>
            </li>
          </ul>

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
          exampleList: []
      }
    },
    methods: {
        init(){
            this.$ajax.get('/article/examAll',{params:{page:this.page}}).then(res =>{
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        }
    },
    mounted(){
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

</style>
