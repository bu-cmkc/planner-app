import React, { Component } from 'react';
import axios from 'axios'
import { Route, Link } from 'react-router-dom'
// import logo from './logo.svg';
import './App.css';

import LoginForm from './components/Login/LoginForm'
import SignupForm from './components/SignupForm'
import Header from './components/Header'
import Home from './components/Home'

const DisplayLinks = props => {
	if (props.loggedIn) {
		return (
			<nav className="navbar">
				<ul className="nav">
					<li className="nav-item">
						<Link to="/" className="nav-link">
							Home
						</Link>
					</li>
					<li>
						<Link to="#" className="nav-link" onClick={props._logout}>
							Logout
						</Link>
					</li>
				</ul>
			</nav>
		)
	} else {
		return (
			<nav className="navbar">
				<ul className="nav">
					<li className="nav-item">
						<Link to="/" className="nav-link">
							Home
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/login" className="nav-link">
							login
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/signup" className="nav-link">
							sign up
						</Link>
					</li>
				</ul>
			</nav>
		)
	}
}

class App extends Component {
	constructor() {
		super()
		this.state = {
			loggedIn: false,
			user: null,
			// API stuff
			response: '',
			postTerm: '',
			postLocation: '',
			responseToPost: {},
			hasError: false,
		}
		this._logout = this._logout.bind(this)
		this._login = this._login.bind(this)
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}
	
	componentDidCatch(error, info) {
		// You can also log the error to an error reporting service
		console.log(error, info);
	}

	componentDidMount() {
		axios.get('/auth/user').then(response => {
			console.log(response.data)
			if (!!response.data.user) {
				console.log('THERE IS A USER')
				this.setState({
					loggedIn: true,
					user: response.data.user
				})
			} else {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		});
		this.callApi()
			.then(res => this.setState({ response: res.express }))
			.catch(err => console.log(err));
	}

	callApi = async () => {
		const response = await fetch('/api/hello');
		const body = await response.json();
		if (response.status !== 200) throw Error(body.message);
		return body;
	};

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

	_logout(event) {
		event.preventDefault()
		console.log('logging out')
		axios.post('/auth/logout').then(response => {
			console.log(response.data)
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	}

	_login(username, password) {
		axios
			.post('/auth/login', {
				username,
				password
			})
			.then(response => {
				console.log(response)
				if (response.status === 200) {
					// update the state
					this.setState({
						loggedIn: true,
						user: response.data.user
					})
				}
			})
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return  (
				<div>
					<h1>Something went wrong.</h1>
					{/* <p>{this.state.responseToPost}</p> */}
				</div>
			);
		}
		if (this.state.user === null) {
			return (
				<div className="App">
					<h1>This is the main App component</h1>
					<p>hello guest</p>
					{/* LINKS to our different 'pages' */}
					<DisplayLinks _logout={this._logout} loggedIn={this.state.loggedIn} />
					{/*  ROUTES */}
					{/* <Route exact path="/" component={Home} /> */}
					<Route exact path="/" render={() => <Home user={this.state.user} />} />
					<Route
						exact
						path="/login"
						render={() =>
							<LoginForm
								_login={this._login}
								_googleSignin={this._googleSignin}
							/>}
					/>
					<Route exact path="/signup" component={SignupForm} />
					{/* <LoginForm _login={this._login} /> */}
				</div>
			);
		} else {
			return (
				<div className="App">
					<h1>This is the main App component</h1>
					{/* <Header 
						user={this.state.user} 
						response={this.state.response}
						postTerm={this.state.postTerm}
						postLocation={this.state.postLocation}
						responseToPost={this.state.responseToPost}
						handleSubmit={this.handleSubmit}
						onChangeT={this.onChangeT}
						onChangeL={this.onChangeL}
					/> */}
					<p>{this.state.response}</p>
					<form onSubmit={this.handleSubmit}>
					<p>
						<strong>Yelp Fusion POST request:</strong>
					</p>
					<p>term:</p>
					<input
						type="text"
						value={this.state.postTerm}
						onChange={e => this.setState({ postTerm: e.target.value })}
					/>
					<p>location:</p>
					<input
						type="text"
						value={this.state.postLocation}
						onChange={e => this.setState({ postLocation: e.target.value })}
					/>
					<br></br>
					<br/>
					<button type="submit">Submit</button>
					</form>
					{/* <p>{this.state.responseToPost}</p> */}
					{/* <pre>{this.state.responseToPost}</pre> */}
					{/* {jTable(this.state.responseToPost)} */}
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
					{/* LINKS to our different 'pages' */}
					<DisplayLinks _logout={this._logout} loggedIn={this.state.loggedIn} />
					{/*  ROUTES */}
					{/* <Route exact path="/" component={Home} /> */}
					<Route exact path="/" render={() => <Home user={this.state.user} />} />
					<Route
						exact
						path="/login"
						render={() =>
							<LoginForm
								_login={this._login}
								_googleSignin={this._googleSignin}
							/>}
					/>
					<Route exact path="/signup" component={SignupForm} />
					{/* <LoginForm _login={this._login} /> */}
				</div>
			)
		}
	}
}

export default App;
