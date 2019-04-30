var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session");
var mongooseSession = require('connect-mongo')(session)

var indexRouter = require('./routes/index');
var Users = require('./routes/users');
var Article = require('./routes/article');
var Comments = require('./routes/comment');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//设置session
app.use(session({
    secret: 'bookfish',
    rolling: true,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 8 //八个小时
    },
    store: new mongooseSession({ //将session存入数据库中
        url: 'mongodb://localhost:27017/blog'
    })
}))


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//所有路由中间件
app.use(function(req, res, next) {
    if (req.session.userInfo) {
        next()
    } else {
        // console.log(req.path) 
        //用户未登录，不可评论
        if (req.path == '/comment/submit' || req.path == '/comment/artreply' || req.path == '/comment/reply' || req.path == '/comment/addboard') {
            res.json({
                status: '1',
                msg: '当前未登录',
                result: {}
            })
        } else {
            next()
        }
    }
})

//静态资源
app.use(express.static('public'))

const upload = require("./utils/upload")
app.use('/users/update', upload.single("file"))

app.use('/', indexRouter);
app.use('/users', Users);
app.use('/article', Article);
app.use('/comment', Comments);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;