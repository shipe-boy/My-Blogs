<!--  -->
<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px" enctype="multipart/form-data">
      <el-form-item label="名称">
        <el-input v-if="isEdit" v-model="form.username"></el-input>
        <p style="box-sizing:border-box;padding-left: 15px;color: #999;" v-if="!isEdit">{{userInfo.userName}}</p>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-if="isEdit" v-model="form.phone"></el-input>
        <p style="box-sizing:border-box;padding-left: 15px;color: #999;" v-if="!isEdit">
          {{userInfo.userTel == "" ? "未填写手机号" : userInfo.userTel}}</p>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-if="isEdit" v-model="form.email"></el-input>
        <p style="box-sizing:border-box;padding-left: 15px;color: #999;" v-if="!isEdit">
          {{userInfo.userEmail == "" ? "未填写邮箱" : userInfo.userEmail}}</p>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-if="isEdit" v-model="form.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
        <p style="box-sizing:border-box;padding-left: 15px;color: #999;" v-if="!isEdit">
          {{userInfo.userSex == "" ? "未填写性别" : userInfo.userSex}}</p>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-date-picker v-if="isEdit" v-model="form.birth" type="date" placeholder="选择日期">
        </el-date-picker>
        <p style="box-sizing:border-box;padding-left: 15px;color: #999;" v-if="!isEdit">
          {{userInfo.userBirth == "" ? "未填写出生日期" : userInfo.userBirth}}</p>
      </el-form-item>
      <el-form-item>
        <el-button v-if="isEdit" type="primary" @click="onSubmit">保存</el-button>
        <el-button v-if="isEdit" @click="cancle">取消</el-button>
        <el-button v-if="!isEdit" @click="edit">编辑</el-button>
      </el-form-item>
    </el-form>
    <el-button style="display:none;" :plain="true" @click="open6">成功</el-button>
        <el-button style="display:none;" :plain="true" @click="open8">错误</el-button>
  </div>
</template>

<script>
import '../../static/uitls/time.js'
  export default {
    data() {
      return {
          form: {
          username: '',
          phone: '',
          email: '',
          sex: '',
          birth: ''
        },
        isEdit: false,
        userInfo: {}
      }
    },
    methods:{
        init(){
            this.$ajax.get('/users/userinfo')
                .then( response =>{
                    let res = response.data;
                    if(res.status == 0){
                        this.userInfo = res.result;
                        this.form.username = res.result.userName;
                        this.form.phone = res.result.userTel;
                        this.form.sex = res.result.userSex;
                        this.form.email = res.result.userEmail;
                        this.form.birth = res.result.userBirth;
                    }
                }).catch(err =>{
                    console.log(err)
                })
        },
        onSubmit(){
            console.log( this.form.birth)
            this.$ajax.post("/users/edit",{userInfo: {
                        username:this.form.username,
                        phone:this.form.phone,
                        sex:this.form.sex,
                        email:this.form.email,
                        birth:this.form.birth.Format('yyyy-MM-dd'),
            }})
                .then(res =>{
                    // console.log(res)
                    if(res.data.status==0){
                        this.open6()
                        this.isEdit = false;
                        this.init()
                    }else{
                        this.open8()
                    }
                }).catch(err =>{
                    console.log(err)
                    this.open8()
                })
        },
        edit(){
            this.isEdit = true;
        },
        cancle(){
            this.isEdit = false;
        },
        open6() {
            this.$message({
            showClose: true,
            message: '保存成功',
            type: 'success'
            });
        },
        open8() {
            this.$message({
            showClose: true,
            message: '保存失败',
            type: 'error'
            });
        }
    },
    mounted(){
        this.init();
    }
  }

</script>
