const express = require('express')
const router = express.Router()
const { Stock } = require('../db/models')

router.post('/', async (req, res) => {
  const { symbol: ticker, quantity, userId } = req.body
  try {
    const updatedStockArray = await Stock.findOrCreate({
      where: {
        ticker: ticker,
        userId: userId,
      },
    })
    const stock = updatedStockArray[0]
    const updatedStock = await stock.update({
      quantity: stock.quantity + quantity,
    })
    res.json(updatedStock)
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
