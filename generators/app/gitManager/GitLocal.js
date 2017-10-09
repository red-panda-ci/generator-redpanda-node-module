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
    execSync(`git add --ignore-errors ${pattern}`)
    return this
  }

  createAndPushDevelopSync (commit) {
    execSync(`git commit -m ${commit}`)
    execSync('git branch -m develop')
    execSync('git push origin develop')
    return this
  }

  createAndPushMasterSync () {
    execSync('git checkout -b master')
    execSync('git push origin master')
    return this
  }
}

module.exports = GitLocal
