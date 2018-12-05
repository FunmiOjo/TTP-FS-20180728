const db = require('../index')
const Sequelize = require('sequelize')

const Balance = db.define('balance', {
  amount: {
    type: Sequelize.DOUBLE,
    defaultValue: 5000,
  },
})

module.exports = Balance
