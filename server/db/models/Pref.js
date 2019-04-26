const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PrefSchema = new Schema({
    preferences: {
        food: {
            type: String,
            required: true
        },
        activities: {
            type: String,
            required: true
        },
        radius: {
            type: String,
            required: false
        },
        location:{
            type: String,
            required: false
        },
        date: {
            start: {
                type: String,
                required: false
            },
            end: {
                type: String,
                required: false
            },
            type: String,
            required: false
        },
        type: Array, 
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: String,
        required: true
    }
});

// mongoose.model('name of model', schema);
module.exports = Pref = mongoose.model('pref', PrefSchema);
