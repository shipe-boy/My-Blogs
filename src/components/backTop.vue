<template>
  <div>
    <!--可自定义按钮的样式、show/hide临界点、返回的位置  -->
    <!--如需文字提示，可在外部添加element的<el-tooltip></el-tooltip>元素  -->
    <el-tooltip placement="top" content="回到顶部">
      <back-to-top :custom-style="myBackToTopStyle" :visibility-height="400" :back-position="0" transition-name="fade"/>
    </el-tooltip>
  </div>
</template>

<script>
import  BackToTop from './BackToTop'

export default {
  components: { BackToTop},
  data() {
    return {
      myBackToTopStyle: {
        right: '50px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        lineHeight: '45px', // 请保持与高度一致以垂直居中
        background: '#9f5f9f'// 按钮的背景颜色
      }
    }
  }
}
</script>