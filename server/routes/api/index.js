const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = express.Router()
// const app = express();

const morgan = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const dbConnection = require('./db')
const passport = require('./passport')
const port = process.env.PORT || 8080

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// API calls
router.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
router.post('/api/world', (req, res) => {
  console.log(req.body);
  console.log(req.body['postTerm']);
  // res.send(
  //   `I received your POST request. This is what you sent me: ${req.body.post}`,
  // );
  const yelp = require('yelp-fusion');
  const apiKey = require('/config/api').YELP_KEY;
  const searchRequest = {
    term: req.body['postTerm'],
    location: req.body['postLocation'],
    limit: 10,
  };
  const client = yelp.client(apiKey);

  client.search(searchRequest).then(response => {
    const firstResult = response.jsonBody.businesses[0];
    const prettyJson = JSON.stringify(firstResult, null, 4);
    // const prettyJson = JSON.stringify(response.jsonBody, null, 4);
    // console.log('hi');
    console.log(response.jsonBody.businesses[0]);
    // console.log(prettyJson);
    res.send(
      response.jsonBody.businesses,
    );
  }).catch(e => {
    console.log(e);
  });
});
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  router.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  router.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
router.listen(port, () => console.log(`Listening on port ${port}`));

const api = null
module.exports = api
