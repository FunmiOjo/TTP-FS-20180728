const express = require('express')
const router = express.Router()

router.use('/balance', require('./balance'))
router.use('/stocks', require('./stocks'))
router.use('/trades', require('./trades'))

module.exports = router
