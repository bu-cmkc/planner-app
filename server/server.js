// === ENVIORNMENT === //

if (process.env.NODE_ENV !== 'production') {
    console.log("loading dev environments...")
    require('dotenv').config()
}

require ('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const dbConnection = require('./db')
const passport = require('./passport')
const app = express()
const PORT = process.env.PORT || 8080

// === MIDDLEWARE === ///

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(session({
    secret: process.env.APP_SECRET || "this is the default passphrase",
    store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: false,
    saveUninitialized: false
}))

// === PASSPORT === //

app.use(passport.initialize())
app.use(passport.session())

// const yelp = require('yelp-fusion');
// const apiKey = require('./../config/api').YELP_KEY;
// const searchRequest = {
//     term:'Four Barrel Coffee',
//     location: 'san francisco, ca'
  
//   };
  
//   const client = yelp.client(apiKey);
  
//   client.search(searchRequest).then(response => {
//     const firstResult = response.jsonBody.businesses[0];
//     // const prettyJson = JSON.stringify(firstResult, null, 4);
//     const prettyJson = JSON.stringify(response.jsonBody, null, 4);
//     console.log(prettyJson);
//   }).catch(e => {
//     console.log(e);
//   });
  


// === SOME API CALLS THAT ARGUABLY SHOULDN'T BE HERE === //

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
  const apiKey = require('./../config/api').YELP_KEY;
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





// === PRODUCTION === //
if (process.env.NODE_ENV === 'production') {
    const path = require('path')
    console.log("YOU ARE IN THE PRODUCTION ENV")
    app.use('/static', express.static(path.join(__dirname, '../build/static')))
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../build/'))
    })
}

// === ROUTING === //
app.use('/auth', require('./auth'))
app.use('/api/prefs', require('./routes/api/prefs'));
app.use('/api/schedules', require('./routes/api/schedules'));

// === ERROR === //
app.use(function(err, req, res, next) {
    console.log("=== ERROR ===")
    console.error(err.stack)
    res.status(500)
})

// === START === //
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`)
})
