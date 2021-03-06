import React, { Component } from "react"

class InsertCourse extends Component {

    state = {
        loaded: 1,
        errMessage: "",
        name: "",
        classroomId: "",

        clasroomsList: []
    }

    componentDidMount() {
        this.getClassroomList()
    }

    getClassroomList = () => {
        fetch("/api/classrooms")
            .then(result => result.json())
            .then(json => {
                if (!json) throw new Error("Couldn't get clasroom list")

                this.setState({ clasroomsList: json.data })
            })
            .catch(e => this.setState(prevState => ({ errMessage: prevState.errMessage + e.message })))
            .finally(_ => {
                this.setState(prevState => ({ loaded: prevState.loaded + 1 }), () => {
                    setTimeout(() => {
                        let elems = document.querySelectorAll('select')
                        M.FormSelect.init(elems)
                        M.updateTextFields()
                    }, 100)
                })
            })
    }

    handleChange = (key, event) => {
        this.setState({
            [key]: event.target.value
        })
    }

    handleSave = () => {

        fetch(`/api/course`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: this.state.name,
                classroom_id: this.state.classroomId
            })
        })
        .then(result => result.json())
        .then(json => {
            if (!json.status) 
                throw new Error(json.message)
            
            alert("Saved")
        })
        .catch(e => alert(e.message))
    }

    handleCancel = () => {
        this.props.history.goBack()
    }

    handleClassroomChange = (event) => {
        this.setState({
            classroomId: event.target.value
        })
    }

    render() {
        return (
            this.state.loaded <= 1 ? <span>Loading...</span> :
                (this.state.errMessage ? <span>{this.state.errMessage}</span> :
                    (
                        <div className="row">

                            <div className="input-field col s12">
                                <div className="row">
                                    <div className="input-field col s6">
                                        <input id="name" type="text" onChange={this.handleChange.bind(this, "name")} value={this.state.name} className="validate" />
                                        <label htmlFor="name">Name</label>
                                    </div>

                                    <div className="input-field col s6">
                                        <select defaultValue={this.state.classroomId} onChange={this.handleClassroomChange}>
                                            {
                                                this.state.clasroomsList.map((clasroom, i) => (
                                                    <option key={i} value={clasroom.id}>{clasroom.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="row">
                                    <a onClick={this.handleCancel} className="waves-effect waves-light btn"><i className="material-icons left">arrow_back</i>Back</a>
                                    &nbsp;&nbsp;
                                    <a onClick={this.handleSave} className="waves-effect waves-light btn"><i className="material-icons left">save</i>Save</a>
                                </div>
                            </div>

                            <div className="input-field col s6" style={{ padding: 30 }}>
                                {
                                    false && this.state.courseList.map((course, i) =>
                                        <div className="row" key={i}>
                                            <label>
                                                <input type="checkbox" onChange={() => true} className="filled-in" />
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

export default InsertCourse
