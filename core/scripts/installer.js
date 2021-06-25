'use strict'

const path = require('path')
const shell = require('shelljs')
const mkdirp = require('mkdirp')
const exists = require('fs-exists-sync')
const message = require('print-message')
const inquirer = require('inquirer')
const jsonFile = require('jsonfile')
const urlParser = require('url-parse')
const isWindows = require('is-windows')
const isEmptyDir = require('empty-dir')
const commandExists = require('command-exists')
const program = require('commander')
const { createThemeTasks, createThemePrompt } = require('./../../packages/cli/themeTasks')

const SAMPLE_DATA_PATH = 'var/magento2-sample-data'
const TARGET_FRONTEND_CONFIG_FILE = 'config/local.json'
const SOURCE_FRONTEND_CONFIG_FILE = 'config/default.json'

const TARGET_BACKEND_CONFIG_FILE = 'config/local.json'
const SOURCE_BACKEND_CONFIG_FILE = 'config/default.json'

const STOREFRONT_BACKEND_GIT_URL = 'https://github.com/vuestorefront/vue-storefront-api'
const MAGENTO_SAMPLE_DATA_GIT_URL = 'https://github.com/magento/magento2-sample-data.git'
const STOREFRONT_REMOTE_BACKEND_URL = 'https://demo.vuestorefront.io'

const STOREFRONT_DIRECTORY = shell.pwd()

const LOG_DIR = `${STOREFRONT_DIRECTORY}/var/log`
const INSTALL_LOG_FILE = `${STOREFRONT_DIRECTORY}/var/log/install.log`
const VUE_STOREFRONT_LOG_FILE = `${STOREFRONT_DIRECTORY}/var/log/vue-storefront.log`
const VUE_STOREFRONT_BACKEND_LOG_FILE = `${STOREFRONT_DIRECTORY}/var/log/vue-storefront-api.log`

/**
 * Abstract class for field initialization
 */
class Abstract {
  /**
   * Constructor
   *
   * Initialize fields
   */
  constructor (answers) {
    this.answers = answers
  }
}

/**
 * Message management
 */
class Message {
  /**
   * Renders informative message
   *
   * @param text
   */
  static info (text) {
    text = Array.isArray(text) ? text : [text]

    message([
      ...text
    ], { color: 'blue', border: false, marginTop: 1 })
  }

  /**
   * Renders error message
   *
   * @param text
   * @param logFile
   */
  static error (text, logFile = INSTALL_LOG_FILE) {
    text = Array.isArray(text) ? text : [text]

    // show trace if exception occurred
    if (text[0] instanceof Error) {
      text = text[0].stack.split('\n')
    }

    let logDetailsInfo = `Please check log file for details: ${logFile}`

    if (!Abstract.logsWereCreated) {
      logDetailsInfo = 'Try to fix problem with logs to see the error details.'
    }

    message([
      'ERROR',
      '',
      ...text,
      '',
      logDetailsInfo
    ], { borderColor: 'red', marginBottom: 1 })

    shell.exit(1)
  }

  /**
   * Render warning message
   *
   * @param text
   */
  static warning (text) {
    text = Array.isArray(text) ? text : [text]

    message([
      'WARNING:',
      ...text
    ], { color: 'yellow', border: false, marginTop: 1 })
  }

  /**
   * Render block info message
   *
   * @param text
   * @param isLastMessage
   */
  static greeting (text, isLastMessage = false) {
    text = Array.isArray(text) ? text : [text]

    message([
      ...text
    ], Object.assign(isLastMessage ? { marginTop: 1 } : {}, { borderColor: 'green', marginBottom: 1 }))
  }
}

/**
 * Scripts for initialization backend
 */
class Backend extends Abstract {
  /**
   * Clone API repository
   *
   * @returns {Promise}
   */
  cloneRepository () {
    return new Promise((resolve, reject) => {
      const backendDir = path.normalize(this.answers.backend_dir)
      const gitPath = path.normalize(this.answers.git_path)

      Message.info(`Cloning backend into '${backendDir}'...`)

      if (shell.exec(`${gitPath} clone ${STOREFRONT_BACKEND_GIT_URL} '${backendDir}' > ${Abstract.infoLogStream} 2>&1`).code !== 0) {
        reject(new Error(`Can't clone backend into '${backendDir}'.`))
      }

      resolve()
    })
  }

  /**
   * Go to backend directory
   *
   * @returns {Promise}
   */
  goToDirectory (backendDir = null) {
    return new Promise((resolve, reject) => {
      const dir = this.answers ? this.answers.backend_dir : backendDir

      Message.info(`Trying change directory to '${dir}'...`)

      if (shell.cd(path.normalize(dir)).code !== 0) {
        reject(new Error(`Can't change directory to '${dir}'.`))
      }

      Message.info(`Working in directory '${shell.pwd()}'...`)

      resolve()
    })
  }

  /**
   * Run 'yarn install' in backend directory
   *
   * @returns {Promise}
   */
  depInstall () {
    return new Promise((resolve, reject) => {
      Message.info('Installing backend dep...')

      if (shell.exec(`yarn >> ${Abstract.infoLogStream} 2>&1`).code !== 0) {
        reject(new Error('Can\'t install backend dep.'))
      }

      resolve()
    })
  }

  /**
   * Run 'docker-compose up' in background
   *
   * @returns {Promise}
   */
  dockerComposeUp () {
    return new Promise((resolve, reject) => {
      Message.info('Starting Docker in background...')

      if (shell.exec(`docker-compose up -d > /dev/null 2>&1`).code !== 0) {
        reject(new Error('Can\'t start Docker in background.'))
      }
      // Adding 20sec timer for ES to get up and running
      // before starting restoration and migration processes
      setTimeout(() => { resolve() }, 20000)
    })
  }

  /**
   * Validate Magento integration settings.
   *
   * @returns {Promise}
   */
  validateM2Integration () {
    return new Promise((resolve, reject) => {
      const Magento2Client = require('magento2-rest-client').Magento2Client

      Message.info(`Validating Magento integration configuration...`)

      let m2Url = urlParser(this.answers.m2_url).href
      let apiUrl = urlParser(this.answers.m2_api_url).href

      if (!m2Url.length) {
        reject(new Error('Invalid Magento URL supplied.'))
      }
      if (!apiUrl.length) {
        reject(new Error('Invalid Magento rest API URL supplied.'))
      }

      let options = {
        'url': apiUrl,
        'consumerKey': this.answers.m2_api_consumer_key,
        'consumerSecret': this.answers.m2_api_consumer_secret,
        'accessToken': this.answers.m2_api_access_token,
        'accessTokenSecret': this.answers.m2_api_access_token_secret
      }
      let client = Magento2Client(options)

      client.categories.list()
        .then((categories) => {
          resolve()
        }).catch((e) => {
          reject(new Error('Invalid Magento integration settings. Original error: ' + e))
        })
    })
  }

  /**
   * Creating backend config/local.json
   *
   * @returns {Promise}
   */
  createConfig () {
    return new Promise((resolve, reject) => {
      let config

      Message.info(`Creating backend config '${TARGET_BACKEND_CONFIG_FILE}'...`)

      try {
        config = jsonFile.readFileSync(SOURCE_BACKEND_CONFIG_FILE)
        let host = urlParser(this.answers.images_endpoint).hostname

        if (!host.length) {
          throw new Error()
        }

        config.imageable.whitelist.allowedHosts.push(host)

        config.magento2.url = urlParser(this.answers.m2_url).href
        config.magento2.imgUrl = this.answers.m2_url ? urlParser(this.answers.m2_url).href + '/pub/media/catalog/product' : config.magento2.imgUrl
        config.magento2.api.url = urlParser(this.answers.m2_api_url).href || config.magento2.api.url
        config.magento2.api.consumerKey = this.answers.m2_api_consumer_key || config.magento2.api.consumerKey
        config.magento2.api.consumerSecret = this.answers.m2_api_consumer_secret || config.magento2.api.consumerSecret
        config.magento2.api.accessToken = this.answers.m2_api_access_token || config.magento2.api.accessToken
        config.magento2.api.accessTokenSecret = this.answers.m2_api_access_token_secret || config.magento2.api.accessTokenSecret

        jsonFile.writeFileSync(TARGET_BACKEND_CONFIG_FILE, config, { spaces: 2 })
      } catch (e) {
        reject(new Error('Can\'t create backend config. Original error: ' + e))
      }

      resolve()
    })
  }

  /**
   * Run 'yarn restore'
   *
   * @returns {Promise}
   */
  restoreElasticSearch () {
    return new Promise((resolve, reject) => {
      Message.info('Restoring data for ElasticSearch...')

      if (shell.exec(`yarn restore >> ${Abstract.infoLogStream} 2>&1`).code !== 0) {
        reject(new Error('Can\'t restore data for ElasticSearch.'))
      }

      resolve()
    })
  }

  /**
   * Run 'yarn migrate'
   *
   * @returns {Promise}
   */
  migrateElasticSearch () {
    return new Promise((resolve, reject) => {
      Message.info('Migrating data into ElasticSearch...')

      if (shell.exec(`yarn migrate >> ${Abstract.infoLogStream} 2>&1`).code !== 0) {
        reject(new Error('Can\'t migrate data into ElasticSearch.'))
      }

      resolve()
    })
  }

  /**
   * Run 'yarn mage2vs import'
   *
   * @returns {Promise}
   */
  importElasticSearch () {
    return new Promise((resolve, reject) => {
      Message.info('Importing data from Magento into ElasticSearch...')

      if (shell.exec(`yarn mage2vs import >> ${Abstract.infoLogStream} 2>&1`).code !== 0) {
        reject(new Error('Can\'t import data into ElasticSearch.'))
      }

      resolve()
    })
  }

  /**
   * Cloning Magento sample data
   *
   * @returns {Promise}
   */
  cloneMagentoSampleData () {
    return new Promise((resolve, reject) => {
      Message.info(`Cloning Magento 2 Sample Data into '${SAMPLE_DATA_PATH}'...`)

      if (shell.exec(`${this.answers.git_path} clone ${MAGENTO_SAMPLE_DATA_GIT_URL} ${SAMPLE_DATA_PATH} >> ${Abstract.infoLogStream} 2>&1`).code !== 0) {
        reject(new Error(`Can't clone Magento 2 Sample Data into '${SAMPLE_DATA_PATH}'...`))
      }

      resolve()
    })
  }

  /**
   * Start 'yarn dev' in background
   *
   * @returns {Promise}
   */
  runDevEnvironment () {
    return new Promise((resolve, reject) => {
      Message.info('Starting backend server...')

      if (isWindows()) {
        if (shell.exec(`start /min yarn dev > ${Abstract.backendLogStream} 2>&1 &`).code !== 0) {
          reject(new Error('Can\'t start dev server.', VUE_STOREFRONT_BACKEND_LOG_FILE))
        }
      } else {
        if (shell.exec(`nohup yarn dev > ${Abstract.backendLogStream} 2>&1 &`).code !== 0) {
          reject(new Error('Can\'t start dev server.', VUE_STOREFRONT_BACKEND_LOG_FILE))
        }
      }

      resolve()
    })
  }
}

/**
 * Scripts for initialization storefront
 */
class Storefront extends Abstract {
  /**
   * Go to storefront directory
   *
   * @returns {Promise}
   */
  goToDirectory () {
    return new Promise((resolve, reject) => {
      if (Abstract.wasLocalBackendInstalled) {
        Message.info(`Trying change directory to '${STOREFRONT_DIRECTORY}'...`)

        if (shell.cd(STOREFRONT_DIRECTORY).code !== 0) {
          reject(new Error(`Can't change directory to '${STOREFRONT_DIRECTORY}'.`))
        }

        Message.info(`Working in directory '${STOREFRONT_DIRECTORY}'...`)
      }

      resolve()
    })
  }

  /**
   * Creating storefront config/local.json
   *
   * @returns {Promise}
   */
  createConfig () {
    return new Promise((resolve, reject) => {
      let config

      Message.info(`Creating storefront config '${TARGET_FRONTEND_CONFIG_FILE}'...`)

      try {
        config = jsonFile.readFileSync(SOURCE_FRONTEND_CONFIG_FILE)

        let backendPath
        let graphQlHost
        let graphQlPort = 8080

        if (Abstract.wasLocalBackendInstalled) {
          graphQlHost = 'localhost'
          backendPath = 'http://localhost:8080'
        } else {
          backendPath = STOREFRONT_REMOTE_BACKEND_URL
          graphQlHost = backendPath.replace('https://', '').replace('http://', '')
        }

        config.api.url = backendPath
        config.graphql.host = graphQlHost
        config.graphql.port = graphQlPort
        config.elasticsearch.host = `${backendPath}/api/catalog`
        config.orders.endpoint = `${backendPath}/api/order`
        config.products.endpoint = `${backendPath}/api/product`
        config.users.loginAfterCreatePassword = true
        config.users.endpoint = `${backendPath}/api/user`
        config.users.history_endpoint = `${backendPath}/api/user/order-history?token={{token}}&pageSize={{pageSize}}&currentPage={{currentPage}}`
        config.users.resetPassword_endpoint = `${backendPath}/api/user/reset-password`
        config.users.createPassword_endpoint = `${backendPath}/api/user/create-password`
        config.users.changePassword_endpoint = `${backendPath}/api/user/change-password?token={{token}}`
        config.users.login_endpoint = `${backendPath}/api/user/login`
        config.users.create_endpoint = `${backendPath}/api/user/create`
        config.users.me_endpoint = `${backendPath}/api/user/me?token={{token}}`
        config.users.refresh_endpoint = `${backendPath}/api/user/refresh`
        config.stock.endpoint = `${backendPath}/api/stock`
        config.cart.create_endpoint = `${backendPath}/api/cart/create?token={{token}}`
        config.cart.updateitem_endpoint = `${backendPath}/api/cart/update?token={{token}}&cartId={{cartId}}`
        config.cart.deleteitem_endpoint = `${backendPath}/api/cart/delete?token={{token}}&cartId={{cartId}}`
        config.cart.pull_endpoint = `${backendPath}/api/cart/pull?token={{token}}&cartId={{cartId}}`
        config.cart.totals_endpoint = `${backendPath}/api/cart/totals?token={{token}}&cartId={{cartId}}`
        config.cart.paymentmethods_endpoint = `${backendPath}/api/cart/payment-methods?token={{token}}&cartId={{cartId}}`
        config.cart.shippingmethods_endpoint = `${backendPath}/api/cart/shipping-methods?token={{token}}&cartId={{cartId}}`
        config.cart.shippinginfo_endpoint = `${backendPath}/api/cart/shipping-information?token={{token}}&cartId={{cartId}}`
        config.cart.collecttotals_endpoint = `${backendPath}/api/cart/collect-totals?token={{token}}&cartId={{cartId}}`
        config.cart.deletecoupon_endpoint = `${backendPath}/api/cart/delete-coupon?token={{token}}&cartId={{cartId}}`
        config.cart.applycoupon_endpoint = `${backendPath}/api/cart/apply-coupon?token={{token}}&cartId={{cartId}}&coupon={{coupon}}`
        config.reviews.create_endpoint = `${backendPath}/api/review/create?token={{token}}`

        config.newsletter.endpoint = `${backendPath}/api/ext/mailchimp-subscribe/subscribe`
        config.mailer.endpoint.send = `${backendPath}/api/ext/mail-service/send-email`
        config.mailer.endpoint.token = `${backendPath}/api/ext/mail-service/get-token`
        config.images.baseUrl = this.answers.images_endpoint
        config.cms.endpoint = `${backendPath}/api/ext/cms-data/cms{{type}}/{{cmsId}}`
        config.cms.endpointIdentifier = `${backendPath}/api/ext/cms-data/cms{{type}}Identifier/{{cmsIdentifier}}/storeId/{{storeId}}`

        if (this.answers.ssr_endpoints) {
          if (Abstract.wasLocalBackendInstalled) {
            graphQlHost = 'localhost'
            backendPath = 'http://localhost:8080'
          } else {
            backendPath = STOREFRONT_REMOTE_BACKEND_URL
            graphQlHost = backendPath.replace('https://', '').replace('http://', '')
          }

          // Do we really need protocol_ssr in a different place than GraphQL?
          config.server.protocol_ssr = 'http'
          config.api.url_ssr = backendPath
          config.graphql.host_ssr = graphQlHost
          config.graphql.port_ssr = graphQlPort
          config.elasticsearch.host_ssr = `${backendPath}/api/catalog`
          config.orders.endpoint_ssr = `${backendPath}/api/order`
          config.products.endpoint_ssr = `${backendPath}/api/product`
          config.users.endpoint_ssr = `${backendPath}/api/user`
          config.users.history_endpoint_ssr = `${backendPath}/api/user/order-history?token={{token}}`
          config.users.resetPassword_endpoint_ssr = `${backendPath}/api/user/reset-password`
          config.users.changePassword_endpoint_ssr = `${backendPath}/api/user/change-password?token={{token}}`
          config.users.login_endpoint_ssr = `${backendPath}/api/user/login`
          config.users.create_endpoint_ssr = `${backendPath}/api/user/create`
          config.users.me_endpoint_ssr = `${backendPath}/api/user/me?token={{token}}`
          config.users.refresh_endpoint_ssr = `${backendPath}/api/user/refresh`
          config.stock.endpoint_ssr = `${backendPath}/api/stock`
          config.cart.create_endpoint_ssr = `${backendPath}/api/cart/create?token={{token}}`
          config.cart.updateitem_endpoint_ssr = `${backendPath}/api/cart/update?token={{token}}&cartId={{cartId}}`
          config.cart.deleteitem_endpoint_ssr = `${backendPath}/api/cart/delete?token={{token}}&cartId={{cartId}}`
          config.cart.pull_endpoint_ssr = `${backendPath}/api/cart/pull?token={{token}}&cartId={{cartId}}`
          config.cart.totals_endpoint_ssr = `${backendPath}/api/cart/totals?token={{token}}&cartId={{cartId}}`
          config.cart.paymentmethods_endpoint_ssr = `${backendPath}/api/cart/payment-methods?token={{token}}&cartId={{cartId}}`
          config.cart.shippingmethods_endpoint_ssr = `${backendPath}/api/cart/shipping-methods?token={{token}}&cartId={{cartId}}`
          config.cart.shippinginfo_endpoint_ssr = `${backendPath}/api/cart/shipping-information?token={{token}}&cartId={{cartId}}`
          config.cart.collecttotals_endpoint_ssr = `${backendPath}/api/cart/collect-totals?token={{token}}&cartId={{cartId}}`
          config.cart.deletecoupon_endpoint_ssr = `${backendPath}/api/cart/delete-coupon?token={{token}}&cartId={{cartId}}`
          config.cart.applycoupon_endpoint_ssr = `${backendPath}/api/cart/apply-coupon?token={{token}}&cartId={{cartId}}&coupon={{coupon}}`
          config.reviews.create_endpoint_ssr = `${backendPath}/api/review/create?token={{token}}`

          // Probably pointless (only CS)
          // config.newsletter.endpoint_ssr = `${backendPath}/api/ext/mailchimp-subscribe/subscribe`
          config.mailer.endpoint.send_ssr = `${backendPath}/api/ext/mail-service/send-email`
          config.mailer.endpoint.token_ssr = `${backendPath}/api/ext/mail-service/get-token`
          // Probably pointless (only CS)
          // config.images.baseUrl_ssr = this.answers.images_endpoint
          config.cms.endpoint_ssr = `${backendPath}/api/ext/cms-data/cms{{type}}/{{cmsId}}`
          config.cms.endpointIdentifier_ssr = `${backendPath}/api/ext/cms-data/cms{{type}}Identifier/{{cmsIdentifier}}/storeId/{{storeId}}`
        }

        config.install = {
          is_local_backend: Abstract.wasLocalBackendInstalled,
          backend_dir: this.answers.backend_dir || false
        }

        jsonFile.writeFileSync(TARGET_FRONTEND_CONFIG_FILE, config, { spaces: 2 })
      } catch (e) {
        reject(new Error('Can\'t create storefront config.'))
      }

      resolve()
    })
  }

  /**
   * Run 'yarn build' on storefront
   *
   * @returns {Promise}
   */
  depBuild () {
    return new Promise((resolve, reject) => {
      Message.info('Build storefront dep...')

      if (shell.exec(`yarn build > ${Abstract.storefrontLogStream} 2>&1`).code !== 0) {
        reject(new Error('Can\'t build storefront dep.', VUE_STOREFRONT_LOG_FILE))
      }

      resolve()
    })
  }

  /**
   * Start 'yarn dev' in background
   *
   * @returns {Promise}
   */
  runDevEnvironment (answers) {
    return new Promise((resolve, reject) => {
      Message.info('Starting storefront server...')

      if (isWindows()) {
        if (shell.exec(`start /min yarn dev >> ${Abstract.storefrontLogStream} 2>&1 &`).code !== 0) {
          reject(new Error('Can\'t start storefront server.', VUE_STOREFRONT_LOG_FILE))
        }
      } else {
        if (shell.exec(`nohup yarn dev >> ${Abstract.storefrontLogStream} 2>&1 &`).code !== 0) {
          reject(new Error('Can\'t start storefront server.', VUE_STOREFRONT_LOG_FILE))
        }
      }

      resolve(answers)
    })
  }

  /**
   * Handles all tasks needed to make theme installation
   */
  async themeInstallation () {
    // get theme tasks
    const { installDeps, cloneTheme, configureTheme } = createThemeTasks(STOREFRONT_DIRECTORY.toString())

    // put tasks in order
    const tasks = [
      cloneTheme,
      installDeps,
      configureTheme
    ]

    for (let { title, task, skip } of tasks) {
      Message.info(title)

      const skipAnswer = skip ? await skip(this.answers) : ''

      if (skipAnswer) {
        Message.warning(skipAnswer)
      } else {
        await task(this.answers)
      }
    }
  }
}

class Manager extends Abstract {
  /**
   * {@inheritDoc}
   *
   * Assign backend and storefront entities
   */
  constructor (answers) {
    super(answers)

    this.backend = new Backend(answers)
    this.storefront = new Storefront(answers)
  }

  /**
   * Trying to create log files
   * If is impossible - warning shows
   *
   * @returns {Promise}
   */
  tryToCreateLogFiles () {
    return new Promise((resolve, reject) => {
      Message.info('Trying to create log files...')

      try {
        mkdirp.sync(LOG_DIR, { mode: parseInt('0755', 8) })

        let logFiles = [
          INSTALL_LOG_FILE,
          VUE_STOREFRONT_BACKEND_LOG_FILE,
          VUE_STOREFRONT_LOG_FILE
        ]

        for (let logFile of logFiles) {
          if (shell.touch(logFile).code !== 0 || !exists(logFile)) {
            throw new Error()
          }
        }

        Abstract.logsWereCreated = true
        Abstract.infoLogStream = INSTALL_LOG_FILE
        Abstract.storefrontLogStream = VUE_STOREFRONT_LOG_FILE
        Abstract.backendLogStream = VUE_STOREFRONT_BACKEND_LOG_FILE
      } catch (e) {
        Message.warning('Can\'t create log files.')
      }

      resolve()
    })
  }

  /**
   * Initialize all processes for backend (if selected)
   *
   * @returns {Promise}
   */
  initBackend () {
    if (this.answers.is_remote_backend === false) {
      Abstract.wasLocalBackendInstalled = true
      if (this.answers.m2_api_oauth2 === true) {
        return this.backend.validateM2Integration()
          .then(this.backend.cloneRepository.bind(this.backend))
          .then(this.backend.goToDirectory.bind(this.backend))
          .then(this.backend.depInstall.bind(this.backend))
          .then(this.backend.createConfig.bind(this.backend))
          .then(this.backend.dockerComposeUp.bind(this.backend))
          .then(this.backend.importElasticSearch.bind(this.backend))
          .then(this.backend.runDevEnvironment.bind(this.backend))
      } else {
        return this.backend.cloneRepository()
          .then(this.backend.goToDirectory.bind(this.backend))
          .then(this.backend.depInstall.bind(this.backend))
          .then(this.backend.createConfig.bind(this.backend))
          .then(this.backend.dockerComposeUp.bind(this.backend))
          .then(this.backend.restoreElasticSearch.bind(this.backend))
          .then(this.backend.migrateElasticSearch.bind(this.backend))
          .then(this.backend.cloneMagentoSampleData.bind(this.backend))
          .then(this.backend.runDevEnvironment.bind(this.backend))
      }
    } else {
      return Promise.resolve()
    }
  }

  /**
   * Initialize all processes for storefront
   *
   * @returns {Promise}
   */
  initStorefront () {
    return this.storefront.goToDirectory()
      .then(this.storefront.createConfig.bind(this.storefront))
      .then(this.storefront.themeInstallation.bind(this.storefront))
      .then(this.storefront.depBuild.bind(this.storefront))
      .then(this.storefront.runDevEnvironment.bind(this.storefront))
  }

  /**
   * Shows message rendered on the very beginning
   */
  static showWelcomeMessage () {
    Message.greeting([
      'Hi, welcome to the vue-storefront installation.',
      'Let\'s configure it together :)'
    ])
  }

  /**
   * Shows details about successful installation finish
   *
   * @returns {Promise}
   */
  showGoodbyeMessage () {
    return new Promise((resolve, reject) => {
      Message.greeting([
        'Congratulations!',
        '',
        'You\'ve just successfully installed vue-storefront.',
        'All required servers are running in background',
        '',
        'Storefront: http://localhost:3000',
        'Backend: ' + (Abstract.wasLocalBackendInstalled ? 'http://localhost:8080' : STOREFRONT_REMOTE_BACKEND_URL),
        '',
        Abstract.logsWereCreated ? `Logs: ${LOG_DIR}/` : 'You don\'t have log files created.',
        '',
        'Good Luck!'
      ], true)

      resolve()
    })
  }
}

/**
 * Here we configure questions
 *
 * @type {[Object,Object,Object,Object]}
 */
let questions = [
  {
    type: 'confirm',
    name: 'is_remote_backend',
    message: `Would you like to use ${STOREFRONT_REMOTE_BACKEND_URL} as the backend?`,
    default: true
  },
  {
    type: 'input',
    name: 'git_path',
    message: 'Please provide Git path (if it\'s not globally installed)',
    default: 'git',
    when: function (answers) {
      return answers.is_remote_backend === false
    },
    validate: function (value) {
      if (!commandExists.sync(value)) {
        return 'Invalid git path. Try again ;)'
      }

      return true
    }
  },
  {
    type: 'input',
    name: 'backend_dir',
    message: 'Please provide path for installing backend locally',
    default: '../vue-storefront-api',
    when: function (answers) {
      return answers.is_remote_backend === false
    },
    validate: function (value) {
      try {
        mkdirp.sync(value, { mode: parseInt('0755', 8) })

        if (!isEmptyDir.sync(value)) {
          return 'Please provide path to empty directory.'
        }
      } catch (error) {
        return 'Can\'t access to write in this directory. Try again ;)'
      }

      return true
    }
  },
  {
    type: 'list',
    name: 'images_endpoint',
    message: 'Choose path for images endpoint',
    choices: [
      `${STOREFRONT_REMOTE_BACKEND_URL}/img/`,
      'http://localhost:8080/img/',
      'Custom url'
    ],
    when: function (answers) {
      return answers.is_remote_backend === false
    }
  },
  {
    type: 'input',
    name: 'images_endpoint',
    message: 'Please provide path for images endpoint',
    default: `${STOREFRONT_REMOTE_BACKEND_URL}/img/`,
    when: function (answers) {
      let isProvideByYourOwn = answers.images_endpoint === 'Custom url'

      return isProvideByYourOwn || answers.is_remote_backend === true
    },
    filter: function (url) {
      let prefix = 'http://'
      let prefixSsl = 'https://'

      url = url.trim()

      // add http:// if no protocol set
      if (url.substr(0, prefix.length) !== prefix && url.substr(0, prefixSsl.length) !== prefixSsl) {
        url = prefix + url
      }

      // add extra slash as suffix if was not set
      return url.slice(-1) === '/' ? url : `${url}/`
    }
  },
  {
    type: 'input',
    name: 'm2_url',
    message: 'Please provide your Magento url',
    default: 'http://demo-magento2.vuestorefront.io',
    when: function (answers) {
      return answers.is_remote_backend === false
    }
  },
  {
    type: 'confirm',
    name: 'm2_api_oauth2',
    message: `Would You like to perform initial data import from Magento2 instance?`,
    default: false,
    when: function (answers) {
      return answers.is_remote_backend === false
    }
  },
  {
    type: 'input',
    name: 'm2_api_url',
    message: 'Please provide the URL to your Magento rest API',
    default: 'http://demo-magento2.vuestorefront.io/rest',
    when: function (answers) {
      return answers.m2_api_oauth2 === true
    },
    filter: function (url) {
      let prefix = 'http://'
      let prefixSsl = 'https://'

      url = url.trim()

      // add http:// if no protocol set
      if (url.substr(0, prefix.length) !== prefix && url.substr(0, prefixSsl.length) !== prefixSsl) {
        url = prefix + url
      }

      return url
    }
  },
  {
    type: 'input',
    name: 'm2_api_consumer_key',
    message: 'Please provide your consumer key',
    default: 'byv3730rhoulpopcq64don8ukb8lf2gq',
    when: function (answers) {
      return answers.m2_api_oauth2 === true
    }
  },
  {
    type: 'input',
    name: 'm2_api_consumer_secret',
    message: 'Please provide your consumer secret',
    default: 'u9q4fcobv7vfx9td80oupa6uhexc27rb',
    when: function (answers) {
      return answers.m2_api_oauth2 === true
    }
  },
  {
    type: 'input',
    name: 'm2_api_access_token',
    message: 'Please provide your access token',
    default: '040xx3qy7s0j28o3q0exrfop579cy20m',
    when: function (answers) {
      return answers.m2_api_oauth2 === true
    }
  },
  {
    type: 'input',
    name: 'm2_api_access_token_secret',
    message: 'Please provide your access token secret',
    default: '7qunl3p505rubmr7u1ijt7odyialnih9',
    when: function (answers) {
      return answers.m2_api_oauth2 === true
    }
  },
  {
    type: 'confirm',
    name: 'ssr_endpoints',
    message: `Would You like to create fields for SSR endpoints?`,
    default: false
  },
  ...createThemePrompt(STOREFRONT_DIRECTORY.toString())
]

async function processAnswers (answers) {
  let manager = new Manager(answers)

  await manager.tryToCreateLogFiles()
    .then(manager.initBackend.bind(manager))
    .then(manager.initStorefront.bind(manager))
    .then(manager.showGoodbyeMessage.bind(manager))
    .catch(Message.error)

  shell.exit(0)
}

/**
 * Predefine class static variables
 */
Abstract.wasLocalBackendInstalled = false
Abstract.logsWereCreated = false
Abstract.infoLogStream = '/dev/null'
Abstract.storefrontLogStream = '/dev/null'
Abstract.backendLogStream = '/dev/null'

if (require.main.filename === __filename) {
  /**
   * This is where all the magic happens
   */

  program
    .option('--default-config', 'Run with default configuration')
    .parse(process.argv)

  if (program.defaultConfig) {
    const defaultConfig = {}
    questions.forEach(question => {
      defaultConfig[question.name] = question.default
    })
    processAnswers(defaultConfig)
  } else {
    Manager.showWelcomeMessage()
    inquirer.prompt(questions).then(answers => processAnswers(answers))
  }
} else {
  module.exports.Message = Message
  module.exports.Manager = Manager
  module.exports.Abstract = Abstract
  module.exports.STOREFRONT_REMOTE_BACKEND_URL = STOREFRONT_REMOTE_BACKEND_URL
  module.exports.TARGET_FRONTEND_CONFIG_FILE = TARGET_FRONTEND_CONFIG_FILE
  module.exports.TARGET_BACKEND_CONFIG_FILE = TARGET_BACKEND_CONFIG_FILE
}
