#!/usr/bin/env node

const inquirer = require('inquirer')
const Listr = require('listr')
const execa = require('execa')
const spawn = require('child_process')
const fs = require('fs')
const semverSortDesc = require('semver/functions/rsort')
const { options } = require('./../consts')
const { createThemeTasks, createThemePrompt } = require('./../themeTasks')

module.exports = function (installationDir) {
  installationDir = installationDir || 'vue-storefront'
  let allTags = []
  let availableBranches = [
    'develop',
    'master'
  ]

  const tasks = {
    installDeps: {
      title: 'Installing dependencies',
      task: () => execa.command('cd ' + installationDir + ' && yarn cache clean && yarn', { shell: true })
    },
    cloneVersion: {
      title: 'Copying Vue Storefront files',
      task: answers => {
        return execa.command(`git clone --quiet --single-branch --branch ${answers.specificVersion} https://github.com/vuestorefront/vue-storefront.git ${installationDir} && cd ${installationDir}/core/scripts && git remote rm origin`, { shell: true })
      }
    },
    ...createThemeTasks(installationDir),
    runInstaller: {
      title: 'Running installer',
      task: () => spawn.execFileSync('yarn', ['installer'], { stdio: 'inherit', cwd: installationDir })
    },
    getStorefrontVersions: {
      title: 'Check available versions',
      task: () => execa('git', ['ls-remote', '--tags', 'https://github.com/vuestorefront/vue-storefront.git']).then(({ stdout }) => {
        allTags = stdout.match(/refs\/tags\/v1.([0-9.]+)(-rc.[0-9])?/gm).map(tag => tag.replace('refs/tags/', ''))
        allTags = semverSortDesc(allTags)
        execa('git', ['ls-remote', '--heads', 'https://github.com/vuestorefront/vue-storefront.git']).then(({ stdout }) => {
          let rcBranches = stdout.match(/refs\/heads\/release\/v1.([0-9.x]+)/gm).map(tag => tag.replace('refs/heads/', ''))
          availableBranches = [...rcBranches, ...availableBranches]
        })
      }).catch(e => {
        console.error('Problem with checking versions\n', e)
      })
    }
  }

  if (fs.existsSync(installationDir)) {
    console.error('Vue Storefront is already installed in directory ./' + installationDir + '. Aborting.')
  } else {
    new Listr([
      tasks.getStorefrontVersions
    ]).run().then(() => {
      inquirer
        .prompt([
          {
            type: 'list',
            name: 'version',
            message: 'Which version of Vue Storefront you\'d like to install?',
            choices: [
              options.version.stable,
              options.version.rc,
              options.version.nightly
            ]
          },
          {
            type: 'list',
            name: 'specificVersion',
            message: 'Select specific version',
            choices: function (answers) {
              if (answers.version === options.version.stable) return allTags.filter(tag => !tag.includes('rc')).slice(0, 10)
              if (answers.version === options.version.rc) return allTags.filter(tag => tag.includes('rc')).slice(0, 5)
              return availableBranches
            }
          },
          ...createThemePrompt(),
          {
            type: 'list',
            name: 'installation',
            message: 'Would you like to use friendly installer or install Vue Storefront manually?',
            choices: [
              options.installation.installer,
              options.installation.manual
            ]
          }
        ])
        .then(answers => {
          const taskQueue = []
          taskQueue.push(tasks.cloneVersion)
          taskQueue.push(tasks.cloneTheme)
          taskQueue.push(tasks.installDeps) // we need to install deps for theme
          taskQueue.push(tasks.configureTheme)
          if (answers.installation === options.installation.installer) {
            taskQueue.push(tasks.runInstaller)
          }
          new Listr(taskQueue).run(answers)
        })
    })
  }
}
