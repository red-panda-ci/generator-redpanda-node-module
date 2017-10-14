'use strict'

jest.mock('github')
const GithubManager = require('../../generators/app/gitManager/Github')
const GitRemoteable = require('../../generators/app/gitManager/GitRemoteable')

const githubInstance = GithubManager.of({
  authentication: {
    username: 'user',
    password: 'password'
  }
})

const interfaceResponse = {
  htmlUrl: expect.any(String),
  ownerUrl: expect.any(String),
  sshUrl: expect.any(String)
}

describe('GitHub manager', () => {
  it('When execute Github constructor should to be instances of GithubManager and GitRemoteable interface', () => {
    expect(githubInstance).toBeInstanceOf(GithubManager)
    expect(githubInstance).toBeInstanceOf(GitRemoteable)
  })

  it('Should Create a new repo for user', () => {
    return expect(githubInstance.createRepo({name: 'new-repo'})).resolves.toEqual(interfaceResponse)
  })

  it('Should Create a new repo for organization', () => {
    const interfaceResponse = {
      htmlUrl: expect.any(String),
      ownerUrl: expect.any(String),
      sshUrl: expect.any(String)
    }
    return expect(githubInstance.createRepo({name: 'new-repo', org: 'some-org'})).resolves.toEqual(interfaceResponse)
  })
})
