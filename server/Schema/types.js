//得到Schema对象
const { Schema } = require("../database/connect");

//声明 ObjectId
const ObjectId = Schema.Types.ObjectId;


//设置user的规范
const typesSchema = new Schema({
    type: String, //某一类型
    article: [{
            type: ObjectId,
            ref: "articles" //关联的表
        }] //所有相关类型的文章
}, {
    versionKey: false, //不存默认版本号
    timestamps: {
        createdAt: "createTime" //存时间
    }
})


//导出规范
module.exports = typesSchema;