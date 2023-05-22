const express = require('express');
const { getRecent, getSongLinks } = require('../controllers/songController');
const VerifyToken = require('../middlewares/verifyToken');
const router = express.Router()

router.get('/recent',getRecent)

router.use(VerifyToken)
router.post('/getlink',getSongLinks)

module.exports = router