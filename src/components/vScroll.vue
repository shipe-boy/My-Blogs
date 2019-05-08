<!--  -->
<template>
  <div class="load-more" v-infinite-scroll="loadMore" :infinite-scroll-disabled="busy" infinite-scroll-distance="20">
    <img v-if="loading" src="./../assets/loading-svg/loading-spinning-bubbles.svg" alt="">
  </div>
</template>

<script>
  export default {
    props: {
      busy: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {}
    },
    methods: {
      loadMore() {
        setTimeout(() => {}, 500);
      },
    }
  }

</script>
