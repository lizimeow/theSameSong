/**
 * Created by zj-db0818 on 2017/11/26.
 */
const qqCrawl = require('../crawl/qqCrawl')

let qq = new qqCrawl(1,10);

test('can get data', async () => {
    const data = await qq.fetchData('张杰')
    console.log(data)
    expect(data.length).not.toEqual(0)
})
