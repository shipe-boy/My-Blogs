<!--  -->
<template>
  <header class="gird-header">
    <div class="header-fixed">
      <div class="header-inner">
        <router-link class="header-logo" id="logo" :to="{name: 'start'}">Bookfish</router-link>
        <nav class="header-nav pc" id="nav">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">
              <router-link :to="{name: 'index'}">首页</router-link>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">文章</template>
              <el-menu-item index="HTML5和CSS3">HTML5和CSS3</el-menu-item>
              <el-menu-item index="JavaScript">JavaScript</el-menu-item>
              <el-menu-item index="Vue">Vue</el-menu-item>
              <el-menu-item index="Node">Node</el-menu-item>
              <el-menu-item index="React">React</el-menu-item>
              <el-menu-item index="其他">其他</el-menu-item>
            </el-submenu>
            <el-menu-item index="3"><router-link :to="{name: 'example'}">举个栗子</router-link></el-menu-item>
            <el-menu-item index="4">
              <router-link :to="{name: 'linkpage'}">友情链接</router-link>
            </el-menu-item>
            <el-menu-item index="5">
              <router-link :to="{name: 'msgboard'}">留言板</router-link>
            </el-menu-item>
          </el-menu>
        </nav>
        <!-- 移动端 -->
        <a class="phone-menu" @click="open">
          <i></i>
          <i></i>
          <i></i>
        </a>
        <nav class="header-nav phone" id="nav">
          <transition name="menu">
            <el-menu v-if="isOpen" default-active="2" class="el-menu-vertical-demo" @select="handleSelect"
              @close="handleClose">
              <el-menu-item index="1">
                <span slot="title">
                  <router-link :to="{name: 'index'}">首页</router-link>
                </span>
              </el-menu-item>
              <el-submenu index="2">
                <template slot="title">
                  <span>文章</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="HTML5和CSS3">HTML5和CSS3</el-menu-item>
                  <el-menu-item index="JavaScript">JavaScript</el-menu-item>
                  <el-menu-item index="Vue">Vue</el-menu-item>
                  <el-menu-item index="Node">Node</el-menu-item>
                  <el-menu-item index="React">React</el-menu-item>
                  <el-menu-item index="其他">其他</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item index="3">
                <span slot="title">举个栗子</span>
              </el-menu-item>
              <el-menu-item index="4">
                <span slot="title">
                  <router-link :to="{name: 'linkpage'}">友情链接</router-link>
                </span>
              </el-menu-item>
              <el-menu-item index="5">
                <span slot="title">
                  <router-link :to="{name: 'msgboard'}">留言板</router-link>
                </span>
              </el-menu-item>
            </el-menu>
          </transition>
          <div v-if="isOpen" class="cover" @click="close"></div>
        </nav>

        <div class="user">
          <!-- 登陆注册按钮 -->
          <a v-if="!username" class="blog-user" href="javascript:;" @click="loging = true;isRegist = false">登陆/注册</a>
          <!-- 登陆注册弹框 -->
          <el-dialog custom-class="dialog" title="欢迎回来！" :visible.sync="loging" :modal-append-to-body="false">
            <login v-if="!isRegist" @on-close="closeDialog();" @on-change="toogle"></login>
            <register v-if="isRegist" @on-close="closeDialog()"></register>
          </el-dialog>
          <!-- 用户信息 -->
          <div v-if="username" class="blog-user">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                <img :src='"http://localhost:3000"+ userface' :alt="username">
                <span>{{ username }}</span>
              </span>
              <el-dropdown-menu slot="dropdown" hide-on-click="true">
                <el-dropdown-item>
                  <router-link :to="{name: 'userinfo'}">个人资料</router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <router-link :to="{name: 'user',query: {role}}">管理中心</router-link>
                </el-dropdown-item>
                <el-dropdown-item v-if="role> 990">
                  <router-link :to="{name: 'publish'}">文章发表</router-link>
                </el-dropdown-item>
                <el-dropdown-item command="loginOut" divided>退出登陆</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  import login from '../views/login'
  import register from '../views/register'
  import connect from './Bus'
  export default {
    components: {
      login,
      register
    },
    data() {
      return {
        activeIndex: '1',
        role: 1, //权限
        isOpen: false, //移动端
        loging: false, //登陆框
        isRegist: false
      }
    },
    computed: {
      username() {
          this.getUserInfo()
        return this.$store.state.username;
      },
      userface() {
        return this.$store.state.userface;
      }
    },
    mounted() {
      this.getUserInfo()
    },
    methods: {
      getUserInfo() {
        this.$ajax.get("/users/checkLogin").then(res => {
          if (res.data.status == 0) { //用户登陆了

            this.$store.commit('userName', res.data.result.username)
            this.$store.commit('userFace', res.data.result.userface)
            this.role = res.data.result.role;
            // console.log(this.role)
            // console.log("http://localhost:3000"+ this.userface)
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      handleSelect(key, keyPath) {
        this.isOpen = false; //移动端
        if (keyPath[0] === "2" || key === "1") {
          key = key == "1" ? "all" : key;
          connect.$emit('type', key)
        }
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      open() {
        this.isOpen = !this.isOpen;
      },
      close() {
        this.isOpen = false;
      },
      closeDialog() {
        this.loging = false;
      },
      toogle() {
        this.isRegist = !this.isRegist;
      },
      handleCommand(command) {
        if (command) {
          //退出登录
          this.$ajax.get("/users/loginout").then(res => {
            //    console.log(res)
            if (res.data.status === 0) {
              this.$store.commit('userName', "")
              this.$store.commit('userFace', "")
            }
              this.$router.push('/index') //返回首页
          }).catch(err => {
            console.log(err)
          })
        }
      }
    }
  }

</script>
<style scoped>
  .gird-header {
    width: 100%;
    min-height: 60px;
    position: fixed;
    background-color: rgba(255, 255, 255, 1);
    z-index: 100;
    top: 0;
    left: 0;
    border-bottom: 1px solid #e8e9e7;
    font-size: 14px
  }

  .header-fixed {
    width: 1280px;
    min-height: 60px;
    margin-left: auto;
    margin-right: auto;
    position: relative
  }

  .header-inner {
    margin-left: 10px;
    min-height: 60px;
    margin-right: 10px;
    position: relative
  }

  .header-logo {
    font-family: BarbaraHand;
    font-size: 45px;
    color: #444647;
    text-align: center;
    position: absolute;
    left: 0
  }

  .header-nav {
    display: block;
    position: absolute;
    height: 100%;
    right: 15%
  }

  .header-nav a {
    display: block;
  }

  .blog-user {
    position: absolute;
    line-height: 60px;
    font-size: 14px;
    cursor: pointer;
    padding: 0 5px;
  }

  .blog-user img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin-right: 8px;
  }

  .phone-menu {
    width: 50px;
    height: 50px;
    display: inline-block;
    position: absolute;
    cursor: pointer;
    right: 0;
    top: 5px
  }

  .phone-menu i {
    background: #787977;
    display: inline-block;
    width: 22px;
    height: 2px;
    position: absolute;
    left: 14px
  }

  .phone-menu i:nth-of-type(1) {
    top: 18px
  }

  .phone-menu i:nth-of-type(2) {
    top: 25px
  }

  .phone-menu i:nth-of-type(3) {
    top: 32px
  }

  @media screen and (min-width:1025px) {
    .blog-user {
      right: 0
    }

    .phone-menu {
      display: none
    }

    .header-nav {
      display: block !important
    }

    .header-nav.phone {
      display: none;
      overflow: hidden;
    }

    .header-nav.pc {
      display: block;
      overflow: hidden;
    }
  }

  @media screen and (max-width:1366px) {

    .container-fixed,
    .footer-fixed,
    .header-fixed {
      width: 90%
    }

    .phone-menu {
      display: none
    }

    .header-nav {
      display: block
    }

    .header-nav.phone {
      display: none;
      overflow: hidden;
    }

    .header-nav.pc {
      display: block;
      overflow: hidden;
    }
  }

  @media screen and (max-width:1024px) {
    .header-logo {
      left: 25%;
      width: 50%;
      font-size:24px;
    }

    .header-nav {
      position: fixed;
      top: 60px;
      left: 0;
      right: 0
    }

    .container-fixed,
    .footer-fixed,
    .header-fixed {
      width: 90%
    }

    .phone-menu {
      display: block;
    }
    
    .header-nav.phone {
      display: block;
      visibility: hidden;
      overflow: hidden;
    }

    .header-nav.pc {
      display: none;
      overflow: hidden;
    }

    .header-nav.phone .cover {
      visibility: visible;
    }

    .header-nav.phone .el-menu-vertical-demo {
      visibility: visible;
    }

    .cover {
      position: fixed;
      z-index: -1;
      top: 60px;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .5);
    }

    .header-nav ul {
      position: absolute;
      z-index: 2;
      right: 0;
      width: 50%;
      height: 100%;
    }
    
  }
.el-dialog.dialog{
        background-color: red;
        width: 100% ;
    }

  .menu-enter-active {
    transition: all .5s;
  }

  .menu-enter {
    transform: translateX(100%);
  }

  .menu-leave-active {
    transition: all .5s;
    transform: translateX(100%);
  }

</style>
