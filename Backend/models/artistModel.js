const mongoose = require('mongoose');

const Schema = mongoose.Schema

const artistSchema = new Schema({
    artist: String,
    image: String

}, { collection: 'artists' })

module.exports = mongoose.model('artist', artistSchema)

