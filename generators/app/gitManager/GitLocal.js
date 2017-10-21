'use strict'

const { execSync } = require('child_process')

class GitLocal {
  constructor (opt) {
    this.commitPreset = opt.commitPreset
    this.initialCommits = {
      'eslint': 'Build: Initial commit',
      'angular': 'chore(init): Initial commit',
      'atom': ':art: initial commit',
      'ember': '[FEATURE init] Initial commit'
    }

    this.releaseCommits = {
      'eslint': 'New: Release to',
      'angular': 'chore(init): Release to',
      'atom': ':art: Release to',
      'ember': '[FEATURE init] Release to'
    }
  }

  static of (...args) {
    return new GitLocal(...args)
  }
  remoteAddSync (sshUrl) {
    execSync(`git remote add origin ${sshUrl}`)
    return this
  }

  initSync () {
    execSync('git init')
    return this
  }

  pushSync (branch) {
    execSync(`git push origin ${branch}`)
    return this
  }

  addSync (pattern) {
    execSync(`git add ${pattern}`)
    return this
  }

  createBranchDevelopSync () {
    const commit = this._getInitialCommit()
    execSync(`git commit -m '${commit}'`)
    execSync('git branch -m develop')
    return this
  }

  createBranchMasterSync () {
    execSync('git checkout -b master')
    return this
  }

  checkoutSync (branch) {
    execSync(`git checkout  ${branch}`)
    return this
  }

  _getInitialCommit () {
    return this.initialCommits[this.commitPreset]
  }

  getReleaseCommit () {
    return this.releaseCommits[this.commitPreset]
  }
}

module.exports = GitLocal
