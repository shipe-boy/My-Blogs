<!--  -->
<template>
  <div class="header">
    <canvas id="canvas" width="1950px" height="800px"></canvas>
    <canvas id="canvasbg" width="1950px" height="800px"></canvas>
  </div>
</template>

<script>
import '../../static/js/bgg.js'   //这样引入页面刷新后报错
  export default {
    data() {
      return {}
    },
    methods: {
        /* init(){
            let Script = document.createElement('script');
            Script.src = require('../../static/js/bg.js');
            document.body.appendChild(Script);
        }  */
    },
    mounted(){
        // this.init()
    }
  }

</script>

<style scoped>
  .header {
    margin: 0 auto;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -1;
    overflow: hidden;
    top: 0;
    left: 0;
    background-color: #eee;
  }

  .header canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 1950px;
    height: auto;
  }

  #canvas {
    z-index: 1;
  }

  #canvasbg {
    z-index: -10;
    -webkit-filter: blur(3px);
    -moz-filter: blur(3px);
    -o-filter: blur(3px);
    filter: blur(3px);
    opacity: 0.6;
  }

</style>
