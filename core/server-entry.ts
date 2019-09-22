import union from 'lodash-es/union'

import { createApp } from '@vue-storefront/core/app'
import { HttpError } from '@vue-storefront/core/helpers/exceptions'
import { storeCodeFromRoute } from '@vue-storefront/core/lib/multistore'
import omit from 'lodash-es/omit'
import pick from 'lodash-es/pick'
import buildTimeConfig from 'config'
import { AsyncDataLoader } from '@vue-storefront/core/lib/async-data-loader'
import config from 'config'
import { Logger } from '@vue-storefront/core/lib/logger'
import queryString from 'query-string'

function _commonErrorHandler (err, reject) {
  if (err.message.indexOf('query returned empty result') > 0) {
    reject(new HttpError(err.message, 404))
  } else {
    reject(new Error(err.message))
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
    AsyncDataLoader.flush({ store, route: router.currentRoute, context: null } /* AsyncDataLoaderActionContext */).then((r) => {
      if (buildTimeConfig.ssr.useInitialStateFilter) {
        context.state = omit(store.state, config.ssr.initialStateFilter)
      } else {
        context.state = store.state
      }
      if (!buildTimeConfig.server.dynamicConfigReload) { // if dynamic config reload then we're sending config along with the request
        context.state = omit(store.state, buildTimeConfig.ssr.useInitialStateFilter ? [...config.ssr.initialStateFilter, 'config'] : ['config'])
      } else {
        const excludeFromConfig = buildTimeConfig.server.dynamicConfigExclude
        const includeFromConfig = buildTimeConfig.server.dynamicConfigInclude
        console.log(excludeFromConfig, includeFromConfig)
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

export default async context => {
  let storeCode = context.vs.storeCode
  if (config.storeViews.multistore === true) {
    if (!storeCode) { // this is from url
      const currentRoute = Object.assign({ path: queryString.parseUrl(context.url).url/* this gets just the url path part */, host: context.server.request.headers.host })
      storeCode = storeCodeFromRoute(currentRoute)
      console.log(storeCode, currentRoute)
    }
  }
  const { app, router, store } = await createApp(context, context.vs && context.vs.config ? context.vs.config : buildTimeConfig, storeCode)
  return new Promise((resolve, reject) => {
    context.output.cacheTags = new Set<string>()
    const meta = (app as any).$meta()
    router.push(context.url)
    context.meta = meta
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject(new HttpError('No components matched', 404))
      }
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
