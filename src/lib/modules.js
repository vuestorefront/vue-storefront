export function registerModules (modules, app, router, store) {
  for (let moduleName of modules) {
    let moduleEntryPoint = require('../modules/' + moduleName + '/index.js').default

    if (moduleEntryPoint !== null) {
      let moduleDescriptor = moduleEntryPoint(app, router, store) // register module

      if (moduleDescriptor != null) {
        app.$emit('application-module-registered', moduleDescriptor)
      }
    }
  }
}

