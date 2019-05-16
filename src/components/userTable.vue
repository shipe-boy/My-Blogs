<!--  -->
<template>
  <el-table :data="tableData" height="250" border style="width: 100%;min-height:400px;">
    <el-table-column prop="username" label="名称" width="180">
    </el-table-column>
    <el-table-column prop="role" label="权限" width="180">
    </el-table-column>
    <!-- <el-table-column prop="address" label="地址">
    </el-table-column> -->
    <el-table-column prop="_id" label="操作" fixed="right">
      <template slot-scope="scope">
        <!-- <el-button @click="handleClick()" type="text" size="small">查看</el-button> -->
        <el-button  type="text" @click="open2(scope.$index, tableData)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
    data() {
      return {
        tableData: []
      }
    },
    mounted(){
      this.getAllUser()
    },
    methods:{
      getAllUser(){
        this.$ajax.get('/users/allusers').then(res =>{
        //   console.log(res)
          this.tableData = res.data.response;
        }).catch(err =>{
          console.log(err)
        })
      },
      open2(index,arr){
        let id = arr[index]._id;
        // console.log(id)
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$ajax.get('/users/del/' + id).then(res =>{
                    console.log(res)
                  this.getAllUser() 
            }).catch(err =>{ 
            })
            this.$message({
                  type: 'success',
                  message: '删除成功!'
              });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
      }
    }
}
</script>