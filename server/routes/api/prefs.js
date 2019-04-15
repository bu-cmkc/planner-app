const express = require('express');
const router = express.Router();
const auth = require('../../auth');
const passport = require('passport'); 

// Pref Model
const Pref = require('../../db/models/Pref');
const User = require('../../db/models/user');

// function loggedIn(req, res, next) {
//     if (req.user) {
//         console.log(preference);
//         next();
//     } else {
//         res.redirect('/login');
//     }
// }

// @route   GET api/prefs
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
  Pref.find()
    .sort({ date: -1 })
    .then(items => res.json(items));

  // User.find()
  //       .then(user => res.json(user));
});


// @route   POST api/prefs
// @desc    Create An Pref
// @access  Private
router.post('/', (req, res) => {
    const { pref } = req.body;
    const { user_id } = req.body;
    console.log(user_id);

    // loggedIn, function (lreq, lres, next) {
    const newPref = new Pref({
      pref: pref, 
      user: user_id
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
