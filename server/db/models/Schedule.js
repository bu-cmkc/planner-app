const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ScheduleSchema = new Schema({
  schedule: {
      rating:Number, 
      name:String,
      location:String,
      hours:[Schema.Types.Mixed],
      // id: String,
      // alias: String,
      // name: String,
      // image_url: String,
      // is_claimed: Boolean,
      // is_closed: Boolean,
      // url: String,
      // phone: String,
      // display_phone: String,
      // review_count: Number,
      // categories: [
      //   {
      //     alias: String,
      //     title: String
      //   },
      //   {
      //     alias: String,
      //     title: String
      //   },
      //   {
      //     alias: String,
      //     title: String
      //   }
      // ],
      // rating: Number,
      // location: {
      //   address1: String,
      //   address2: String,
      //   address3: String,
      //   city: String,
      //   zip_code: String,
      //   country: String,
      //   state: String,
      //   display_address: [String],
      //   cross_streets: String
      // },
      // coordinates: {
      //   latitude: Number,
      //   longitude: Number
      // },
      // photos: [String]
      // ,
      // price: String,
      // hours: [Schema.Types.Mixed],
      // transactions: [Schema.Types.Mixed],
      //   special_hours: {
      //       date: String,
      //       is_closed: Boolean,
      //       start: Number,
      //       end: Number,
      //       is_overnight: Boolean
      //   }
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
module.exports = Schedule = mongoose.model('sched', ScheduleSchema);
