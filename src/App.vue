<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
  import Vue from 'vue'
  import HeaderNav from './components/headerNav'
  import FooterNav from './components/footerNav'
  Vue.component("HeaderNav", HeaderNav)
  Vue.component("FooterNav", FooterNav)

  export default {
    name: 'App'
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
