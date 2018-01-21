#!/usr/bin/env node
// const allData = require('./socket/data')
const qqCrawl = require('./crawl/qqCrawl')
const express = require('express')
const path = require('path')
const config = require('./config/config')
const router = require('./router')
const bodyParser = require('body-parser')
// const session = require('express-session')

// const Mongorito = require('mongorito')

const app = express()

const http = require('http').Server(app)
// const socket = require('socket.io')
// const io = socket(http) // 向所有客户端广播
const io = require('./socket').listen(http, app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.set('view engine', 'html')
// app.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//   res.header("X-Powered-By",' 3.2.1')
//   res.header("Content-Type", "application/json;charset=utf-8");
//   next();
// });
// app.use(router.routes())
app.use('/', router)


app.use((err, req, res, next) => {
  // 设置响应状态
  // res.status(err.status || 500);
  // 错误处理
  console.log(123, err.status)
  if (err) {
    res.redirect('/error')
  }
})

// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   key: 'express.sid'
// }))

// Mongorito.connect(`mongodb://${ config.mongodb.host }:${ config.mongodb.port }/${ config.mongodb.collection }`)

http.listen(config.port)
console.log('listening on port %s', config.port)

module.exports = app