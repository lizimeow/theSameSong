class player {
  constructor(elm) {
    this.playingQueue = []
    this.currentIndex = 0
    this.audioElm = this.createNode()
    elm.appendChild(this.audio)
  }
  createNode() {
    let audio = document.createElement('audio')
    audio.setAttribute('autoplay', true)
    return audio
  }
  add(data) {
    this.playingQueue.push(data)
    return true
  }
  remove(index) {
    this.playingQueue.splice(index,1)
    return true
  }
  next() {
    return this.playQueue[this.currentIndex++]
  }
  pre() {
    return this.playQueue[this.currentIndex--]
  }
  clear() {
    this.playQueue = []
    return true
  }
  play() {
    const data = this.playQueue[this.currentIndex]
    this.audio.src = 'http://' + data.url
    songName.innerText = data.url ? `当前播放：${data.name}` : `${data.name}没有版权`
  }
}

module.exports = player
