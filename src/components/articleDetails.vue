<!--  -->
<template>
    <article class="article-list">
        <section class="article-item">
            <aside class="title" style="line-height:1.5;">
                <h2>{{ article.title }}</h2>
                <p class="fc-grey fs-14">
                    <small>
                        作者：<a href="javascript:void(0)" target="_blank" class="fc-link"> {{username}} </a>
                    </small>
                    <small class="ml10">发表于 <label>{{ article.time }}</label> </small>
                </p>
            </aside>
            <div class="time mt10" style="padding-bottom:0;">
                <span class="day">{{ article.time ? article.time.slice(8,10) : '' }}</span>
                <span class="month fs-18">{{ article.time ? article.time.slice(5,7) : ''  }}<small class="fs-14">月</small></span>
                <span class="year fs-18">{{ article.time ? article.time.slice(0,4) : ''  }}</span>
            </div>
            <div class="content artiledetail ql-editor" style="border-bottom: 1px solid #e1e2e0; padding-bottom: 20px;" v-html="article.content">
                
            </div>
            <div class="f-cb"></div>
            <div class="mt20 f-fwn fs-24 fc-grey comment" style="border-top: 1px solid #e1e2e0; padding-top: 20px;">
            </div>
            <fieldset class="layui-elem-field layui-field-title">
                <legend>发表评论</legend>
                <div class="layui-field-box">
                    <div class="leavemessage" style="text-align:initial">
                        <el-form ref="form">
                            <el-form-item>
                                <el-input type="textarea" :rows = "3"  v-model="message" ></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">提交评论</el-button>
                                <el-button>取消</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </fieldset>
            <ul class="message-list" id="message-list">
                <li v-if="comment.length !== 0" class="article" v-for="(item,index) in comment" :key="index"> 
                    <div class="comment-parent">
                            <img :src='"http://localhost:3000"+ item.author.avatar'  />
                            <div class="info">
                                <span class="username">{{ item.author.username }}</span>
                            </div>
                            <div class="comment-content">
                                {{ item.content }}
                            </div>
                            <p class="info info-footer">
                                <span class="comment-time">{{ item.time }}</span>
                                <el-input v-if="item.isReply" v-model="value"></el-input>
                                <el-button v-if="item.isReply"  @click.prevent="item.isReply = !item.isReply">取消</el-button>
                                <el-button v-if="item.isReply" type="primary" @click="submitForm(item._id,item.author.username);item.isReply = !item.isReply">提交</el-button>
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
            <el-button style="display:none" :plain="true" @click="open6">成功</el-button>
            <el-button style="display:none" :plain="true" @click="open8">错误</el-button>
        </section>
    </article>
  
</template>

<script>
export default {
  data () {
    return {
        message: '',  //评论内容
        article: {},  //文章对象
        username: '', //用户名
        comment: [], //评论内容
        msg: '',
        value: ''  //回复内容
    }
  },
  methods: {
      onSubmit(){
          let id = this.$route.params.id
          this.$ajax.post('/comment/submit',{content: this.message,article: id}).then(res =>{
            //   console.log(res)
              if(res.data.status == 0){
                  this.open6()
                  this.getDetails()
              }else{
                  this.msg = res.data.msg
                  this.open8()
              }
          }).catch(err=>{
              this.msg = '评论失败';
              this.open8()
          })
          
          this.message=""
      },
      getDetails(){
        //   console.log(this.$route.params.id)
          let id = this.$route.params.id
          this.$ajax.get('/article/details/'+ id).then(res =>{
                this.username = res.data.article.author.username
                this.article = res.data.article;
                res.data.comment.forEach((item) =>{
                    item.isReply = false;
                    if(item.reply.length !== 0){
                        item.reply.forEach((item1) =>{
                            item1.isReply = false;
                        })
                    }
                })
                this.comment = res.data.comment;
                // console.log(this.comment)
          }).catch(err =>{
              console.log(err)
          })
      },
      addDomain() {  //回复按钮
        //取消其他的回复文本框
        this.comment.forEach((item) =>{
            item.isReply = false;
            if(item.reply.length !== 0){
                item.reply.forEach((item1) =>{
                    item1.isReply = false;
                })
            }
        })
      },
      submitForm(id, user2) {  //提交按钮
            // console.log(user2)
            // console.log( new Date().toLocaleString().replace(/\//g, '-'))
            this.$ajax.post('/comment/artreply', {
                    user2: user2,
                    content: this.value,
                    time: new Date().toLocaleString().replace(/\//g, '-'),
                    id
                })
                .then((res) => {
                    if(res.data.status == 0){
                        this.open6()
                        this.value = "";
                        this.getDetails();
                    }else{
                        this.msg = res.data.msg
                        this.open8()
                    }
                }).catch((err) =>{
                    // console.log(err)
                    this.msg = '回复失败，服务器出错';
                    this.open8()
                })
      },
      open6() {
        this.$message({
          showClose: true,
          message: '评论成功',
          type: 'success'
        });
      },
      open8() {
        this.$message({
          showClose: true,
          message: `${this.msg}`,
          type: 'error'
        });
      }
  },
  mounted(){
      this.getDetails()
      document.documentElement.scrollTop = 0;
    
  }
}

</script>
<style scoped>
.article-list{position:relative}
.article-item{overflow:hidden;}
.article-item{padding:20px 30px 25px 30px;position:relative;/*overflow:hidden;*/margin-top:20px;background-color:#fff}
.article-item .fc-flag{position:absolute;height:20px;line-height:20px;text-align:center;width:74px;background-color:#ff5722;color:#fff;transform:rotate(-45deg);left:-18px;top:9px}
.article-item .title{line-height:30px;padding:5px 130px 5px 0;border-bottom:1px solid #e8e9e7;font-size:18px;font-weight:400}
.article-item .title span{font-size:16px;font-weight:400;display:inline-block;vertical-align:bottom}
.article-item .title a{color:#212220}
.article-item .time{font-family:SourceCodeProRegular,Menlo,Monaco,Consolas,"Courier New",monospace,'Helvetica Neue',Arial,sans-serif;position:absolute;right:10px;top:10px;background-color:#fff;padding:0 20px 5px 20px;line-height:32px}
.article-item .time .day{display:block;text-align:center;font-weight:700;font-size:40px;color:#6bc30d;position:relative;top:2px}
.article-item .time .month,.article-item .time .year{color:#989997}
.article-item .content{margin:20px 0 0 0;line-height:28px;position:relative;/*overflow:hidden;*/min-height:200px}
.article-item .artiledetail img:hover{box-shadow: 0 0 5px #333;}
.article-item .content a{color:#3e8bc7;margin:0 2px}
.article-item .content .cover{display:block;width:300px;height:180px;border:1px solid #e8e9e7;overflow:hidden;float:left;margin-right:20px}
.article-item .content .cover img{display:block;width:100%!important;height:100%!important}
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
.message-list .comment-content{text-indent: 20px;line-height: 26px;padding:2px 0 5px 0;min-height:30px;font-size:13px;word-break: break-all}
.message-list hr{margin-left:53px}
.comment-child{margin-left:53px;min-height:50px}
.comment-child .info{margin-left:48px;font-size:12px;line-height:20px}
</style>