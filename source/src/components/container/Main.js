import React, { Component } from "react"
import { Link } from "react-router-dom"

const styles = {
    iconSize: { 
      fontSize: 104
    },
    marginT: {
        marginTop: 100
    }
  }

class Main extends Component {

    render () {
      return (
      <div className="container" style={styles.marginT}>
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

  export default Main