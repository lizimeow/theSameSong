const express = require('express')
const path = require('path')
const app = express()

const http = require('http').Server(app)
const socket = require('socket.io')
const io = socket(http)
const qqCrawl = require('./crawl/qqCrawl')
let curMusic = ''
let usersNum = 0

app.use(express.static(__dirname + '/statics'))

app.get('/', (req, res) => {
    res.sendFile('index.html')
  // path.join(__dirname, 'public')
  //   res.sendFile(__dirname + '/statics/index.html')
})

io.on('connection', (socket) => {
    console.log('a user connected')
    usersNum++
    socket.emit('onlineUser', usersNum)
    console.log('the current number of online number:', usersNum)    
    if (curMusic) {
        socket.emit('changePlay', curMusic)
    }

    socket.on('disconnect', () => {
        usersNum--
        console.log('a user disconnected')
    })

    socket.on('submit', async (name) => {
        // const songList = await crawl(name)
        let qq = new qqCrawl(1,12)
        let songList = await qq.fetchData(name)
        io.emit('change', songList)
    })

    socket.on('play', (e) => {
        curMusic = e
        io.emit('changePlay', e)
    })
})

const port = process.env.HTTP_PORT || 3001 
http.listen(port, () => {
    console.log('listening on *:' + port)
})
