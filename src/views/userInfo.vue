<!--  -->
<template>
  <div class="doc-container" id="doc-container">
        <div class="container-fixed" style="height: 100%; padding-top: 20px;">
            <div class="container-inner" style="width: 500px; margin:0 auto">
                <el-form ref="form" :model="form" label-width="80px" enctype="multipart/form-data">
                    <el-form-item label="名称">
                        <el-input v-if="isEdit" v-model="form.username"></el-input>
                        <p style="box-sizing:border-box;padding-left: 15px;color: #999;" v-if="!isEdit">{{userInfo.userName}}</p>
                    </el-form-item>
                    <!-- <el-form-item label="原密码">
                        <el-input v-model="form.password1"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码">
                        <el-input v-model="form.password"></el-input>
                    </el-form-item> -->
                    <el-form-item label="手机号码">
                        <el-input v-if="isEdit" v-model="form.phone"></el-input>
                        <p style="box-sizing:border-box;padding-left: 15px;color: #999;" v-if="!isEdit">{{userInfo.userTel == "" ? "未填写手机号" : userInfo.userTel}}</p>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-if="isEdit" v-model="form.email"></el-input>
                        <p style="box-sizing:border-box;padding-left: 15px;color: #999;" v-if="!isEdit">{{userInfo.userEmail == "" ? "未填写邮箱" : userInfo.userEmail}}</p>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio-group v-if="isEdit" v-model="form.sex">
                            <el-radio label="男"></el-radio>
                            <el-radio label="女"></el-radio>
                        </el-radio-group>
                        <p style="box-sizing:border-box;padding-left: 15px;color: #999;" v-if="!isEdit">{{userInfo.userSex == "" ? "未填写性别" : userInfo.userSex}}</p>
                    </el-form-item>
                    <el-form-item label="出生日期">
                        <el-date-picker v-if="isEdit" v-model="form.birth" type="date" placeholder="选择日期">     
                        </el-date-picker>
                        <p style="box-sizing:border-box;padding-left: 15px;color: #999;" v-if="!isEdit">{{userInfo.userBirth == "" ? "未填写出生日期" : userInfo.userBirth}}</p>
                    </el-form-item>
                    <el-form-item label="头像">
                        <el-upload
                        class="avatar-uploader"
                        action="/users/update"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button v-if="isEdit" type="primary" @click="onSubmit">保存</el-button>
                        <el-button v-if="isEdit" @click="cancle">取消</el-button>
                        <el-button  v-if="!isEdit" @click="edit">编辑</el-button>
                    </el-form-item>
                    </el-form>
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
        form: {
          username: '',
        //   password: '',
          phone: '',
          email: '',
          sex: '',
          birth: ''
        },
        imageUrl: '',
        isEdit: false,
        userInfo: {}
    }
  },
  mounted(){
      this.init()
  },
  methods:{
        onSubmit(){
            console.log(this.form)
            this.$ajax.post("/users/edit",{userInfo: this.form})
                .then(res =>{
                    console.log(res)
                    if(res.data.status==0){
                        this.open6()
                    }else{
                        this.open8()
                    }
                }).catch(err =>{
                    console.log(err)
                    this.open8()
                })
        },
        handleAvatarSuccess(res, file) {
            // console.log(res.avatar)
            this.$store.commit('userFace', res.avatar)
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        edit(){
            this.isEdit = true;
        },
        cancle(){
            this.isEdit = false;
        },
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
    
  }
}

</script>
<style scoped>
.doc-container{position:relative;padding-top:60px;-webkit-transition:all .2s;transition:all .2s;min-height:100vh}
.container-fixed{width:1280px;height:300px;margin-left:auto;margin-right:auto;position:relative;background-color: #fff;}
@media screen and (max-width:1366px){.container-fixed{width:90%}}
@media screen and (max-width:1024px){.container-fixed{width:90%}}
.avatar-uploader .el-upload {
    border: 1px dashed #000;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>