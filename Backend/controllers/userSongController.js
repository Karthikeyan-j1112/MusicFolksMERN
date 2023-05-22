const UserSongs = require('../models/userSongsModel')

const getUserSongs = async (req, res) => {
    try {
        const userSongs = await UserSongs.findOne({ userId: req.user._id })
        res.json({ userSongs })
    } catch (error) {
        res.status(400).json(error);
    }
}

const setQueue = async (req, res) => {    
    try {
        await UserSongs.updateOne({ userId: req.user._id }, { $set: { queue: req.body.queue } })

        const result = await UserSongs.findOne({ userId: req.user._id })

        res.json(result.queue)

    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

const getQueue = async (req,res) =>{
    try {
        
        const queue = await UserSongs.findOne({ userId: req.user._id },{})

    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
}

module.exports = {
    getUserSongs,
    setQueue    
}