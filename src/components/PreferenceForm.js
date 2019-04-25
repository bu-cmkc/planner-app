import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

// Styling
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faUserFriends} from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(faUtensils);
library.add(faUserFriends);

class PreferenceForm extends Component {
	constructor() {
		super();
		this.getCurrDate = this.getCurrDate.bind(this);
		this.state = {
			preference: {
                food: '',
                activities: '',
                radius:'',
                location:'',
                date: {
                    start: this.getCurrDate(),
                    end: this.getCurrDate()
                }
            },
			user_id: '',
			redirectTo: null,
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

    getCurrDate(separator='-', yearOffset=0) {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate()
        let hours = date.getHours();
        let minutes = date.getMinutes();
        year = year + yearOffset;

        let currDate = `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${day<10?`0${day}`:`${day}`}T${hours<10?`0${hours}`:`${hours}`}:${minutes<10?`0${minutes}`:`${minutes}`}`;

        return currDate;
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
	render(props) {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		}
		return (
            <Container className="PrefForm">
                <h5>
                    Enter your comma-separated preferences from most favorite to least favorite!
                </h5>
                <form onSubmit={this.props.handleSubmit}>
                    <label className="inline">Location: </label>
                    <input
                        type="text"
                        value={this.state.preference.location}
                        onChange={e => this.setState({ ...this.state, preference: { ...this.state.preference, location: e.target.value } })}
                    />
                    <br/>
                    <label className="inline">Radius in meters: </label>
                    <input
                        type="text"
                        value={this.state.preference.radius}
                        onChange={e => this.setState({ ...this.state, preference: { ...this.state.preference, radius: e.target.value } })}
                    />
                    <br/>
                    <label className="inline">Start: </label>
                    <input type="datetime-local" name="dateTime" value={this.state.preference.date.start} onChange={e => this.setState({ ...this.state, preference: { ...this.state.preference, date: { ...this.state.preference.date, start: e.target.value } } })} min={this.getCurrDate()} max={this.getCurrDate('-', 1)}/>
                    <br/>
                    <label className="inline">End: </label>
                    <input type="datetime-local" name="dateTime" value={this.state.preference.date.end} onChange={e => this.setState({ ...this.state, preference: { ...this.state.preference, date: { ...this.state.preference.date, end: e.target.value } } })}
                        min={this.getCurrDate()} max={this.getCurrDate('-', 1)}/>
                    <Row>
                       <Col>
                            <label htmlFor="preference">Favorite foods: </label>
                            <br/>
                            <textarea
                                type="text"
                                name="preference"
                                cols="30"
                                rows="6"
                                value={this.state.preference.food}
                                onChange={this.handleChange}
                            />
                       </Col>
                       <Col>
                            <label htmlFor="preference">Favorite activities: </label>
                            <br/>
                            <textarea
                                type="text"
                                name="preference"
                                cols="30"
                                rows="6"
                                value={this.state.preference.activities}
                                onChange={this.handleChange}
                            />
                            <br/>
                   </Col>
                        <button className="btn btn-dark prefButton"
                                onClick={this.handleSubmit}>Submit! <FontAwesomeIcon icon="user-friends" /></button>
                </Row>
            </form>
            </Container>
		);
	}
}


export default PreferenceForm;
