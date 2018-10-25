import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/modules'
import { Mailchimp } from '@vue-storefront/core/modules/mailchimp'
import { Example } from '@vue-storefront/core/modules/module-template'
// Some modules  that still needs API refactoring are  temporary registered in core
// This is how you can adjust any module with application-specific behavior
const extendedExample: VueStorefrontModuleConfig = {
  key: 'extend',
  afterRegistration: function(Vue, config) {
    console.info('Hello, im extended now!')
  }
}

Example.extend(extendedExample)

export const registerModules: VueStorefrontModule[] = [
  Mailchimp
  // Example
]