import React, { Component } from "react"

class EditStudent extends Component {

    state = {
        loaded: 1,
        errMessage: "",
        name: "",
        courses: [],

        courseList: []
    }

    componentDidMount() {
        const { match: { params } } = this.props
        const { id } = params

        this.getCourseList()
        this.getData(id)
    }

    getCourseList = () => {
        fetch("/api/courses")
            .then(result => result.json())
            .then(json => {
                if (!json) throw new Error("Couldn't get course list")

                this.setState({ courseList: json.data })
            })
            .catch(e => this.setState(prevState => ({ errMessage: prevState.errMessage + e.message })))
            .finally(_ => {
                this.setState(prevState => ({ loaded: prevState.loaded + 1 }), M.updateTextFields)
            })
    }

    getData = (id) => {
        fetch(`/api/student/${id}`)
            .then(result => result.json())
            .then(json => {
                if (!json) throw new Error("Couldn't find record")

                this.setState({ ...json })
            })
            .catch(e => this.setState(prevState => ({ errMessage: prevState.errMessage + e.message })))
            .finally(_ => {
                this.setState((prevState) => ({ loaded: prevState.loaded + 1 }), M.updateTextFields)
            })
    }

    handleChange = (key, event) => {
        this.setState({
            [key]: event.target.value
        })
    }

    handleSave = () => {
        
    }

    handleCancel = () => {
        this.props.history.goBack()
    }

    render() {
        const { match: { params } } = this.props
        const { id } = params
        return (
            this.state.loaded <= 2 ? <span>Loading...</span> :
                (this.state.errMessage ? <span>{this.state.errMessage}</span> :
                    (
                        <div className="row">

                            <div className="input-field col s6">
                                <div className="row">
                                    <div className="input-field">
                                        <input id="name" type="text" onChange={this.handleChange.bind(this, "name")} value={this.state.name} className="validate" />
                                        <label htmlFor="name">Name</label>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="input-field">
                                        <input id="surname" type="text" onChange={this.handleChange.bind(this, "surname")} value={this.state.surname} className="validate" />
                                        <label htmlFor="surname">Surname</label>
                                    </div>
                                </div>

                                <div className="row">
                                    <a onClick={this.handleCancel}  className="waves-effect waves-light btn"><i className="material-icons left">arrow_back</i>Back</a>
                                    &nbsp;&nbsp;
                                    <a onClick={this.handleSave}    className="waves-effect waves-light btn"><i className="material-icons left">save</i>Save</a>
                                </div>
                            </div>

                            <div className="input-field col s6" style={{ padding: 30 }}>
                                {
                                    this.state.courseList.map((course, i) =>
                                        <div className="row" key={i}>
                                            <label>
                                                <input type="checkbox" onChange={() => true} defaultChecked={this.state.courses.filter(c => c.courseId == course.id).length > 0} name="courses[]" className="filled-in" />
                                                <span>{course.name}</span>
                                            </label>
                                        </div>
                                    )
                                }

                            </div>

                        </div >
                    )
                )
        )
    }
}

export default EditStudent
