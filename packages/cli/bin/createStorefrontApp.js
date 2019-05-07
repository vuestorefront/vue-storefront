#!/usr/bin/env node

const inquirer = require('inquirer')
const Listr = require('Listr')
const execa = require('execa')
const spawn = require('child_process')
const options = {
  version: {
    stable: 'Latest stable build (recommended for production)',
    nightly: 'Next build (latest features, could be unstable) '
  },
  installation: {
    installer: 'Installer (MacOS/Linux only)',
    manual: 'Manual installation'
  }
}

const tasks = {
  installDepsYarn: {
    title: 'Installing dependencies',
    task: () => execa.shell('cd vue-storefront && yarn')
  },
  cloneMaster: {
    title: 'Copying Vue Storefront files',
    task: () => execa.shell('git clone --quiet --single-branch --branch master https://github.com/DivanteLtd/vue-storefront.git && cd vue-storefront/core/scripts && git remote rm origin')
  },
  cloneDevelop: {
    title: 'Copying Vue Storefront files',
    task: () => execa.shell('git clone --quiet --single-branch --branch develop https://github.com/DivanteLtd/vue-storefront.git && cd vue-storefront/core/scripts && git remote rm origin')
  },
  runInstaller: {
    title: 'Running installer',
    task: () => spawn.execFileSync('yarn', ['installer'], {stdio: 'inherit', cwd: 'vue-storefront'})
  }
}

inquirer
  .prompt([
    {
      type: 'list',
      name: 'version',
      message: 'Whaich version of Vue Storefront you\'d like to install?',
      choices: [
        options.version.stable,
        options.version.nightly
      ]
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
    if (answers.version === options.version.stable) taskQueue.push(tasks.cloneMaster)
    if (answers.version === options.version.nightly) taskQueue.push(tasks.cloneDevelop)
    if (answers.installation === options.installation.installer) {
      taskQueue.push(tasks.installDeps)
      taskQueue.push(tasks.runInstaller)
    }
    new Listr(taskQueue).run()
  })
