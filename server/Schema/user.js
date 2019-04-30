//得到Schema对象
const {Schema} = require("../database/connect");

//设置user的规范
const userSchema = new Schema({
    username : String,
    password : String,
    avatar : {  //头像
        type : String,
        default : "/images/user1.jpg"
    },
    role : {  //权限
        type : Number,
        default : 1
    },
    commentNum : Number,//评论数
    articleNum : Number,
    sex: {
        type: String,
        default: ""
    },
    phone:  {
        type: String,
        default: ""
    },
    email:  {
        type: String,
        default: ""
    },
    birth: {
        type: String,
        default: ''
    }
},{versionKey : false})


/* userSchema.post("remove", (doc) => {

    const Article = require("../module/article")
    const Comment = require("../module/comment")

    //取到作者id，和文章id
    const {author, _id:article} = doc

    //
    // User.findByIdAndUpdate(author, {$inc : {articleNum : -1}})

    //把当前文章所有相关的评论 删除
   Comment.find({article : article})
          .then(data => {
              data.forEach(v => v.remove())
          })
}) */

//导出user规范
module.exports = userSchema;