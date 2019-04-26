const express = require('express');
const router = express.Router();
const auth = require('../../auth');
const passport = require('passport'); 

// Pref Model
const Pref = require('../../db/models/Pref');
const User = require('../../db/models/user');
const axios = require('axios');

// function loggedIn(req, res, next) {
//     if (req.user) {
//         console.log(preference);
//         next();
//     } else {
//         res.redirect('/login');
//     }
// }

function yelp(res, prefs) {
      const preferences = prefs[0];
      const food = preferences.preferences[0].food;
      // const activities = preferences.preferences[0].activities;
      const location = preferences.preferences[0].location;
      const date = preferences.preferences[0].date;
      const radius = preferences.preferences[0].radius;

      const yelp = require('yelp-fusion');
      const apiKey = require('../../../config/api').YELP_KEY;
      console.log(food);
      const searchRequest = {
        location: location,
        radius: Number(radius),
        categories: food,
        limit: 10,
      };
      const client = yelp.client(apiKey);

      client.search(searchRequest).then(response => {
        const firstResult = response.jsonBody.businesses[0];
        const prettyJson = JSON.stringify(firstResult, null, 4);
        // const prettyJson = JSON.stringify(response.jsonBody, null, 4);
        // console.log('hi');
        console.log(response.jsonBody.businesses[0]);
        console.log(response.jsonBody);
        // console.log(prettyJson);
        res.send(
          response.jsonBody.businesses,
        );
      }).catch(e => {
        console.log(e);
    });
}

router.get('/', (req, res) => {
    if (req.user) {
        Pref.find({user_id:req.user._id})
            .sort({ date: -1 })
            .then(items => 
                yelp(res, items)
            );
    } else {
        return res.json({ user: null })
    }
});

// @route   GET api/schedule
// @desc    Get All Schedules
// @access  Public
// router.get('/', (req, res) => {
//   Pref.find()
//     .sort({ date: -1 })
//     .then(items => res.json(items));

//   // User.find()
//   //       .then(user => res.json(user));
// });


// @route   POST api/schedule
// @desc    Create A Schedule
// @access  Private
router.post('/', (req, res) => {
    const { preferences } = req.body;
    const { user_id } = req.body;
    console.log(user_id);

    // loggedIn, function (lreq, lres, next) {
    const newPref = new Pref({
      preferences: preferences, 
      user_id: user_id
    })
    newPref.save().then(Pref => res.json(Pref))
    .catch(err => console.log(err));
    // }
});

// @route   DELETE api/items/:id
// @desc    Delete A Pref
// @access  Private
// router.delete('/:id', auth, (req, res) => {
//   Pref.findById(req.params.id)
//     .then(Pref => Pref.remove().then(() => res.json({ success: true })))
//     .catch(err => res.status(404).json({ success: false }));
// });

module.exports = router;
