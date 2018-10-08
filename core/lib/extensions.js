export default function registerExtensions (extensions, app, router, store, config, ssrContext = null) {
  for (let extEntryPoint of extensions) {
    if (extEntryPoint !== null) {
      if (extEntryPoint.default) extEntryPoint = extEntryPoint.default
      let extDescriptor = extEntryPoint(app, router, store, config, ssrContext) // register module
      if (extDescriptor != null) {
        console.debug('Loaded', extDescriptor.EXTENSION_KEY)
        app.$emit('application-after-registerExtensions', extDescriptor)
      }
    }
  }
}
