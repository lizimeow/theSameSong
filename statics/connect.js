class Connect {
  constructor(socket) {
    this.socket = socket
  }
  onlineUser(num){
    userNum.innerText = '当前在线人数 : ' + data
  }
  change(data) {
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
  }
}

// module.exports = Connect
