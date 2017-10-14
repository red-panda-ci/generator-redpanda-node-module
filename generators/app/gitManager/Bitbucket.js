'use strict'

const GitRemoteable = require('./GitRemoteable')
const { projection } = require('../../utils')
const { always } = require('ramda')
const alwaysNull = always(null)

class Bitbucket extends GitRemoteable {
  constructor (opt) {
    super()
    this.authentication = opt.authentication
    this.apiManager = null
  }

  static of (...args) {
    return new Bitbucket(...args)
  }

  createRepo (repo) {
    return Promise.resolve(null)
  }

  projection (data) {
    return projection({
      htmlUrl: alwaysNull,
      ownerUrl: alwaysNull,
      sshUrl: alwaysNull
    }, data)
  }
}

module.exports = Bitbucket
