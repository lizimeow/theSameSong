/**
 * Created by zj-db0818 on 2017/11/26.
 */
const elm = document.getElementById('submit')
const inputElm = document.querySelector('.name-input')
const songName = document.querySelector('.song-name')
const audioElm = document.getElementById('audio')
const list = document.querySelector('.list')
const tip = document.querySelector('.tip')
const userNum = document.querySelector('.user')

const socket = io()
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
        return `<li data-url="${song.url}">${song.singer} - ${song.name}</li>`
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

list.addEventListener('click', (e) => {
    if (e.target.matches('li')) {
        // console.log('??', e.target.dataset.url)
        socket.emit('play', {url: e.target.dataset.url, name: e.target.innerText})
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