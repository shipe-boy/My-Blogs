var express = require('express');
var router = express.Router();

//得到操控集合的对象
const Article = require("../module/article");
const User = require("../module/user")
const Comment = require("../module/comment")
const Types = require("../module/types")

require('../utils/time')

//文章发表页中，点击发表，处理接收的数据
router.post('/publish', async(req, res, next) => {

    //取出发过来的数据
    let data = req.body;
    data.author = req.session.userInfo._id;
    data.commentNum = 0;
    data.readNum = 0;
    data.time = new Date().Format('yyyy-MM-dd hh:mm:ss');

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
        User.updateOne({
            _id: data.author
        }, {
            $inc: {
                articleNum: 1
            }
        }, err => {
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


    //根据类型添加对应的类型表
    let type = req.body.types;
    if (type.length === 0) {
        type.push("其他")
    }
    type.forEach(async item => {
        let have;
        await Types.findOne({
                type: item
            })
            .then(res => {
                have = res;
            }).catch(err => {
                console.log(err)
            })

        if (have) { //有
            // console.log("添加数据")
            have.article.unshift(article._id)
            have.save((err) => {
                if (err) throw err;
            })
        } else { //查询没有结果，返回null
            //创建数据集合并添加
            // console.log("创建集合")
            let obj = {
                type: item,
                article: [article._id]
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
router.get('/list/:type/:page', async(req, res, next) => {
    let type = req.params.type || 'all';
    let page = req.params.page || 1;
    // console.log(type, page)
    if (type == 'all') { //所有文章
        //文章数量
        let maxNum = await Article.estimatedDocumentCount((err, data) => {
            if (err) return err;
            return data;
        });

        let arrList = [];
        //置顶搜索
        let arr1 = await Article
            .find({
                isTop: true
            })
            .sort("-createTime")
            .populate("author", "_id username avatar")
            .then(data => {
                arrList = [...data]
            }, err => {
                console.log(err)
            })
            //其他搜索
        let arr2 = await Article
            .find({
                isTop: false
            })
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
            if (i >= maxNum) {
                break;
            }
            artList.push(arrList[i])
        }
        //返回数据
        await res.json({
            status: 0,
            msg: '',
            result: {
                artList,
                maxNum
            }
        })
    } else { //相关类型的文章

        await Types.findOne({
            type
        }, (err, data) => {
            if (err) {
                res.json({
                    status: 0,
                    msg: err.message,
                    result: ''
                })
            }
            if (!data) { //无数据
                res.json({
                    status: 0,
                    msg: '无数据',
                    result: ''
                })
                return;
            }
            let opts = [{
                    path: 'article'
                }] //链表查询时填充的地方
                // console.log(data)
            data.populate(opts, (err, doc) => {
                if (err) {
                    res.json({
                        status: 0,
                        msg: err.message,
                        result: ''
                    })
                }
                // console.log(doc)  //已经填充了的类型表
                let artList = [],
                    maxNum = doc.article.length;
                for (let i = (page - 1) * 5; i < page * 5; i++) {
                    if (i >= maxNum) {
                        break;
                    }
                    // doc.article[i].i = i;
                    artList.push(doc.article[i])
                }
                res.json({
                    status: 0,
                    msg: '',
                    result: {
                        artList,
                        maxNum
                    }
                })
            })
        })
    }

})


//文章详情页
router.get('/details/:id', async(req, res, next) => {
    let _id = req.params.id; //文章id

    let article = await Article
        .findById(_id)
        .populate("author", "username")
        .then(data => data, err => err);

    //更新文章阅读量计数
    Article.updateOne({
        _id: _id
    }, {
        $inc: {
            readNum: 1
        }
    }, err => {
        if (err) return console.log(err)
    })

    //查找跟当前文章相关的所有评论
    let comment = await Comment
        .find({
            article: _id
        })
        .sort("-createTime")
        .populate("author", "username avatar")
        .then(data => data, err => {
            console.log("报错了")
        })

    //返回当前访问者信息
    let login = req.session.userInfo ? req.session.userInfo.username : "";
    //渲染页面
    await res.json({
        title: article.title,
        article,
        comment,
        login
    })
})

//获取对用用户的所有文章
router.get('/allarticle', async(req, res, next) => {
    const userId = req.session.userInfo._id;

    const data = await Article.find({
        author: userId
    })

    res.json({
        data
    })


})

//删除文章
router.get('/del/:id', async(req, res, next) => {
    //文章id
    const _id = req.params.id;
    let type = []; //暂存文章类型
    let data = {
        state: 1,
        msg: "成功"
    }

    await Article.findById(_id)
        .then(data => {
            type = data.types;
            data.remove()
        })
        .catch(err => {
            data = {
                state: 0,
                msg: err
            }

        })

    //删除类型
    type.forEach((item => {
        Types.update({
            type: item
        }, {
            $pull: { //删除数组某一项
                'article': {
                    _id
                }
            }
        }).then(doc => {}).catch(err => {
            data = {
                state: 0,
                msg: err
            }
        })
    }))
    res.json(data)
})

//文章里的图片上传,已经经过中间件处理了
router.post('/img', async(req, res, next) => {
    // console.log("文件名" + req.file.filename)
    let filename = req.file.filename

    res.json({
        status: 0,
        msg: '',
        result: {
            url: '/images/article/' + filename
        }
    })
})

//侧边栏搜索功能
router.post('/search', async(req, res, next) => {
    let search = req.body.search;
    Article.find({ title: { $regex: search } }).then(doc => {
        // console.log(doc)
        res.json({
            status: 0,
            result: doc,
            msg: 'success'
        })
    }).catch(err => {
        res.json({
            status: 1,
            msg: err.message
        })
    })
})

module.exports = router;