'use strict'
const Generator = require('yeoman-generator')
const { readdirSync } = require('fs')
const { join } = require('path')
const { mergeDeepLeft } = require('ramda')
const { checkEmpty } = require('../app/utils')

module.exports = class GeneratorCli extends Generator {
  prompting () {
    return this.prompt([{
      type: 'confirm',
      name: 'cliEnable',
      message: 'Add CLI?'
    },
    {
      type: 'input',
      name: 'cliName',
      message: 'CLI name:',
      when: (answers) => answers.cliEnable,
      validate: checkEmpty
    }]).then(props => {
      /*
        this.props description:
        {
          cliEnable {Boolean}  - Allow add cli template- ,
          cliName {String}
        }
      */
      this.props = props
    })
  }

  writing () {
    if (this.props.cliEnable) {
      const currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {})
      const cliPkg = { bin: {} }
      cliPkg.bin[this.props.cliName] = 'bin/Cli/index.js'
      const pkg = mergeDeepLeft(currentPkg, cliPkg)

      this.fs.writeJSON(this.destinationPath('package.json'), pkg)

      readdirSync(join(__dirname, './templates')).forEach((file) => {
        this.fs.copyTpl(
          this.templatePath(file),
          this.destinationPath(file),
          this.props
        )
      })
    }
  }

  installCliDependencies () {
    if (this.props.cliEnable) this.npmInstall(['yargs'])
  }
}
