import React from 'react'
import './styles/_roomlist.css'
import { Link } from 'react-router-dom'

class RoomList extends React.Component {
  renderRoomList({ online, curSong, id, roomName }) {
    return (
      <li key={id} className="room">
        <div className="room-info">
          <p className="room-name">{roomName}</p>
          <p className="room-des">online:{online}</p>
          <p className="room-des">正在播放:{curSong.singer}-{curSong.name}</p>
        </div>

        <button className="btn-room-enter">
          <Link to={`/room/${id}`}>进入房间</Link>
        </button>
      </li>
    )
  }
  render() {
    return <ul className="rooms">{this.props.roomsList.map(this.renderRoomList)}</ul>
  }
}

export default RoomList
