'use strict'

const GitRemoteable = require('./GitRemoteable')
const { projection } = require('../../utils')
const { always } = require('ramda')
const alwaysNull = always(null)

class Bitbucket extends GitRemoteable {
  constructor () {
    super()
    this.apiManager = null
  }

  static of (authentication) {
    return null
  }

  projection (data) {
    return projection({
      htmlUrl: alwaysNull,
      ownerUrl: alwaysNull,
      sshUrl: alwaysNull
    })(data)
  }
}

module.exports = Bitbucket
