const crypto = require('crypto')

const generateSalt = (length) => {
  return crypto.randomBytes(length).toString('hex')
}

const hasher = (hashAlgo) => {
  return (password) => {
    const salt = generateSalt(128)
    const hash = crypto.createHmac(hashAlgo, salt)
    hash.update(password)
    const hashedPassword = hash.digest('hex')
    return {
      hashedPassword,
      salt
    }
  }
}

const getSaltAndHashedPassword = hasher('sha512')

module.exports = {
  getSaltAndHashedPassword
}
