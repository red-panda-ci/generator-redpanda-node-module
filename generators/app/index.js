'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const { readdirSync } = require('fs')
const { join } = require('path')
const prompts = require('./prompts')
const { createGithubRepo } = require('./utils')
const { execSync } = require('child_process')
// const splitKeywords = require('split-keywords')

module.exports = class extends Generator {
  constructor (...args) {
    super(...args)
    this.githubRepo = null

    this.createGithubRepo = function () {
      const { githubUser, githubPass, githubToken, name } = this.props
      const done = this.async()

      const auth = this.props.githubAuthType === 'user and password'
                    ? {type: 'basic', username: githubUser, password: githubPass}
                    : {type: 'oauth', token: githubToken}

      createGithubRepo(auth, {name})
      .then((data) => {
        this.githubRepo = data
        this.props.gitrepository = data.html_url
        this.props.ownerurl = data.owner.html_url
        done(null, data)
      })
      .catch(done)
    }

    this.addRemoteRepo = function () {
      execSync(`git remote add origin ${this.githubRepo.ssh_url}`)
      return this
    }

    this.syncRemoteRepo = function () {
      execSync(`git commit --no-verify -m 'New: Initial commit'`)
      execSync('git branch -m develop')
      execSync(`git push origin develop`)
      return this
    }

    this.createGitFlow = function () {
      execSync('git init')
      return this
    }

    this.pushToDevelop = function () {
      execSync('git push origin develop')
      return this
    }
  }

  prompting () {
    this.log(yosay(`Welcome to the beautiful ${chalk.red('generator-redpanda-node-module')} generator!`))

    return this.prompt(prompts(this)).then(props => {
     // props.keywords = splitKeywords(props.keywords)
      this.props = props
    })
  }

  runBefore () {
    (this.props.isNewGithubRepo) && this.createGithubRepo()
  }

  runAfter () {
    this.createGitFlow()
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
      execSync('git add --ignore-errors * .*[a-zA-Z0-9]')
    } catch (err) {
      console.log(err.message)
    }

    if (this.props.isNewGithubRepo) this.addRemoteRepo()
    if (this.props.syncGithubRepo) this.syncRemoteRepo()
  }
}
