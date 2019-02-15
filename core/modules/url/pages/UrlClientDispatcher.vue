<template>
  <component :is="page" />
</template>

<script>
import { UrlDispatchMapper, _handleDispatcherNotFound } from '@vue-storefront/core/modules/url'
import userRoutes from 'theme/router'
import store from '@vue-storefront/store'
import { AsyncDataLoader } from '@vue-storefront/core/lib/async-data-loader'

let _matchingComponentInstance = null
const dispatcherRoutine = (to, from, next) => {
  UrlDispatchMapper(to).then(routeData => {
    if (routeData) {
      if (store.state.config.seo.useUrlDispatcher && routeData) {
        const userRoute = userRoutes.find(r => r.name === routeData['name'])
        if (userRoute) {
          userRoute.component().then(rootComponent => {
            _matchingComponentInstance = rootComponent.default
            if (_matchingComponentInstance.asyncData) {
              AsyncDataLoader.push({ // this is an example showing how to call data loader from another module
                execute: _matchingComponentInstance.asyncData
              })
            }
            if (_matchingComponentInstance.mixins) {
              _matchingComponentInstance.mixins.map(m => {
                if (m.asyncData) {
                  AsyncDataLoader.push({ // this is an example showing how to call data loader from another module
                    execute: m.asyncData
                  })
                }
              })
            }
            next()
          })
        } else {
          _handleDispatcherNotFound(routeData['name'])
        }
      } else {
        _handleDispatcherNotFound(null)
      }
    } else {
      next()
    }
  })
}

export default {
  computed: {
    page: () => {
      return _matchingComponentInstance
    }
  },
  beforeRouteUpdate (to, from, next) {
    return dispatcherRoutine(to, from, next)
  },
  beforeRouteEnter (to, from, next) {
    return dispatcherRoutine(to, from, next)
  },
  components: {
  }
}
</script>
