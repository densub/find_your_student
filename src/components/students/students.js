import './students.css';
import React, { Component } from 'react'
import { Filter } from '../../widgets/filter/filter';
import getAverage from '../../helper/average';

export default class Students extends Component {
    constructor(props) {
        super(props)

        this.state = {
            filterByNameInput: '',
            filterByTagInput: '',
            items: {},
            Loaded: false,
        }
        this.nameFilterChange = this.nameFilterChange.bind(this)
        this.tagFilterChange = this.tagFilterChange.bind(this)
    }

    // Sets IsClicked (see Fetching data)
    setIsClicked(studentId, isHidden) {
        let copyItems = { ...this.state.items }
        copyItems.students.filter(student => student.id === studentId).map(student => student.isClicked = isHidden)
        this.setState({
            items: copyItems
        })
    }

    // Sets name filter
    nameFilterChange(value) {
        this.setState({
            filterByNameInput: value.target.value,
        })
    }

    // Sets tag filter
    tagFilterChange(e) {
        this.setState({
            filterByTagInput: e.target.value,
        })
    }

    // Sets tagInputValue (see Fetching data)
    tagInput(studentId, e) {
        let copyItems = { ...this.state.items }
        copyItems.students.filter(student => student.id === studentId).map(student => student.tagInputValue = e.target.value)
        this.setState({
            items: copyItems
        })
    }

    // Adds tags to Tags Array (see Fetching data)
    setTag(studentId, e) {
        if (e.key == "Enter") {
            let copyItems = { ...this.state.items }
            copyItems.students.filter(student => student.id === studentId).map((student) => {
                student.tags.push(e.target.value)
                student.tagInputValue = ''
            })
            this.setState({
                items: copyItems
            })
        }
    }

    // Fetching data
    componentDidMount() {
        fetch("https://api.hatchways.io/assessment/students")
            .then(response => response.json())
            .then((data) => {
                data.students.map(d => {
                    let copyD = d
                    copyD.isClicked = false // adding isClicked property to the student object 
                    copyD.tags = []         // adding tags array to the student object
                    copyD.tagInputValue = '' // adding tagInputValue property to the student object to clear input field for tags
                    return copyD;
                })
                this.setState({
                    items: data, // setting mapped object to items
                    Loaded: true
                })
            })
            .catch((error) => console.log("Error:", error))
    }

    render() {
        const { items, Loaded } = this.state
        if (!Loaded) {
            return <div class="loader"></div>
        }
        return (
            <div className='MainDiv'>
                <div className='DataView'>
                    <Filter
                        nameInput={this.state.filterByNameInput}
                        tagInput={this.state.filterByTagInput}
                        setFilterInputValue={this.nameFilterChange}
                        setTagFilterInputValue={this.tagFilterChange}>
                    </Filter>
                    {

                        items.students.filter((student) => {
                            const fullName = student.firstName + ' ' + student.lastName
                            let allTags = ""
                            if (student.tags.length > 0) {
                                student.tags.forEach(element => {
                                    allTags += element
                                })

                            }
                            return (
                                fullName.toLowerCase().includes(this.state.filterByNameInput.toLowerCase()) &&
                                allTags.toLowerCase().includes(this.state.filterByTagInput.toLowerCase())
                            )
                        }).map((student) => (
                            <table className='Column' key={student.id}>
                                <tbody>
                                    <tr className='border-bottom'>
                                        <td width="20%"><img src={student.pic} /></td>
                                        <td width="80%">
                                            <h2>{student.firstName} {student.lastName}</h2>
                                            <div className='Description'>
                                                <div className='MarginTopBottom'>Email: {student.email}<br></br></div>
                                                <div className='MarginTopBottom'>company: {student.company}<br></br></div>
                                                <div className='MarginTopBottom'>Skill: {student.skill}<br></br></div>
                                                <div className='MarginTopBottom'>Average: {getAverage(student.grades)} % <br></br><br></br></div>
                                                {student.isClicked && <div className='Description'>
                                                    Test 1: {student.grades[0]}%<br></br>
                                                    Test 2: {student.grades[1]}%<br></br>
                                                    Test 3: {student.grades[2]}%<br></br>
                                                    Test 4: {student.grades[3]}%<br></br>
                                                    Test 5: {student.grades[4]}%<br></br>
                                                    Test 6: {student.grades[5]}%<br></br>
                                                    Test 7: {student.grades[6]}%<br></br>
                                                    Test 8: {student.grades[7]}%<br></br>
                                                </div>} <br></br>
                                                {student.tags.map((tag) => <span className='tag'> {tag} </span>)}
                                                <br></br>
                                                <input type="text" className='tagInput' value={student.tagInputValue} onChange={this.tagInput.bind(this, student.id)} onKeyDown={this.setTag.bind(this, student.id)} placeholder='Add a tag' ></input>
                                            </div>
                                        </td>
                                        <td width="10%" className='expand-contract'>
                                            {student.isClicked ? <a onClick={this.setIsClicked.bind(this, student.id, false)}> - </a> :
                                                <a onClick={this.setIsClicked.bind(this, student.id, true)}> + </a>
                                            }
                                        </td>
                                    </tr>
                                    <br className='border'></br>
                                </tbody>
                            </table>
                        ))
                    }
                </div>
            </div>
        )
    }
}
