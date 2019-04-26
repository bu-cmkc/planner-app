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

router.get('/', (req, res) => {
    async function getUser() {
      try {
          const response = await auth.get('/auth/user');
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
    getUser();
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
