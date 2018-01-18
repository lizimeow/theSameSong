const rooms = require('./rooms')

module.exports = {
    hasRoomData: rooms.hasRoomData,
    getRoom: rooms.getRoom,
    getRooms: rooms.getRooms,
    addRoom: rooms.addRoom,
    searchRoom: rooms.searchRoom,
}