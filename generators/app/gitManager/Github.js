'use strict'

const GitRemoteable = require('./GitRemoteable')
const GitHubApi = require('github')
const { prop } = require('ramda')

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
    return remoteRepo.then(prop('data'))
  }
}

module.exports = Github
