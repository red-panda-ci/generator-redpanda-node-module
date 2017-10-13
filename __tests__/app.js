'use strict'
const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')

describe('generator-redpanda-node-module:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'test-app',
        description: 'Some description',
        author: 'Author',
        email: 'email@email.es',
        commitPreset: 'eslint',
        hasRemoteRepo: false,
        htmlUrl: 'https://some-git-repo',
        ownerUrl: 'https://some-owner-url',
        keywords: 'key1, key2',
        cliEnable: true,
        cliName: 'cli-name'
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
      'bin/CI/test-builder',
      'bin/CLI/index.js'
    ])
  })
})
