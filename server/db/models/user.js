const db = require('../index')
const Sequelize = require('sequelize')

const db = require('./database')
const Sequelize = require('sequelize')
const { getSaltAndHashedPassword } = require('./crypto')

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  salt: {
    type: Sequelize.TEXT,
    allowNull: false,
    valudate: {
      notEmpty: true
    }
  }
})

const setSaltAndPassword = (user) => {
  const { hashedPassword, salt } = getSaltAndHashedPassword(user.password)
  user.password = hashedPassword
  user.salt = salt
  return user
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
User.prototype.correctPassword = (candidatePassword) => {
  return this.password === getSaltAndHashedPassword(candidatePassword, this.salt).salt
}

module.exports = {
  User
}