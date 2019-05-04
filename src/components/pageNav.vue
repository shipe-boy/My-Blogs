<!--  -->
<template>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      background
      :page-size="5"
      layout="total, prev, pager, next, jumper"
      :total="maxNum">
    </el-pagination>
  </div>
</template>

<script>
export default {
    props:{
        currentPage:{
            type: Number,
            default: 0
        },
        maxNum:{
          type: Number,
          default: 0
        }

    },
  data () {
    return {

    }
  },
  methods: {
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
      }
    },
}

</script>