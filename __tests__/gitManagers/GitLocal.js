'use strict'

jest.mock('child_process') // for git command

const GitLocalManager = require('../../generators/app/gitManager/GitLocal')

describe('GitLocal manager', () => {
  it('When execute GitLocal constructor should return a correct instance', () => {
    const gitInstance = GitLocalManager.of({
      commitPreset: 'eslint'
    })
    expect(gitInstance).toBeInstanceOf(GitLocalManager)
  })
})
