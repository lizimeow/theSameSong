import React, { Component } from 'react'
import './styles/_barrage.css'

class Barrage extends Component {
    componentDidUpdate() {
        if (this.props.barrage.username) {
            this.animation()
        }
    }
    animation() {
        const clientH = window.innerHeight
        const clientW = window.innerWidth
        const offsetTop = Math.round(window.pageYOffset)
        const barrage = document.querySelector('.Barrage')
        const barrageW = barrage.clientWidth + 5
        const top = Math.round(Math.random() * (clientH - 20) + offsetTop)
        let left = -barrageW - 15
        const speed = parseInt(2 + Math.random()*3, 10)
        barrage.style.left = left + 'px'
        // barrage.style.width = barrageW + 'px'
        barrage.style.top = top + 'px'
        let test = setInterval(() => {
            left += speed
            barrage.style.left = left + 'px'
            if (left > clientW) {
                clearInterval(test)
                barrage.style.top = '-30px'
                this.props.animationDone()           
            }
        }, 20)
    }
    render() {
        return (
            <div className="Barrage">
                <span>{this.props.barrage.username} : </span>{this.props.barrage.commit}
            </div>
        )
    }
}



export default Barrage