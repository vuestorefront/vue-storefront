import { module } from './store'
import { beforeRegistration } from './hooks/beforeRegistration'
import { afterRegistration } from './hooks/afterRegistration'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'
import { initCacheStorage } from '@vue-storefront/core/helpers/initCacheStorage'
import store from '@vue-storefront/store'
import userRoutes from 'theme/router'
import { HttpError } from '@vue-storefront/core/helpers/exceptions'

export const KEY = 'url'
export const cacheStorage = initCacheStorage(KEY)
let _matchedRouteData = null

const UrlDispatcher = ():any => {
  if (store.state.config.seo.useUrlDispatcher && _matchedRouteData) {
    const userRoute = userRoutes.find(r => r.name === _matchedRouteData['name'])
    if (userRoute) {
      if (typeof userRoute.component === 'function') {
        return userRoute.component() // supports only lazy loaded components; in case of eagerly loaded components it should be like: `return userRoute.component`
      } else {
        return userRoute.component
      }
    } else {
      throw new HttpError('UrlDispatcher query returned empty result', 404)
    }
  } else {
    throw new HttpError('UrlDispatcher query returned empty result', 404)
  }
}
const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { modules: [{ key: KEY, module }] },
  beforeRegistration,
  afterRegistration,
  router: { routes: [
    { name: 'urldispatcher', path: '*', component: UrlDispatcher, beforeEnter: (to, from, next) => {
        if (store.state.config.seo.useUrlDispatcher) {
          console.log(to)
          store.dispatch('url/mapUrl', { url: to.fullPath }, { root: true }).then((routeData) => {
            if (routeData) {
              Object.keys(routeData).map(key => {
                to.params[key] = routeData[key]
              })
              _matchedRouteData = routeData
            }
            next()
          }).catch(e => {
            console.error(e)
            next()
          })
        } else {
          next()
        }
      } 
    }
  ] }
}

export const Url = new VueStorefrontModule(moduleConfig)
