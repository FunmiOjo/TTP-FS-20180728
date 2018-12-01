const { expect } = require('chai')
const { User } = require('../server/db/models')

describe('User model', () => {
  describe('findByEmail class method', () => {
    let user
    beforeEach(async () => {
      const createdUser = await User.findOrCreate({
        where: {
          name: 'Horacio Oliveira',
          email: 'horacio.oliveira@email.com',
          password:
            'vosnoelegíslalluviaquetevaacalarhastaloshuesoscuandosalísdeunconcierto',
          salt: 'salt',
        },
      })
      user = await User.findByEmail('horacio.oliveira@email.com')
    })

    it('returns a User instance', () => {
      expect(user).to.have.property('name')
    })

    it('returns the correct user', () => {
      expect(user.name).to.equal('Horacio Oliveira')
    })
  })
})
