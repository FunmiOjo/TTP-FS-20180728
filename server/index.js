const app = require('./server')
const db = require('./db')
const port = process.env.PORT || 3000

// const init = async () => {
//   try {
//     await db.sync()
//     console.log('Database synced')
//     const server = app.listen(port, () =>
//       console.log(`Listening on port ${port}`)
//     )
//   } catch (error) {
//     console.error(error)
//   }
// }

// init()
