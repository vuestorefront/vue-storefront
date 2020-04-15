import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { coreHooks } from '@vue-storefront/core/hooks'
import { Logger } from '@vue-storefront/core/lib/logger'

import { ImakeHook } from './types/HookTypes'

const providers: { [provider: string]: () => Promise<ImakeHook> } = {
  scalecommerce: () => import(/* webpackChunkName: "vsf-icmaa-cdn-scalecommerce" */ './provider/ScaleCommerce')
}

export const IcmaaCdnModule: StorefrontModule = function ({ store, appConfig, router }) {
  const cdn = appConfig.icmaa_cdn && appConfig.icmaa_cdn.provider && appConfig.icmaa_cdn.provider !== '' ? appConfig.icmaa_cdn.provider : false
  if (cdn && appConfig.images.useExactUrlsNoProxy && providers.hasOwnProperty(cdn)) {
    const provider = providers[cdn]()
    provider.then(c => {
      coreHooks.afterProductThumbnailPathGenerate(c.default)
    }).catch(e => {
      Logger.error('Could not load provider:', 'icmaa-cdn', cdn)()
    })
  }
}
