'use strict'

const { expect } = require('chai')
const dummy = require('../index')

describe('Dummy test', function () {
  it('should to be a true', function () {
      expect(dummy()).to.be.true
  })
})
