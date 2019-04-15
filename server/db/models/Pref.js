const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PrefSchema = new Schema({
    pref: { 
        type: String,
        required: true
    }, 
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: String,
        required: true
    }
});

// mongoose.model('name of model', schema);
module.exports = Pref = mongoose.model('pref', PrefSchema);
