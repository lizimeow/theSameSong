const allData = require('../socket/data')

function login(req, res, next) {
    console.log(req.body)
    const { roomId, password } = req.body
    const psw = allData.psw[roomId]
    if (psw == password.trim()) {
        res.json({ success:true })
        console.log(1)
    } else {
        res.json({ success:false })
    }
}
module.exports = login
