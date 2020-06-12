const inquirer = require('inquirer')
const mkdirp = require('mkdirp')
const Listr = require('listr')
const { createThemeTasks, createThemePrompt } = require('./../themeTasks')
const { getVsfPackageJSON } = require('./../helpers')

module.exports = function () {
  const { cloneTheme, installDeps, configureTheme } = createThemeTasks()

  inquirer
    .prompt([
      {
        type: 'input',
        name: 'vsf_dir',
        message: 'Please provide path to vue-storefront directory',
        default: '.',
        validate: function (value) {
          const { name } = getVsfPackageJSON(value, true)
          if (name !== 'vue-storefront') {
            return 'Provided directory is not vue-storefront directory'
          }

          return true
        }
      },
      ...createThemePrompt()
    ])
    .then(answers => {
      new Listr([
        cloneTheme,
        installDeps,
        configureTheme
      ]).run(answers)
    })
}
