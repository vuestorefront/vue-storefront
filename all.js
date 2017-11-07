'use strict'

const shell = require('shelljs')
const install = require('./install')
const jsonFile = require('jsonfile')

class Manager extends install.Manager {
  /**
   * {@inheritDoc}
   */
  initBackend () {
    if (Manager.isBackendInstalledLocally()) {
      return this.backend.goToDirectory(Manager.getBackendDirectory())
        .then(this.backend.dockerComposeUp.bind(this.backend))
        .then(this.backend.runDevEnvironment.bind(this.backend))
    } else {
      return Promise.resolve()
    }
  }

  /**
   * {@inheritDoc}
   */
  initStorefront () {
    return this.storefront.goToDirectory()
      .then(this.storefront.npmBuild.bind(this.storefront))
      .then(this.storefront.runDevEnvironment.bind(this.storefront))
  }

  /**
   * {@inheritDoc}
   */
  static showWelcomeMessage () {
    install.Message.greeting([
      'Hi, seat, relax...',
      'I\'ll start everything for you ;)'
    ])
  }

  /**
   * {@inheritDoc}
   */
  showGoodbyeMessage () {
    return new Promise((resolve, reject) => {
      install.Message.greeting([
        'Congratulations!',
        '',
        'You\'ve just successfully started vue-storefront.',
        'All required servers are running in background',
        '',
        'Storefront: http://localhost:3000',
        'Backend: ' + (Manager.isBackendInstalledLocally() ? 'http://localhost:8080' : install.STOREFRONT_REMOTE_BACKEND_URL),
        '',
        'Good Luck!'
      ], true)

      resolve()
    })
  }

  /**
   * Check if backend was installed locally
   *
   * @returns {boolean}
   */
  static isBackendInstalledLocally () {
    if (typeof install.Abstract.wasLocalBackendInstalled === 'undefined') {
      let config = jsonFile.readFileSync(install.TARGET_CONFIG_FILE)

      install.Abstract.wasLocalBackendInstalled = Boolean(config.install.is_local_backend)
    }

    return Boolean(install.Abstract.wasLocalBackendInstalled)
  }

  /**
   * Return backend directory
   *
   * @returns {string}
   */
  static getBackendDirectory () {
    if (typeof install.Abstract.backendDir === 'undefined') {
      let config = jsonFile.readFileSync(install.TARGET_CONFIG_FILE)

      install.Abstract.backendDir = config.install.backend_dir
    }

    return install.Abstract.backendDir
  }
}

/**
 * Predefine class static variables
 */
install.Abstract.wasLocalBackendInstalled = undefined
install.Abstract.backendDir = undefined

/**
 * Pre-loading staff
 */
Manager.checkUserOS()
Manager.showWelcomeMessage();

/**
 * This is where all the magic happens
 */
(async function () {
  let manager = new Manager()

  await manager.tryToCreateLogFiles()
    .then(manager.initBackend.bind(manager))
    .then(manager.initStorefront.bind(manager))
    .then(manager.showGoodbyeMessage.bind(manager))
    .catch(install.Message.error)

  shell.exit(0)
})()
