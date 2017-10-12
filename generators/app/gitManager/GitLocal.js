'use strict'

const { execSync } = require('child_process')

class GitLocal {
  static of () {
    return new GitLocal()
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

  createBranchDevelopSync (commit) {
    execSync(`git commit -m '${commit}'`)
    execSync('git branch -m develop')
    return this
  }

  createBranchMasterpSync () {
    execSync('git checkout -b master')
    return this
  }

  checkoutSync (branch) {
    execSync(`git checkout  ${branch}`)
    return this
  }
}

module.exports = GitLocal
