#!/usr/bin/env node

const inquirer = require('inquirer')
const Listr = require('listr')
const execa = require('execa')
const spawn = require('child_process')
const fs = require('fs')
const semverSortDesc = require('semver/functions/rsort')
const semverSatisfies = require('semver/functions/satisfies')
const semverCoerce = require('semver/functions/coerce')

module.exports = function (installationDir) {
  installationDir = installationDir || 'vue-storefront'
  let allTags = []
  let availableBranches = [
    'develop',
    'master'
  ]

  const options = {
    version: {
      stable: 'Stable version (recommended for production)',
      rc: 'Release Candidate',
      nightly: 'In development branch (could be unstable!)'
    },
    installation: {
      installer: 'Installer (MacOS/Linux only)',
      manual: 'Manual installation'
    }
  }

  const themes = {
    capybara: {
      label: 'Capybara - based on Storefront UI',
      branches: {
        master: options.version.stable,
        develop: options.version.nightly
      },
      minVsfVersion: '^1.11.0'
    },
    classic: {
      label: 'Classic',
      branches: {
        master: options.version.stable
      },
      minVsfVersion: '*'
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
    cloneTheme: {
      title: 'Copying Vue Storefront theme',
      task: answers => execa.shell([
        `git clone --quiet --single-branch --branch ${answers.themeBranch} https://github.com/DivanteLtd/vsf-${answers.themeName}.git ${installationDir}/src/themes/${answers.themeName}`,
        `cd ${installationDir}/src/themes/${answers.themeName}`,
        `git remote rm origin`
      ].join(' && '))
    },
    configureTheme: {
      title: 'Configuring Vue Storefront theme',
      task: answers => {
        const vsfLocalJsonPath = `${installationDir}/config/local.json`
        const themeLocalJsonPath = `${installationDir}/src/themes/${answers.themeName}/local.json`

        if (fs.existsSync(themeLocalJsonPath)) {
          try {
            const vsfLocalJson = fs.existsSync(vsfLocalJsonPath) ? JSON.parse(fs.readFileSync(vsfLocalJsonPath)) : {}
            const themeLocalJson = JSON.parse(fs.readFileSync(themeLocalJsonPath))

            fs.writeFileSync(vsfLocalJsonPath, JSON.stringify(Object.assign(vsfLocalJson, themeLocalJson), null, 2))
          } catch (e) {
            console.error('Problem with parsing or merging local.json configurations', e)
          }
        }
      },
      skip: answers => {
        if (!fs.existsSync(`${installationDir}/src/themes/${answers.themeName}/local.json`)) {
          return 'Missing local.json in theme'
        }
      }
    },
    runInstaller: {
      title: 'Running installer',
      task: () => spawn.execFileSync('yarn', ['installer'], { stdio: 'inherit', cwd: installationDir })
    },
    getStorefrontVersions: {
      title: 'Check available versions',
      task: () => execa.stdout('git', ['ls-remote', '--tags', 'https://github.com/DivanteLtd/vue-storefront.git']).then(result => {
        allTags = result.match(/refs\/tags\/v1.([0-9.]+)(-rc.[0-9])?/gm).map(tag => tag.replace('refs/tags/', ''))
        allTags = semverSortDesc(allTags)
        execa.stdout('git', ['ls-remote', '--heads', 'https://github.com/DivanteLtd/vue-storefront.git']).then(branches => {
          let rcBranches = branches.match(/refs\/heads\/release\/v1.([0-9.x]+)/gm).map(tag => tag.replace('refs/heads/', ''))
          availableBranches = [...rcBranches, ...availableBranches]
        })
      }).catch(e => {
        console.error('Problem with checking versions', e)
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
          {
            type: 'list',
            name: 'themeName',
            message: 'Select theme for Vue Storefront',
            choices: answers => {
              const isVsfVersionAsBranch = ['master', 'develop'].includes(answers.specificVersion)
              const selectedVsfVersion = semverCoerce(answers.specificVersion)

              return Object.entries(themes)
                .filter(([, themeConfig]) => isVsfVersionAsBranch || semverSatisfies(selectedVsfVersion, themeConfig.minVsfVersion, { includePrerelease: true }))
                .map(([themeName, themeConfig]) => ({
                  name: themeConfig.label,
                  value: themeName
                }))
            }
          },
          {
            type: 'list',
            name: 'themeBranch',
            message: 'Select theme version',
            choices: answers => Object.entries(themes[answers.themeName].branches)
              .map(([branchName, branchLabel]) => ({
                name: branchLabel,
                value: branchName
              })),
            when: answers => answers.themeName !== 'classic'
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
          if (answers.themeName !== 'classic') {
            taskQueue.push(tasks.cloneTheme)
            taskQueue.push(tasks.configureTheme)
          }
          if (answers.installation === options.installation.installer) {
            taskQueue.push(tasks.installDeps)
            taskQueue.push(tasks.runInstaller)
          }
          new Listr(taskQueue).run(answers)
        })
    })
  }
}
