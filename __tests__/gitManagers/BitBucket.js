'use strict'

const BitbucketManager = require('../../generators/app/gitManager/Bitbucket')
const GitRemoteable = require('../../generators/app/gitManager/GitRemoteable')

const bitbucketInstance = BitbucketManager.of({
  authentication: {
    username: 'user',
    password: 'password'
  }
})

const interfaceResponse = {
  htmlUrl: null,
  ownerUrl: null,
  sshUrl: null
}

describe('Bitbucket manager', () => {
  it('When execute Bitbucket constructor should to be instances of BitbucketManager and GitRemoteable interface', () => {
    expect(bitbucketInstance).toBeInstanceOf(BitbucketManager)
    expect(bitbucketInstance).toBeInstanceOf(GitRemoteable)
  })

  it('Projection method Should return and object with values null', () => {
    expect(bitbucketInstance.projection({})).toEqual(interfaceResponse)
  })

  it('createRepo method Should return null', () => {
    return expect(bitbucketInstance.createRepo({name: 'new-repo'})).resolves.toEqual(null)
  })
})
