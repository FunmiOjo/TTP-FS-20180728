const db = require('../index')
const Sequelize = require('sequelize')

const Stock = db.define('stock', {
  symbol: {
    type: Sequelize.STRING,
    validate: {
      allowEmpty: false,
    },
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      allowEmpty: false,
    },
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
