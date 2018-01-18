import React, { Component } from 'react'
import './styles/_searchinput.css'

class SearchInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            roomValue: '',
        }
    }
    handleChange(event) {
        this.setState({
            roomValue: event.target.value
        })
    }
    searchRoom() {
        const value = this.state.roomValue
        console.log(this.state.roomValue)
        this.props.search(value)
        // 查询数据
    }
    render() {
        return (
            <div className="search">
                <input type="text"
                    className="searchTerm"
                    value={this.state.roomValue}
                    onChange={this.handleChange.bind(this)}
                    placeholder={this.props.placeholder} />
                <button
                    type="submit"
                    className="searchButton"
                    onClick={() => this.searchRoom()}></button>
            </div>
        )
    }
}

export default SearchInput