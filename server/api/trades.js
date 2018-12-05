const router = require('express').Router()
const { Trade } = require('../db/models')

router.post('/', async (req, res, next) => {
  const { ticker, quantity, price, tradeType, userId } = req.body
  console.log('Trade', Trade)
  try {
    const trade = await Trade.create({
      ticker,
      quantity,
      price,
      tradeType,
    })
    res.json(trade)
  } catch (error) {
    next(error)
  }
})

module.exports = router
