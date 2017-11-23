const fs = require('fs')
const request = require('request')

const curPage = 1
const songNum = 20
// const fileName = `${singerName}.json`

// const url = `${HOST}/v8/fcg-bin/fcg_v8_toplist_cp.fcg${query}`;

function encode(str) {
    return encodeURIComponent(str)
}
function fetchData(name = '林俊杰') {
    let url = `https://c.y.qq.com/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&new_json=1&remoteplace=sizer.yqq.song_next&searchid=151387985106450562&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=${curPage}&n=${songNum}&w=${encode(name)}&g_tk=162512859&jsonpCallback=searchCallbacksong8555&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0`
    let requestOption = {
      url: url,
      method: 'GET'
    }
    let p = new Promise((resolve, reject) => {
      request(requestOption, (err, res, body) => {
          if (err) throw err
          const ptn = /(\{.*\})/gi
          const data = JSON.parse(body.match(ptn)[0])
          getRealUrlArray(data, resolve)
      })
    })
    // p.then((data) => {
    //     console.log(data)
    // })
    return p

}
function getRealUrlArray(data, resolve) {
    // fs.writeFile(fileName, '[', (err) => {
    //     if (err) throw err
    //     console.log(fileName, 'is created')
    // })

    const songlist = data.data.song.list
    const nameAndMids = songlist.map(v => {
        return {
            singer: v.singer.map(singer => singer.name).join(' '),
            name: v.name,
            mid: v.mid
        }
    })
    // resolve(nameAndMids)
    // let song = nameAndMids[0]
    // getSongUrl(song, resolve)
    const arr = []
    const allPromise = []
    for (const song of nameAndMids) {
        const tmp = new Promise((resolve, reject) => {
            getSongUrl(song, resolve)
        }).then((data) => {
            // resolve(data)
            // console.log(data)
            arr.push(data)
        })
        allPromise.push(tmp)
    }
    Promise.all(allPromise).then(() => { 
        // console.log(arr)
        resolve(arr)
    })
}
function getSongUrl(song, resolve) {
    const url = `https://c.y.qq.com/v8/fcg-bin/fcg_play_single_song.fcg?songmid=${song.mid}&tpl=yqq_song_detail&format=jsonp&callback=getOneSongInfoCallback&g_tk=5381&jsonpCallback=getOneSongInfoCallback&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0`
    const requestOption = {
        url: url,
        method: 'GET'
    }
        
    request(requestOption, (err, res, body) => {
        if (err) throw err
        const ptn = /(\{.*\})/gi
        const data = JSON.parse(body.match(ptn)[0])
        const realUrl = Object.values(data.url)[0]
        const one = {
            name: song.name,
            url: realUrl,
            singer: song.singer
        }
        resolve(one)
        // fs.appendFile(fileName, `${JSON.stringify(one)},\n`, (err) => {
        //     if (err) throw err
        // })
    })
}

module.exports = fetchData
// fetchData()
