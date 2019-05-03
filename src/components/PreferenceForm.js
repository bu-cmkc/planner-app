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
			preferences: {
                food: '',
                activities: '',
                radius:'',
                location:'',
                date: {
                    start: this.getCurrDate(),
                    end: this.getCurrDate()
                }
            },
            schedule: {},
			user_id: '',
			has_data: 0,
			redirectTo: null,
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

    componentDidMount() {
       this.getCurrPrefs(); 
    }

    getCurrPrefs = async () => {
        if (!this.state.preferences) {
           console.log("not yet") 
        }
        await axios
            .get('/api/prefs')
            .then(currPrefs => {
                try {
                    let currPrefData = currPrefs.data[0];
                    console.log(currPrefData);
                    this.setState({
                        preferences: currPrefData.preferences[0],
                        user_id: this.props._user._id,
                        has_data: 1
                        });
                } catch (e) {
                    /* handle error */
                    // has no starting data
                    this.setState({
                        has_data: 1
                    });
                    console.log(e)
                }
            })
            .catch(err => console.log(err));
    };

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

    getSchedules = async () => {
        await axios
            .get('/api/schedules')
            .then(response => {
             let businesses = JSON.parse(response.request.response).map((t) => [{rating:t.rating, name:t.name, location:t.location, hours:t.hours}])
            this.setState({
                ...this.state,
                schedule: Array.from(businesses)
            });
        })
    };


	handleSubmit(event) {
        if (this.props.loggedIn) {
            event.preventDefault()

            // TODO - validate!
            // put response always times out. 
            // Instead of waiting long, just timeout after 1 ms

            let putCurrPrefs = async () => {
                await axios
                .put('/api/prefs', {
                    preferences: this.state.preferences,
                    user_id: this.props._user._id
                }).catch(e => console.log(e))
            }

            let putCurrSched = async () => {
                await axios
                .put('/api/prefs', {
                    preferences: this.state.schedule,
                    user_id: this.props._user._id
                }).catch(e => console.log(e))
            }

            setTimeout(putCurrPrefs, 0)
            this.setState({
                redirectTo: '/schedules'
            })
                // .then(response => {
                //     if (!response.data.errmsg) {
                //         console.log('youre good')
                //         this.setState({
                //             redirectTo: '/api/prefs'
                //         })
                //     } else {
                //         console.log('duplicate')
                //     }
                // }).catch(err => console.log(err));
        }
	}
	render(props) {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
        }
        // Render if not loading database preferences OR starting with no data
        if (this.state.has_data == 1) {
            return (
                <Container className="PrefForm">
                    <h5>
                        Enter your comma-separated preferences from most favorite to least favorite!
                    </h5>
                    <form onSubmit={this.props.handleSubmit}>
                        <label className="inline">Location: </label>
                        <input
                            type="text"
                            value={this.state.preferences.location}
                            onChange={e => this.setState({ ...this.state, preferences: { ...this.state.preferences, location: e.target.value } })}
                        />
                        <br/>
                        <label className="inline">Radius in meters: </label>
                        <input
                            type="text"
                            value={this.state.preferences.radius}
                            onChange={e => this.setState({ ...this.state, preferences: { ...this.state.preferences, radius: e.target.value } })}
                        />
                        <br/>
                        <label className="inline">Start: </label>
                        <input type="datetime-local" name="dateTime" value={this.state.preferences.date.start} onChange={e => this.setState({ ...this.state, preferences: { ...this.state.preferences, date: { ...this.state.preferences.date, start: e.target.value } } })} min={this.getCurrDate()} max={this.state.preferences.end}/>
                        <br/>
                        <label className="inline">End: </label>
                        <input type="datetime-local" name="dateTime" value={this.state.preferences.date.end} onChange={e => this.setState({ ...this.state, preferences: { ...this.state.preferences, date: { ...this.state.preferences.date, end: e.target.value } } })}
                            min={this.state.preferences.date.start} max={this.getCurrDate('-', 1)}/>
                        <Row>
                           <Col>
                                <label htmlFor="preferences">Favorite foods: </label>
                                <br/>
                                <textarea
                                    type="text"
                                    name="preferences"
                                    cols="30"
                                    rows="6"
                                    value={this.state.preferences.food}
                                    onChange={e => this.setState({ ...this.state, preferences: { ...this.state.preferences, food: e.target.value } })}
                                />
                           </Col>
                           <Col>
                                <label htmlFor="preferences">Favorite activities: </label>
                                <br/>
                                <textarea
                                    type="text"
                                    name="preferences"
                                    cols="30"
                                    rows="6"
                                    value={this.state.preferences.activities}
                                    onChange={e => this.setState({ ...this.state, preferences: { ...this.state.preferences, activities: e.target.value } })}
                                />
                                <br/>
                       </Col>
                            <button className="btn btn-dark prefButton"
                                    onClick={this.handleSubmit}>Submit! <FontAwesomeIcon icon="user-friends" /></button>
                    </Row>
                </form>
                </Container>
            );
        } else {
            return(
                <div>
                    Loading current preferences...
                </div>
            )
        }
    }
	    
}


export default PreferenceForm;
