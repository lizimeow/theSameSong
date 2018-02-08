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
                online: 0,
                curSong: {},
                playQueue: []
            }
            allData.commitlist[id] = [] 
            if (password) {
                allData.psw[id] = password.trim()
            } else {
                allData.roomsList[id].public = true
            }
            console.log('createroom=>psw', password)
            socket.emit('createRoom', id)
        })
        socket.on('getrooms', v => {
            // console.log('getrooms', allData.roomsList)
            io.emit('getrooms', allData.roomsList)            
        })
        socket.on('isPublic', v => {
            const room = allData.roomsList[v]
            if (room) {
                io.emit('isPublic', {roomName: room.roomName, ispublic: room.public, rid: v})
                console.log('是否为公开房间', room.public)
            }
        })
        // 用户进入房间
        socket.on('initRoom', (v) => {
            const room = allData.roomsList[v]
            const commitlist = allData.commitlist[v]
            if (room) {
                room.online++
                io.emit('online', {room, rid: v})
                socket.emit('initRoom', {room, commitlist})
                console.log('进入id:', v, '人数=>', room.online)
            }
        })
        
        // 用户离开房间
        socket.on('leaveRoom', (v) => {
            const room = allData.roomsList[v]
            if (room) {
                room.online--
                io.emit('online', {room, rid: v}) 
                console.log('离开的id:', v, '人数=>', room.online)
            }
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
            song.index = room.playQueue.length            
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
            room.playQueue = room.playQueue.map((v, i) => {
                v.index = i
                return v
            })
            io.emit('playingListChange', {playingList: room.playQueue, rid})
        })
        // 清空搜索列表
        socket.on('clearSearchList', rid => {
            io.emit('getSearchList', [], rid, true)
        })
        // 清空播放列表
        socket.on('clearPlayingList', rid => {
            const room = allData.roomsList[rid]
            room.playQueue = []
            io.emit('playingListChange', {playingList: room.playQueue, rid})
        })
        // 播放下一首
        socket.on('playNext', ({index, rid}) => {
            const room = allData.roomsList[rid]
            const playQueue = allData.roomsList[rid].playQueue
            if (!playQueue.length) {
                io.emit('playSong', {curSong: allData.roomsList[rid].curSong, rid})                
                return false                
            }
            // console.log('que', playQueue)
            if (index >= playQueue.length - 1) {
                console.log('0=>', playQueue[0])
                room.curSong = playQueue[0] 
                io.emit('playSong', {curSong: playQueue[0], rid})
            } else {
                const song = playQueue[parseInt(index,10)+1]
                console.log('index=>', index, song)                
                room.curSong = song
                io.emit('playSong', {curSong: song, rid})
            }
        })
        // 评论
        socket.on('commit', ({rid, ...info}) => {
            // console.log(rid, info)
            const commitlist = allData.commitlist[rid]
            const curSongName = `${info.curSong.singer}-${info.curSong.name}`
            const t = new Date()
            const time = t.toString().slice(0,-15)
            commitlist.unshift({
                username: info.username,
                commit: info.commit,
                curSongName,
                time
            })
            io.emit('commit', {commitlist, rid})
        })
        socket.on('done', ({rid, cls}) => {
            // let commitlist = allData.commitlist[rid]
            allData.commitlist[rid] = cls
            console.log(cls)
        })
    })

    return io
}