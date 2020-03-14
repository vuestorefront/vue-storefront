import { isServer } from '@vue-storefront/core/helpers'
import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import loadResources from './loadResources'

export const InitialResourcesModule: StorefrontModule = function () {
  if (isServer) return
  window.addEventListener('load', loadResources)
}
