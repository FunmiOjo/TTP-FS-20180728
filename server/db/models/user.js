const db = require('../index')
const Sequelize = require('sequelize')
const {
  generateSalt,
  getHashedPassword,
  isCorrectPassword,
} = require('../../crypto')

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  balance: {
    type: Sequelize.DOUBLE,
    defaultValue: 5000,
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  salt: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
})

User.beforeValidate(function(user) {
  user.salt = generateSalt(128)
  user.password = getHashedPassword(user.password, user.salt)
})

User.prototype.isCorrectPassword = function(providedPassword) {
  return isCorrectPassword(providedPassword, this.password, this.salt)
}

User.findByEmail = function(email) {
  return User.findOne({
    where: {
      email: email,
    },
  })
}

module.exports = User
