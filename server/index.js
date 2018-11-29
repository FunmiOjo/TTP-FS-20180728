const server = require('./server')
const db = require('./database')
const port = process.env.PORT || 3000

db.sync()
.then(() => {
  console.log('Database synced')
  server.listen(port, () => console.log(`Listening on port ${port}`))
})