'use strict'

// const mix = Object.assign
const Github = require('./Github')
const Bitbucket = require('./Bitbucket')
const GitLocal = require('./GitLocal')

module.exports = function gitManager (type, authentication) {
  const providers = { GITHUB: Github, BITBUCKET: Bitbucket }
  const localManager = GitLocal.of()
  const manager = (!type && !authentication) ? localManager : providers[type].of(authentication)
  return manager
}
