import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Create from './components/Create';
import Index from './components/Index';
import Home from './components/Home';
import Login from './components/Login';
import Generate from './components/Generate';
import axios from 'axios';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

// const DisplayLinks = props => {
// 	if (props.loggedIn) {
// 		return (
// 			<nav className="navbar">
// 				<ul className="nav">
// 					<li className="nav-item">
// 						<Link to="/" className="nav-link">
// 							Home
// 						</Link>
// 					</li>
// 					<li>
// 						<Link to="#" className="nav-link" onClick={props._logout}>
// 							Logout
// 						</Link>
// 					</li>
// 				</ul>
// 			</nav>
// 		)
// 	} else {
// 		return (
// 			<nav className="navbar">
// 				<ul className="nav">
// 					<li className="nav-item">
// 						<Link to="/" className="nav-link">
// 							Home
// 						</Link>
// 					</li>
// 					<li className="nav-item">
// 						<Link to="/login" className="nav-link">
// 							login
// 						</Link>
// 					</li>
// 					<li className="nav-item">
// 						<Link to="/signup" className="nav-link">
// 							sign up
// 						</Link>
// 					</li>
// 				</ul>
// 			</nav>
// 		)
// 	}
// }

const Navlog = props => {
  if (props.loggedIn) {
		return (
      <ul className="navbar-nav mr-auto">
      <li className="nav-item"><Link to={'#'} className="nav-link" onClick={props._logout}>Logout</Link></li>
      <li className="nav-item"><Link to={'/generate'} className="nav-link">Generate</Link></li>
        <li className="nav-item"><Link to={'/create'} className="nav-link">Create</Link></li>
        <li className="nav-item"><Link to={'/index'} className="nav-link">List</Link></li>
      </ul>
    )
    } else {
      return (
        <ul className="navbar-nav mr-auto">
        <li className="nav-item"><Link to={'/login'} className="nav-link">Login</Link></li>
          {/* <li className="nav-item"><Link to={'/create'} className="nav-link">Create</Link></li>
          <li className="nav-item"><Link to={'/index'} className="nav-link">List</Link></li> */}
        </ul>
      )
    }
}

class App extends Component {
  constructor() {
		super()
		this.state = {
			loggedIn: false,
			user: null
		}
		this._logout = this._logout.bind(this)
		// this._login = this._login.bind(this)
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
		})
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
  
  // _login(username, password) {
	// 	axios
	// 		.post('/auth/login', {
	// 			username,
	// 			password
	// 		})
	// 		.then(response => {
	// 			console.log(response)
	// 			if (response.status === 200) {
	// 				// update the state
	// 				this.setState({
	// 					loggedIn: true,
	// 					user: response.data.user
	// 				})
	// 			}
	// 		})
	// }

  render() { 
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <p className="navbar-brand"><Link to={'/'} className="nav-link">React Axios App</Link></p>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <Navlog _logout={this._logout} loggedIn={this.state.loggedIn} />
              {/* <ul className="navbar-nav mr-auto">
              <li className="nav-item"><Link to={'/login'} className="nav-link">Login</Link></li>
                <li className="nav-item"><Link to={'/create'} className="nav-link">Create</Link></li>
                <li className="nav-item"><Link to={'/index'} className="nav-link">List</Link></li>
              </ul> */}
              <hr />
            </div>
          </nav>
          {/* <DisplayLinks _logout={this._logout} loggedIn={this.state.loggedIn} /> */}
          
          <Switch>
              <Route exact path='/' render={() => <Home user={this.state.user} />} />
              <Route exact path='/login' component={ Login } />
              <Route exact path='/generate' component={ Generate } />
              <Route exact path='/create' component={ Create } />
              <Route path='/index' component={ Index } />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
