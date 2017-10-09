'use strict'

const GitRemoteable = require('./GitRemoteable')

class Bitbucket extends GitRemoteable {
  constructor () {
    super()
    this.apiManager = null
  }

  static of (authentication) {
    return null
  }

  createRepo (repo) {
    return null
  }
}

module.exports = Bitbucket
