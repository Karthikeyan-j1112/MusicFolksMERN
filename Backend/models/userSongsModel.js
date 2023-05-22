const mongoose = require('mongoose')

const userSongsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.mongo.ObjectId,
        required: true,
        unique: true
    },
    liked_songs: {
        type: [mongoose.mongo.ObjectId],
        default: []
    },
    queue: {
        type: [mongoose.mongo.ObjectId],
        default: []
    },
    now_playing: {
        type: Number,
        default: 0
    },
    random_queue: {
        type: [mongoose.mongo.ObjectId],
        default: []
    },
    is_random: {
        type: Boolean,
        default: false
    },
    random_queue_num: {
        type: Number,
        default: 0
    },
    repeat: {
        type: Number,
        default: 0
    }
}, { collection: 'user_songs' })

userSongsSchema.statics.createUser = async function (userId) {
    this.create({ userId })
        .then(userSongs => {
            return userSongs
        })
        .catch(err => {
            throw Error(`${err}`)
        })
}


module.exports = mongoose.model('user_song', userSongsSchema)
