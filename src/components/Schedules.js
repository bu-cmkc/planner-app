import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { JsonToTable } from "react-json-to-table";

// Styling
import '../App.css';

class Schedules extends Component {
	constructor() {
		super();
		this.state = {
		    businesses: [], 
		    redirectTo: null
		};
	    this.printSchedules = this.printSchedules.bind(this);
	}

    componentDidMount() {
        this.getSchedules();
    }

    getSchedules = async () => {
        await axios
            .get('/api/schedules')
            .then(response => {
             let businesses = JSON.parse(response.request.response).map((t) => [{rating:t.rating, name:t.name, location:t.location, hours:t.hours}])
            this.setState({
                businesses: Array.from(businesses)
            });
            console.log(this.state.businesses);
        })


    };

    printSchedules() {
        let keys = Object.keys(this.state.businesses)
        return ( keys.map((i) =>  <div>{this.state.businesses[i][0].name} ({this.state.businesses[i][0].rating}) ({this.state.businesses[i][0].hours[0].open[0].start}, {this.state.businesses[i][0].hours[0].open[0].end})</div>) )
        // return ( keys.map((i) => this.state.businesses[i].map(business => <div>{business.name} with a rating of {business.rating}</div>)) )
    }

	render(props) {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		}
        else {
            return(
                <div id="businesses">
                    {this.printSchedules()}
                </div>
            )
        }
	}
}


export default Schedules;
