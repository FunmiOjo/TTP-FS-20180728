const express = require('express')
const router = express.Router()

router.use('/stocks', require('./stocks'))

module.exports = router
