import React, { Component } from 'react'
import SearchInput from './SearchInput'
import { Link } from 'react-router-dom'

import SearchList from './SearchList'
import PlayingList from './PlayingList'
import './styles/_room.css'
import axios from 'axios'
const io = require('socket.io-client')
const socket = io()

class Room extends Component {
  constructor(props) {
    super(props)
    this.state = {
      room: {},
      tip: '',
      searchList: [],
      playingList: [],
      curSong: {},
    }
  }
  componentDidMount() {
    //   const curSong = {
    //     singer: '孙燕姿 阿信 (五月天)',
    //     name: '第一天',
    //     url: 'dl.stream.qqmusic.qq.com/C100001Ss4AC2Ol5Yg.m4a?vkey=878BF67D5D2ABDEDE9A2398BDB4A9CD99EDBA5833405358DC05250CD6F695FE38C05F036A60B6202F36432D3B2BD8AE43092E28DC2822F62&guid=123456'
    // }
    // this.setState({curSong})
    this.init()
    // 获取搜索列表
    socket.on('getSearchList', (list, rid) => {
      if (rid === this.state.room.id) {
        if (!list.length) {
          console.log('nonono')
          this.setState({
            tip: 'Not fonud anything...'
          })
        }
        console.log('searchlist', list)
        this.setState({ searchList: list })
      }
    })
    // 删除&添加都会导致播放列表改变
    socket.on('playingListChange', ({ playingList, rid }) => {
      if (rid === this.state.room.id) {
        this.setState({ playingList })
      }
    })
    // 播放歌曲
    socket.on('playSong', ({ curSong, rid }) => {
      if (rid === this.state.room.id) {
        this.setState({ curSong })
      }
    })

    socket.on('online', ({room, rid}) => {
      if (rid === this.state.room.id) {
        console.log(room)
        this.setState({ room })
      }      
    })

  }
  componentWillUnmount() {
    socket.emit('leaveRoom', this.state.room.id)
  }
  async init() {
    const roomId = window.location.pathname.match(/\/room\/(.*?)(\/|$)/)[1]
    socket.emit('initRoom', roomId)
    // 获取该房间数据
    const result = await axios.get(`/room/${roomId}`)
    /* test */
    //  const room = {
    //   id: 1,
    //   roomName: '房间名233',
    //   online: 1,
    //   curSong: {},
    //   playQueue: []
    // }
    // this.setState({room})
    /* test */
    console.log('result', result.data.room)
    this.setState({
      room: result.data.room,
      curSong: result.data.room.curSong,
      playingList: result.data.room.playQueue
    })
  }
  search(name) {
    // 搜索音乐
    console.log('搜索音乐', name)
    console.log('rid', this.state.room.id)
    socket.emit('searchSong', { name, rid: this.state.room.id })
  }
  addSong(song) {
    socket.emit('addSong', { song, rid: this.state.room.id })
  }
  playSong(song) {
    socket.emit('playSong', { song, rid: this.state.room.id })
  }
  removeSong(song) {
    socket.emit('removeSong', { song, rid: this.state.room.id })
  }
  clearSearchList() {
    socket.emit('clearSearchList', this.state.room.id)
  }
  clearPlayingList() {
    socket.emit('clearPlayingList', this.state.room.id)
  }
  // tohome() {
  //   socket.emit('leaveRoom', this.state.room.id)
  // }

  render() {
    return (
      <div className="Room">
        <header className="header">
          <Link to='/' className="to-home"></Link>
          <div className="header-info">
            <span className="name-room">{this.state.room.roomName}</span>
            <div className="number-online">当前在线人数:{this.state.room.online}</div>
          </div>
          <SearchInput
            search={this.search.bind(this)}
            placeholder={'搜索歌曲关键字'}></SearchInput>
        </header>

        <p className="tip">{this.state.tip}</p>

        <div>
          <span className="list-name">搜索列表</span>
          <button className="btn-clear" 
          onClick={() => this.clearSearchList}>清空搜索列表</button>
          <SearchList
            addSong={this.addSong.bind(this)}
            playSong={this.playSong.bind(this)}
            lists={this.state.searchList}>
          </SearchList>
        </div>
        <Myplayer
          rid={this.state.room.id}
          curSong={this.state.curSong}>
        </Myplayer>
        <div>
        <span className="list-name">播放列表</span>
          <button className="btn-clear" 
          onClick={() => this.clearPlayingList}>清空播放列表</button>
          <PlayingList
            playSong={this.playSong.bind(this)}
            removeSong={this.removeSong.bind(this)}
            lists={this.state.playingList}>
          </PlayingList>
        </div>

      </div>
    )
  }
}


class Myplayer extends Component {
  componentDidMount() {
    const audio = document.querySelector('#audio')
    console.log(this.props)
    // const url = 'dl.stream.qqmusic.qq.com/C100001Ss4AC2Ol5Yg.m4a?vkey=878BF67D5D2ABDEDE9A2398BDB4A9CD99EDBA5833405358DC05250CD6F695FE38C05F036A60B6202F36432D3B2BD8AE43092E28DC2822F62&guid=123456'
    // audio.src = `//${url}`
    if (this.props.curSong.url) {
      audio.src = `//${this.props.curSong.url}`
    }
    audio.onended = (e) => {
      console.log(this.props.curSong)
      socket.emit('playNext', { index: this.props.curSong.index || 0, rid: this.props.rid })
    }
  }
  render() {
    return (
      <div className="Myplayer">
        <p>当前正在播放{this.props.curSong.index || 0} - {this.props.curSong.singer} - {this.props.curSong.name}</p>
        <audio
          id="audio"
          src={this.props.curSong.url ? '//' + this.props.curSong.url : ''}
          ref="audio"
          controls autoPlay />
      </div>
    )
  }

}


export default Room
