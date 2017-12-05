export function registerExtensions (extensions, app, router, store, config) {
  for (let extName of extensions) {
    let extEntryPoint = require('../extensions/' + extName + '/index.js').default

    if (extEntryPoint !== null) {
      let extDescriptor = extEntryPoint(app, router, store, config) // register module
      if (extDescriptor != null) {
        app.$emit('application-after-registerExtensions', extDescriptor)
      }
    }
  }
}

