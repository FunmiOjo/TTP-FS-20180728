const { expect } = require('chai')
const request = require('supertest')
const app = require('../server/server')
const db = require('../server/db')

describe('Auth routes', function() {
  before(function() {
    db.truncate()
  })

  describe('POST /auth/signup', function() {
    it('logs in user and returns user info', async function() {
      const response = await request(app)
        .post('/auth/signup')
        .send({
          name: 'Horacio Oliveira',
          email: 'horacio.oliveira@email.com',
          password: '1234',
        })

      expect(response.body.name).to.equal('Horacio Oliveira')
    })
  })

  describe('PUT /auth/login', function() {
    it('given an existing user, responds with 200 and the correct user', async function() {
      const response = await request(app)
        .put('/auth/login')
        .send({
          email: 'horacio.oliveira@email.com',
          password: '1234',
        })
      console.log('status', response.statusMessage)
      expect(response.statusCode).to.equal(200)
    })
  })
})
