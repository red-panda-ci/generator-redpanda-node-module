'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')

module.exports = class extends Generator {
  prompting () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the beautiful ' + chalk.red('generator-redpanda-node-module') + ' generator!'
    ))

    const prompts = [{
      type: 'confirm',
      name: 'someAnswer',
      message: 'Would you like to enable this option?',
      default: true
    }]

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props
    })
  }

  writing () {
    this.fs.copy(
      this.templatePath('index.js'),
      this.destinationPath('index.js')
    )
  }

  install () {
    this.installDependencies()
  }
}
