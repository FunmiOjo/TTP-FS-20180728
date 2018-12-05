const express = require('express')
const router = express.Router()

router.use('/stocks', require('./stocks'))
router.use('/balance', require('./balance'))

module.exports = router
