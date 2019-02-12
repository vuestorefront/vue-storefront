import { module } from './store'
import { beforeRegistration } from './hooks/beforeRegistration'
import { afterRegistration } from './hooks/afterRegistration'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'
import { initCacheStorage } from '@vue-storefront/core/helpers/initCacheStorage'
import store from '@vue-storefront/store'
import userRoutes from 'theme/router'
import { HttpError } from '@vue-storefront/core/helpers/exceptions'
import { router } from '@vue-storefront/core/app'
import { isServer } from '@vue-storefront/core/helpers'
import { Logger } from '@vue-storefront/core/lib/logger';

export const KEY = 'url'
export const cacheStorage = initCacheStorage(KEY)
let _matchedRouteData = null

const _handleDispatcherNotFound = (routeName: string):void => {
  Logger.error('Route not found ' + routeName, 'dispatcher')()
  if (isServer) {
    throw new HttpError('UrlDispatcher query returned empty result', 404)
  } else {
    router.push('/page-not-found')        
  }  
}
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
      _handleDispatcherNotFound(_matchedRouteData['name'])
    }
  } else {
    _handleDispatcherNotFound(null)
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
          store.dispatch('url/mapUrl', { url: to.fullPath, query: to.query }, { root: true }).then((routeData) => {
            if (routeData) {
              Object.keys(routeData).map(key => {
                to.params[key] = routeData[key]
              })
              _matchedRouteData = routeData
            }
            next()
          }).catch(e => {
            Logger.error(e, 'dispatcher')()
            next('/page-not-found')
          })
        } else {
          next()
        }
      } 
    }
  ] }
}

export const Url = new VueStorefrontModule(moduleConfig)
