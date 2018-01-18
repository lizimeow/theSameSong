import React, { Component } from 'react'
// import socket from 'socket.io'
import axios from 'axios'
import { withRouter } from "react-router-dom"

import RoomList from './RoomList'
import SearchInput from './SearchInput'
import CreateRoom from './CreateRoom'
import './styles/_home.css'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      roomsList: []
    }
  }
  componentDidMount() {
    this.init()
  }
  async init() {
    const result = await axios.get('/rooms')
    const roomsList = Object.values(result.data.roomsList)
    console.log(roomsList)
    this.setState({
      roomsList
    })
  }

  // 查找房间  
  async search(value) {
    console.log('查找房间', value)
    const result = await axios.get(`/room?value=${value}`)
    const roomsList = Object.values(result.data.roomsList)
    this.setState({roomsList})
  }

  render() {
    return (<div className="Home">
      <SearchInput
        search={this.search.bind(this)}
        placeholder={'搜索: 房间名 or 房间号'}></SearchInput>
      <RoomList
        history={this.props.history}
        roomsList={this.state.roomsList}></RoomList>
      <CreateRoom history={this.props.history}></CreateRoom>
    </div>)
  }
}


export default withRouter(Home)