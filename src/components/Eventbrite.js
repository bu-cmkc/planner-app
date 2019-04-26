import React, { Component } from 'react';
import axios from 'axios';
const yelp = require('yelp-fusion');
const apiKey = 'QDgDC978iTKi0REpCdl57wm7cj4GdR39pshHcOa1xH2lllBJWAuISYhUnKncrOeZQss43zLgOPzxuD3PlNcgacLIbJmOm5-7ZXQrTmIq5nDZj2Ed_zR6BQkHhDOVXHYx'
const client = yelp.client(apiKey);

export default class Eventbrite extends Component {

    constructor(props) {
        super(props);
        this.onChangeHostName = this.onChangeHostName.bind(this);
        this.onChangePort = this.onChangePort.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            port: '',
            location: '',
            food: '',
            res: null,
        }
    }
    // componentDidMount() {
    //     const EB_URL = "https://www.eventbriteapi.com/v3/events/search/?location.address=boston+ma&start_date.keyword=this_week&token=MXFC7Q2DBU5DPHI4VZZ4";
    //     axios.get(EB_URL)
    //         .then(res => {
    //             console.log(res);
    //             console.log(res.data);
    //             this.setState({
    //                 res: res.data,
    //             })
    //             // this.state.res = res.data;
    //         })
    // }
    onChangeHostName(e) {
        this.setState({
            name: e.target.value
        });
    }
    onChangePort(e) {
        this.setState({
            port: e.target.value
        });
    }
    onChangeLocation(e) {
        this.setState({
            location: e.target.value
        });
    }
    onChangeFood(e) {
        this.setState({
            food: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const serverport = {
            name: this.state.name,
            port: this.state.port
        }
        const locationfood = {
            location: this.state.location,
            food: this.state.food
        }
        // axios.post('http://localhost:4000/serverport/add', serverport)
        // .then(res => console.log(res.data));
        
        // this.setState({
        //     name: '',
        //     port: ''
        // });
        const EB_URL = "https://www.eventbriteapi.com/v3/events/search/?location.address=" + this.state.name + "&start_date.keyword=this_week&token=MXFC7Q2DBU5DPHI4VZZ4";
        axios.get(EB_URL)
        .then(res => {
            console.log(res);
            console.log(res.data);
            // this.state.res = res.data;
            this.setState({
                res: formatRes(res.data.events)
            })
        });
        const searchRequest = {
            term: this.state.food,
            location: this.state.location  
        };

        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = 'https://api.liveconnect.in/backend/web/erpsync/get-all-orders?data=dbCode=UAT04M%7Cidx=100%7CuserId=6214%7Cres_format=1'; // site that doesn’t send Access-Control-*
        fetch(proxyurl + url).then((resp) => resp.json())
        
        client.search(searchRequest).then(response => {
            const firstResult = response.jsonBody.businesses[0];
            // const prettyJson = JSON.stringify(firstResult, null, 4);
            const prettyJson = JSON.stringify(response.jsonBody, null, 4);
            console.log(prettyJson);
          }).catch(e => {
            console.log(e);
          });
    }
    

    render() {
        if (this.state.res == null) {
            return (
                <div style={{marginTop: 50}}>
                    <h3>Generate New Events List</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Location Name:  </label>
                            <input type="text" className="form-control" value={this.state.name}  onChange={this.onChangeHostName}/>
                        </div>
                        {/* <div className="form-group">
                            <label>Food Preferences: </label>
                            <input type="text" className="form-control" value={this.state.port}  onChange={this.onChangePort}/>
                        </div> */}
                        <div className="form-group">
                            <input type="submit" value="Add Node server" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
            )
        } else {
            return (
                <div style={{marginTop: 50}}>
                {/* <pre> */}
                    <Format data={this.state.res} />
                    {/* <code>
                        {JSON.stringify(this.state.res)}
                    </code>
                    <p>{this.state.res}</p> */}
                {/* </pre> */}
                </div>
            )
        }
    }
}

const Format = ({data}) => (
    <div>
      {data.map(dat => (
        <div className="" key={dat[0]}>
            <p>{dat[1]}</p>
            <a href={dat[2]} target="_blank">{dat[2]}</a>
            <hr></hr>
        </div>
      ))}
    </div>
  ); 

function formatRes(r) {
    var resArr = []
    for (var i = 0; i < 5; i++) {
        // console.log(r[i]['name']['text'])
        resArr.push([r[i]['id'], r[i]['name']['text'], r[i]['url']])
    }
    return resArr;
}

// const Res = props => {
//     if (props.res) {
//         <code>
//             {JSON.stringify(this.state.res.events)}
//         </code>
//     } else {
//         <code></code>
//     }
// }