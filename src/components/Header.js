import React, { Component } from 'react'
import JsonToTable from 'react-json-to-table'
// TODO - add proptypes

class Header extends Component {

	constructor(props) {
		super(props)
	}
	// let Greeting;
	render() {
		if (this.props.user === null) {
			return (
				<p>hello guest</p>
			)
		} else if (this.props.user.firstName) {
			return (
				<p>Welcome back, <strong>{this.props.user.firstName}</strong></p>
			)
		} else if (this.props.user.local.username) {
			return(
				<div>
					<form><button type="submit"></button></form>
					<p>test world {this.props.user.local.username}</p>
					<pre>{this.props.postTerm}</pre>
					<pre>{this.props.postLocation}</pre>
					<form onSubmit={this.handleSubmit}>
						<p>
							<strong>Yelp Fusion POST request:</strong>
						</p>
						<p>term:</p>
						<input
							type="text"
							value={this.props.postTerm}
							onChange={this.props.onChangeT}
						/>
						<p>location:</p>
						<input
							type="text"
							value={this.props.postLocation}
							onChange={this.props.onChangeL}
						/>
						<br></br>
						<br/>
						<button type="submit">Submit</button>
					</form>
					<div id="data">
						<pre>{this.props.responseToPost['alias']}</pre>
						{/* <JsonToTable class="in-data" json={this.props.responseToPost[0]} />
						<JsonToTable class="in-data" json={this.props.responseToPost[1]} />
						<JsonToTable class="in-data" json={this.props.responseToPost[2]} />
						<JsonToTable class="in-data" json={this.props.responseToPost[3]} />
						<JsonToTable class="in-data" json={this.props.responseToPost[4]} /> */}
					</div>
				</div>
			)
		}
		// if (this.props.user === null) {
		// 	return (
		// 		<p>Hello guest</p>
		// 	);
		// } else if (this.props.user.firstName) {
		// 	return (
		// 		<p>
		// 			Welcome back, <strong>{this.props.user.firstName}</strong>
		// 		</p>
		// 	);
		// } else if (this.props.user.local.username) {
		// 	return (
		// 		<div>
		// 			<p>
		// 				Welcome back, <strong>{this.props.user.local.username} </strong>
		// 			</p>
		// 			<p>hooray!</p>
		// 			<h2>second hooray!</h2>
		// 			<p>{this.props.response}</p>
		// 			<form onSubmit={this.handleSubmit}>
					// <p>
					// 	<strong>Yelp Fusion POST request:</strong>
					// </p>
					// <p>term:</p>
					// <input
					// 	type="text"
					// 	value={this.props.postTerm}
					// 	onChange={e => this.setState({ postTerm: e.target.value })}
					// />
					// <p>location:</p>
					// <input
					// 	type="text"
					// 	value={this.props.postLocation}
					// 	onChange={e => this.setState({ postLocation: e.target.value })}
					// />
					// <br></br>
					// <br/>
					// <button type="submit">Submit</button>
		// 			</form>
					// <div id="data">
					// 	<JsonToTable class="in-data" json={this.props.responseToPost[0]} />
					// 	<JsonToTable class="in-data" json={this.props.responseToPost[1]} />
					// 	<JsonToTable class="in-data" json={this.props.responseToPost[2]} />
					// 	<JsonToTable class="in-data" json={this.props.responseToPost[3]} />
					// 	<JsonToTable class="in-data" json={this.props.responseToPost[4]} />
					// </div>
		// 		</div>
		// 	)
		// }
	}
	// return (
	// 	<div className="Header">
	// 		{Greeting}
	// 	</div>
	// )
}

export default Header
