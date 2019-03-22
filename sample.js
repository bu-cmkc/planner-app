'use strict';

const yelp = require('yelp-fusion');

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = 'QDgDC978iTKi0REpCdl57wm7cj4GdR39pshHcOa1xH2lllBJWAuISYhUnKncrOeZQss43zLgOPzxuD3PlNcgacLIbJmOm5-7ZXQrTmIq5nDZj2Ed_zR6BQkHhDOVXHYx';

const searchRequest = {
  term:'Four Barrel Coffee',
  location: 'san francisco, ca'
};

const client = yelp.client(apiKey);

client.search(searchRequest).then(response => {
  const firstResult = response.jsonBody.businesses[0];
  const prettyJson = JSON.stringify(firstResult, null, 4);
  console.log(prettyJson);
}).catch(e => {
  console.log(e);
});