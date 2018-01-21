import React, { Component } from 'react'
import './styles/_barrage.css'

class Barrage extends Component {
    componentDidUpdate() {
        console.log(this.props.commitlist)
        if (this.props.commitlist.length) {
            Object.keys(this.refs).forEach(v => {
                this.animation(this.refs[v], v)
            })
        }
    }
    animation(barrage, v) {
        let timer = {}
        const clientH = window.innerHeight
        const clientW = window.innerWidth
        const offsetTop = Math.round(window.pageYOffset)
        timer[v] = {
            top: 20 + parseInt(Math.random() * (offsetTop + clientH - 50), 10),
            baW: barrage.clientWidth + 5,
            barrage,
            left: - barrage.clientWidth - 15 /*+ parseInt(2 + Math.random()*30, 10)*/,
            speed: 3/*parseInt(2 + Math.random()*3, 10)*/,
            animation: function(done) {
                let test = ''
                clearInterval(test)
                test = setInterval(() => {
                    this.left += 3
                    // console.log('baraage=>v', v, this.left)
                    this.barrage.style.left = this.left + 'px'
                    if (this.left > clientW) {
                        clearInterval(test)
                        done(v.slice(2))
                    }
                }, 20)
            }
        } 
        timer[v].barrage.style.left = timer[v].left + 'px'
        timer[v].barrage.style.width = timer[v].baW + 'px'
        timer[v].barrage.style.top = timer[v].top + 'px'
        // console.log('baraage=>v=>left',timer[v])
        timer[v].animation(this.done.bind(this))
        
    }
    done(index) {
        const cls = this.props.commitlist.slice()
        cls[index].done = true
        this.props.done(cls)
    }
    renderLists(v, i) {
        if (!v.done) {
            return (
                <div key={i} ref={'ba'+i} className="Barrage">
                    <span>{v.username}:</span>{v.commit}
                </div>
            )
        }
    }
    render() {
        return (
            <div>
                {this.props.commitlist.map(this.renderLists)}
            </div>
        )
    }
}



export default Barrage