//得到Schema对象
const {Schema} = require("../database/connect");

//声明 ObjectId
const ObjectId = Schema.Types.ObjectId;


//设置user的规范
const boardSchema = new Schema({
    user: String, //用户
    face: String, //头像
    content: String, //内容
    reply: {type:Array, default: []}  //所有相关的回复
},{
    versionKey : false, //不存默认版本号
    timestamps : {
        createdAt : "createTime"  //存时间
    }
})


//导出规范
module.exports = boardSchema;