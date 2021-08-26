'use strict'

const shell = require('shelljs')
const jsonFile = require('jsonfile')
const installer = require('./installer')

class Manager extends installer.Manager {
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
      .then(this.storefront.depBuild.bind(this.storefront))
      .then(this.storefront.runDevEnvironment.bind(this.storefront))
  }

  /**
   * {@inheritDoc}
   */
  static showWelcomeMessage () {
    installer.Message.greeting([
      'Hi, seat, relax...',
      'I\'ll start everything for you ;)'
    ])
  }

  /**
   * {@inheritDoc}
   */
  showGoodbyeMessage () {
    return new Promise((resolve, reject) => {
      installer.Message.greeting([
        'Congratulations!',
        '',
        'You\'ve just successfully started vue-storefront.',
        'All required servers are running in the background',
        '',
        'Storefront: http://localhost:3000',
        'Backend: ' + (Manager.isBackendInstalledLocally() ? 'http://localhost:8080' : installer.STOREFRONT_REMOTE_BACKEND_URL),
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
    if (typeof installer.Abstract.wasLocalBackendInstalled === 'undefined') {
      let config = jsonFile.readFileSync(installer.TARGET_BACKEND_CONFIG_FILE)

      installer.Abstract.wasLocalBackendInstalled = Boolean(config.install.is_local_backend)
    }

    return Boolean(installer.Abstract.wasLocalBackendInstalled)
  }

  /**
   * Return backend directory
   *
   * @returns {string}
   */
  static getBackendDirectory () {
    if (typeof installer.Abstract.backendDir === 'undefined') {
      let config = jsonFile.readFileSync(installer.TARGET_BACKEND_CONFIG_FILE)

      installer.Abstract.backendDir = config.install.backend_dir
    }

    return installer.Abstract.backendDir
  }
}

/**
 * Predefine class static variables
 */
installer.Abstract.wasLocalBackendInstalled = undefined
installer.Abstract.backendDir = undefined

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
    .catch(installer.Message.error)

  shell.exit(0)
})()
