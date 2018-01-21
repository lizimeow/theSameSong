const rooms = require('./rooms')
const login = require('./login')

module.exports = {
    hasRoomData: rooms.hasRoomData,
    getRoom: rooms.getRoom,
    getRooms: rooms.getRooms,
    addRoom: rooms.addRoom,
    searchRoom: rooms.searchRoom,
    login: login,
    getCurSong: rooms.getCurSong,
    getPublic: rooms.getPublic,
}