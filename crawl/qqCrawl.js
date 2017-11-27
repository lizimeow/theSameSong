/**
 * Created by zj-db0818 on 2017/11/26.
 */
let crawlMeta = require('./crawlMeta')
const axios = require('axios')

class qqCrawl extends crawlMeta {
    constructor(curPage, songNum) {
        super()
        this.curPage = curPage
        this.songNum = songNum
    }

    async fetchData(name = '孙燕姿') {
        this.url = `https://c.y.qq.com/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&new_json=1&remoteplace=sizer.yqq.song_next&searchid=151387985106450562&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=${this.curPage}&n=${this.songNum}&w=${this.encode(name)}&g_tk=162512859&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0`
        let result = await axios.get(this.url)
        let songs = await this.getSongsArray(result.data)
        return songs
    }

    async getSongsArray(data) {
        const songList = data.data.song.list
        const keySongs = songList.map(v => {
            const url = v.pay.pay_play ? '' : this.getOneSongUrl(v.mid)
            return {
                singer: v.singer.map(singer => singer.name).join(' '),
                name: v.name,
                url: url,
            }
        })
        const urls = await Promise.all(keySongs.map(v => v.url))
        urls.forEach((v, i) => {
            keySongs[i].url = urls[i]
        })
        return keySongs
    }

    async getOneSongUrl(mid) {
        const url = `https://c.y.qq.com/v8/fcg-bin/fcg_play_single_song.fcg?songmid=${mid}&tpl=yqq_song_detail&format=json&callback=getOneSongInfoCallback&g_tk=5381&jsonpCallback=getOneSongInfoCallback&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0`
        const result = await axios.get(url)
        const [realUrl] = Object.values(result.data.url)
        return realUrl
    }
}
module.exports = qqCrawl