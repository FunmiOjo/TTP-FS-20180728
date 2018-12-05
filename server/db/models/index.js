const Stock = require('./stock')
const User = require('./user')
const Balance = require('./balance')

Balance.belongsTo(User)
Stock.belongsTo(User)

module.exports = { Balance, Stock, User }
