
const Song = require('../models/songModel')
const Artist = require('../models/artistModel')
const mongoose = require('mongoose')

const getRecent = async (req, res) => {
    try {
        const songs = await Song.find().limit(12)
        var result = []
        songs.forEach(async (song) => {
            let song_image;
            if (song.song_image === null) {
                const artist = await Artist.findOne({ artist: song.artist })
                song_image = 'http://drive.google.com/uc?export=view&id=' + artist.image
            }
            else {
                song_image = 'http://drive.google.com/uc?export=view&id=' + song.song_image
            }

            result.push({ ...song._doc, song_image })
        })
        res.json(result);

    } catch (error) {
        res.status(400).json(JSON.parse(error.message))
    }
}

const getSongLinks = async (req, res) => {    
    try {
        const song = await Song.findById(req.body._id)
        let song_image;
        if (song.song_image === null) {
            const artist = await Artist.findOne({ artist: song.artist })
            song_image = 'http://drive.google.com/uc?export=view&id=' + artist.image
        }
        else {
            song_image = 'http://drive.google.com/uc?export=view&id=' + song.song_image
        }
        const song_link = 'http://drive.google.com/uc?export=view&id=' + song.song_link        
        
        res.json({ ...song._doc, song_image,song_link });

    } catch (error) {
        res.status(400).json(error.message)
    }

}

module.exports = {
    getRecent,
    getSongLinks
}