const multer = require("multer")
const {join} = require("path")

const storage = multer.diskStorage({
    //存储位置
    destination : function (req, file, cb) {
        cb(null, join(__dirname, "../public/images"));    
    },
    filename(req, file, cb){
        const arrFilename = file.originalname.split(".")
        cb(null, `${Date.now()}.${arrFilename[arrFilename.length - 1]}`)
    }
})
// 通过 storage 选项来对 上传行为 进行定制化
// var upload = multer({ storage: storage })


module.exports = multer({storage})

