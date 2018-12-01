import { setupMultistoreRoutes } from '@vue-storefront/store/lib/multistore'
import routes from './router'
import '@vue-storefront/core/lib/passive-listeners'

export default function (app, router, store, config, ssrContext) {
  // if youre' runing multistore setup this is copying the routed above adding the 'storeCode' prefix to the urls and the names of the routes
  // You can do it on your own and then be able to customize the components used for example for German storeView checkout
  // To do so please execlude the desired storeView from the config.storeViews.mapStoreUrlsFor and map the urls by Your own like:
  // { name: 'de-checkout', path: '/checkout', component: CheckoutCustomized },
  setupMultistoreRoutes(config, router, routes)
  router.addRoutes(routes)
  router.beforeEach((to, from, next) => {
    if (to.matched.some(route => route.meta.requiresAuth)) {
      const usersCollection = app.$db.usersCollection
      usersCollection.getItem('current-token', (err, token) => {
        if (err) {
          next(err)
        }
        if (!token) {
          next('/')
          app.$store.dispatch('notification/spawnNotification', {
            type: 'error',
            message: app.$t('You need to be logged in to see this page'),
            action1: { label: app.$t('OK') }
          })
        } else {
          next()
        }
      })
    } else {
      next()
    }
  })
}
