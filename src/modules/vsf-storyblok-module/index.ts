import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { module } from './store'
import { beforeRegistration } from './hooks/beforeRegistration'
import ComponentWidthCalculator, { SizeValue } from './component-width-calculator.service'

export const KEY = 'storyblok'

export const StoryblokModule: StorefrontModule = function ({ store, router, appConfig }) {
  beforeRegistration(appConfig, store)
  store.registerModule(KEY, module)
}

export {
  ComponentWidthCalculator,
  SizeValue
}
