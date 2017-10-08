'use strict'

const GitHubApi = require('github')
const { prop } = require('ramda')

module.exports = {
  checkEmpty,
  createGithubRepo
}

function checkEmpty (value) {
  if (!value) return `Empty value is not allowed!`
  return true
}

function createGithubRepo (authentication, repo) {
  const githubApi = new GitHubApi()
  githubApi.authenticate(authentication)
  return githubApi.repos.create(repo).then(prop('data'))
}
