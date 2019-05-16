<template>
  <div id="app">
      <bg></bg>
    <header-nav></header-nav>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <footer-nav></footer-nav>
    <back-top></back-top>
  </div>
</template>

<script>
  import Vue from 'vue'
  import HeaderNav from './components/headerNav'
  import FooterNav from './components/footerNav'
  Vue.component("HeaderNav", HeaderNav)
  Vue.component("FooterNav", FooterNav)

  import Bg from './components/bg'
  import BackTop from './components/backTop';    //回到顶部

  export default {
    name: 'App',
    components:{
        Bg,
        BackTop
    }
  }

</script>

<style>
  .fade-enter-active {
    transition: all .5s;
  }

  .fade-enter {
    opacity: 0;
  }

  .fade-leave-active {
    transition: all .5s;
    opacity: 0;
  }

</style>
