'use strict'

const mix = Object.assign
const Github = require('./Github')
const Bitbucket = require('./Bitbucket')
const GitLocal = require('./GitLocal')

module.exports = function gitManager (type, authentication) {
  const providers = { github: Github, bitbucket: Bitbucket }
  const localManager = GitLocal.of()
  return (!type && !authentication) ? localManager : mix(providers[type].of(authentication), localManager)
}
