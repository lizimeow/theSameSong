const shortid = require('shortid')
const allData = require('./data')
const socketio = require('socket.io')
const qqCrawl = require('../crawl/qqCrawl')
const session = require('express-session')
const cookie = require("cookie")

module.exports.listen = (http, app) => {
    io = socketio(http) // 向所有客户端广播

    io.on('connection', (socket) => {
        // console.log(socket.request.session.id)
        // allData.session.push(socket.request.session.id)
        // console.log(allData.session)
        io.emit('onlineUser', ++allData.allNumber)
        console.log('当前在线人数:', allData.allNumber)
        socket.on('disconnect', () => {
            io.emit('onlineUser', --allData.allNumber)
            console.log('当前在线人数:', allData.allNumber)
            // console.log('a user disconnected')
        })
        socket.on('createRoom', ({roomName, password}) => {
            const id = shortid.generate()
            allData.roomsList[id] = {
                id,
                roomName,
                password,
                online: 0,
                curSong: {},
                playQueue: []
            }
            socket.emit('createRoom', id)
        })
        // 用户进入房间
        socket.on('initRoom', (v) => {
            const room = allData.roomsList[v]
            if (room) {
                room.online++
                io.emit('online', {room, rid: v})
            }
            console.log('进入id:', v, room.online)
        })
        // 用户离开房间
        socket.on('leaveRoom', (v) => {
            const room = allData.roomsList[v]
            if (room) {
                room.online--
                io.emit('online', {room, rid: v})            
            }
            console.log('离开的id:', v, room.online)
        })
        //搜索音乐
        socket.on('searchSong', async ({name, rid}) => {
            const qq = new qqCrawl(1, 11)
            const songList = await qq.fetchData(name)
            // console.log(songList)
            console.log('rid', rid)
            io.emit('getSearchList', songList, rid)
        })
        // 添加音乐到播放列表
        socket.on('addSong', ({song, rid}) => {
            const room = allData.roomsList[rid]
            room.playQueue.push(song)
            io.emit('playingListChange', {playingList: room.playQueue, rid})
        })
        // 播放音乐
        socket.on('playSong', ({song, rid}) => {
            const room = allData.roomsList[rid]
            if (song.fromSearch) {
                song.fromSearch = false
                song.index = room.playQueue.length
                room.playQueue.push(song)
                io.emit('playingListChange', {playingList: room.playQueue, rid})
            }
            room.curSong = song
            io.emit('playSong', {curSong: song, rid})
        })
        // 删除音乐
        socket.on('removeSong', ({song, rid}) => {
            const room = allData.roomsList[rid]
            room.playQueue.splice(song.index, 1)
            io.emit('playingListChange', {playingList: room.playQueue, rid})
        })
        // 清空搜索列表
        socket.on('clearSearchList', rid => {
            io.emit('getSearchList', [], rid)
        })
        // 清空播放列表
        socket.on('clearPlayingList', rid => {
            const room = allData.roomsList[rid]
            room.playQueue = []
            io.emit('playingListChange', {playingList: room.playQueue, rid})
        })
        socket.on('playNext', ({index, rid}) => {
            console.log(allData.roomsList[rid])
            const playQueue = allData.roomsList[rid].playQueue
            if (index >= playQueue.length - 1) {
                io.emit('playSong', {curSong: playQueue[0], rid})
            } else {
                io.emit('playSong', {curSong: playQueue[index+1], rid})
            }
        })
    })

    return io
}