'use strict'

const classes = require('extends-classes')
const Github = require('./Github')
const Bitbucket = require('./Bitbucket')
const GitLocal = require('./GitLocal')

module.exports = function gitManager (type, authentication) {
  const RemoteProviders = { GITHUB: Github, BITBUCKET: Bitbucket }

  const GitManager = (!type && !authentication)
                     ? GitLocal
                     : class extends classes(RemoteProviders[type], GitLocal) {}

  return new GitManager(authentication)
}
