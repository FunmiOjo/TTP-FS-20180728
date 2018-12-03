const Stock = require('./stock')
const User = require('./user')

Stock.belongsTo(User)

module.exports = { Stock, User }
