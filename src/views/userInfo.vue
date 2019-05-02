<!--  -->
<template>
  <div class="doc-container" id="doc-container">
    <div class="container-fixed" style="height: 100%; padding-top: 20px;">
      <div class="container-inner" style="max-width: 600px;padding: 50px 0 ;margin: 0 auto;">
        <el-tabs tab-position="left">
          <el-tab-pane label="个人信息">
              <users-more></users-more>
          </el-tab-pane>
          <el-tab-pane label="头像上传">
            <el-upload class="avatar-uploader" action="/users/update" :show-file-list="false"
              :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="修改密码">修改密码</el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <el-button style="display:none;" :plain="true" @click="open6">成功</el-button>
    <el-button style="display:none;" :plain="true" @click="open8">错误</el-button>
  </div>
</template>

<script>
import usersMore from '../components/userMore'
  export default {
    data() {
      return {
        imageUrl: ''
      }
    },
    components:{
        usersMore
    },
    methods: {
      
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
  .doc-container {
    position: relative;
    padding-top: 60px;
    -webkit-transition: all .2s;
    transition: all .2s;
    min-height: 100vh
  }

  .container-fixed {
    width: 1280px;
    height: 300px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    background-color: #fff;
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
