const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
app.post('/api/world', (req, res) => {
  console.log(req.body);
  console.log(req.body['postTerm']);
  // res.send(
  //   `I received your POST request. This is what you sent me: ${req.body.post}`,
  // );
  const yelp = require('yelp-fusion');
  const apiKey = require('./api').yelpKey;
  const searchRequest = {
    term: req.body['postTerm'],
    location: req.body['postLocation']
  };
  const client = yelp.client(apiKey);

  client.search(searchRequest).then(response => {
    const firstResult = response.jsonBody.businesses[0];
    const prettyJson = JSON.stringify(firstResult, null, 4);
    console.log(prettyJson);
    res.send(
      `I received your POST request. This is what you sent me: ${prettyJson}`,
    );
  }).catch(e => {
    console.log(e);
  });
});
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
app.listen(port, () => console.log(`Listening on port ${port}`));