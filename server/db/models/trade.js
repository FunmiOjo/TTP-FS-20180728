const db = require('../index')
const Sequelize = require('sequelize')

const Trade = db.define('trade', {
  ticker: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    },
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: Sequelize.DOUBLE,
    validate: {
      notEmpty: true,
    },
  },
  tradeType: {
    type: Sequelize.ENUM('buy', 'sell'),
    validate: {
      notEmpty: true,
    },
  },
})

module.exports = Trade
