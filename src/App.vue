<template>
  <div id="app">
    <router-view/>
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
</style>
