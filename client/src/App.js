import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { JsonToTable } from "react-json-to-table";

function jTable(jData) {
  return (
    <div>
      <JsonToTable json={jData} />
    </div>
  );
}

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
          <JsonToTable json={this.state.responseToPost} />
        </div>
      </div>
    );
  }
}
export default App;