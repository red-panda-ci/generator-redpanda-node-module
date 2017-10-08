'use strict'

const username = require('git-user-name')
const email = require('git-user-email')
const { checkEmpty } = require('./utils')

module.exports = function prompts (yeoman) {
  return [
    {
      type: 'confirm',
      name: 'isNewGithubRepo',
      message: 'Do you want to create a Github repo?'
    },
    {
      type: 'confirm',
      name: 'syncGithubRepo',
      message: 'Sync with Github?',
      when: function (answers) {
        return answers.isNewGithubRepo
      }
    },
    {
      type: 'list',
      name: 'githubAuthType',
      message: 'Github authentication:',
      choices: [{
        name: 'user and password',
        value: 'user and password'
      },
      {
        name: 'authentication token',
        value: 'authentication token'
      }],
      when: function (answers) {
        return answers.isNewGithubRepo
      }
    },
    {
      type: 'input',
      name: 'gitrepository',
      message: 'Github repo url(optional):',
      default: null,
      when: function (answers) {
        return !answers.isNewGithubRepo
      }
    },
    {
      type: 'input',
      name: 'ownerurl',
      message: 'Author page url(optional):',
      default: null,
      when: function (answers) {
        return !answers.isNewGithubRepo
      }
    },
    {
      type: 'input',
      name: 'githubUser',
      message: 'User:',
      validate: checkEmpty,
      when: function (answers) {
        return answers.githubAuthType === 'user and password'
      }
    },
    {
      type: 'password',
      name: 'githubPass',
      message: 'Password:',
      validate: checkEmpty,
      when: function (answers) {
        return answers.githubAuthType === 'user and password'
      }
    },
    {
      type: 'Password',
      name: 'githubToken',
      message: 'Github token:',
      validate: checkEmpty,
      when: function (answers) {
        return answers.githubAuthType === 'authentication token'
      }
    },
    {
      type: 'input',
      name: 'name',
      message: 'Project name:',
      validate: checkEmpty,
      default: yeoman.appname.split(' ').join('-')
    },
    {
      type: 'input',
      name: 'description',
      message: 'Description:',
      validate: checkEmpty,
      default: null
    },
    {
      type: 'input',
      name: 'author',
      message: 'Author',
      default: username(),
      validate: checkEmpty
    },
    {
      type: 'input',
      name: 'email',
      message: 'Email',
      default: email(),
      validate: checkEmpty
    },
    {
      type: 'input',
      name: 'keywords',
      message: 'Keyword separated by coma',
      validate: checkEmpty
    }
  ]
}
