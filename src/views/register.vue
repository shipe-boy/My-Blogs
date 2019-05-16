<!--  -->
<template>
  <div>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="昵称" prop="name" :required="true">
        <el-input  v-model.trim="ruleForm2.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass" :required="true">
        <el-input  type="password" v-model.trim="ruleForm2.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass" :required="true">
        <el-input type="password" v-model.trim="ruleForm2.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input type="email" v-model.trim="ruleForm2.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input type="phone" v-model.trim="ruleForm2.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-button @click='esc'>取消</el-button>
    </el-row>
    <el-button style="display:none" :plain="true" @click="open2">成功</el-button>
    <el-button style="display:none" :plain="true" @click="open4">错误</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      let checkUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else if (value.length < 4 || value.length > 12) {
          callback(new Error('用户名6~12位'));
        } else {
          this.$ajax.post('/users/isuser', {
              username: value
            })
            .then(res => {
              if (res.data.status == 0) {
                callback(new Error('用户名已存在'))
              } else {
                callback();
              }
            }).catch(err => {
              callback(new Error('用户名已存在'));
            })

        }
      }
      let validatePass = (rule, value, callback) => {
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
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      let phone = (rule, value, callback) => {
        if (value.trim() !== "") {
          if (!(/^1[34578]\d{9}$/.test(value))) {
            callback(new Error('手机号码有误'));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      let email = (rule, value, callback) => {
        if (value.trim() !== "") {
          if (!(/^(\w-.)+@(\w-?)+(.\w{2,})+$/.test(value))) {
            callback(new Error('邮箱有误'));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          name: '',
          pass: '',
          checkPass: '',
          email: '',
          phone: ''
        },
        rules2: {
          pass: [{
            validator: validatePass,
            trigger: 'blur'
          }],
          checkPass: [{
            validator: validatePass2,
            trigger: 'blur'
          }],
          name: [{
            validator: checkUser,
            trigger: 'blur'
          }],
          email: [{
            validator: email,
            trigger: 'blur'
          }],
          phone: [{
            validator: phone,
            trigger: 'blur'
          }]
        },
        msg: '',
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$ajax.post('/users/register', this.ruleForm2)
              .then(res => { //进入数据库检测后
                // console.log(res)
                if (res.data.status === 0) {
                  this.open2()

                  this.$store.commit('userName', res.data.result.username)
                  this.$store.commit('userFace', res.data.result.userface)
                  this.$emit('on-close')
                  this.ruleForm2.name = ""
                  this.ruleForm2.pass = ""
                  this.ruleForm2.checkPass = ""
                  this.ruleForm2.email = ""
                  this.ruleForm2.phone = ""
                } else {
                  this.msg = res.data.msg
                  this.open4()
                }
              })
              .catch(err => {
                console.log(err)
                this.msg = '注册失败'
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
      esc() {
        this.$emit('on-close')
      },
      open2() {
        this.$message({
          message: '恭喜你，注册成功',
          type: 'success'
        });
      },
      open4() {
        this.$message.error(`${this.msg}`);
      }

    }
  }

</script>
