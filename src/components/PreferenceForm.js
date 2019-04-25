import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class PreferenceForm extends Component {
	constructor() {
		super()
		this.state = {
			preference: '',
			user_id: '',
			redirectTo: null
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleSubmit(event) {
        if (this.props.loggedIn) {
            event.preventDefault()

            // TODO - validate!
            axios
                .post('/api/prefs', {
                    pref: this.state.preference,
                    user_id: this.props._user._id
                })
                .then(response => {
                    console.log(response)
                    if (!response.data.errmsg) {
                        console.log('youre good')
                        this.setState({
                            redirectTo: '/api/prefs'
                        })
                    } else {
                        console.log('duplicate')
                    }
            });
        }
        
	}
	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		}
		return (
			<div className="PrefForm">
				<label htmlFor="preference">Preference: </label>
                <br/>
				<textarea
					type="text"
					name="preference"
					cols="60"
					rows="6"
					value={this.state.preference}
					onChange={this.handleChange}
				/>
                <br/>
				<button class="btn btn-dark" onClick={this.handleSubmit}>Submit Preference</button>
			</div>
		)
	}
}


export default PreferenceForm;
