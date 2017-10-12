'use strict'

const classes = require('extends-classes')
const Github = require('./Github')
const Bitbucket = require('./Bitbucket')
const GitLocal = require('./GitLocal')
const RemoteProviders = { GITHUB: Github, BITBUCKET: Bitbucket }

module.exports = function gitManager (opt) {
  const {remoteProvider} = opt

  const GitManager = (!remoteProvider)
                     ? GitLocal
                     : class extends classes(RemoteProviders[remoteProvider], GitLocal) {}

  return new GitManager(opt)
}
