import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
// import axios from 'axios';

class YelpFusion extends Component {
	constructor() {
		super()

        this.state = {
			// API stuff
			response: '',
			postTerm: '',
			postLocation: '',
			responseToPost: {},
        };
        this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit = async e => {
		e.preventDefault();
		console.log(this.state.postTerm);
		console.log(this.state.postLocation);
		console.log(this.state.responseToPost);
        const response = await fetch('/api/world', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
			},
			body: JSON.stringify({ 
				postTerm: this.state.postTerm, 
				postLocation: this.state.postLocation 
			}),
		});
		const body = await response.json();
		console.log("body below");
		console.log(body[0]);
		this.setState({ responseToPost: body[0] });
	};

	  onChangeT = e => {
		this.setState({ postTerm: e.target.value })
	  }

	  onChangeL = e => {
		this.setState({ postLocation: e.target.value })
	  }
	// let Greeting;
	render() {
        return (
            <div classname="YelpFusion">
                <p>{this.state.response}</p>
                <p>
                    <strong>Yelp Fusion POST request:</strong>
                </p>
                <form onSubmit={this.handleSubmit}>
                    <p>term:</p>
                    <input
                        type="text"
                        value={this.state.postTerm}
                        onChange={e => this.setState({ postTerm: e.target.value })}
                    />
                    <p>location:</p>
                    <input
                        type="text"
                        value={this.state.postlocation}
                        onChange={e => this.setState({ postLocation: e.target.value })}
                    />
                    <br></br>
                    <br/>
                    <button type="submit">submit</button>
                </form>
                <div id="data">
                        <p></p>
                        <code>
                                {JSON.stringify(this.state.responseToPost)}
                        </code>
                        <p></p>
                        <pre>{this.state.responseToPost['alias']}</pre>
                        {/* <p>{this.state.responseToPost === {} ? "hoopla" : this.state.responseToPost}</p> */}
                        {/* <JsonToTable class="in-data" json={this.state.responseToPost[0]} />
                        <JsonToTable class="in-data" json={this.state.responseToPost[1]} />
                        <JsonToTable class="in-data" json={this.state.responseToPost[2]} />
                        <JsonToTable class="in-data" json={this.state.responseToPost[3]} />
                        <JsonToTable class="in-data" json={this.state.responseToPost[4]} /> */}
                </div>
            </div>
        )
    }
}


export default YelpFusion;
