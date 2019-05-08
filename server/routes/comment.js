var express = require('express');
var router = express.Router();

const Comment = require("../module/comment")
const Article = require("../module/article")
const User = require("../module/user")
const Board = require('../module/msgBoard')


require('../utils/time')


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
    data.time = new Date().Format('yyyy-MM-dd hh:mm:ss');
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
                .updateOne({
                    _id: data.article
                }, {
                    $inc: {
                        commentNum: 1
                    }
                })
                .then(data => data, err => err)

            //更新用户的评论计数器
            User
                .updateOne({
                    _id: data.author
                }, {
                    $inc: {
                        commentNum: 1
                    }
                }, err => {
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

    const data = await Comment.find({
            author: userId
        }).populate("article", "title")
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
        //先通过id找找是回复还是评论
    await Comment.findById(commentId)
        .then(data => {
            // console.log(typeof data.reply[0])
            if (typeof data.reply[0] == 'string') { //删除的是回复
                let _id = data.reply[0];
                let id = data.reply[1];
                Comment.update({ //删除的是回复数组对应项
                    _id
                }, {
                    $pull: {
                        'reply': {
                            id
                        }
                    }
                }).then(doc => {
                    console.log(11, doc)
                }).catch(err1 => {
                    console.log(err)
                    data = {
                        state: 1,
                        message: err
                    }
                })
            } else {
                data.reply.forEach(item => {
                    Comment.deleteOne({ id: item.id }).then(ok => {

                    })
                })
            }
        })
        .catch(err => {
            data = {
                state: 1,
                message: err
            }
        })
        //删除对应回复的集合
    await Comment.findById(commentId)
        .then(data => {
            data.remove()
        })
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
    //创建一个标识
    let platFrom = '410306', //一个假设的平台码
        r1 = Math.floor(Math.random() * 10),
        r2 = Math.floor(Math.random() * 10),
        sysDate = new Date().Format('yyyyMMddhhmmss'); //系统时间
    let orderId = platFrom + r1 + sysDate + r2;

    let data = {
        author: req.session.userInfo._id,
        user: req.session.userInfo.username,
        face: req.session.userInfo.avatar,
        content: req.body.content,
        user2: req.body.user2,
        reply: [id, orderId], //回复的回复数组里存了父评论的id;
        id: orderId,
        time: new Date().Format('yyyy-MM-dd hh:mm:ss')
    }


    new Comment(data).save().then(doc => { //先创建集合
        Comment.findOne({ //再将对应集合添加到评论里
                _id: id
            })
            .then(doc1 => {
                data._id = doc._id;
                doc1.reply.push(data)
                doc1.save()
                res.json({
                    status: 0,
                    msg: ''
                })
            })
    }).catch(err => {
        res.json({
            status: 1,
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
        time: new Date().Format('yyyy-MM-dd hh:mm:ss')
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
        time: new Date().Format('yyyy-MM-dd hh:mm:ss')
    }

    // console.log(req.body)
    // console.log(data)

    await Board.findOne({
            _id: id
        })
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