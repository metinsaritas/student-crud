import React, { Component } from "react"

class EditClassroom extends Component {

    state = {
        loaded: 1,
        errMessage: "",
        name: ""
    }

    componentDidMount() {
        const { match: { params } } = this.props
        const { id } = params

        this.getData(id)
    }

    getData = (id) => {
        fetch(`/api/classroom/${id}`)
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
        const { match: { params } } = this.props
        const { id } = params

        fetch(`/api/classroom/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: this.state.name
            })
        })
        .then(result => result.json())
        .then(json => {
            if (!json.status) 
                throw new Exception(json.message)
            
            alert("Saved")
        })
        .catch(e => alert(e.message))
    }

    handleCancel = () => {
        this.props.history.goBack()
    }

    render() {
        const { match: { params } } = this.props
        const { id } = params
        return (
            this.state.loaded <= 1 ? <span>Loading...</span> :
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
                                    <a onClick={this.handleCancel} className="waves-effect waves-light btn"><i className="material-icons left">arrow_back</i>Back</a>
                                    &nbsp;&nbsp;
                                    <a onClick={this.handleSave} className="waves-effect waves-light btn"><i className="material-icons left">save</i>Save</a>
                                </div>
                            </div>

                        </div >
                    )
                )
        )
    }
}

export default EditClassroom
