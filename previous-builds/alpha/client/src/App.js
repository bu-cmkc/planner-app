import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { JsonToTable } from "react-json-to-table";
import queryString from "query-string";

// function jTable(jData) {
//   return (
//     <div>
//       <JsonToTable json={jData} />
//     </div>
//   );
// }

class App extends Component {
  state = {
    response: '',
    // post: '',
    postTerm: '',
    postLocation: '',
    responseToPost: {},
    testJson: {
      Analyst: { name: "Jack", email: "jack@xyz.com" },
      "Loaded by": "Jills",
      "Load id": 34,
      "git id": "xxqaygqertqsg98qhpughqer",
      "Analysis Id": "7asdlnagsd98gfaqsgf",
      "Load Date": "July 12, 2018",
      "Data Source": "Study XY123-456",
      "Jira Ticket": "Foo-1",
      "Confluence URL": "http://myserver/wxyz",
      "Study sponsors": [
        { name: "john", email: "john@@xyz.com" },
        { name: "jane", email: "jane@@xyz.com" }
      ]
    },
  };
  componentDidMount() {
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
    // console.log("body below");
    // console.log(body);
    this.setState({ responseToPost: body });
  };
  componentWillMount() {
    var query = queryString.parse(this.props.location.search);
    if (query.token) {
      window.localStorage.setItem("jwt", query.token);
      this.props.history.push("/");
   }
  };
  render() {
    // const myJson = {
    //   Analyst: { name: "Jack", email: "jack@xyz.com" },
    //   "Loaded by": "Jills",
    //   "Load id": 34,
    //   "git id": "xxqaygqertqsg98qhpughqer",
    //   "Analysis Id": "7asdlnagsd98gfaqsgf",
    //   "Load Date": "July 12, 2018",
    //   "Data Source": "Study XY123-456",
    //   "Jira Ticket": "Foo-1",
    //   "Confluence URL": "http://myserver/wxyz",
    //   "Study sponsors": [
    //     { name: "john", email: "john@@xyz.com" },
    //     { name: "jane", email: "jane@@xyz.com" }
    //   ]
    // };
  
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <a href="/auth/google" class="button">
          <div>
            <span class="svgIcon t-popup-svg">
              <svg
                class="svgIcon-use"
                width="25"
                height="37"
                viewBox="0 0 25 25"
              >
                <g fill="none" fill-rule="evenodd">
                  <path
                    d="M20.66 12.693c0-.603-.054-1.182-.155-1.738H12.5v3.287h4.575a3.91 3.91 0 0 1-1.697 2.566v2.133h2.747c1.608-1.48 2.535-3.65 2.535-6.24z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12.5 21c2.295 0 4.22-.76 5.625-2.06l-2.747-2.132c-.76.51-1.734.81-2.878.81-2.214 0-4.088-1.494-4.756-3.503h-2.84v2.202A8.498 8.498 0 0 0 12.5 21z"
                    fill="#34A853"
                  />
                  <path
                    d="M7.744 14.115c-.17-.51-.267-1.055-.267-1.615s.097-1.105.267-1.615V8.683h-2.84A8.488 8.488 0 0 0 4 12.5c0 1.372.328 2.67.904 3.817l2.84-2.202z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12.5 7.38c1.248 0 2.368.43 3.25 1.272l2.437-2.438C16.715 4.842 14.79 4 12.5 4a8.497 8.497 0 0 0-7.596 4.683l2.84 2.202c.668-2.01 2.542-3.504 4.756-3.504z"
                    fill="#EA4335"
                  />
                </g>
              </svg>
            </span>
            <span class="button-label">Sign in with Google</span>
          </div>
        </a>
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
          <JsonToTable class="in-data" json={this.state.responseToPost[0]} />
          <JsonToTable class="in-data" json={this.state.responseToPost[1]} />
          <JsonToTable class="in-data" json={this.state.responseToPost[2]} />
          <JsonToTable class="in-data" json={this.state.responseToPost[3]} />
          <JsonToTable class="in-data" json={this.state.responseToPost[4]} />
        </div>
      </div>
    );
  }
}
export default App;