const {db} = require("../database/connect"); //得到数据库的操控对象
const boardSchema = require("../Schema/msgBoard"); //得到types表数据的规范
const objBoard = db.model("boards", boardSchema); //操控types表的对象

module.exports = objBoard;