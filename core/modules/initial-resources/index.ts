import { isServer } from '@vue-storefront/core/helpers'
import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import clientResourcesLoader from './clientResourcesLoader'

export const InitialResourcesModule: StorefrontModule = function () {
  if (isServer) return
  window.addEventListener('load', clientResourcesLoader)
}
