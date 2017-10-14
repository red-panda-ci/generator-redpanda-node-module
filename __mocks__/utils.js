'use strict'

const { mergeDeepLeft } = require('ramda')

module.exports = {
  expectedFiles: [
    'index.js',
    'src/myLib.js',
    'test/index.js',
    'test/dummy.js',
    'package.json',
    'Jenkinsfile',
    'LICENSE',
    'README.md',
    '.editorconfig',
    '.eslintignore',
    '.eslintrc',
    '.gitignore',
    '.npmignore',
    '.travis.yml',
    'bin/CI/docker-image-builder',
    'bin/CI/get-release',
    'bin/CI/npm-publisher',
    'bin/CI/test-builder',
    'bin/CLI/index.js'
  ],
  answerForUserAndPassAuth: mergeDeepLeft({}, baseAnswers()),

  answerForTokenAuth: mergeDeepLeft({
    gitAuthType: 'AUTHENTICATION_TOKEN',
    gitToken: 's0m3t0k3n'
  }, baseAnswers()),

  answerForOrganizationRepos: mergeDeepLeft({
    gitRemoteRepoType: 'ORGANIZATION_REPO'
  }, baseAnswers()),

  answerForNoRemoteRepo: mergeDeepLeft({
    hasRemoteRepo: false
  }, baseAnswers())
}

function baseAnswers () {
  return {
    name: 'test-app',
    description: 'Some description',
    author: 'Author',
    email: 'email@email.es',
    commitPreset: 'eslint',
    hasRemoteRepo: true,
    gitRemoteRepoType: 'USER_REPO',
    gitAuthType: 'USER_AND_PASSWORD',
    gitUser: 'user',
    gitPass: 'pass',
    gitRemoteProvider: 'GITHUB',
    SyncRemoteRepo: true,
    keywords: 'key1, key2',
    cliEnable: true,
    cliName: 'cli-name'
  }
}
