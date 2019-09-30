import { storeViews, icmaa_meta } from 'config'

import { removeStoreCodeFromRoute } from '@vue-storefront/core/lib/multistore'
import { StoreView } from 'icmaa-config/types/ConfigState'
import { router } from '@vue-storefront/core/app'

export interface HreflangInterface {
  rel: string,
  href: string,
  hreflang?: string,
  [key: string]: any
}

class Hreflang {
  protected _currentStore: StoreView
  protected _hreflang: HreflangInterface[]

  public constructor (store: StoreView) {
    this._currentStore = store
  }

  public getCurrentStoreViewUrlPath (store: StoreView) {
    let path = ''
    if (this.hasConfigs()) {
      path = removeStoreCodeFromRoute(router.currentRoute.path) as string

      if (path === '/' + this._currentStore.storeCode) {
        path = '/'
      }

      path = (!store.url.startsWith('/'))
        ? store.url.replace(/\/$/, '') + router.currentRoute.path
        : icmaa_meta.base_url + store.url + path
    }

    return path
  }

  public getHreflanFromConfigs: Function = (store: StoreView): HreflangInterface | boolean => {
    const hreflangConfig = icmaa_meta && icmaa_meta.hreflang && icmaa_meta.hreflang.find(m => m.storeCode === store.storeCode)
    if (this.hasConfigs()) {
      return {
        rel: 'alternate',
        hreflang: hreflangConfig ? hreflangConfig['lang'] : store.i18n.defaultLocale,
        href: this.getCurrentStoreViewUrlPath(store)
      }
    }

    return false
  }

  public get hreflang (): HreflangInterface[] {
    if (!this._hreflang) {
      this._hreflang = []

      if (storeViews.multistore) {
        this._hreflang.push({
          rel: 'canonical',
          href: this.getCurrentStoreViewUrlPath(this._currentStore)
        })

        storeViews.mapStoreUrlsFor.forEach(c => {
          let storeview = storeViews[c]
          if (storeview && (!storeview.disabled || storeview.disabled === false)) {
            const hreflang = this.getHreflanFromConfigs(storeview)
            if (hreflang) {
              this._hreflang.push(hreflang)
            }
          }
        })
      }
    }

    return this._hreflang
  }

  protected hasConfigs (): boolean {
    return (icmaa_meta && icmaa_meta.base_url && icmaa_meta.hreflang)
  }

  public getItems (): HreflangInterface[] {
    return this.hreflang
  }
}

export default Hreflang
