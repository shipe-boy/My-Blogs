<!--  -->
<template>
  <div>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="昵称">
        <span>{{ username }}</span>
      </el-form-item>
      <el-form-item label="原密码" prop="oldpass">
        <el-input type="password" v-model="ruleForm2.oldpass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="pass">
        <el-input type="password" v-model.trim="ruleForm2.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model.trim="ruleForm2.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-button style="display:none;" :plain="true" @click="open6">成功</el-button>
    <el-button style="display:none;" :plain="true" @click="open8">错误</el-button>
  </div>

</template>

<script>
  export default {
    data() {
      var oldPwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (value.length < 6 || value.length > 12) {
          callback(new Error('密码6~12位'));
        } else { //通过了
          this.$ajax.post('/users/ispwd', {
              username: this.username,
              password: value
            })
            .then(res => {
              // console.log(res)
              if (res.data.status == 0) {
                callback()
              } else {
                callback(new Error('密码错误'));
              }
            }).catch(err => {
              callback(new Error('密码错误'));
            })

        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (value.length < 6 || value.length > 12) {
          callback(new Error('密码6~12位'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value.length < 6 || value.length > 12) {
          callback(new Error('密码6~12位'));
        } else {
          if (value !== this.ruleForm2.pass) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        }
      };
      return {
          username: '',
        ruleForm2: {
          oldpass: '',
          pass: '',
          checkPass: ''
        },
        rules2: {
          oldpass: [{
            validator: oldPwd,
            trigger: 'blur'
          }],
          pass: [{
            validator: validatePass,
            trigger: 'blur'
          }],
          checkPass: [{
            validator: validatePass2,
            trigger: 'blur'
          }]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$ajax.post('/users/editorPwd', this.ruleForm2)
              .then(res => {
                //   console.log(res)
                  if(res.data.status == 0){
                      this.open6()
                  }
              }).catch(err => {
                  this.open8()
              })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      getUserName(){
          this.$ajax.get('/users/userinfo', this.ruleForm2)
              .then(res => {
                //   console.log(res)
                  if(res.data.status == 0){
                      this.username = res.data.result.userName;
                  }
              }).catch(err => {
                  console.log(err)
              })
      },
      open6() {
        this.$message({
          showClose: true,
          message: '修改成功',
          type: 'success'
        });
      },
      open8() {
        this.$message({
          showClose: true,
          message: '修改失败，服务器异常，请稍后',
          type: 'error'
        });
      }
    },
    mounted(){
        this.getUserName();
    }
  }

</script>
