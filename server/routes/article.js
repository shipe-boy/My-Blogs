var express = require('express');
var router = express.Router();

//得到操控集合的对象
const Article = require("../module/article");
const User = require("../module/user")
const Comment = require("../module/comment")
const Types = require("../module/types")


//文章发表页中，点击发表，处理接收的数据
router.post('/publish', async(req, res, next) => {

    //取出发过来的数据
    let data = req.body;
    data.author = req.session.userInfo._id;
    data.commentNum = 0;
    data.readNum = 0;

    let article;

    await new Promise((res, rej) => {
        new Article(data)
            .save((err, data) => {
                if (err) return rej(err);
                article = data
                res(data);
            })
    }).then(() => {
        //更新用户文章计数
        User.updateOne({ _id: data.author }, { $inc: { articleNum: 1 } }, err => {
            if (err) return console.log(err)
        })

        res.json({
            status: 0,
            msg: "发表成功"
        })
    }, () => {

        res.json({
            status: 1,
            msg: "发表失败"
        })
    })



    let type = req.body.types;

    if (type.length === 0) {
        type.push("其他")
    }

    type.forEach(async item => {
        let have;
        await Types.findOne({ type: item })
            .then(res => { have = res; }).catch(err => {
                console.log(err)
            })

        if (have) { //有
            // console.log("添加数据")
            have.article.push(article)
            have.save((err) => {
                if (err) throw err;
            })
        } else { //查询没有结果，返回null
            //创建数据集合并添加
            // console.log("创建集合")
            let obj = {
                type: item,
                article: [article]
            }
            new Types(obj)
                .save((err, data) => {
                    if (err) throw err;
                    return data
                })
        }
    });


})

//文章列表
router.post('/list', async(req, res, next) => {
    // console.log(req.body.page)
    let page = req.body.page || 1;
    //文章数量
    let maxNum = await Article.estimatedDocumentCount((err, data) => {
        if (err) return err;
        return data;
    });


    /*  let artList = await Article
         .find()
         .sort("-createTime")
         .skip((page - 1) * 5) //数据库里从第几条开始找
         .limit(5)  //获取几条数据 */
    /* .populate({    //连表查询
        path : "author",
        select : "_id username avatar"
    }) */
    /*  .populate("author", "_id username avatar") 
     .then((data) => data , (err) => {
         console.log("报错")
     }); */
    let arrList = [];
    //置顶搜索
    let arr1 = await Article
        .find({ isTop: true })
        .sort("-createTime")
        .populate("author", "_id username avatar")
        .then(data => {
            arrList = [...data]
        }, err => {
            console.log(err)
        })
        //其他搜索
    let arr2 = await Article
        .find({ isTop: false })
        .sort("-createTime")
        .populate("author", "_id username avatar")
        .then(data => {
            arrList = arrList.concat(data)
        }, err => {
            console.log(err)
        })
        // 返回数据    
    let artList = [];
    for (let i = (page - 1) * 5; i < page * 5; i++) {
        if (i >= maxNum) { break; }
        artList.push(arrList[i])
    }
    //渲染页面
    await res.json({
        artList,
        maxNum
    })
})

//文章详情页
router.get('/details/:id', async(req, res, next) => {
    let _id = req.params.id; //文章id

    let article = await Article
        .findById(_id)
        .populate("author", "username")
        .then(data => data, err => err);

    //更新文章阅读量计数
    Article.updateOne({ _id: _id }, { $inc: { readNum: 1 } }, err => {
        if (err) return console.log(err)
    })

    //查找跟当前文章相关的所有评论
    let comment = await Comment
        .find({ article: _id })
        .sort("-createTime")
        .populate("author", "username avatar")
        .then(data => data, err => { console.log("报错了") })

    //渲染页面
    await res.json({
        title: article.title,
        article,
        comment
    })
})

//获取对用用户的所有文章
router.get('/allarticle', async(req, res, next) => {
    const userId = req.session.userInfo._id;

    const data = await Article.find({ author: userId })

    res.json({
        data
    })


})

//删除文章
router.get('/del/:id', async(req, res, next) => {
    //文章id
    const _id = req.params.id;

    let data = {
        state: 1,
        msg: "成功"
    }

    await Article.findById(_id)
        .then(data => data.remove())
        .catch(err => {
            data = {
                state: 0,
                msg: err
            }
        })

    res.json(data)
})

//获取对应类型的文章
router.get('/articles/:type', async(req, res, next) => {
    //文章类型
    const type = req.params.type;

    await Types.find({ type })
        .then(data => {
            // console.log(data.article)
            res.json({
                status: 0,
                msg: '',
                result: data[0].article
            })
        })
        .catch(err => {
            // console.log(err)
            res.json({
                status: 0,
                msg: 'err',
                result: ''
            })
        })



})

module.exports = router;