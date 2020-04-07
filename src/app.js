const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./router');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
let cookieMaxAge = 30 * 24 * 3600 * 1000;// 30天的毫秒数
const {
  mongoKey,
  sessionKey
} = require('./key');

app.use(cors({credentials: true, origin: true}));
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
    sameSite: 'none', // 设置为none，避免Chrome中不能携带cookie跨域
  }
}));

// // 应用的一些初始化配置，比如图片上传的大小限制等
// app.post('/config',(req, res, next) => {
  
// })
// app.use((req, res, next) => {

// })

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());



app.use(router);


// 全局错误处理中间件
app.use((err, req, res, next) => {
  // 占坑 收集错误日志
  if (req.xhr && !res.headersSent) {
    res.status(500).send({ error: 'Something failed!' });
  }
  // 交给express的缺省错误处理中间件
  return next(err)
})
module.exports = app;

