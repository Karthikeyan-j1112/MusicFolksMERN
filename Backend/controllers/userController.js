const User = require('../models/userModel')
const UserSongs = require('../models/userSongsModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

const loginUser = async (req, res) => {

    const { username, password } = req.body

    try {
        const user = await User.login(username, password)

        const token = createToken(user._id)

        res.json({ name: user.name, token })

    } catch (error) {
        res.status(400).json(JSON.parse(error.message))
    }
}

const signupUser = async (req, res) => {

    const { username, password, name, dob, security_ques, security_ans } = req.body
    try {
        const user = await User.signup(username, password, name, dob, security_ques, security_ans)
        const userSongs = await UserSongs.createUser(user._id)
        const token = createToken(user._id)
        res.json({ name, token })

    } catch (error) {
        res.status(400).json(JSON.parse(error.message))
    }
}

const checkUser = async (req, res) => {
    const { username } = req.body
    try {
        if (!username) {
            throw Error('Please Provide the username')
        }
        User.findOne({ username }, { security_ques: 1, _id: 0 })
            .then(user => {
                if (!user) {
                    res.status(404).json('User not found, provide correct email/phone number')
                    return
                }
                res.json({ user })
            })
            .catch(err => {
                res.status(400).json(err.message)
            })
    } catch (error) {
        res.status(400).json(error.message)
    }
}

const checkReset = async (req, res) => {
    const { username, dob, security_ans } = req.body
    try {
        if (!username || !dob || !security_ans) {
            throw Error('Please Provide all the Field')
        }
        let user = await User.findOne({ username, dob })

        if (!user) {
            res.status(404).json({ error_field: ["dob"], error: 'Date of Birth is incorrect' })
            return
        }

        user = await User.findOne({ username, security_ans })

        if (!user) {
            res.status(404).json({ error_field: ["securityAns"], error: 'The answer for security question is incorrect' })
            return
        }
        res.json({ result: "success" })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const resetPassword = async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await User.resetPassword(username, password);
        if (!user) {
            res.status(404).json({ error_field: ["username"], error: 'The username is incorrect' })
            return
        }
        res.json({ result: "success" })
    } catch (error) {
        res.status(400).json(JSON.parse(error.message))
    }
}

module.exports = {
    loginUser,
    signupUser,
    checkUser,
    checkReset,
    resetPassword
}