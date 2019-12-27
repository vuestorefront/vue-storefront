#!/usr/bin/env node

const inquirer = require('inquirer')
const Listr = require('listr')
const execa = require('execa')
const spawn = require('child_process')
const fs = require('fs')
const semverSort = require('semver-sort')

module.exports = function (installationDir) {
  installationDir = installationDir || 'vue-storefront'
  let allTags = []
  let availableBranches = [
    'develop',
    'master'
  ]

  const options = {
    version: {
      stable: 'Stable versions (recommended for production)',
      rc: 'Release Candidates',
      nightly: 'In development branches (could be unstable!)'
    },
    installation: {
      installer: 'Installer (MacOS/Linux only)',
      manual: 'Manual installation'
    }
  }

  const tasks = {
    installDeps: {
      title: 'Installing dependencies',
      task: () => execa.shell('cd ' + installationDir + ' && yarn')
    },
    cloneVersion: {
      title: 'Copying Vue Storefront files',
      task: answers => {
        return execa.shell(`git clone --quiet --single-branch --branch ${answers.specificVersion} https://github.com/DivanteLtd/vue-storefront.git ${installationDir} && cd ${installationDir}/core/scripts && git remote rm origin`)
      }
    },
    runInstaller: {
      title: 'Running installer',
      task: () => spawn.execFileSync('yarn', ['installer'], {stdio: 'inherit', cwd: installationDir})
    },
    getStorefrontVersions: {
      title: 'Check avalilable versions',
      task: () => execa.stdout('git', ['ls-remote', '--tags', 'https://github.com/DivanteLtd/vue-storefront.git']).then(result => {
          allTags = result.match(/refs\/tags\/v1.([0-9.]+)(-rc.[0-9])?/gm).map(tag => tag.replace('refs/tags/', ''))
          allTags = semverSort.desc(allTags)
          execa.stdout('git', ['ls-remote', '--heads', 'https://github.com/DivanteLtd/vue-storefront.git']).then(branches => {
            let rcBranches = branches.match(/refs\/heads\/release\/v1.([0-9.]+)/gm).map(tag => tag.replace('refs/heads/', ''))
            availableBranches = [...rcBranches, ...availableBranches]
          })
      }).catch(e => {
        console.error('Problem with checking versions', e)
      })
    },
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
              if (answers.version === options.version.rc) return allTags.filter(tag => tag.includes('rc')).slice(0,5)
              return availableBranches
            }
          },
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
          if (answers.installation === options.installation.installer) {
            taskQueue.push(tasks.installDeps)
            taskQueue.push(tasks.runInstaller)
          }
          new Listr(taskQueue).run(answers)
        })
    })
  }
}
