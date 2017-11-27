const axios = require('axios')

const curPage = 1
const songNum = 12

function encode(str) {
    return encodeURIComponent(str)
}

async function fetchData(name = '孙燕姿') {
    const url = `https://c.y.qq.com/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&new_json=1&remoteplace=sizer.yqq.song_next&searchid=151387985106450562&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=${curPage}&n=${songNum}&w=${encode(name)}&g_tk=162512859&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0`
    const result = await axios.get(url)
    const songs = await getSongsArray(result.data)
    return songs
}

async function getSongsArray(data) {
    const songList = data.data.song.list
    const keySongs = songList.map(v => {
        const url = v.pay.pay_play ? '' : getOneSongUrl(v.mid)
        return {
            singer: v.singer.map(singer => singer.name).join(' '),
            name: v.name,
            url: url
        }
    })
    const urls = await Promise.all(keySongs.map(v => v.url))
    urls.forEach((v, i) => {
        keySongs[i].url = urls[i]
    })
    // console.log(keySongs)
    return keySongs
}

async function getOneSongUrl(mid) {
    const url = `https://c.y.qq.com/v8/fcg-bin/fcg_play_single_song.fcg?songmid=${mid}&tpl=yqq_song_detail&format=json&callback=getOneSongInfoCallback&g_tk=5381&jsonpCallback=getOneSongInfoCallback&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0`
    const result = await axios.get(url)
    const [realUrl] = Object.values(result.data.url)
    // const realUrl = Object.values(result.data.url)[0]
    return realUrl
}

module.exports = fetchData
// fetchData()
