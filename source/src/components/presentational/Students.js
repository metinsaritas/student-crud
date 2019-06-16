import React, { Component } from "react"

import Pagination from "../Pagination"
import { Link } from "react-router-dom"

const styles = {
  button: {
    cursor: 'pointer'
  }
}

class Students extends Component {

  constructor() {
    super()

    this.state = {
      total: 0,
      data: [],

      currentPagination: 1,
      searchText: "",
      filter: "student"
    }

  }

  getData = (path) => {
    path = path ? path : `/api/students/${this.state.currentPagination}`
    fetch(path)
      .then(d => d.json())
      .then(json => this.setState({ ...json }))
      .catch(e => {
        alert(e.message)
      })
  }

  componentDidMount() {
    let elems = document.querySelectorAll('select')
    M.FormSelect.init(elems)

    this.getData()
  }

  handleChange = (event) => {
    this.setState({
      searchText: event.target.value
    })
  }

  handleFilterChange = (event) => {
    this.setState({
      filter: event.target.value
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
          <div className="row s12">
            <div className="input-field col s6">
              <select onChange={this.handleFilterChange}>
                <option value="student">Student Name</option>
                <option value="course">Course Name</option>
                <option value="classroom">Classroom Name</option>
              </select>
              <label>Search by</label>
            </div>

            <div className="input-field col s6">
              <input id="search" onChange={this.handleChange} value={this.state.searchText} type="search" placeholder="Search..." required />
              <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
            </div>

          </div>
        </div>

        <table className="striped">
          <thead>
            <tr>
              <th className="center"><i className="material-icons" style={styles.button}>add</i></th>
              <th>Row</th>
              <th>Name</th>
              <th>Surname</th>
              <th className="center">Courses</th>
            </tr>
          </thead>

          <tbody>
            {
              this.state.data
                .map((student, i) => {

                  const lowerSearchText = this.state.searchText.toLowerCase()

                  switch (this.state.filter) {
                    case "student":
                      if (!student.name.toLowerCase()
                        .includes(lowerSearchText)) return null;
                      break;
                    case "course":
                      if (student.courses.filter(data => data.courseName.toLowerCase()
                        .includes(lowerSearchText)).length <= 0) return null;
                      break;
                    case "classroom":
                      if (student.courses.filter(data => data.classroomName.toLowerCase()
                        .includes(lowerSearchText)).length <= 0) return null;
                      break;
                  }

                  return (

                    <tr key={i}>
                      <td className="center">
                        <i onClick={this.handleRemove.bind(this, student.id)}
                          className="material-icons red-text" title="Delete" style={styles.button}>delete</i>
                        &nbsp;&nbsp;
                        <Link to={`/student/edit/${student.id}`}>
                          <i className="material-icons blue-text" title="Edit" style={styles.button}>edit</i>
                        </Link>
                      </td>
                      <td>{startOffset + i + 1}</td>
                      <td>{student.name}</td>
                      <td>{student.surname}</td>
                      <td>

                        <table className="striped">
                          <thead>
                            <tr>
                              <th>Course Name</th>
                              <th>Classroom Name</th>
                            </tr>
                          </thead>

                          <tbody>
                            {
                              student.courses.map((course, i) =>
                                <tr key={i}>
                                  <td>{course.courseName}</td>
                                  <td>{course.classroomName}</td>
                                </tr>
                              )
                            }
                          </tbody>
                        </table>

                      </td>
                    </tr>)
                })
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
      return this.setState({ currentPagination: 0 }, this.listAll())

    this.setState({ currentPagination: i }, this.getData)
  }

  listAll = () => {
    this.getData("/api/students")
  }

  handleRemove = (id) => {
    if (!confirm("Are you sure to delete this record?")) return

    fetch(`/api/student/${id}`, { method: "DELETE" })
      .then(result => result.json())
      .then(json => {
        if (!json.status)
          throw new Error(json.message || "An error occured.")

        this.setState(prevState => {
          return {
            //total: prevState.total - 1,
            data: prevState.data.filter(data => data.id !== id)
          }
        })
      })
      .catch(e => {
        alert(e.message)
      })
  }
}

export default Students