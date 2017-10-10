'use strict'

const GitRemoteable = require('./GitRemoteable')
const GitHubApi = require('github')
const { prop, path } = require('ramda')
const { projection } = require('../utils')

class Github extends GitRemoteable {
  constructor (authentication) {
    super()
    this.apiManager = new GitHubApi()
    this.apiManager.authenticate(authentication)
  }

  static of (authentication) {
    return new Github(authentication)
  }

  createRepo (repo) {
    const remoteRepo = repo.orgs ? this.apiManager.orgs.addTeamRepo(repo) : this.apiManager.repos.create(repo)
    return remoteRepo.then(prop('data')).then(this.projection)
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
