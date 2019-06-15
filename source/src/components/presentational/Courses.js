import React, { Component } from "react"

import Pagination from "../Pagination"

class Courses extends Component {

  constructor() {
    super()

    this.state = {
      total: 0,
      data: [],

      currentPagination: 1
    }

  }

  getData = () => {
    fetch(`/api/courses/${this.state.currentPagination}`)
      .then(d => d.json())
      .then(json => this.setState({ ...json }))
      .catch(e => {
        alert(e.message)
      })
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    let { currentPagination, total } = this.state
    currentPagination = currentPagination <= 0 ? 1 : currentPagination

    const startOffset = 5 * (currentPagination - 1)

    return (
      <span>
        <table className="striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Classroom Name</th>
            </tr>
          </thead>

          <tbody>
            {
              this.state.data.map((course, i) =>
                <tr key={i}>
                  <td>{startOffset + i + 1}</td>
                  <td>{course.name}</td>
                  <td>{course.classroomName}</td>
                </tr>
              )
            }
          </tbody>
        </table>
        
        <Pagination limit={5} total={total} currentPagination={currentPagination} onClick={this.handlePaginationOnClick}/>
      </span>
    )

  }

  handlePaginationOnClick = (i) => {
    this.setState({currentPagination: i}, this.getData)
  }
}

export default Courses