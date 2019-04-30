var express = require('express');
var router = express.Router();

const Comment = require("../module/comment")
const Article = require("../module/article")
const User = require("../module/user")
const Board = require('../module/msgBoard')


/* GET users listing. */
/* router.get('/', function(req, res, next) {
  console.log(req)
  res.send('注册成功');
}); */

//提交评论并保存
router.post('/submit', async(req, res, next) => {
    //判断用户是否登陆
    if (!req.session.userInfo) {
        return res.json({
            status: 1,
            msg: "请登录"
        })
    }

    //用户已经登陆
    //取出发过来的评论数据,发过来的只有文章id和评论内容，没有用户id，
    let data = req.body;
    //添加用户id存到数据库
    data.author = req.session.userInfo._id;
    // console.log(data)
    //存数据库
    let objComments = new Comment(data);
    await objComments
        .save()
        .then(data => { //保存成功
            res.json({
                status: 0,
                msg: "评论成功"
            })

            //更新文章评论计数器
            Article
                .updateOne({ _id: data.article }, { $inc: { commentNum: 1 } })
                .then(data => data, err => err)

            //更新用户的评论计数器
            User
                .updateOne({ _id: data.author }, { $inc: { commentNum: 1 } }, err => {
                    if (err) return console.log(err)
                })
        }, err => {
            res.json({
                status: 0,
                msg: "评论失败"
            })
        })

})

//查询用户所有评论
router.get('/allcomment', async(req, res, next) => {

    const userId = req.session.userInfo._id;

    const data = await Comment.find({ author: userId }).populate("article", "title")
        // console.log(data)//data是个数组包含同一个userid的所有评论

    res.json({
        count: data.length,
        data
    })

})

//删除评论
router.get('/del/:id', async(req, res, next) => {
    //评论id
    const commentId = req.params.id;

    let data = {
        state: 0,
        message: "成功"
    }

    await Comment.findById(commentId)
        .then(data => data.remove())
        .catch(err => {
            data = {
                state: 1,
                message: err
            }
        })

    res.json(data);
})

//文章详情页的回复
router.post('/artreply', async(req, res, next) => {
    let id = req.body.id;
    let data = {
        user: req.session.userInfo.username,
        face: req.session.userInfo.avatar,
        content: req.body.content,
        user2: req.body.user2,
        time: req.body.time
    }

    // console.log(req.body)
    // console.log(data)

    await Comment.findOne({ _id: id })
        .then(doc => {
            // console.log(doc)
            doc.reply.push(data)
            doc.save()
            res.json({
                status: 0,
                msg: ''
            })
        }).catch(err => {
            res.json({
                status: 0,
                msg: err.message
            })
        })
})









//获取留言
router.get('/board', async(req, res, next) => {
    await Board.find()
        .then((response) => {
            res.json({
                status: 0,
                msg: '',
                result: response
            })
        }).catch(err => {
            res.json({
                status: 1,
                msg: err.message,
                result: ""
            })
        })
})

//留言版
router.post('/addboard', async(req, res, next) => {
    let data = {
        user: req.session.userInfo.username,
        face: req.session.userInfo.avatar,
        content: req.body.content,
    }

    let objBoard = new Board(data);
    await objBoard
        .save()
        .then(data => { //保存成功
            res.json({
                status: 0,
                msg: "留言成功"
            })
        }).catch((err) => {
            res.json({
                status: 1,
                msg: "留言失败"
            })
        })
})

//回复留言板
router.post('/reply', async(req, res, next) => {
    let id = req.body.id;
    let data = {
        user: req.session.userInfo.username,
        face: req.session.userInfo.avatar,
        content: req.body.content,
        user2: req.body.user2,
        time: req.body.time
    }

    // console.log(req.body)
    // console.log(data)

    await Board.findOne({ _id: id })
        .then(doc => {
            // console.log(doc)
            doc.reply.push(data)
            doc.save()
            res.json({
                status: 0,
                msg: ''
            })
        }).catch(err => {
            res.json({
                status: 0,
                msg: err.message
            })
        })
})


module.exports = router;