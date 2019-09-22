import { Logger } from '@vue-storefront/core/lib/logger'

export function registerExtensions (extensions, app, router, store, config, ssrContext = null) {
  for (let extEntryPoint of extensions) {
    if (extEntryPoint !== null) {
      if (extEntryPoint.default) extEntryPoint = extEntryPoint.default
      let extDescriptor = extEntryPoint(app, router, store, config, ssrContext) // register module
      if (extDescriptor != null) {
        Logger.warn('Extension' + extDescriptor.EXTENSION_KEY + ' registered. Extensions are deprecated and will be removed from VS core. Use modules instead')()
        app.$emit('application-after-registerExtensions', extDescriptor)
      }
    }
  }
}
