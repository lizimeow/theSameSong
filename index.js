const express = require('express')
const path = require('path')
const app = express()

const http = require('http').Server(app)
const socket = require('socket.io')
const io = socket(http)
const qqCrawl = require('./crawl/qqCrawl')
let curMusic = ''
let usersNum = 0
//保存播放列表
let playQueue = []

// app.use(express.static(__dirname + '/statics'))
app.use(express.static(__dirname + '/build'))

app.get('/', (req, res) => {
    res.sendFile('index.html')
  // path.join(__dirname, 'public')
  //   res.sendFile(__dirname + '/statics/index.html')
})

io.on('connection', (socket) => {
    console.log('a user connected')
    io.emit('onlineUser', ++usersNum)
    console.log('the current number of online number:', usersNum)
    if (curMusic) {
        socket.emit('changePlay', curMusic)
    }
    socket.emit('updatePlayingSongs', playQueue)
    console.log(playQueue)

    socket.on('disconnect', () => {
        io.emit('onlineUser', --usersNum)
        console.log('a user disconnected')
    })

    socket.on('submit', async (name) => {
        const qq = new qqCrawl(1, 15)
        const songList = await qq.fetchData(name)
        // console.log(songList)
        io.emit('getSearchList', songList)
    })

    socket.on('play', (e) => {
        console.log('playe', e)
        curMusic = e
        io.emit('changePlay', e)
    })

    socket.on('addSong', (data) => {
        playQueue.push(data)
        // io.emit('updatePlayingSongs', playQueue)
        io.emit('addSong', data)
    })

    socket.on('removeSong', data => {
        if (data.all) {
            playQueue = []
        } else {
            playQueue.splice(data.index, 1)
        }
        io.emit('removeSong', data)
    })
    socket.on('clearSearchList', () => {
        io.emit('clearSearchList')
    })


    // 房间
    socket.on('newRoom', () => {
        // 保存房间数据
        // 同步房间数据
        // 进入房间
        console.log(123444)
    })
})

const port = process.env.HTTP_PORT || 3001
http.listen(port, () => {
    console.log('listening on *:' + port)
})
