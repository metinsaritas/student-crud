import React, { Component } from "react"

class InsertClassroom extends Component {

    state = {
        loaded: 1,
        errMessage: "",
        name: ""
    }

    componentDidMount() {

    }

    handleChange = (key, event) => {
        this.setState({
            [key]: event.target.value
        })
    }

    handleSave = () => {
        
        fetch(`/api/classroom`, {
            method: "POST",
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
                throw new Error(json.message)
            
            alert("Saved")
        })
        .catch(e => alert(e.message))
        
    }

    handleCancel = () => {
        this.props.history.goBack()
    }

    render() {
        return (
            this.state.loaded <= 0 ? <span>Loading...</span> :
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

export default InsertClassroom
