class player {
  constructor() {
    this.playingQueue = []
    this.currentIndex = 0
  },
  add(data) {
    this.playingQueue.push(data)
    return true
  },
  remove(index) {
    this.playingQueue.splice(index,1)
    return true
  }
  next() {
    return this.playQueue[this.currentIndex++]
  },
  pre() {
    return this.playQueue[this.currentIndex--]
  },
  clear() {
    this.playQueue = []
    return true
  },
}

module.exports = player
