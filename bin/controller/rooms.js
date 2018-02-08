const allData = require('../socket/data')

function addRoom(req, res, next) {
    console.log(req.body)
    const { roomName, password } = req.body
    const id = shortid.generate()
    // allData.roomsList[id] = {
    //     id,
    //     roomName,
    //     password,
    //     online: 1,
    //     curSong: '',
    //     playQueue: []
    // }
    res.json({ id })
}
function getRoom(req, res) {
    res.json({
        room: req.room,
        commitlist: req.commitlist
    });
}
function hasRoomData(req, res, next) {
    const room = allData.roomsList[req.params.id]
    const commitlist = allData.commitlist[req.params.id]
    if (room) {
        // console.log('ID:', req.params.id, allData.roomsList[req.params.id])
         req.room = room
         req.commitlist = commitlist
         next()
    } else {
        const e = new Error('不存在的房间号' + req.params.id)
        e.status = 404
        next(e)
    }
}
function getRooms(req, res) {
    res.json({
        roomsList: allData.roomsList
    })
}
function searchRoom(req, res) {
    const value = req.query.value
    const result = {}
    if (value) {
        Object.values(allData.roomsList).forEach(v => {
            if (v.id === value || v.roomName.indexOf(value)!==-1) {
                result[v.id] = v
            }
        })
        res.json({
            roomsList: result
        })
    } else {
        res.json({
            roomsList: allData.roomsList
        })
    }
}
function getCurSong(req, res) {
    const rid = req.query.rid
    
}
function getPublic(req, res) {
    const room = allData.roomsList[req.params.id]   
    res.json({
        public: room.public 
    })
}

module.exports = {
    addRoom,
    getRoom,
    getRooms,
    hasRoomData,
    searchRoom,
    getPublic,
    getCurSong,
}