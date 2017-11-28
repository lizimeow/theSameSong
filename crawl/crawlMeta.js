/**
 * Created by zj-db0818 on 2017/11/26.
 */
const metaData = require('./item')
class crawlMeta {
    constructor() {
        if (new.target === crawlMeta) {
            throw new Error('本类不能实例化')
        }
    }

    formatterMetaData(data) {
        // todo 格式化爬虫返回的单条歌曲信息数据
        return data
    }

    encode(str) {
        return encodeURIComponent(str)
    }
}

module.exports = crawlMeta