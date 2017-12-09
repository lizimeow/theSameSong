class SearchList {
    constructor(root, options) {
        this._rootElm = root
        this._playCallback = options.playCallback
        this._addSongCallback = options.addSongCallback
        this.list = []
    }
    render() {
        const str = this.list.map(song => {
            return `<li data-url="${song.url}" data-name="${song.singer} - ${song.name}">${song.singer} - ${song.name} <span>添加</span></li>`
        }).join('')
        this._rootElm.innerHTML = str
        this._rootElm.addEventListener('click', e => {
            if (e.target.matches('li')) {
                const {url, name} = e.target.dataset
                typeof this._playCallback == 'function' && this._playCallback({url, name})
            }
        
            if (e.target.matches('span')) {
              const pNode = e.target.parentElement
              const {url, name} = pNode.dataset
              typeof this._addSongCallback == 'function' && this._addSongCallback({url, name})
            }
        })
    }
    initList(data) {
        this.list = data
        this.render()
    }
    clear() {
        this.initList([])
    }
}