import { localizedRoute as localizedRouteHelper, localizedDispatcherRoute as localizedDispatcherRouteHelper, currentStoreView } from '@vue-storefront/core/lib/multistore'
import { isServer } from '../helpers';

export const multistore = {
  methods: {
    /**
     * Return localized route params
     * @param {String} relativeUrl
     * @param {Int} width
     * @param {Int} height
     */
    localizedRoute (routeObj) {
      let storeView

      if (isServer) {
        storeView = this.$ssrContext.helpers.currentStoreView()
      } else {
        storeView = currentStoreView()
      }

      return localizedRouteHelper(routeObj, storeView.storeCode)
    },
    /**
     * Return localized route params for URL Dispatcher
     * @param {String} relativeUrl
     * @param {Int} width
     * @param {Int} height
     */
    localizedDispatcherRoute (routeObj) {
      let storeView

      if (isServer) {
        storeView = this.$ssrContext.helpers.currentStoreView()
      } else {
        storeView = currentStoreView()
      }

      return localizedDispatcherRouteHelper(routeObj, storeView.storeCode)
    }
  }
}
