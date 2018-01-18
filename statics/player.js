class Player {
  constructor(elm, options={}) {
    this.rootElm = elm
    this.playingQueue = []
    this.currentIndex = 0
    this.audioElm = this.createAudioNode()
    this.rootElm.appendChild(this.audioElm)
    this.playCb = options.liClickCallback
    this.isChangeLength = false
    this.currentSong = ''

    this._playListNode = this.createPlayListNode(this.playCb, options.removeCallback)
    this.rootElm.appendChild(this._playListNode)

    this._nameElement = this.createNameNode()
    this.rootElm.appendChild(this._nameElement)
  }
  createAudioNode() {
    let audio = document.createElement('audio')
    audio.setAttribute('autoplay', true)
    audio.setAttribute('controls', true)
    // audio.setAttribute('muted', true)
    audio.onended = (e) => {
      this.next()
    }
    return audio
  }
  createPlayListNode(cb, removeCallback) {
    let elm = document.createElement('ul')
    elm.addEventListener('click',(e) => {
      if (e.target.matches('li')) {
        const {url, name, index} = e.target.dataset
        this.currentIndex = index
        typeof cb == 'function' && cb({url, name, index})
      }
      if (e.target.matches('span')) {
        const index = e.target.dataset.index
        console.log('player remove' + index)
        removeCallback(index)
      }
    })
    return elm
  }
  createNameNode() {
    let elm = document.createElement('div')
    return elm
  }
  updatePlayList() {
    const str = this.playingQueue.map((song, index) => {
        return `<li data-url="${song.url}" data-name="${song.name}" data-index="${index}">${index}.${song.name}<span data-index="${index}" style="color:red">删除</span></li>`
    }).join('')
    this._playListNode.innerHTML = str
  }
  add(data) {
    // if (data.current) {
    //   this.currentIndex = this.playingQueue.length
    //   // data.current = false
    // }
    this.playingQueue.push(data)
    this.updatePlayList()
    return true
  }
  remove(index) {
    this.playingQueue.splice(index, 1)
    this.updatePlayList()
    this.isChangeLength = true;
    return true
  }
  next() {
    if (this.isChangeLength) {
      this.playingQueue.forEach((v, i) => {
        if (v.url === this.currentSong.url) {
          this.currentIndex = i
        }
      })
      this.isChangeLength = false
    }
    this.currentIndex++
    console.log('current:', this.currentIndex)
    if (this.currentIndex >= this.playingQueue.length) {
      this.currentIndex = 0
    }
    const song = this.playingQueue[this.currentIndex]
    this.playCb({...song, index: this.currentIndex})
    // this.play()
  }
  pre() {
    this.currentIndex--
    this.play()
  }
  clear() {
    this.playingQueue = []
    this.updatePlayList()
    return true
  }
  setPlayList(data) {
    this.playingQueue = data
    this.updatePlayList()
  }
  play(song) {
    console.log('song', song)
    if (song.current) {
      this.currentIndex = this.playingQueue.length
      song.current = false
    } else if (song.index > -1) {
      this.currentIndex = song.index
    }
    const data = song || this.playingQueue[this.currentIndex]
    this.currentSong = data
    this.audioElm.src = 'http://' + data.url
    // songName.innerText = data.url ? `当前播放：${data.name}` : `${data.name}没有版权`
    this._nameElement.innerText = data.url ? `当前播放：${data.name}` : `${data.name}没有版权`
  }
}
// module.exports = Player
