<!--  -->
<template>
    <div class="doc-container" id="doc-container">
        <div class="container-fixed" style="height: 500px;">
            <div class="container-inner" style="height: 500px;">
                <el-tabs tab-position="top" style="height: 100%;">
                  <el-tab-pane label="评论的评论">
                    <el-table :data="AllCom" border style="width: 100%" max-height="400">
                      <el-table-column prop="time" label="日期" width="180">
                      </el-table-column>
                      <el-table-column prop="article.title" label="评论文章" width="180">
                      </el-table-column>
                      <el-table-column prop="content" label="评论内容">
                      </el-table-column>
                      <el-table-column prop="_id" label="操作" fixed="right">
                        <template slot-scope="scope">
                          <el-button @click="handleClick(scope.$index, AllCom)" type="text" size="small">查看</el-button>
                          <el-button  type="text" @click="open1(scope.$index, AllCom)">删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane v-if=" role > 900 "  label="发表的文章">
                    <el-table :data="AllArt" border style="width: 100%;" max-height="400">
                      <el-table-column prop="time" label="日期" width="180">
                      </el-table-column>
                      <el-table-column prop="title" label="标题" width="180">
                      </el-table-column>
                      <el-table-column prop="types" label="类型">
                      </el-table-column>
                      <el-table-column prop="_id" label="操作" fixed="right">
                        <template slot-scope="scope">
                          <el-button @click="handleClick1(scope.$index, AllArt)" type="text" size="small">查看</el-button>
                          <el-button  type="text" @click="open2(scope.$index, AllArt)">删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane v-if=" role > 998 " label="用户管理">
                    <user-table></user-table>
                  </el-tab-pane>
                </el-tabs>
            </div>
        </div>
  </div>
</template>

<script>
import UserTable from '../components/userTable'
export default {
  components: {
    UserTable
  },
  name: 'user',
  data () {
    return {
      AllCom: [],
      AllArt: [],
      role: 1
    }
  },
  mounted(){
    this.getAllCom();
    this.getAllArt();
    this.role = this.$route.query.role;
  },
  methods: {
    getAllCom(){
      this.$ajax.get('/comment/allcomment').then(res =>{
        // console.log(res)
        this.AllCom = res.data.data.reverse();
      }).catch(err =>{
        console.log(err)
      })
    },
    getAllArt(){
      this.$ajax.get('/article/allarticle').then(res =>{
        // console.log(res)
        this.AllArt = res.data.data.reverse();
      }).catch(err =>{
        console.log(err)
      })
    },
    handleClick(index,arr) {  //查看评论跳转
        // console.log(index)
        // console.log(arr[index].article._id)
        this.$router.push("/index/articles/Details/" + arr[index].article._id)
    },
    handleClick1(index,arr) {  //查看文章跳转
        // console.log(index)
        // console.log(arr[index].article._id)
        this.$router.push("/index/articles/Details/" + arr[index]._id)
    },
    //删除评论
    open1(index,arr) {
      let id = arr[index]._id;
    //   console.log(id)
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$ajax.get('/comment/del/' + id).then(res =>{
                this.getAllCom()
          }).catch(err =>{
            console.log(err)
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
    },
    //删除文章
    open2(index,arr) {
      let id = arr[index]._id;
      // console.log(id)
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$ajax.get('/article/del/' + id).then(res =>{
            
                this.getAllArt() 
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
<style scoped>
.doc-container{position:relative;padding-top:60px;-webkit-transition:all .2s;transition:all .2s;min-height:100vh}
.container-fixed{width:1280px;height:300px;margin-left:auto;margin-right:auto;position:relative;background-color: #eee;}
@media screen and (max-width:1366px){.container-fixed{width:90%}}
@media screen and (max-width:1024px){.container-fixed{width:90%}}
</style>