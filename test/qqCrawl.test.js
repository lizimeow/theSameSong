/**
 * Created by zj-db0818 on 2017/11/26.
 */
const qqCrawl = require('../crawl/qqCrawl')

let qq = new qqCrawl(1,10);
(async function () {
    let data = await qq.fetchData('张杰')
    if (data.length === 10) {
        console.log('success')
    } else {
        console.error('error')
    }
})()