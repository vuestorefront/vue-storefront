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
  default: {
    label: 'Default',
    branches: {
      master: options.version.stable
    },
    minVsfVersion: '*'
  }
}

module.exports = {
  options,
  themes
}
