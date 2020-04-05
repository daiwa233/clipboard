const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const router = require('./router');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cookieMaxAge = 30 * 24 * 3600 * 1000;// 30天的毫秒数
let limit = '10Mb'
const {
  mongoKey,
  sessionKey
} = require('./key');

// 配置session以及将session持久化
app.use(session({
  secret: sessionKey,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    url: 'mongodb://localhost/Persistent',
    autoRemove: 'native', // Default,自动删除过期的session需要mongodb2.2+
    touchAfter: 3600, // 一个小时内不存储除非session被更新
    secret: mongoKey
  }),
  cookie: {
    secure: false, // 在生产环境下需要先配置false，否则不能设置session
    maxAge: cookieMaxAge,
    sameSite: 'none' // 设置为none，避免Chrome中不能携带cookie跨域
  }
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false,
  limit
}));

// parse application/json
app.use(bodyParser.json({limit}));

// 应用的一些初始化配置，比如图片上传的大小限制
// 如果要实现此功能，还是要保存到session中。。或者保存到前端。
app.post('/config',(req, res, next) => {
  
})

app.use(router);


// 全局错误处理中间件
app.use((err, req, res, next) => {
  console.error(err); // 将错误写入process.stderr中
  // 占坑 收集错误日志
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    res.render('error', {error: err})
  }
})
module.exports = app;

