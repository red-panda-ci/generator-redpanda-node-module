'use strict'
const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')

describe('generator-redpanda-node-module:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        isNewGithubRepo: false,
        gitrepository: 'https://some-git-repo',
        ownerurl: 'https://some-owner-url',
        name: 'test-app',
        description: 'Some description',
        Author: 'Author',
        email: 'email@email.es'
      })
  })

  it('creates files', () => {
    assert.file([
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
      'bin/CI/test-builder'
    ])
  })
})
