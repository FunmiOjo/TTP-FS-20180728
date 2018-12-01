const crypto = require('crypto')

const generateSalt = length => {
  return crypto.randomBytes(length).toString('hex')
}

const getHashedPassword = (password, salt) => {
  return crypto
    .createHash('RSA-SHA256')
    .update(password)
    .update(salt)
    .digest('hex')
}

const isCorrectPassword = (
  passwordToCheck,
  hashedPasswordInDatabase,
  saltInDatabase
) => {
  return (
    getHashedPassword(passwordToCheck, saltInDatabase) ===
    hashedPasswordInDatabase
  )
}

module.exports = {
  generateSalt,
  getHashedPassword,
  isCorrectPassword,
}
