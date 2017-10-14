'use strict'

// for git command in class GitLocal

const childProcess = jest.genMockFromModule('child_process')

childProcess.execSync = function (command) {
  process.stdout.write(`command mocked: ${command}`)
}

module.exports = childProcess
