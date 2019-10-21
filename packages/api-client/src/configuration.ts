let configuration = {
  token: '',
}

const setConfiguration = (config) => {
  Object.assign(configuration, config)
}

const getOption = (name) => configuration[name]

export { setConfiguration, getOption }
