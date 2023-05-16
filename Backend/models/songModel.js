const mongoose = require('mongoose');

const Schema = mongoose.Schema

const songSchema = new Schema({
    song_name: String,
    artist: String,
    date_created: Date,
    song_image: String,
    song_link: String,
    duration: String
}, {collection:'songs'})

module.exports = mongoose.model('song',songSchema)

