import React, { Component } from 'react';
import axios from 'axios';

export default class Home extends Component {

  // constructor(props) {
  //     super(props);
  //     this.state = {

  //     };
  //   }
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
      if (this.props.user) {
        return (
          <div className="container"> 
            <h1>Welcome home!</h1>
            <img height="100" src={this.props.user.photos[0].value}></img>
            <br></br>
            <code>{JSON.stringify(this.props.user.photos[0].value)}</code>
            <code>
              {JSON.stringify(this.props)}
            </code>
          </div>
        )
      } else {
        return (
          <div className="container">
              <h1>Hello!</h1>
              {/* <h2>{}</h2> */}
          </div>
        );
      }
    }
  }