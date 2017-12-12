class SearchList {
    constructor(root, options) {
        this.searchList = []
        this._searchListNode = this.createSearchListNode(options.playCallback, options.addSongCallback)
        root.appendChild(this._searchListNode)
    }
    createSearchListNode(playCb, addSongCb) {
        const elm = document.createElement('ul')        
        elm.addEventListener('click', e => {
            if (e.target.matches('li')) {
                const {url, name} = e.target.dataset
                const current = true
                typeof playCb == 'function' && playCb({url, name, current})
                typeof addSongCb == 'function' && addSongCb({url, name, current})
            }
        
            if (e.target.matches('span')) {
              const pNode = e.target.parentElement
              const {url, name} = pNode.dataset
              typeof addSongCb == 'function' && addSongCb({url, name})
            }
        })
        return elm
    }
    updateSearchList() {
            const str = this.searchList.map(song => {
                return `<li data-url="${song.url}" data-name="${song.singer} - ${song.name}">${song.singer} - ${song.name} <span>添加</span></li>`
            }).join('')
            this._searchListNode.innerHTML = str
    }
    initList(data) {
        this.searchList = data
        this.updateSearchList()
    }
    clear() {
        this.searchList = []
        this.updateSearchList()
        return true
    }
}