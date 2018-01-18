const express = require('express')
const path = require('path')
const cors = require('cors')
const router = require('./routes/index')
const app = express()

// 对未登录的页面进行重定向
app.use((req, res, next) => {
    console.log('?')
})

module.exports = {
    express,
    app,
};