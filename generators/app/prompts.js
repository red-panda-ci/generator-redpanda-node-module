'use strict'

const username = require('git-user-name')
const email = require('git-user-email')
const { complement } = require('ramda')
const { checkEmpty } = require('../utils')

const hasRemoteRepo = answers => answers.hasRemoteRepo
const notHasRemoteRepo = complement(hasRemoteRepo)

module.exports = function prompts (yeoman) {
  return [
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
      message: 'Author:',
      default: username(),
      validate: checkEmpty
    },
    {
      type: 'input',
      name: 'email',
      message: 'Email:',
      default: email(),
      validate: checkEmpty
    },
    {
      type: 'list',
      name: 'commitPreset',
      message: 'Select a commit style preset',
      choices: [{
        name: 'eslint',
        value: 'eslint'
      },
      {
        name: 'angular',
        value: 'angular'
      },
      {
        name: 'atom',
        value: 'atom'
      },
      {
        name: 'ember',
        value: 'ember'
      }]
    },
    {
      type: 'confirm',
      name: 'hasRemoteRepo',
      message: 'Create remote repository?'
    },
    {
      type: 'list',
      name: 'gitRemoteRepoType',
      message: 'Select a repo type',
      choices: [{
        name: 'Organization',
        value: 'ORGANIZATION_REPO'
      },
      {
        name: 'User repo',
        value: 'USER_REPO'
      }],
      when: hasRemoteRepo
    },
    {
      type: 'list',
      name: 'gitRemoteProvider',
      message: 'Select a Git provider',
      choices: [{
        name: 'Github',
        value: 'GITHUB'
      } /* ,
      {
        name: 'Bitbucket',
        value: 'BITBUCKET'
      },
      {
        name: 'Gitlab',
        value: 'GITLAB'
      } */],
      when: hasRemoteRepo
    },
    {
      type: 'input',
      name: 'gitOrganization',
      message: 'Git organization:',
      when: function (answers) {
        return answers.gitRemoteRepoType === 'ORGANIZATION_REPO'
      }
    },
    {
      type: 'confirm',
      name: 'SyncRemoteRepo',
      message: 'Sync remote repository?',
      when: function (answers) {
        return answers.hasRemoteRepo
      }
    },
    {
      type: 'list',
      name: 'gitAuthType',
      message: 'Select authentication type',
      choices: [{
        name: 'User and Password',
        value: 'USER_AND_PASSWORD'
      },
      {
        name: 'Authentication token',
        value: 'AUTHENTICATION_TOKEN'
      }],
      when: hasRemoteRepo
    },
    {
      type: 'input',
      name: 'htmlUrl',
      message: 'Github repo url(optional):',
      default: null,
      when: notHasRemoteRepo
    },
    {
      type: 'input',
      name: 'ownerUrl',
      message: 'Author page url(optional):',
      default: null,
      when: notHasRemoteRepo
    },
    {
      type: 'input',
      name: 'gitUser',
      message: 'User:',
      validate: checkEmpty,
      when: function (answers) {
        return answers.gitAuthType === 'USER_AND_PASSWORD'
      }
    },
    {
      type: 'password',
      name: 'gitPass',
      message: 'Password:',
      validate: checkEmpty,
      when: function (answers) {
        return answers.gitAuthType === 'USER_AND_PASSWORD'
      }
    },
    {
      type: 'Password',
      name: 'gitToken',
      message: 'token:',
      validate: checkEmpty,
      when: function (answers) {
        return answers.gitAuthType === 'AUTHENTICATION_TOKEN'
      }
    },
    {
      type: 'input',
      name: 'projectOwner',
      message: 'Git user or organization:',
      validate: checkEmpty,
      when: notHasRemoteRepo

    },
    {
      type: 'input',
      name: 'keywords',
      message: 'Keyword separated by coma',
      validate: checkEmpty
    }
  ]
}
