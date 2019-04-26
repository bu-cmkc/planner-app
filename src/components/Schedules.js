import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

// Styling
import '../App.css';

class Schedules extends Component {
	constructor() {
		super();
		this.state = {
		    businesses: "", 
		    redirectTo: null
		};
        this.getSchedules = this.getSchedules.bind(this);
	}
    getSchedules () {
        axios
            .get('/api/schedules')
            .then(response => {
             let businesses = JSON.parse(response.request.response).map((t) => [{rating:t.rating, name:t.name, location:t.location}])
            console.log(businesses);
            this.setState({
                businesses: businesses
            });
            var business = businesses.map((e) => 
            <div>
               e.name 
           </div>
            );
            return (<div>{business}</div>)
        })
    }
	render(props) {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		}
        else {
            this.getSchedules()
        }
	}
}


export default Schedules;
