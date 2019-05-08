<!--  -->
<template>
    <div>
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2"  class="demo-ruleForm" label-width="100px">
            <el-form-item label="昵称" prop="name">
                <el-input  v-model="ruleForm2.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input  type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
            </el-form-item>
        </el-form>
        <div class="contact">
            <span>选择登陆方式：</span>
            <a href="javascript:void(0)" class="phone" title="手机登陆"><i class="fa fa-phone"></i></a>
            <a href="javascript:void(0)" class="qq" title="QQ登陆"><i class="fa fa-qq"></i></a>
            <a href="javascript:void(0)" class="email" title="邮箱登陆"><i class="fa fa-envelope"></i></a>
            <a href="javascript:void(0)" class="weixin" title="微信登陆"><i class="fa fa-weixin"></i></a>
        </div>
        <el-row>
            <el-button @click='register'>注册用户</el-button>
        </el-row>
        <el-button style="display:none" :plain="true" @click="open2">成功</el-button>
        <el-button style="display:none" :plain="true" @click="open4">错误</el-button>
    </div>
</template>

<script>

export default {
    data() {
        let checkUser = (rule, value, callback) => {
            if (value.trim() === '') {
              callback(new Error('请输入用户名'));
            }else{  //用户名是否存在
                this.$ajax.post('/users/isuser',{username:value})
                    .then(res =>{
                        if(res.data.status == 0){
                            callback()
                        }else{
                          callback(new Error('用户名不存在'));
                        }
                    }).catch(err =>{
                        callback(new Error('用户名不存在'));
                    })
            } 
            
        }
        let validatePass = (rule, value, callback) => {
            if (value.trim() === '') {
              callback(new Error('请输入密码'));
            }else{
              this.$ajax.post('/users/ispwd',{username:this.ruleForm2.name,password:value})
                    .then(res =>{
                        if(res.data.status == 0){
                            callback()
                        }else{
                          callback(new Error('密码错误'));
                        }
                    }).catch(err =>{
                        callback(new Error('密码错误'));
                    })
            } 
          
        };
        return {
            ruleForm2: {
                name: '',
                pass: ''
            },
            rules2: {
              pass: [
                  { validator: validatePass, trigger: 'blur' }
              ],
              name: [
                  { validator: checkUser, trigger: 'blur' }
              ]
            },
            msg: ''
        }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$ajax.post('/users/login', this.ruleForm2)
                      .then(res => { //进入数据库检测后
                        // console.log(res)
                        if(res.data.status === 0){
                            this.open2()
                            
                            this.$store.commit('userName', res.data.result.username)
                            this.$store.commit('userFace', res.data.result.userface)
                          
                            this.$emit('on-close')
                            this.ruleForm2.name = "";
                            this.ruleForm2.pass = "";
                        }else{
                          this.msg = res.data.msg
                          this.open4()
                        }
                      })
                      .catch(err => {
                        this.msg = '登陆失败'
                        this.open4()
                      })
             
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      register(){
          this.$emit('on-change')
      },
      open2() {
        this.$message({
          message: '恭喜你，登陆成功',
          type: 'success'
        });
      },
      open4() {
        this.$message.error(`${this.msg}`);
      }
    }
}

</script>
<style scoped>
/* .doc-container{position:relative;padding-top:60px;-webkit-transition:all .2s;transition:all .2s;min-height:100vh}
.container-fixed{width:1280px;margin-left:auto;margin-right:auto;position:relative;background-color: #eee;}
.container-inner{width: 100%;margin:0 auto;padding: 50px 0 ;}*/
@media screen and (max-width:1366px){.container-fixed{width:90%}.container-inner{width: 600px;}.el-input{width: 50%;}}
@media screen and (max-width:1024px){.container-fixed{width:90%}.container-inner{width: 100%;}.el-input{width: 100%;}} 
.contact{margin-bottom: 20px;}
.contact a{display:inline-block;width:30px;height:30px;opacity:.5;background-color:purple;text-align:center;line-height:30px;text-shadow:1px 1px 1px rgba(0,0,0,.5);font-size:14px;margin-left:15px;margin-right:0;border-radius:100%;text-decoration:none;color:rgba(255,255,255,.5);-webkit-transition:all .3s;transition:all .3s}
.contact a:hover{color:#fff}
.contact .phone:hover{background-color:#b952c5}
.contact .qq:hover{background-color:#d25744}
.contact .email:hover{background-color:#668f20}
.contact .weixin:hover{background-color:#06a2c9}
</style>