import React, { Component } from "react"

import Pagination from "../Pagination"

const styles = {
  button: {
    cursor: 'pointer'
  }
}

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
              <th className="center"><i className="material-icons" style={styles.button}>add</i></th>
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
                    <td className="center">
                      <i onClick={this.handleRemove.bind(this, classroom.id)}
                          className="material-icons red-text" title="Delete" style={styles.button}>delete</i>
                      &nbsp;&nbsp;
                      <i className="material-icons blue-text" title="Edit" style={styles.button}>edit</i>
                    </td>
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
    this.setState({ searchText: "" })
    if (i === -1) 
    return this.setState({currentPagination: 0}, this.listAll())
       
    this.setState({ currentPagination: i }, this.getData)
  }

  listAll = () => {
    this.getData("/api/classrooms")
  }

  handleRemove = (id) => {
    if (!confirm("Are sure to delete this record?")) return

    fetch(`/api/classroom/${id}`, {method: "DELETE"})
    .then(result => result.json())
    .then(json => {
      if (!json.status)
        return alert(json.message || "An error occured.")
      
      this.setState(prevState => {
        return {
          //total: prevState.total - 1,
          data: prevState.data.filter(data => data.id !== id)
        }
      })
    })
    .catch(err => {
      alert(err.message)
    })
  }
}

export default Classrooms