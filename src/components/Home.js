import React, { Component } from 'react';
import axios from 'axios';

export default class Home extends Component {

  constructor(props) {
      super(props);
      this.state = {

      };
    }
    // componentDidMount(){
    //   axios.get('http://localhost:4000/serverport')
    //   .then(response => {
    //     this.setState({ serverports: response.data });
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   })
    // }
    // tabRow(){
    //     return this.state.serverports.map(function(object, i){
    //         return <TableRow obj={object} key={i} />;
    //     });
    // }

    render() {
      return (
        <div className="container">
            <h1>Welcome home!</h1>
        </div>
      );
    }
  }