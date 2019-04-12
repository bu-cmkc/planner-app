// === MONGO DATABASE === //
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
let MONGO_URL
const MONGO_LOCAL_URL = 'mongodb://localhost/mern-passport'

if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI)
    MONGO_URL = process.env.MONGODB_URI
} else {
    // Local MongoDB URL.
    mongoose.connect(MONGO_LOCAL_URL)
    MONGO_URL = MONGO_LOCAL_URL
}

const db = mongoose.connection

db.on('error', err => {
    console.log(`There was an error connecting to the database: ${err}`)
})

db.once('open', () => {
    console.log(
        `You have successfully connected to your Mongo database: ${MONGO_URL}`
    )
})

module.exports = db