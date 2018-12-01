const express = require('express')
const router = express.Router()
const { User } = require('../db/models')

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.post('/signup', async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    const user = await User.create({ name, email, password })
    res.json(user)
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
      req.login(user, err => {
        if (err) {
          console.error(error)
          next(err)
        } else {
          console.log('response')
          res.json(user)
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
  res.redirect('/')
})

module.exports = router