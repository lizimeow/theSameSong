/**
 * Created by zj-db0818 on 2017/11/26.
 */
const crawlMeta = require('./crawlMeta')
const timeout = require('../libs/timeout')
const axios = require('axios')

class qqCrawl extends crawlMeta {
    constructor(curPage, songNum) {
        super()
        this.curPage = curPage
        this.songNum = songNum
    }
    
    async fetchData(name = '孙燕姿') {
        this.url = `https://c.y.qq.com/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&new_json=1&remoteplace=sizer.yqq.song_next&searchid=151387985106450562&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=${this.curPage}&n=${this.songNum}&w=${this.encode(name)}&g_tk=162512859&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0`
        // const result = await axios.get(this.url)
        const [err, symbol, result] = await timeout(axios.get(this.url), 3000)
        if (symbol) {
            console.log('fetchData => timeout')
            fetchData(name)
        } else if (err) {
            console.log(err)
        } else {
            const songs = await this.getSongsArray(result.data)
            // console.log(songs)
            return songs
        }
    }

    async getSongsArray(data) {
        const songList = data.data.song.list
        const keySongs = songList.map(v => {
            // console.log(v)
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
        // const result = await axios.get(url)
        const [err, symbol, result] = await timeout(axios.get(url), 6000)
        if (symbol) {
            console.log('getOneSongUrl => timeout')
            getOneSongUrl(uid)
        } else if (err) {
            console.log(err)
        } else {
            const [realUrl] = Object.values(result.data.url)
            // const test = axios.get(`http://${realUrl}`)
            // todo 在这里判断 realUrl 是否会被 forbidden, 从而决定是否获取另一个 url
            // 目前暂时都是获取第二个地址
            const filename = realUrl.match(/qq\.com\/(\w+)\.m4a/)[1]
            const anotherRealUrl = await this.getAnotherSongUrl(mid, filename)
            return anotherRealUrl
        }
    }
    async getAnotherSongUrl(mid, filename) {
        const guid = 123456
        const url = `https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?g_tk=1976982103&format=json&loginUin=0&hostUin=0&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&cid=205361747&uin=0&songmid=${mid}&filename=${filename}.m4a&guid=${guid}`
        // const result = await axios.get(url)
        const [err, symbol, result] = await timeout(axios.get(url), 3000)
        if (symbol) {
            console.log('getAnotherSongUrl => timeout')
            getAnotherSongUrl(mid, filename)
        } else if (err) {
            console.log(err)
        } else {
            const [song] = result.data.data.items
            const {vkey} = song
            const realUrl = `dl.stream.qqmusic.qq.com/${filename}.m4a?vkey=${vkey}&guid=${guid}`
            return realUrl
        }
    }
}
module.exports = qqCrawl
// const qq = new qqCrawl(1, 2)
// qq.fetchData()