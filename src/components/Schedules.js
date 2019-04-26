import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

// Styling
import '../App.css';

class PreferenceForm extends Component {
	constructor() {
		super();
		this.state = {
		    redirectTo: null
		};
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
                    <input type="datetime-local" name="dateTime" value={this.state.preferences.date.start} onChange={e => this.setState({ ...this.state, preferences: { ...this.state.preferences, date: { ...this.state.preferences.date, start: e.target.value } } })} min={this.getCurrDate()} max={this.getCurrDate('-', 1)}/>
                    <br/>
                    <label className="inline">End: </label>
                    <input type="datetime-local" name="dateTime" value={this.state.preferences.date.end} onChange={e => this.setState({ ...this.state, preferences: { ...this.state.preferences, date: { ...this.state.preferences.date, end: e.target.value } } })}
                        min={this.getCurrDate()} max={this.getCurrDate('-', 1)}/>
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
	}
}


export default PreferenceForm;
