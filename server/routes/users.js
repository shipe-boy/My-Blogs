var express = require('express');
var router = express.Router();

const User = require("../module/user"); //操控集合的对象
const crypto = require("../utils/encrypt") //加密方法

//用户输入时及时检查
router.post('/isuser', (req, res, next) => {
    let username = req.body.username;
    User.find({ username })
        .then(response => {
            if (response.length == 0) {
                res.json({
                    status: 1,
                    msg: "用户名不存在"
                })
            } else {
                res.json({
                    status: 0,
                    msg: "有此用户名"
                })
            }
        }).catch(err => {
            res.json({
                status: 1
            })
        })
})
router.post('/ispwd', async(req, res, next) => {
    let password = req.body.password;
    await User.find({ password: crypto(password) })
        .then(response => {
            if (response.length == 0) {
                res.json({
                    status: 1
                })
            } else {
                res.json({
                    status: 0
                })
            }
        }).catch(err => {
            res.json({
                status: 1
            })
        })
})

//处理用户注册信息
router.post('/register', async function(req, res, next) {
    let username = req.body.name;
    let password = req.body.pass;
    // console.log(username,password)
    await new Promise((res1, rej) => {
        User.find({ username }, (err, data) => {
            //查询报错
            if (err) return rej(err);

            //查询没报错，但是有同名数据
            if (data.length !== 0) return res1("");

            //查询没报错，也没有同名数据，创建用户信息
            const userobj = new User({
                username,
                password: crypto(password),
                commentNum: 0,
                articleNum: 0
            });
            // 存入数据库
            userobj.save((err, data) => {
                if (err) {
                    rej('保存失败');
                } else {
                    res1(data);
                }
            });
        })
    }).then(async data => { //成功
        if (data) { //注册成功
            //设置cookie
            /* res.cookie("username", username, {
                //配置cookie的属性
                path: "/",
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: true, //不让客户端控制这条cookie
                overwrite: false
            })
            res.cookie("userface", data.avatar, {
                //配置cookie的属性
                path: "/",
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: true, //不让客户端控制这条cookie
                overwrite: false
            })
            res.cookie("userId", data._id, {
                //配置cookie的属性
                path: "/",
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: true, //不让客户端控制这条cookie
                overwrite: false
            }) */
            req.session.userInfo = data;
            await res.json({
                status: 0,
                msg: '',
                result: {
                    username,
                    userface: data.avatar
                }
            });

        } else { //data是空字符串，用户名已存在
            await res.json({
                status: 1,
                msg: '用户名已存在',
                result: {}
            });
        }
    }, async err => { //失败
        await res.json({
            status: 1,
            msg: "注册失败",
            result: {}
        });
    })
});

//处理用户登陆信息
router.post('/login', async function(req, res, next) {
    let username = req.body.name;
    let password = req.body.pass;
    // console.log(username,password)
    await new Promise((res, rej) => {
        User.find({ username }, (err, data) => {
            //查询报错
            if (err) return rej(err);

            //查询没报错，但是没有查到数据
            if (data.length === 0) return rej(0);

            //查询与之对应的用户名，比对密码是否一致
            if (data[0].password === crypto(password)) {
                return res(data); //登陆成功
            } else {
                return res("") //密码不对
            }
        })
    }).then(async data => { //成功
        if (data) { //登陆成功
            //设置cookie
            /* res.cookie("username", username, {
                //配置cookie的属性
                path: "/",
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: true, //不让客户端控制这条cookie
                overwrite: false
            })
            res.cookie("userface", data[0].avatar, {
                //配置cookie的属性
                path: "/",
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: true, //不让客户端控制这条cookie
                overwrite: false
            })
            res.cookie("userId", data[0]._id, {
                //配置cookie的属性
                path: "/",
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: true, //不让客户端控制这条cookie
                overwrite: false
            }) */
            req.session.userInfo = data[0];
            await res.json({
                status: 0,
                msg: '',
                result: {
                    username,
                    userface: data[0].avatar //用户头像
                }
            });


        } else { //密码错误
            await res.json({
                status: 1,
                msg: '密码错误',
                result: {}
            });
        }
    }, async err => { //失败
        if (err === 0) { //用户名不存在
            await res.json({
                status: 1,
                msg: '用户名不存在',
                result: {}
            });
        } else { //其他错误
            await res.json({
                status: 1,
                msg: '登陆失败',
                result: {}
            });
        }
    })
});

//退出登录
router.get('/loginout', async(req, res, next) => {
    /* res.cookie("username", null, {
        maxAge: 0
    });
    res.cookie("userface", null, {
        maxAge: 0
    });
    res.cookie("userId", null, {
        maxAge: 0
    }); */
    //清除session
    req.session.distory();
    res.json({
        status: 0,
        msg: '',
        reslut: {}
    })
})

//检查登陆状态
router.get('/checkLogin', async function(req, res, next) {
    if (req.session.userInfo) {
        let _id = req.session.userInfo._id;

        let user = await User
            .find({ _id: _id })
            .then(data => data, err => { console.log("报错了") })

        // console.log(user[0].role)
        res.json({
            status: 0,
            msg: '',
            result: {
                username: req.session.userInfo.username,
                userface: req.session.userInfo.avatar,
                role: user[0].role
            }
        })
    } else {
        res.json({
            status: 1,
            msg: '未登录',
            result: {}
        })
    }
})

//查询所有用户
router.get('/allusers', async function(req, res, next) {
    await User.find()
        .then((response) => {
            res.json({
                status: 0,
                msg: '',
                response
            })
        }).catch(err => {

        })

})



//头像上传
router.post('/update', async(req, res, next) => {
    // console.log("文件名" + req.file)
    const filename = req.file.filename

    let data = {}

    await User.updateOne({ _id: req.session.userInfo._id }, { $set: { avatar: "/images/" + filename } }, (err, res) => {
        if (err) {
            data = {
                status: 1,
                message: "上传失败"
            }
        } else {
            data = {
                status: 0,
                message: "上传成功"
            }
        }
    })
    await User.findOne({ _id: req.session.userInfo._id })
        .then(response => {
            // data.avatar = response.avatar
            //设置session
            // req.session.userInfo = response;
            /* res.cookie("userface", data.avatar, {
                    //配置cookie的属性
                    path: "/",
                    maxAge: 1000 * 60 * 60 * 24,
                    httpOnly: true, //不让客户端控制这条cookie
                    overwrite: false
                })
                //设置cookie
            res.cookie("username", response.username, {
                //配置cookie的属性
                path: "/",
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: true, //不让客户端控制这条cookie
                overwrite: false
            })
            res.cookie("userId", response._id, {
                //配置cookie的属性
                path: "/",
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: true, //不让客户端控制这条cookie
                overwrite: false
            }) */
        }).catch(err => {
            console.log(err)
        })
        // console.log(data)
    res.json(data)
})

//当前用户信息
router.get('/userinfo', async(req, res, next) => {
    let Id = req.session.userInfo._id
    User.findOne({ _id: Id })
        .then(response => {
            // console.log(response)
            res.json({
                status: 0,
                msg: '',
                result: {
                    userName: response.username,
                    userTel: response.phone,
                    userEmail: response.email,
                    userSex: response.sex,
                    userBirth: response.birth
                }
            })
        }).catch(err => {
            res.json({
                status: "1",
                msg: err.message,
                result: ""
            })
        })
})

router.post("/edit", (req, res, next) => {
    let Id = req.session.userInfo._id;
    userInfo = req.body.userInfo;
    User.updateOne({ _id: Id }, { $set: { 'username': userInfo.username, 'sex': userInfo.sex, 'phone': userInfo.phone, 'email': userInfo.email, 'birth': userInfo.birth } })
        .then(response => {
            res.json({
                status: "0",
                msg: '保存成功'
            }).catch(err => {
                res.json({
                    status: '1',
                    msg: err.message
                })
            })
        })
})

module.exports = router;