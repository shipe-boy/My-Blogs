<!--  -->
<template>
    <div class="doc-container" id="doc-container">
        <div class="container-fixed">
            <div class="container-inner">
                <section class="msg-remark">
                    <h1>留言板</h1>
                    <p>沟通交流，拉近你我！</p>
                </section>
                <div class="textarea-wrap message" id="textarea-wrap">
                    <el-form ref="form">
                        <el-form-item>
                            <el-input type="textarea" :rows = "5"  v-model="message" ></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">提交留言</el-button>
                            <el-button>取消</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="f-cb"></div>
            <div class="mt20" v-if="msgList.length !== 0">
                <ul class="message-list" id="message-list">
                    <li class="article" v-for="(item,index) in msgList" :key="index"> 
                        <div class="comment-parent">
                            <img :src='"http://localhost:3000"+ item.face'  />
                            <div class="info">
                                <span class="username">{{ item.user }}</span>
                            </div>
                            <div class="comment-content">
                                {{ item.content }}
                            </div>
                            <p class="info info-footer">
                                <span class="comment-time">{{ item.time }}</span>
                                <el-input v-if="item.isReply" v-model="value"></el-input>
                                <el-button v-if="item.isReply"  @click.prevent="item.isReply = !item.isReply">取消</el-button>
                                <el-button v-if="item.isReply" type="primary" @click="submitForm(item._id,item.user);item.isReply = !item.isReply">提交</el-button>
                                <span v-if="!item.isReply" style="padding-right:0;margin-left:-5px;" @click="addDomain();item.isReply = !item.isReply" class="btn-reply">回复</span>
                            </p>
                        </div>
                        <hr />
                        <div v-if="(item.reply.length !== 0)" class="comment-child" v-for="(item1, index1) in item.reply" :key="index1">
                            <img :src='"http://localhost:3000"+ item1.face' />
                            <div class="info"> 
                                <span class="username">{{ item1.user }}</span> 
                                <span style="padding-right:0;margin-left:-5px;">回复</span> 
                                <span class="username">{{ item1.user2 }}</span> 
                                <span>{{ item1.content }}</span> 
                            </div> 
                            <p class="info"> 
                                <span class="comment-time">{{ item1.time }}</span> 
                                <el-input v-if="item1.isReply" v-model="value"></el-input>
                                <el-button v-if="item1.isReply"  @click.prevent="item1.isReply = !item1.isReply">取消</el-button>
                                <el-button v-if="item1.isReply"  type="primary" @click="submitForm(item._id,item1.user);item1.isReply = !item1.isReply">提交</el-button>
                                <span v-if="!item1.isReply" style="padding-right:0;margin-left:-5px;" @click="addDomain();item1.isReply = !item1.isReply" class="btn-reply">回复</span> 
                            </p> 
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <el-button style="display:none" :plain="true" @click="open2">成功</el-button>
        <el-button style="display:none" :plain="true" @click="open4">错误</el-button>
    </div>
</template>

<script>
export default {
  name: 'msgboard',
  data () {
    return {
        message: '',
        value: "",
        msgList: [],
        msg: ''
    }
  },
  methods: {
      onSubmit(){
            if(this.message.trim() == "") return
            this.$ajax.post('/comment/addboard', {content: this.message})
                .then((res) => {
                    // console.log(res)
                    if(res.data.status == 0){
                        this.open2()
                        this.getBoard();
                        this.message = "";
                    }else{
                        this.msg = res.data.msg;
                        this.open4()
                    }
                }).catch((err) =>{
                    // console.log(err)
                    this.msg = '留言失败，服务器出错';
                    this.open4()
                })
      },
      submitForm(id, user2) {  //提交按钮
            // console.log(user2)
            // console.log( new Date().toLocaleString().replace(/\//g, '-'))
            this.$ajax.post('/comment/reply', {
                    user2: user2,
                    content: this.value,
                    time: new Date().toLocaleString().replace(/\//g, '-'),
                    id
                })
                .then((res) => {
                    if(res.data.status == 0){
                        this.open2()
                        this.value = "";
                        this.getBoard();
                    }else{
                        this.msg = res.data.msg
                        this.open4()
                    }
                }).catch((err) =>{
                    // console.log(err)
                    this.msg = '回复失败，服务器出错';
                    this.open4()
                })
      },
      addDomain() {  //回复按钮
        //取消其他的回复文本框
        this.msgList.forEach((item) =>{
            item.isReply = false;
            if(item.reply.length !== 0){
                item.reply.forEach((item1) =>{
                    item1.isReply = false;
                })
            }
        })
      },
      open2() {
        this.$message({
          message: '留言成功',
          type: 'success'
        });
      },
      open4() {
        this.$message.error(`${this.msg}`);
      },
      getBoard(){
          this.$ajax.get('/comment/board')
                    .then((res) => {
                        // console.log(res)
                        if(res.data.status == 0){
                            res.data.result.forEach((item) =>{
                                item.isReply = false;
                                item.time = item.createTime.slice(0,10)
                                
                                if(item.reply.length !== 0){
                                    item.reply.forEach((item1) =>{
                                        item1.isReply = false;
                                    })
                                }
                            })
                            this.msgList = res.data.result.reverse();
                        }
                    }).catch((err) => {
                        console.log(err)
                    })
      }

  },
  mounted(){
      this.getBoard()
      document.documentElement.scrollTop = 0;
  }
}

</script>
<style scoped>
.doc-container{position:relative;padding-top:60px;-webkit-transition:all .2s;transition:all .2s;min-height:100vh}
.container-fixed{width:1280px;margin-left:auto;margin-right:auto;position:relative}
.msg-remark{background:#FFF;padding:15px;margin-top:1rem;text-align:center}
.msg-remark h1{font-weight:700;font-size:2rem}
.msg-remark p{font-size:1.25rem;margin:1rem 0}
.textarea-wrap.message{background-color:#fff;padding:15px}
.message-list{position:relative;margin-bottom:10px}
.message-list img{width:30px;height:30px;border-radius: 50%;position: absolute;}
.message-list li:first-child{border-top:0}
.message-list li{background:#fff;padding:15px;border-top:1px dotted grey}
.message-list .comment-content,.message-list .info,.message-list .replycontainer{margin-left:53px}
.message-list .info-footer{font-size:13px}
.message-list .info,.message-list .replycontainer{padding-top:5px}
.message-list .replycontainer .layui-form-item{margin-bottom:5px}
.message-list .info{overflow-x:hidden}
.message-list .info span{padding-right:5px}
/* .message-list .info img{margin-top:-2px} */
.message-list .info .username{color:#01AAED}
.message-list .info .btn-reply{color:#009688;cursor: pointer;}
.message-list .comment-content{padding:2px 0 5px 0;min-height:30px;font-size:13px;word-break: break-all}
.message-list hr{margin-left:53px}
/* .comment-parent>img{width:45px;height:45px;margin:5px 5px 5px 0;position:absolute;border-radius:50px} */
/* .comment-child>img{width:40px;height:40px;margin:5px 5px 5px 0;position:absolute;border-radius:50px} */
.comment-child{margin-left:53px;min-height:50px}
.comment-child .info{margin-left:48px;font-size:12px;line-height:20px}
/* .areaImg{width:12px!important;height:13px!important} */
/* .fa-map-marker{margin: 0 5px;font-size: 15px;} */
@media screen and (max-width:1366px){.container-fixed{width:90%}}
@media screen and (max-width:1024px){.container-fixed{width:90%}}
</style>