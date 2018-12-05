const router = require('express').Router()
const { Balance } = require('../db/models')

router.get('/', async (req, res) => {
  if (req.user) {
    try {
      const userBalance = await Balance.findOne({
        where: {
          userId: req.user.id,
        },
      })
      res.json(userBalance.amount)
    } catch (error) {
      console.error(error)
    }
  } else {
    res.json(new Error('Unauthorized user'))
  }
})

router.put('/', async (req, res) => {
  const { purchaseValue } = req.body

  if (req.user) {
    try {
      const userBalance = await Balance.findOne({
        where: {
          userId: req.user.id,
        },
      })
      const newAmount = userBalance.amount - purchaseValue
      const newBalance = await userBalance.update({
        amount: newAmount,
      })
      res.json(newBalance.amount)
    } catch (error) {
      console.error(error)
    }
  } else {
    res.json(new Error('Unauthorized user'))
  }
})

module.exports = router
