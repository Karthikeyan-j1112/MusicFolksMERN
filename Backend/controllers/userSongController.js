const UserSongs = require('../models/userSongsModel')

const getUserSongs = async (req, res) => {
    try {
        const userSongs = await UserSongs.findOne({ userId: req.user })
        res.json({ userSongs })
    } catch (error) {
        res.status(400).json(error);
    }
}

const setQueue = async (req, res) => {
    try {
        const result = await UserSongs.findOneAndUpdate({ userId: req.user }, { $set: { queue: req.body.queue } }, { new: true })

        res.json(result.queue)

    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

const setRandom = async (req, res) => {
    try {

        const userSongs = await UserSongs.findOneAndUpdate({ userId: ObjectId('646b9cfde567079a73371d51') }, { $set: { is_random: req.body.is_random } }, { new: true })

        if (userSongs.is_random === req.body.is_random) {
            res.json({ status: 'success' })
        }
        else {
            res.status(400).json({ status: 'fail' })
        }
        
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

const songChange = async (req, res) => {
    try {
        let userSongs = await UserSongs.findOne({ userId: req.user })
        const is_random = userSongs.is_random
        let now_playing = is_random ? userSongs.now_playing : userSongs.random_queue_num
        let change = req.body.action === 'next' ? 1 : (-1)
        let repeat = userSongs.repeat
        now_playing += change;

        if (now_playing < 0) {
            if (repeat === 1) {
                now_playing = (is_random ? userSongs.queue.length : userSongs.random_queue.length) - 1
            }
            else if (repeat === 2) {
                now_playing = (is_random ? userSongs.queue.length : userSongs.random_queue.length) - 1
                repeat = 1
            }
            else if (repeat === 0) {
                now_playing = is_random ? userSongs.now_playing : userSongs.random_queue_num
                change = 0;
            }
        }
        else if (now_playing >= is_random ? userSongs.queue.length : userSongs.random_queue.length) {
            if (repeat === 1) {
                now_playing = 0
            }
            else if (repeat === 2) {
                now_playing = 0
                repeat = 1
            }
            else if (repeat === 0) {
                now_playing = is_random ? userSongs.now_playing : userSongs.random_queue_num
                change = 0;
            }
        }

        if (is_random)
            userSongs = await UserSongs.findOneAndUpdate({ userId: req.user }, { $set: { repeat: repeat, random_queue_num: now_playing } }, { new: true })
        else
            userSongs = await UserSongs.findOneAndUpdate({ userId: req.user }, { $set: { repeat: repeat, queue_num: now_playing } }, { new: true })

        res.json({ userSongs })

    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

const getQueue = async (req, res) => {
    try {

        const result = await UserSongs.findOne({ userId: req.user._id }, { queue: 1, is_random: 1, random_queue: 1, random_queue_num: 1 })

        let queue = result.is_random ? result.random_queue : result.queue

        res.json(queue)

    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
}

module.exports = {
    getUserSongs,
    setQueue,
    getQueue,
    songChange,
    setRandom
}