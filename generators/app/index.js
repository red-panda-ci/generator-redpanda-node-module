'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const { readdirSync } = require('fs')
const { join } = require('path')
const prompts = require('./prompts')
const createGitManager = require('./gitManager')

module.exports = class GeneratorNodeRedPanda extends Generator {
  constructor (...args) {
    super(...args)
    this.gitManager = null
    this.remoteRepo = null
    this.createGitManager = createGitManager

    this.getAuthentication = function () {
      const { gitUser, gitPass, gitToken } = this.props
      return (this.props.gitAuthType === 'USER_AND_PASSWORD')
             ? {type: 'basic', username: gitUser, password: gitPass}
             : {type: 'oauth', token: gitToken}
    }

    this.createRemoteRepo = function () {
      const { name, gitOrganization } = this.props
      const done = this.async()

      this.gitManager
      .createRepo({
        name,
        org: gitOrganization
      })
      .then((remoteRepo) => {
        this.remoteRepo = remoteRepo
        this.props.gitrepository = remoteRepo.htmlUrl
        this.props.ownerurl = remoteRepo.ownerUrl
        this.props.sshUrl = remoteRepo.sshUrl
        done(null, remoteRepo)
      })
      .catch(done)
    }
  }

  prompting () {
    this.log(yosay(`Welcome to the beautiful ${chalk.red('generator-redpanda-node-module')} generator!`))

    return this.prompt(prompts(this)).then(props => {
      this.props = props
      // @todo add linter selection
      this.props.linterPreset = 'eslint'
    })
  }

  runBefore () {
    this.gitManager = (this.props.hasRemoteRepo)
                      ? this.createGitManager('GITHUB', this.getAuthentication())
                      : this.createGitManager()
  }

  runAfter () {
    if (this.props.hasRemoteRepo) this.createRemoteRepo()
    this.gitManager.initSync() // init in runAfter for create .git to register hunsky hooks ofter install deps
  }

  writing () {
    readdirSync(join(__dirname, './templates')).forEach((file) => {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file),
        this.props
      )
    })
  }

  install () {
    this.installDependencies({bower: false})
  }

  end () {
    try {
      this.gitManager.addSync('* .*[a-zA-Z0-9]')
    } catch (err) {
      console.log(err.message)
    }

    this.gitManager
    .createBranchDevelopSync('New: Initial commit')
    .createBranchMasterpSync()
    .checkoutSync('develop')

    if (this.props.hasRemoteRepo) this.gitManager.remoteAddSync(this.remoteRepo.sshUrl)
    if (this.props.SyncRemoteRepo) this.gitManager.pushSync('develop').pushSync('master')
  }
}
