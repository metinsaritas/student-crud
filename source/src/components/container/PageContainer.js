import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import Students from "../presentational/Students"
import Courses from "../presentational/Courses";
import Classrooms from "../presentational/Classrooms";

const styles = {
  iconSize: { 
    fontSize: 104
  }
}

class Main extends Component {

  render () {
    return (
    <div className="container" style={{marginTop: 100}}>
      <div className="section">
        <div className="row">
          <div className="col s12 m4">
            <Link to="/students" className="icon-block">
              <h2 className="center light-blue-text"><i style={styles.iconSize} className="material-icons">face</i></h2>
              <h5 className="center">Students</h5>
            </Link>
          </div>

          <div className="col s12 m4">
            <Link to="/courses" className="icon-block">
              <h2 className="center light-blue-text"><i style={styles.iconSize} className="material-icons">card_travel</i></h2>
              <h5 className="center">Courses</h5>
            </Link>
          </div>

          <div className="col s12 m4">
            <Link to="/classrooms" className="icon-block">
              <h2 className="center light-blue-text"><i style={styles.iconSize} className="material-icons">home</i></h2>
              <h5 className="center">Classrooms</h5>
            </Link>
          </div>
        </div>

      </div>
    </div>
    )
  }
}

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