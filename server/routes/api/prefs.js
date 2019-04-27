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

router.get('/', (req, res) => {
    if (req.user) {
        Pref.find({user_id:req.user._id})
            .then(prefs => res.json(prefs));
    } else {
        return res.json({ user: null })
    }
});

// @route   POST api/prefs
// @desc    Create An Pref
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

// @route  PUT api/schedules
// @desc   Update schedule
// @access Public
router.put('/', (req, res) => {
    const { preferences } = req.body;
    const { user_id } = req.body;
    console.log("sup");

    // loggedIn, function (lreq, lres, next) {
    const newPref = {
      preferences: preferences, 
      user_id: user_id
    }
    //{upsert:true} creates pref if doesn't exist
    Pref.findOneAndUpdate({user_id: user_id}, newPref, {upsert:true}, function (err, doc) {
        if (err) {
            console.log(err);
        }
    }).catch(e => console.log(e))

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
