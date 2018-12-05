const db = require('../index')
const Sequelize = require('sequelize')

const Stock = db.define('stock', {
  ticker: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: false,
    },
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
})

Stock.prototype.addShares = function(quantitySharesToAdd) {
  return this.update({
    quantity: this.quantity + quantitySharesToAdd,
  })
}

Stock.prototype.subtractShares = function(quantitySharesToSubtract) {
  return this.update({
    quantity: this.quantity - quantitySharesToSubtract,
  })
}

module.exports = Stock
