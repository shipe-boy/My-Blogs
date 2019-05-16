//得到Schema对象
const { Schema } = require("../database/connect");

//声明 ObjectId
const ObjectId = Schema.Types.ObjectId;


//设置article的规范
const exampleSchema = new Schema({
    answer: String, //文章标题
    content: String, //文章内容
    time: String, //时间
}, {
    versionKey: false, //不存默认版本号
    timestamps: {
        createdAt: "createTime" //存时间
    }
})

//导出规范
module.exports = exampleSchema;