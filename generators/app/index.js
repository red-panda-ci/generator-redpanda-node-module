'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const { readdirSync } = require('fs')
const { join } = require('path')
const prompts = require('./prompts')
const splitKeywords = require('split-keywords')
const createGitManager = require('./gitManager')
const { merge } = require('./utils')

module.exports = class GeneratorNodeRedPanda extends Generator {
  constructor (...args) {
    super(...args)
    this.gitManager = null
    this.remoteRepo = null
    this.createGitManager = createGitManager

    this.getAuthentication = function () {
      const { gitUser, gitPass, gitToken } = this.props
      return (this.props.gitAuthType === 'USER_AND_PASSWORD')
        ? { type: 'basic', username: gitUser, password: gitPass }
        : { type: 'oauth', token: gitToken }
    }

    this.createRemoteRepo = function () {
      const { name, gitOrganization } = this.props
      const done = this.async()

      return this.gitManager
        .createRepo({
          name,
          org: gitOrganization
        })
        .then((repo) => {
          merge(this.props, repo)
          done(null, repo)
        })
        .catch(done)
    }
  }

  initializing () {
    this.composeWith(require.resolve('../generator-cli'))
  }

  prompting () {
    this.log(yosay(`Welcome to the beautiful ${chalk.red('generator-redpanda-node-module')} generator!`))

    return this.prompt(prompts(this)).then(props => {
      /*
        this.props description:
        {
          name {String} -project name-,
          description {String} -project descripton-,
          author {String},
          email {String},
          commitPreset {String} - eslin, angular, atom, ember -,
          projectOwner {String} - to use in README.md to configure URLs -
          hasRemoteRepo {Boolean},
          SyncRemoteRepo {Boolean},
          gitAuthType {String} - USER_AND_PASSWORD, TOKEN -,
          gitUser {String},
          gitPass {String},
          gitToken {String},
          gitRemoteProvider {String} - GITHUB, BITBUCKET, GITLAB- ,
          gitRemoteRepoType {String} - USER_REPO, ORGANIZATION_REPO -
          gitOrganization {String} - Only if is gitRemoteRepoType: ORGANIZATION_REPO - ,
          htmlUrl {String} - Repo http url -,
          ownerUrl {String} - Owner http page URL - ,
          sshUrl {String} - Git remote ssh to make push -
        }
      */
      this.props = props
      if (props.hasRemoteRepo) {
        this.props.projectOwner = (props.gitRemoteRepoType === 'ORGANIZATION_REPO') ? props.gitOrganization : props.gitUser
      }
    })
  }

  runBefore () {
    this.gitManager = this.createGitManager({
      remoteProvider: this.props.gitRemoteProvider,
      commitPreset: this.props.commitPreset,
      authentication: this.getAuthentication()
    })
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

    const pkg = this.fs.readJSON(this.destinationPath('package.json'), {})
    pkg.keywords = splitKeywords(this.props.keywords)
    this.fs.writeJSON(this.destinationPath('package.json'), pkg)
  }

  install () {
    this.installDependencies({ bower: false })
  }

  end () {
    try {
      this.gitManager.addSync('* .*[a-zA-Z0-9]')
    } catch (err) {
      console.log(err.message)
    }

    this.gitManager
      .createBranchDevelopSync()
      .createBranchMasterSync()
      .checkoutSync('develop')

    if (this.props.hasRemoteRepo) this.gitManager.remoteAddSync(this.props.sshUrl)
    if (this.props.SyncRemoteRepo) this.gitManager.pushSync('develop').pushSync('master')
  }
}
