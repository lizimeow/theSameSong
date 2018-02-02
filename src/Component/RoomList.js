import React from 'react'
import './styles/_roomlist.css'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

class RoomList extends React.Component {
  renderRoomList({ curSong, id, ...rest }) {
    const roomCls = classnames({
      'room': true,
      'room-lock': !rest.public,
      'room-open': rest.public
    })
    return (
      <li key={id} className={roomCls}>
        <div className="room-info">
          <p className="room-name">{rest.roomName}</p>
          <p className="room-des"> 房间号:{id}</p>
          {/* <p className="room-des">online:{rest.online}</p> */}
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
