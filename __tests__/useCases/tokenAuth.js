'use strict'

jest.mock('child_process') // for git command
jest.mock('github')

const { join } = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')

const { answerForNoRemoteRepo, expectedFiles } = require('../../__mocks__/utils')

describe('generator-redpanda-node-module:app use case with auth token', () => {
  beforeAll(() => {
    return helpers
            .run(join(__dirname, '../../generators/app'))
            .withPrompts(answerForNoRemoteRepo)
  })

  it('creates files', () => {
    assert.file(expectedFiles)
  })
})
