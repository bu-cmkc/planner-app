const express = require('express');
const router = express.Router();
const auth = require('../../auth');
const passport = require('passport'); 

// Pref Model
const Pref = require('../../db/models/Pref');
const Schedule = require('../../db/models/Schedule');
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
        limit: 6,
      };
      const client = yelp.client(apiKey);

      client.search(searchRequest).then(response => {
        const firstResult = response.jsonBody.businesses[0];
        const prettyJson = JSON.stringify(firstResult, null, 4);
        let businessesNoTimes = Array.from(response.jsonBody.businesses);
        let keys = Object.keys(businessesNoTimes)
        let businessNames = [];
        function sleep(ms) {
              return new Promise(resolve => setTimeout(resolve, ms));
        }
        async function getAllBusinessDetails() {
          let businessesWithTimes = [];
          for (var i = 0, len = keys.length; i < len; i++) {
              await sleep(400);
              client.business(businessesNoTimes[keys[i]].id).then(response => businessesWithTimes.push(response.jsonBody)).catch(e => console.log(e)) 
          }
          res.send(businessesWithTimes);
        }
        getAllBusinessDetails();
      }).catch(e => {
        console.log(e);
    });
}

function eventbrite (res, prefs) {
    // save pref as variables
    const preferences = prefs[0];
    const activities = preferences.preferences[0].activities;
    const location = preferences.preferences[0].location;
    const start_date = preferences.preferences[0].date.start;
    const end_date = preferences.preferences[0].date.end;
    const radius = preferences.preferences[0].radius / 1000;

    // Eventbrite API
    const eb_key = require('../../../config/api').EVENTBRITE_KEY;
    const EB_URL = "https://www.eventbriteapi.com/v3/events/search/?q=" + activities + "&location.address=" + location + "&location.within=" + radius + "km" + "&start_date.range_start=" + start_date + ":00&start_date.range_end=" + end_date +":00&token=" + eb_key;
    
    async function getEventbrite() {
        let eventbriteData = []
        await axios.get(EB_URL)
        .then(res => {
            // console.log(res);
            // console.log(res.data);
            console.log(res.data.events[0].name)
            eventbriteData = res.data;
            
        })
        .catch(e => {
            console.log(e);
    });
        console.log(eventbriteData.events[0].name)
        res.send(eventbriteData)
    }
    getEventbrite();
    
}

router.get('/', (req, res) => {
    if (req.user) {
        Schedule.find({user_id:req.user._id})
            .then(
                sched =>
                res.send(sched)
            );
    } else {
        return res.json({ user: null })
    }
});

router.get('/yelp', (req, res) => {
    if (req.user) {
        Pref.find({user_id:req.user._id})
            .then(
                prefs =>
                yelp(res, prefs)
            );
    } else {
        return res.json({ user: null })
    }
});
router.get('/eventbrite', (req, res) => {
    if (req.user) {
        Pref.find({user_id:req.user._id})
            .then(
                prefs =>
                eventbrite(res, prefs)
            );
    } else {
        return res.json({ user: null })
    }
});

// @route   GET api/schedules
// @desc    Get All schedules
// @access  Public
// router.get('/', (req, res) => {
//   Pref.find()
//     .sort({ date: -1 })
//     .then(items => res.json(items));

//   // User.find()
//   //       .then(user => res.json(user));
// });


// @route   POST api/schedules
// @desc    Create schedule
// @access  Private
// router.post('/', (req, res) => {
//     const { schedule } = req.body;
//     const { user_id } = req.body;
//     console.log(user_id);

//     const newPref = new Pref({
//       schedule: schedule, 
//       user_id: user_id
//     })
//     newSchedule.save().then(Pref => res.json(Pref))
//     .catch(err => console.log(err));
//     // }
// });


// @route  PUT api/schedules
// @desc   Update schedule
// @access Public
router.put('/', (req, res) => {
    const schedule = req.body;
    const { user_id } = req.body;
    const newSched = {
      schedule: Array.from(schedule), 
      user_id: user_id
    }
    //{upsert:true} creates schedule if doesn't exist
    Schedule.findOneAndUpdate({user_id: user_id}, newSched, {upsert:true}, function (err, doc) {
        if (err) {
            console.log(err);
        }
    }).catch(e => console.log(e))
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
