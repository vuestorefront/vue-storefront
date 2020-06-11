const inquirer = require('inquirer')
const Listr = require('listr')
const { createThemeTasks, createThemePrompt } = require('./../themeTasks')

module.exports = function (installationDir = '.') {
  const { cloneTheme, installDeps, configureTheme } = createThemeTasks(installationDir)

  inquirer
    .prompt(createThemePrompt(installationDir))
    .then(answers => {
      new Listr([
        cloneTheme,
        installDeps,
        configureTheme
      ]).run(answers)
    })
}
