const path = require('path')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const db = require('./db')
const { User } = require('./db/models')
const session = require('express-session')
const passport = require('passport')
const app = express()
const port = process.env.PORT || 3000

//middleware

// session middleware
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const dbStore = new SequelizeStore({ db: db })
dbStore.sync()

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'yoursecretlovewhycantwetellsomebody',
    store: dbStore,
    resave: false,
    saveUninitialized: false,
  })
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (error) {
    done(error)
  }
})

app.use(passport.initialize())
app.use(passport.session())

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, '..', '/public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//routes
app.use('/api', require('./api'))
app.use('/auth', require('./auth'))

app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', '/public/index.html'))
})

app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error')
})

if (!module.parent) {
  db.sync()
    .then(() => {
      console.log('Database synced')
    })
    .then(() => {
      app.listen(port, () => console.log(`Listening on port ${port}`))
    })
    .catch(error => console.error(error))
}

module.exports = app
