const express = require('express')
const router = express.Router()
const { User } = require('../db/models')

router.get('/me', (req, res) => {
  if (req.user) {
    const { name, email, id, balance } = req.user
    res.json({ name, email, id, balance })
  } else {
    res.json({})
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    const user = await User.create({ name, email, password })
    req.login(user, error => {
      if (error) {
        console.error(error)
        next(error)
      } else {
        res.json({
          name: user.name,
          email: user.email,
          id: user.id,
          balance: user.balance,
        })
      }
    })
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User is already signed up')
    } else {
      next(error)
    }
  }
})

router.put('/login', async (req, res, next) => {
  const { email, password } = req.body
  try {
    const user = await User.findByEmail(email)
    if (!user) {
      res.status(401).send('User not found')
    } else if (!user.isCorrectPassword(password)) {
      res.status(401).send('Incorrect password')
    } else {
      req.login(user, error => {
        if (error) {
          console.error(error)
          next(error)
        } else {
          res.json({
            name: user.name,
            email: user.email,
            id: user.id,
            balance: user.balance,
          })
        }
      })
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.json({})
})

module.exports = router
