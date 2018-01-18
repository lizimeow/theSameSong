import React, { Component } from 'react'
import './styles/_searchlist.css'

class PlayingList extends Component {
    //     constructor(props) {
    //     super(props)
    //     this.state = {
    //         lists: [{
    //             singer: '孙燕姿',
    //             name: '眼泪成诗',
    //             url: 'dl.stream.qqmusic.qq.com/C100003kSJ2R3wuiKJ.m4a?vkey=A9D19A85C8A8791B6A78C439649CAEF7131DEF1CFEA553AF7BB97EB71D69A77F04BFB5246A11A989BB8180F23907ECAC8B697092AE46F22A&guid=123456'
    //         },
    //         {
    //             singer: '孙燕姿',
    //             name: '当冬夜渐暖',
    //             url: 'dl.stream.qqmusic.qq.com/C100000Kdn4q23Pw6V.m4a?vkey=9C126A18BEC06AC4F282E162D7A3B6E280A7DB7E527B51BD070C6FE4EFAF62C960D6B160B68EA3C1A02010A8E3FFF4AA89DD106CE01E969B&guid=123456'
    //         },
    //         {
    //             singer: '孙燕姿',
    //             name: 'Honey Honey',
    //             url: 'dl.stream.qqmusic.qq.com/C100004aWZbE0cNWqG.m4a?vkey=5CF5B65E1F4B248BBE5FB6851DD1910564EE7EA5831ECDD16A0D50800505F8A7408CA2D71E8A8F5DDB95C944A61C15D42E98EDB2752DC2C5&guid=123456'
    //         },
    //         {
    //             singer: '孙燕姿 阿信 (五月天)',
    //             name: '第一天',
    //             url: 'dl.stream.qqmusic.qq.com/C100001Ss4AC2Ol5Yg.m4a?vkey=878BF67D5D2ABDEDE9A2398BDB4A9CD99EDBA5833405358DC05250CD6F695FE38C05F036A60B6202F36432D3B2BD8AE43092E28DC2822F62&guid=123456'
    //         }]
    //     }
    // }
    removeAndPlay(e) {
        if (e.target.matches('button')) {
            const btn = e.target
            const song = JSON.parse(btn.parentNode.dataset.song)
            song.index = btn.parentNode.dataset.index
            if (btn.value === 'remove') {
                this.props.removeSong(song)
            } else if (btn.value === 'play') {
                this.props.playSong(song)
            }
        }
    }
    renderLists(song, index) {
        const { singer, name, url } = song
        const songStr = JSON.stringify(song)
        return (<li className="music" key={url} data-song={songStr} data-index={index}>
            <span>{index} - {singer} — {name}</span>
            <button value="remove">删除</button>
            <button value="play">播放</button>
        </li>)
    }
    render() {
        return (
            <ul onClick={(e) => this.removeAndPlay(e)}>
                {this.props.lists.map(this.renderLists)}
            </ul>
        )
    }
}

export default PlayingList