//create a song model
//it is mapped to songs collection

let mongoose = require('mongoose')

//use mongoose to intialize schema
let mongoSchema = mongoose.Schema

//use mongoSchema to reference song collection in mongodb database
let songSchema = new mongoSchema({
    "videoid": String,
    "likes": Number,
    "views": Number
}, {collection:"songs"})

//export the model
module.exports = mongoose.model('song', songSchema)