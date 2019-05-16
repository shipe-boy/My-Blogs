<!--  -->
<template>
  <div class="doc-container" id="doc-container">
    <div class="container-fixed">
      <div class="container-inner">
        
        <div class="textarea-wrap message" id="textarea-wrap">
          <el-form ref="form">
            <!-- 富文本 -->
            <p>每日一题：</p>
            <el-form-item>
              <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption"></quill-editor>
            </el-form-item>
            <p>参考答案：</p>
            <el-form-item>
              <quill-editor v-model="answer" ref="myQuillEditor" :options="editorOption"></quill-editor>
            </el-form-item>
            
            
            <el-form-item>
              <el-button type="primary" @click="onSubmit">发表</el-button>
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
  import {
    quillEditor,
    Quill
  } from 'vue-quill-editor'
  import {
    container,
    ImageExtend,
    QuillWatch
  } from 'quill-image-extend-module'
  import hljs from 'highlight.js'
  Quill.register('modules/ImageExtend', ImageExtend)
  let editorOption = {
    modules: {
      ImageExtend: {
        loading: true,
        name: 'img',
        action: '/article/img',
        response: (res) => {
          //   console.log("http://localhost:3000" + res.result.url)
          return "http://localhost:3000" + res.result.url
        }
      },
      toolbar: {
        container: container,
        handlers: {
          'image': function () {
            QuillWatch.emit(this.quill.id)
          }
        }
      },
      syntax: {
        highlight: text => {
          return hljs.highlightAuto(text).value; // 这里就是代码高亮需要配置的地方
        }
      }
    }
  }
  export default {
    data() {
      return {
        content: '',
        answer: '',
        inputVisible: false,
        inputValue: '',
        // 富文本框参数设置
        editorOption
      }
    },
    components: {
      quillEditor
    },
    methods: {
      onSubmit() {
        if (this.answer.trim() === '' || this.content.trim() === '') {
          return
        }
        let obj = {
          answer: this.answer,
          content: this.content
        }
        this.$ajax.post('/article/exam', obj)
          .then(res => {
              console.log(res)
            if (res.data.status === 0) {
              this.open6()
              setTimeout(() => {
                this.$router.push('/example')
              }, 1000)
            } else {
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
  .doc-container {
    position: relative;
    padding-top: 60px;
    -webkit-transition: all .2s;
    transition: all .2s;
    min-height: 100vh
  }

  .container-fixed {
    width: 1280px;
    margin-left: auto;
    margin-right: auto;
    position: relative
  }

  .msg-remark {
    background: #FFF;
    padding: 15px;
    margin-top: 1rem;
    text-align: center
  }

  .msg-remark h1 {
    font-weight: 700;
    font-size: 2rem
  }

  .msg-remark p {
    font-size: 1.25rem;
    margin: 1rem 0
  }

  .textarea-wrap.message {
    background-color: #fff;
    padding: 15px
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

  .el-tag+.el-tag {
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
