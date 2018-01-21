import React from 'react'
import ReactModal from 'react-modal'
// import axios from 'axios'
import './styles/_createroom.css'

class CreateRoom extends React.Component {
    constructor() {
      super();
      this.state = {
        showModal: false
      };
  
      this.handleOpenModal = this.handleOpenModal.bind(this);
      this.handleCloseModal = this.handleCloseModal.bind(this);
      this.createRoom = this.createRoom.bind(this);
    }
    handleOpenModal() {
      this.setState({ showModal: true })
    }
  
    handleCloseModal() {
      this.setState({ showModal: false })
    }
    createRoom(info) {
      const io = require('socket.io-client')
      const socket = io()
      socket.emit('createRoom', info)
      socket.on('createRoom', id => {
        socket.disconnect()
        this.props.history.push(`/room/${id}`)
      })
    }
    render() {
      return (
        <div>
          <div className="create" onClick={this.handleOpenModal}> + </div>
          <ReactModal
            isOpen={this.state.showModal}
            ariaHideApp={false}
          >
            <RoomInfoForm
              createRoom={this.createRoom}
              closeModal={this.handleCloseModal}></RoomInfoForm>
            <div className="close" onClick={this.handleCloseModal}>X</div>
          </ReactModal>
        </div>
      )
    }
  }
  
  class RoomInfoForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        roomName: '',
        password: '',
      }
  
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }
  
    handleChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }
  
    async handleSubmit(event) {
      const { roomName, password } = this.state
      this.props.closeModal()
      this.props.createRoom({roomName, password})
      event.preventDefault()
    }
    render() {
      return (
        <div className="form-room">
          <label>
            <span>房间名: </span>
            <input type="text"
              name="roomName"
              value={this.state.roomName}
              onChange={this.handleChange} />
          </label>
          <label>
            <span>密码: </span>
            <input type="text"
              name="password"
              placeholder="不输入密码则为公开房间"
              value={this.state.password}
              onChange={this.handleChange} />
          </label>
          <button className="btn-submit" onClick={this.handleSubmit}>确定</button>
        </div>
      )
    }
  }
  export default CreateRoom
