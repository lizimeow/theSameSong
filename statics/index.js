/**
 * Created by zj-db0818 on 2017/11/26.
 */
const searchBtn = document.getElementById('submit')
const inputElm = document.querySelector('.name-input')
const songName = document.querySelector('.song-name')
const audioElm = document.getElementById('audio')
const playingList = document.querySelector('.playing-list')
const tip = document.querySelector('.tip')
const userNum = document.querySelector('.user')
const clearPlayListBtn = document.querySelector('#clearPlayList')
const searchPlayListBtn = document.querySelector('#searchPlayList')

const socket = io()

const opts = {
  liClickCallback(data) {
    socket.emit('play', data)
  },
  removeCallback(index) {
    socket.emit('removeSong', {index})
  }
}
const searchOpts = {
    playCallback(data) {
        socket.emit('play', data)
      },
    addSongCallback(data) {
        socket.emit('addSong', data)
    }
}

const myPlayer = new Player(document.getElementById('myPlayer'), opts)
const mySearchList = new SearchList(document.querySelector('.search-list'), searchOpts)


socket.on('onlineUser', (data) => {
    // console.log('data', data)
    userNum.innerText = '当前在线人数 : ' + data
})
socket.on('updatePlayingSongs', data => {
  myPlayer.setPlayList(data)
})
socket.on('getSearchList', list => {
    searchBtn.innerText = 'go!'
    if (!list && !list.length) {
        tip.innerText = 'Not fonud anything...'
        return false
    }
    mySearchList.initList(list)
})
socket.on('changePlay', (data) => {
    // console.log('data111', data)
    myPlayer.play(data)
})
//
socket.on('addSong', data => {
    myPlayer.add(data)
})
socket.on('removeSong', data => {
    data.all ? myPlayer.clear() : myPlayer.remove(data.index)
})
socket.on('clearSearchList', () => {
    mySearchList.clear()
})

searchBtn.addEventListener('click', (e) => {
    if (searchBtn.innerText === 'wait...') {
        console.log('no')
        return false
    }
    const name = inputElm.value
    socket.emit('submit', name)
    searchBtn.innerText = 'wait...'
})

clearPlayListBtn.addEventListener('click', e => {
    socket.emit('removeSong', {index: 0, all: true})
})

searchPlayListBtn.addEventListener('click', e => {
    socket.emit('clearSearchList')
})

