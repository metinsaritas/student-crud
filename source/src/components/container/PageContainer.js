import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import Students from "../presentational/Students"
import Courses from "../presentational/Courses";
import Classrooms from "../presentational/Classrooms";

class PageContainer extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <Router>        
        <nav className="light-blue lighten-1" role="navigation">
          <div className="nav-wrapper container">
            <a href="#" className="brand-logo">
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
          <Route exact path="/" component={null} />
          <Route path="/students" component={Students} />
          <Route path="/courses" component={Courses} />
          <Route path="/classrooms" component={Classrooms} />
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