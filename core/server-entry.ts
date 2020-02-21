import union from 'lodash-es/union'
import { createApp } from '@vue-storefront/core/app'
import { HttpError } from '@vue-storefront/core/helpers/internal'
import storeCodeFromRoute from '@vue-storefront/core/lib/storeCodeFromRoute'
import omit from 'lodash-es/omit'
import pick from 'lodash-es/pick'
import buildTimeConfig from 'config'
import { AsyncDataLoader } from '@vue-storefront/core/lib/async-data-loader'
import config from 'config'
import { Logger } from '@vue-storefront/core/lib/logger'
import { RouterManager } from './lib/router-manager';
import queryString from 'query-string'

function _commonErrorHandler (err, reject) {
  if (err.message.indexOf('query returned empty result') > 0) {
    reject(new HttpError(err.message, 404))
  } else {
    reject(new Error(err.stack))
  }
}

function _ssrHydrateSubcomponents (components, store, router, resolve, reject, app, context) {
  Promise.all(components.map(SubComponent => {
    if (SubComponent.asyncData) {
      return SubComponent.asyncData({
        store,
        route: router.currentRoute,
        context
      })
    } else {
      return Promise.resolve(null)
    }
  })).then(() => {
    AsyncDataLoader.flush({ store, route: router.currentRoute, context } /* AsyncDataLoaderActionContext */).then((r) => {
      context.state = store.state
      if (buildTimeConfig.server.dynamicConfigReload) {
        const excludeFromConfig = buildTimeConfig.server.dynamicConfigExclude
        const includeFromConfig = buildTimeConfig.server.dynamicConfigInclude
        // console.log(excludeFromConfig, includeFromConfig)
        if (includeFromConfig && includeFromConfig.length > 0) {
          context.state.config = pick(context.state.config, includeFromConfig)
        }
        if (excludeFromConfig && excludeFromConfig.length > 0) {
          context.state.config = omit(context.state.config, excludeFromConfig)
        }
      }
      resolve(app)
    }).catch(err => {
      _commonErrorHandler(err, reject)
    })
  }).catch(err => {
    _commonErrorHandler(err, reject)
  })
}

function getHostFromHeader (headers: string[]): string {
  return headers['x-forwarded-host'] !== undefined ? headers['x-forwarded-host'] : headers['host']
}

export default async context => {
  let storeCode = context.vs.storeCode
  if (config.storeViews.multistore === true) {
    if (!storeCode) { // this is from url
      const currentRoute = Object.assign({ path: queryString.parseUrl(context.url).url/* this gets just the url path part */, host: getHostFromHeader(context.server.request.headers) })
      storeCode = storeCodeFromRoute(currentRoute)
    }
  }
  const { app, router, store, initialState } = await createApp(context, context.vs && context.vs.config ? context.vs.config : buildTimeConfig, storeCode)

  RouterManager.flushRouteQueue()
  context.initialState = initialState
  return new Promise((resolve, reject) => {
    const meta = (app as any).$meta()
    router.push(context.url)
    context.meta = meta
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length || !matchedComponents[0]) {
        return reject(new HttpError('No components matched', 404)) // TODO - don't redirect if already on page-not-found
      }
      store.dispatch('url/setCurrentRoute', { to: router.currentRoute })
      Promise.all(matchedComponents.map((Component: any) => {
        const components = Component.mixins ? Array.from(Component.mixins) : []
        union(components, [Component]).map(SubComponent => {
          if (SubComponent.preAsyncData) {
            SubComponent.preAsyncData({ store, route: router.currentRoute })
          }
        })
        if (Component.asyncData) {
          Component.asyncData({ store, route: router.currentRoute, context: context }).then((result) => { // always execute the asyncData() from the top most component first
            Logger.debug('Top-most asyncData executed')()
            _ssrHydrateSubcomponents(components, store, router, resolve, reject, app, context)
          }).catch((err) => {
            _commonErrorHandler(err, reject)
          })
        } else {
          _ssrHydrateSubcomponents(components, store, router, resolve, reject, app, context)
        }
      }))
    }, reject)
  })
}
