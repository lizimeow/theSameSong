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
let playQueue = {
  _list : [],
  get list() {
    return this._list
  },
  set list(data) {
    this._list = data
    const str = this._htmlText(data)
    playingList.innerHTML = str
    return true
  },
  _htmlText(data) {
    const str = data.map((song,index) => {
        return `<li data-url="${song.url}" data-index="${index}">${index}.${song.singer} - ${song.name}<span style="color:red">删除</span></li>`
    }).join('')
    return str
  }
};


socket.on('onlineUser', (data) => {
    // console.log('data', data)
    userNum.innerText = '当前在线人数 : ' + data
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
    // songName.innerText = data.name
    // audio.src = 'http://'+data.url;
})
function play(data) {
    audio.src = 'http://' + data.url
    songName.innerText = data.url ? `当前播放：${data.name}` : `${data.name}没有版权`
}
socket.on('changePlay', (data) => {
    console.log('data', data)
    play(data)
})

socket.on('updatePlayingSongs', data=>{
  playQueue.list = data

})

list.addEventListener('click', (e) => {
    if (e.target.matches('li')) {
        // console.log('??', e.target.dataset.url)
        socket.emit('play', {url: e.target.dataset.url, name: e.target.innerText})
    }

    if (e.target.matches('span')) {
      const pNode = e.target.parentElement
      socket.emit('addSong',{url: pNode.dataset.url, name: pNode.dataset.name})
    }
})


playingList.addEventListener('click', (e) => {
    if (e.target.matches('li')) {
        // console.log('??', e.target.dataset.url)
        socket.emit('play', {url: e.target.dataset.url, name: e.target.innerText})
    }

    if (e.target.matches('span')) {
      const pNode = e.target.parentElement
      socket.emit('removeSong', {index: pNode.dataset.index})
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

audioElm.onended = function(e) {
  const src = e.target.src
  let index = 0;
  for (let i; i< playQueue.list.length ;i++) {
    if (src === playQueue[i].url) {
      index =i
      break
    }
  }
  play(playQueue.list[index+1])
  console.log(e);
}
