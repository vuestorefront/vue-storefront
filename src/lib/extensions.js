export function registerExtensions (extensions, app, router, store) {
  for (let extName of extensions) {
    let extEntryPoint = require('../extensions/' + extName + '/index.js').default

    if (extEntryPoint !== null) {
      let extDescriptor = extEntryPoint(app, router, store) // register module
      if (extDescriptor != null) {
        app.$emit('application-extension-registered', extDescriptor)
      }
    }
  }
}

