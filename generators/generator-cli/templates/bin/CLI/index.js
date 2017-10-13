#!/usr/bin/env node

'use strict'

const cli = require('yargs')

cli
.command({
    command: 'dummy',
    aliases: ['d'],
    desc: 'Create a dummy command.',
    handler: (argv) => {
      const { param } = argv
      console.log(`Execute dummy command with param: ${param}`)
    },
    builder: (cli) => {
      cli
      .option('param', {
          alias: 'p',
          describe: 'Some param',
          default: 'Dummy param'
      })
      return cli
    }
})
.help()
.argv
