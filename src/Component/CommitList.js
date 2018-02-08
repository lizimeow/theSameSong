import React, { Component } from 'react'
import './styles/_commit.css'

class CommitList extends Component {
    renderLists(v, i) {
        return (
            <div key={i} className="cl">
                <div className="cl-span">
                    <span>{v.username}</span>
                    <span>[{v.curSongName}]</span>
                    <span className="cl-time">{v.time}</span>
                </div>
                <p>{v.commit}</p>
            </div>
        )
    }

    render() {
        // console.log(this.props)
        return (
            <div className="CommitList">
                <p className="cl-title">聊天区</p>
                <div className="cl-box">{this.props.commitlist.map(this.renderLists)}</div>
            </div>
        )
    }
}



export default CommitList