const express = require('express')
const { loginUser, signupUser, checkUser, checkReset, resetPassword } = require('../controllers/userController')
const VerifyToken = require('../controllers/verifyToken')
const { getUserSongs, setQueue } = require('../controllers/userSongController')

const router = express.Router()

router.post('/login', loginUser)
router.post('/signup', signupUser)
router.post('/check', checkUser)
router.post('/securitycheck', checkReset)
router.patch('/resetpassword', resetPassword)


router.use(VerifyToken)
router.get('/songs', getUserSongs)
router.patch('/setqueue', setQueue)


router.post('/verify', (req, res) => {
    res.json({ verify: "success" })
})

module.exports = router
