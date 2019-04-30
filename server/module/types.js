const {db} = require("../database/connect"); //得到数据库的操控对象
const typesSchema = require("../Schema/types"); //得到types表数据的规范
const objTypes = db.model("types", typesSchema); //操控types表的对象

module.exports = objTypes;