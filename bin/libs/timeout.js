/**
 * 
 * @param {number} delaytime 延时的时间 单位毫秒
 * @param {promise} promise 真实的请求

 * 
 * @return {array} [err, timeoutSymbol, data]
 */
async function timeout(promise, delaytime = 5000) {
    let result = ''
    let err = ''
    let symbol = ''
    const timeoutSymbol = Symbol('timeout')
    const timeoutTest = new Promise((resolve, reject) => {
        setTimeout(resolve, delaytime, timeoutSymbol)
    })
    try {
        const data = await Promise.race([timeoutTest, promise])
        // console.log(typeof data)
        if (typeof data === 'symbol') {
            symbol = timeoutSymbol
        } else {
            result = data
        }
    } catch (e) {
        err = e
    }
    return [err, symbol, result]
}

module.exports = timeout
