<!--  -->
<template>
  <div class="doc-container" id="doc-container">
        <div class="container-fixed">
            <div class="container-inner">
                <section class="msg-remark">
                    <h1>发表文章</h1>
                    <p>
                        <el-input placeholder="文章标题" v-model="title" clearable></el-input>
                    </p>
                </section>
                <div class="textarea-wrap message" id="textarea-wrap">
                    <el-form ref="form">
                        <el-form-item>
                            <el-input type="textarea" :rows = "15"  v-model="content" ></el-input>
                        </el-form-item>
                        <el-form-item>
                            置&nbsp;&nbsp;&nbsp;顶&nbsp;&nbsp;&nbsp;&nbsp;<el-switch v-model="isTop" active-color="#13ce66" inactive-color="#ff4949">
                            </el-switch>
                        </el-form-item>
                        <el-form-item>
                            <span>类型选择：</span>
                                <el-checkbox-group v-model="checkboxGroup" size="small">
                                    <el-checkbox label="HTML5和CSS3" border></el-checkbox>
                                    <el-checkbox label="JavaScript" border></el-checkbox>
                                    <el-checkbox label="Vue" border></el-checkbox>
                                    <el-checkbox label="Node" border></el-checkbox>
                                    <el-checkbox label="React" border></el-checkbox>
                                    <el-checkbox label="其他" border></el-checkbox>
                                </el-checkbox-group>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">发表</el-button>
                            <el-button>取消</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
        <el-button style="display:none;" :plain="true" @click="open6">成功</el-button>
        <el-button style="display:none;" :plain="true" @click="open8">错误</el-button>
    </div>
</template>

<script>
export default {
  data () {
    return {
        title: '',
        content: '',
        isTop : false,
        checkboxGroup: [],
        inputVisible: false,
        inputValue: ''
    }
  },
  methods: {
      onSubmit(){
          if(this.title.trim() === '' || this.content.trim() === ''){
              return
          }
          let obj = {
                title: this.title,
                content: this.content,
                isTop : this.isTop,
                types: this.checkboxGroup,
          }
          this.$ajax.post('/article/publish', obj)
            .then(res =>{
                if(res.data.status === 0){
                    this.open6()
                    setTimeout(() =>{
                        this.$router.push('/index')
                    },1000)
                }else{
                    this.open8() 
                }
            }).catch(err => {
                this.open8()
            })
      },
      open6() {
        this.$message({
          showClose: true,
          message: '发表成功',
          type: 'success'
        });
      },
      open8() {
        this.$message({
          showClose: true,
          message: '发表失败',
          type: 'error'
        });
      }
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
@media screen and (max-width:1366px){.container-fixed{width:90%}}
@media screen and (max-width:1024px){.container-fixed{width:90%}}
.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>