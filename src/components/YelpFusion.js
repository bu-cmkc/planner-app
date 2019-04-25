import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
// import axios from 'axios';

const YelpFusion = props => {
    return (
        <div classname="YelpFusion">
            <p>{props.stateResponse}</p>
            <p>
                <strong>Yelp Fusion POST request:</strong>
            </p>
            <form onSubmit={props.handleSubmit}>
                <p>term:</p>
                <input
                    type="text"
                    value={props.statePostTerm}
                    onChange={e => props.setState({ postTerm: e.target.value })}
                />
                <p>location:</p>
                <input
                    type="text"
                    value={props.statePostlocation}
                    onchange={e => props.setState({ postlocation: e.target.value })}
                />
                <br></br>
                <br/>
                <button type="submit">submit</button>
            </form>
        </div>
    )
}


export default YelpFusion;
