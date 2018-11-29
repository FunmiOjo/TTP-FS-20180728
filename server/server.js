const path = require('path')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const db = require('./db')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const dbStore = new SequelizeStore({ db: db })
const passport = require('passport')
const app = express()

//middleware
dbStore.sync()
app.use(session({
  secret: process.env.SESSION_SECRET || 'yoursecretlovewhycantwetellsomebody',
  store: dbStore,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, '..', '/public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//routes
//app.use('/api', require('./api'))
//app.use('auth', require('./auth'))

app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', '/public/index.html'))
})

app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error')
})

module.exports = app



