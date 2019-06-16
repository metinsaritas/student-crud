import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import Students from "../presentational/Students"
import Courses from "../presentational/Courses"
import Classrooms from "../presentational/Classrooms"

import EditStudent from "../presentational/EditStudent"
import EditCourse from "../presentational/EditCourse"
import EditClassroom from "../presentational/EditClassroom"

import InsertStudent from "../presentational/InsertStudent"
import InsertCourse from "../presentational/InsertCourse"
import InsertClassroom from "../presentational/InsertClassroom"

import Main from "../container/Main"

class PageContainer extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <Router>
        <nav className="light-blue lighten-1" role="navigation">
          <div className="nav-wrapper container">
            <a href="/" className="brand-logo">
              <i className="material-icons">school</i> Student CRUD
            </a>

            <ul className="right hide-on-med-and-down">
              <li><Link to="/students">Students</Link></li>
              <li><Link to="/courses">Courses</Link></li>
              <li><Link to="/classrooms">Classrooms</Link></li>
            </ul>

            <ul id="nav-mobile" className="sidenav">
              <li><Link to="/students">Students</Link></li>
              <li><Link to="/courses">Courses</Link></li>
              <li><Link to="/classrooms">Classrooms</Link></li>
            </ul>
            <a href="#" data-target="nav-mobile" className="sidenav-trigger"><i className="material-icons">menu</i></a>
          </div>
        </nav>

        <div className="section no-pad-bot">
          <div className="container">
            <Route exact path="/" component={Main} />
            <Route path="/students" component={Students} />
            <Route path="/courses" component={Courses} />
            <Route path="/classrooms" component={Classrooms} />

            <Route path="/student/edit/:id" component={EditStudent} />
            <Route path="/course/edit/:id" component={EditCourse} />
            <Route path="/classroom/edit/:id" component={EditClassroom} />

            <Route path="/student/new" component={InsertStudent} />
            <Route path="/course/new" component={InsertCourse} />
            <Route path="/classroom/new" component={InsertClassroom} />
          </div>
        </div>
      </Router>
    );
  }

  componentWillMount() {

    document.addEventListener('DOMContentLoaded', function () {
      const menus = document.querySelectorAll('.sidenav')
      M.Sidenav.init(menus, { edge: 'left' })
    })

  }
}

export default PageContainer