/**
 * Created by zj-db0818 on 2017/11/26.
 */
const elm = document.getElementById('submit')
const inputElm = document.querySelector('.name-input')
const songName = document.querySelector('.song-name')
const audioElm = document.getElementById('audio')
const list = document.querySelector('.list')
const playingList = document.querySelector('.playing-list')
const tip = document.querySelector('.tip')
const userNum = document.querySelector('.user')

const socket = io()

const opts = {
  liClickCallback(data) {
    socket.emit('play', {url: data.url, name: data.name})
  },
  removeCallback(index) {
    socket.emit('removeSong', {index})
  }
}

let myPlayer = new Player(document.getElementById('myPlayer'),opts)


socket.on('onlineUser', (data) => {
    // console.log('data', data)
    userNum.innerText = '当前在线人数 : ' + data
})
socket.on('updatePlayingSongs',data=>{
  myPlayer.setPlayList(data)
})
socket.on('change', (data) => {
    elm.innerText = 'go!'
    if (!data.length) {
        tip.innerText = 'Not fonud anything...'
        return false
    }
    tip.innerText = 'click the song below to play!!!'
    const str = data.map(song => {
        return `<li data-url="${song.url}" data-name="${song.singer} - ${song.name}">${song.singer} - ${song.name} <span style="color:red">添加</span></li>`
    }).join('')
    list.innerHTML = str
})
socket.on('changePlay', (data) => {
    console.log('data', data)
    myPlayer.play(data)
})
//
socket.on('addSong', data=>{
  myPlayer.add(data)
})
socket.on('removeSong',index=>{
  myPlayer.remove(index)
})
list.addEventListener('click', (e) => {
    if (e.target.matches('li')) {
        // console.log('??', e.target.dataset.url)
        socket.emit('play', {url: e.target.dataset.url, name: e.target.dataset.name})
    }

    if (e.target.matches('span')) {
      const pNode = e.target.parentElement
      socket.emit('addSong',{url: pNode.dataset.url, name: pNode.dataset.name})
    }
})
elm.addEventListener('click', (e) => {
    if (elm.innerText === 'wait...') {
        console.log('no')
        return false
    }
    const name = inputElm.value
    socket.emit('submit', name)
    elm.innerText = 'wait...'
})
