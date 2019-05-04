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
            events: [],
		    redirectTo: null
		};
	    this.printYelpSchedules = this.printYelpSchedules.bind(this);
        this.printEventbriteSchedules = this.printEventbriteSchedules.bind(this);
    }

    componentDidMount() {
        this.getYelpSchedules();
        this.getEventbriteSchedules();
    }

    getYelpSchedules = async () => {
        await axios
            .get('/api/schedules/yelp')
            .then(response => {
                let businesses = JSON.parse(response.request.response).map((t) => [{rating:t.rating, name:t.name, location:t.location, hours:t.hours}])
                this.setState({
                businesses: Array.from(businesses)
                });
            console.log(this.state.businesses);
        })


    };

    getEventbriteSchedules = async () => {
        await axios
            .get('/api/schedules/eventbrite')
            .then(response => {
                // console.log(JSON.parse(response.request.response).events)
                // console.log(response.request.response.events)
                let events = JSON.parse(response.request.response).events.map((t) => [{name:t.name.text, description:t.description.text, url:t.url, start:t.start.local, end:t.end.local}])
                this.setState({
                    events: Array.from(events)
                });
            // console.log(this.state.events);
        })


    };

    printYelpSchedules() {
        let keys = Object.keys(this.state.businesses)
        return ( keys.map((i) =>  <div>{this.state.businesses[i][0].name} (rating: {this.state.businesses[i][0].rating}) Monday: (open: {this.state.businesses[i][0].hours[0].open[0].start}, close: {this.state.businesses[i][0].hours[0].open[0].end})</div>) )
        
    }
    printEventbriteSchedules() {
        let keys = Object.keys(this.state.events)
        console.log(this.state.events);
        return (keys.map((i) =>  <ul style={{listStyleType: "none"}}> <li style={{fontWeight:"bold"}}>{this.state.events[i][0].name}</li> <li>{this.state.events[i][0].url}</li> <li> Starting Date and Time: {this.state.events[i][0].start}</li> <li>Ending Date and Time: {this.state.events[i][0].end}</li></ul>) )
        
    }

	render(props) {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		}
        else {
            return(
                
                <div id="schedule">
                    <div id="businesses">
                        <h3 style={{fontSize:20}}><b><u>Food</u></b></h3>
                        {this.printYelpSchedules()}
                        <br/> 
                    </div>
                    <div id="events">
                        <h3 style={{fontSize:20}}><b><u>Activities</u></b></h3>
                        {this.printEventbriteSchedules()}
                    </div>
                </div>
            )
        }
	}
}


export default Schedules;
