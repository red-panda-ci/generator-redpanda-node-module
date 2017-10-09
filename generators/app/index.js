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
      const { githubUser, githubPass, githubToken } = this.props
      return (this.props.githubAuthType === 'user and password')
             ? {type: 'basic', username: githubUser, password: githubPass}
             : {type: 'oauth', token: githubToken}
    }

    this.createRemoteRepo = function () {
      const { name } = this.props
      const done = this.async()

      this.gitManager
      .createRepo({name})
      .then((data) => {
        this.remoteRepo = data
        this.props.gitrepository = data.html_url
        this.props.ownerurl = data.owner.html_url
        done(null, data)
      })
      .catch(done)
    }
  }

  prompting () {
    this.log(yosay(`Welcome to the beautiful ${chalk.red('generator-redpanda-node-module')} generator!`))

    return this.prompt(prompts(this)).then(props => {
      this.props = props
    })
  }

  runBefore () {
    this.gitManager = (this.props.isNewGithubRepo)
                      ? this.createGitManager('github', this.getAuthentication)
                      : this.createGitManager()
  }

  runAfter () {
    if (this.props.isNewGithubRepo) this.createRemoteRepo()
    this.gitManager.initSync()
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

    if (this.props.isNewGithubRepo) this.gitManager.remoteAddSync(this.remoteRepo.ssh_url)
    if (this.props.syncGithubRepo) this.gitManager.createAndPushDevelopSync('New: Initial commit')
  }
}
