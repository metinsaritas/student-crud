import React, { Component } from "react"

import Pagination from "../Pagination"

class Classrooms extends Component {

  constructor() {
    super()

    this.state = {
      total: 0,
      data: [],

      currentPagination: 1,
      searchText: ""
    }

  }

  getData = (path) => {
    path = path ? path : `/api/classrooms/${this.state.currentPagination}`
    fetch(path)
      .then(d => d.json())
      .then(json => this.setState({ ...json }))
      .catch(e => {
        alert(e.message)
      })
  }

  componentDidMount() {
    this.getData()
  }

  handleChange = (event) => {
    this.setState({
      searchText: event.target.value
    })
  }

  render() {
    let { currentPagination, total } = this.state
    currentPagination = currentPagination < 0 ? 1 : currentPagination

    let currInteger = currentPagination <= 0 ? 1 : currentPagination
    const startOffset = 5 * (currInteger - 1)

    return (
      <span>

        <div className="nav-wrapper">
          <div className="input-field">
            <input id="search" onChange={this.handleChange} value={this.state.searchText} type="search" placeholder="Search..." required />
            <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
          </div>
        </div>

        <table className="striped">
          <thead>
            <tr>
              <th>Total</th>
              <th>Name</th>
            </tr>
          </thead>

          <tbody>
            {
              this.state.data
                .map((classroom, i) =>
                  !classroom.name.toString().toLowerCase().includes(this.state.searchText) ||
                  <tr key={i}>
                    <td>{startOffset + i + 1}</td>
                    <td>{classroom.name}</td>
                  </tr>
                )
            }
          </tbody>
        </table>

        <Pagination limit={5} total={total} currentPagination={currentPagination} onClick={this.handlePaginationOnClick} />
      </span>
    )

  }

  handlePaginationOnClick = (i) => {
    if (i === -1) 
    return this.setState({currentPagination: 0}, this.listAll())
       
    this.setState({ currentPagination: i }, this.getData)
  }

  listAll = () => {
    this.getData("/api/classrooms")
  }
}

export default Classrooms