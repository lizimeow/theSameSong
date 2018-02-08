import React, { Component } from 'react'
import './styles/_commit.css'

class Commit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            commit: ''
        }
    }
    handleChange(event) {
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({
          [name]: value
        })
    }
    commit() {
        const {username, commit} = this.state
        if (username) {
            if (username.length < 1) {
                alert('用户名要大于1个字符哦~')
                return false
            } else {
                localStorage.setItem('username', username)
            }
        }
        if (!commit) {
            alert('评论不能为空哦~')
            return false
        }
        const name = localStorage.getItem('username')
        this.props.commit({
            username: username || name,
            commit
        })
        // alert('评论成功')
        this.setState({commit: ''})
    }

    render() {
        return (
            <div className="Commit">
                <UserName 
                username={this.state.username}
                handleChange={this.handleChange.bind(this)}>
                </UserName>
                <textarea 
                name="commit"                    
                value={this.state.commit}
                onChange={this.handleChange.bind(this)}                
                placeholder="在这里输入你想评论的话(＾－＾)" 
                />
                <button onClick={this.commit.bind(this)} className="btn-commit">提交</button>
            </div>
        )
    }
}
class UserName extends Component {
    init(name) {
        if (name) {
            return (
                <label>
                    <span>用户名:</span>
                    <span className="commit-name">{name}</span>
                </label>
            )
        } else {
            return (
                <label>
                    <span>用户名:</span>
                    <input type="text" 
                    name="username"
                    placeholder="给自己取个昵称吧~" 
                    value={this.props.username}
                    onChange={this.props.handleChange} />
                </label>
            )
        }
    }
    render() {
        const name = localStorage.getItem('username')
        return this.init(name)
    }
}



export default Commit