'use strict'

const GitRemoteable = require('./GitRemoteable')
const GitHubApi = require('github')
const { prop, path } = require('ramda')
const { projection } = require('../utils')

class Github extends GitRemoteable {
  /**
   * Creates an instance of Github.
   * @param {Object} authentication
   * @param {string} authentication.type
   * @param {string} authentication.username
   * @param {string} authentication.password
   * @param {string} authentication.token
   * @memberof Github
   * @example
   */
  constructor (authentication) {
    super()
    this.authentication = authentication
    this.apiManager = new GitHubApi()
    this.apiManager.authenticate(authentication)
  }

  static of (authentication) {
    return new Github(authentication)
  }

  createRepo (data) {
    const { org, name } = data
    const repo = org ? { name, org } : { name }
    const remoteRepo = org ? this.apiManager.repos.createForOrg(repo) : this.apiManager.repos.create(repo)
    return remoteRepo
            .then(prop('data'))
            .then(this.projection)
            .catch((err) => {
              console.log('err', err)
            })
  }

  projection (data) {
    return projection({
      htmlUrl: prop('html_url'),
      ownerUrl: path(['owner', 'html_url']),
      sshUrl: prop('ssh_url')
    })(data)
  }
}

module.exports = Github
