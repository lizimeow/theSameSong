import React, { Component } from 'react'
import SearchInput from './SearchInput'
import { Link } from 'react-router-dom'
import ReactModal from 'react-modal'
import plyr from 'plyr'
import classnames from 'classnames'


import SearchList from './SearchList'
import PlayingList from './PlayingList'
import Commit from './Commit'
import CommitList from './CommitList'
// import Barrage from './Barrage'

import './styles/_room.css'
import './styles/plyroverride.css'
import axios from 'axios'
const io = require('socket.io-client')
// const socket = io('http://192.168.33.249:3002')
const socket = io()


class Myplayer extends Component {
  componentDidMount() {
    const audio = document.querySelector('#audio')
    plyr.setup(audio, {})
    // const url = 'dl.stream.qqmusic.qq.com/C100001Ss4AC2Ol5Yg.m4a?vkey=878BF67D5D2ABDEDE9A2398BDB4A9CD99EDBA5833405358DC05250CD6F695FE38C05F036A60B6202F36432D3B2BD8AE43092E28DC2822F62&guid=123456'
    // audio.src = `//${url}`
    audio.onended = (e) => {
      console.log('end', this.props.curSong)
      socket.emit('playNext', { index: this.props.curSong.index, rid: this.props.rid })
    }
  }
  render() {
    let index = '',
    singer = '',
    url = '',
    name = '';
    if (this.props.curSong) {
      index = this.props.curSong.index
      singer = this.props.curSong.singer
      name = this.props.curSong.name
      url = this.props.curSong.url ? '//' + this.props.curSong.url : ''
    } 
    // else {
    //   index = this.state.curSong.index || 0
    //   singer = this.state.curSong.singer
    //   name = this.state.curSong.name,
    //   url = '//' + this.state.curSong.url
    // }
    return (
      <div className="Myplayer">
        <p>当前正在播放{index===-1?0:index} - {singer} - {name}</p>
        {/* <audio id="audio" ref="audio" autoPlay controls>
          <source src={this.props.curSong.url ? '//' + this.props.curSong.url : ''} type="audio/mp3" />
        </audio> */}
        <audio
          id="audio"
          src={url}
          ref="audio"
          controls autoPlay />
      </div>
    )
  }

}

class PswForm extends Component {
  constructor(props) {
    super(props)
    const roomId = window.location.pathname.match(/\/room\/(.*?)(\/|$)/)[1]
    this.state = {
      roomId,
      password: '',
      roomName: ''
    }
    // this.props.closeModal()
    this.init(roomId)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  async init(roomId) {
    const result = await axios.get(`/room/${roomId}`)
    console.log('pswForm => room', result.data.room)
    this.setState({ roomName: result.data.room.roomName })
    if (result.data.room.public) {
      this.props.closeModal()
    } else {
      const lrid = localStorage.getItem('roomId')
      if (lrid === roomId) {
        this.props.closeModal()
      }
    }
  }

  handleChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    });
  }

  async handleSubmit(event) {
    const { roomId, password } = this.state
    const result = await axios.post('/login', {
      roomId,
      password
    })
    console.log('success?', result.data)
    if (result.data.success) {
      this.props.closeModal()
      localStorage.setItem('roomId', roomId)
    } else {
      alert('密码错误请重试')
    }
    event.preventDefault()
  }
  render() {
    return (
      <div className="form-psw">
        <label>
          <span>房间名: </span>
          <p>{this.state.roomName}</p>
        </label>
        <label>
          <span>房间号: </span>
          <p>{this.state.roomId}</p>
        </label>
        <label>
          <span>密码: </span>
          <input type="text"
            name="password"
            placeholder="请输入密码"
            value={this.state.password}
            onChange={this.handleChange} />
        </label>
        <button className="btn-submit" onClick={this.handleSubmit}>确定</button>
      </div>
    )
  }
}

class Room extends Component {
  constructor(props) {
    super(props)
    this.state = {
      room: {},
      tip: '',
      searchList: [],
      playingList: [],
      curSong: {},
      showModal: true,
      commitlist: [],
      //   commitlist: [
      //     {username: '我叫嘻嘻嘻', commit: '我超喜欢这首歌!', curSongName: '林宥嘉-天真有邪', time:'Sat Jan 20 2018 19:31:51'},
      //     {username: 'lizimeow', commit: '我也超喜欢这首歌_(:зゝ∠)_', curSongName: '林宥嘉-天真有邪', time:'Sat Jan 20 2018 19:21:40'},
      //     {username: '猜猜', commit: '还行吧', curSongName: '林宥嘉-残酷月光', time:'Sat Jan 20 2018 19:11:00'},
      // ],
      barrage: {
        // commit: 'xixixi',
        // username: 'hksdfhsdj',
      }
    }
  }
  componentDidMount() {
    this.init()
    // 获取搜索列表
    socket.on('getSearchList', (list, rid, clear = false) => {
      if (rid === this.state.room.id) {
        if (!list.length) {
          console.log('nonono')
          this.setState({
            tip: 'Not fonud anything...'
          })
        } else {
          this.setState({
            tip: ''
          })
        }
        if (clear) {
          this.setState({
            tip: ''
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
        console.log('xiayishou?', this.state.curSong)
      }
    })
    // 在线人数
    socket.on('online', ({ room, rid }) => {
      if (rid === this.state.room.id) {
        console.log(room)
        this.setState({ room })
      }
    })
    // 评论
    socket.on('commit', ({ commitlist, rid }) => {
      if (rid === this.state.room.id) {
        console.log('commitlist', commitlist)
        const barrage = {
          commit: commitlist[0].commit,
          username: commitlist[0].username
        }
        this.setState({
          commitlist,
          barrage,
        })
      }
    })
  }
  componentWillUnmount() {
    if (!this.state.showModal) {
      socket.emit('leaveRoom', this.state.room.id)
    }
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
    // console.log('result', result.data.room)
    this.setState({
      room: result.data.room,
      curSong: result.data.room.curSong,
      playingList: result.data.room.playQueue,
      commitlist: result.data.commitlist
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
  handleChange(event) {
    this.setState({
      password: event.target.value
    })
  }
  handleCloseModal() {
    this.setState({ showModal: false })
  }
  commit({ username, commit }) {
    socket.emit('commit', {
      username,
      commit,
      rid: this.state.room.id,
      curSong: this.state.curSong
    })
  }
  done(cls) {
    socket.emit('done', { cls, rid: this.state.room.id })
    // this.setState({commitlist: cls})
  }
  animationDone() {
    this.setState({barrage:{}})
  }

  render() {
    const isOpacity = classnames({
      'isopa': this.state.showModal
    })
    return (
      <div className="Room">
        <header className="header">
          <Link to='/' className="to-home"></Link>
          <div className="header-info">
            <span className="name-room">{this.state.room.roomName}</span>
            {/* <div className="number-online">当前在线人数:{this.state.room.online}</div> */}
          </div>
          <SearchInput
            search={this.search.bind(this)}
            placeholder={'搜索歌曲关键字'}></SearchInput>
        </header>

        <p className="tip">{this.state.tip}</p>

        <div>
          <span className="list-name">搜索列表</span>
          <button className="btn-clear"
            onClick={this.clearSearchList.bind(this)}>清空搜索列表</button>
          <SearchList
            addSong={this.addSong.bind(this)}
            playSong={this.playSong.bind(this)}
            lists={this.state.searchList}>
          </SearchList>
        </div>

        <div className={isOpacity}>
          <Myplayer
            rid={this.state.room.id}
            curSong={this.state.curSong}>
          </Myplayer>
        </div>

        <div>
          <span className="list-name">播放列表</span>
          <button className="btn-clear"
            onClick={this.clearPlayingList.bind(this)}>清空播放列表</button>
          <PlayingList
            playSong={this.playSong.bind(this)}
            removeSong={this.removeSong.bind(this)}
            lists={this.state.playingList}>
          </PlayingList>
        </div>

        <CommitList commitlist={this.state.commitlist}></CommitList>
        <Commit commit={this.commit.bind(this)}></Commit>

        <ReactModal
          isOpen={this.state.showModal}
          ariaHideApp={false}>
          <PswForm
            closeModal={this.handleCloseModal.bind(this)}></PswForm>
          <div className="close"><Link to="/">X</Link></div>
        </ReactModal>

        {/* <Barrage
          animationDone={this.animationDone.bind(this)}
          done={this.done.bind(this)}
          barrage={this.state.barrage}></Barrage> */}

      </div>
    )
  }
}

export default Room
