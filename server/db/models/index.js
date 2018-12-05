const Balance = require('./balance')
const Stock = require('./stock')
const Trade = require('./trade')
const User = require('./user')

Balance.belongsTo(User)
Stock.belongsTo(User)
Trade.belongsTo(User)

module.exports = { Balance, Stock, User }
