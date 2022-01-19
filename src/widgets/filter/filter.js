import React, { Component } from 'react'
import "./filter.css"
export class Filter extends Component {

    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className='Filter'>
                <input type="text" value={this.props.nameInput} onChange={this.props.setFilterInputValue} placeholder='Search by name'></input><br></br>
                <input type="text" value={this.props.tagInput} onChange={this.props.setTagFilterInputValue} placeholder='Search by tag'></input>
            </div>
        )
    }
}

export default Filter
