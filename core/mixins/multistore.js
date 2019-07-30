export const multistore = {
  methods: {
    /**
     * Return localized route params
     * @param {String} relativeUrl
     * @param {Int} width
     * @param {Int} height
     */
    async localizedRoute (routeObj) {
      // importing this way is crucial to always have a fresh multistore instance reference to store in SSR
      const {localizedRoute, currentStoreView} = await import('@vue-storefront/core/lib/multistore')
      const storeView = currentStoreView()
      return localizedRoute(routeObj, storeView.storeCode)
    },
    /**
     * Return localized route params for URL Dispatcher
     * @param {String} relativeUrl
     * @param {Int} width
     * @param {Int} height
     */
    async localizedDispatcherRoute (routeObj) {
      const {localizedDispatcherRoute, currentStoreView} = await import('@vue-storefront/core/lib/multistore')
      const storeView = currentStoreView()
      return localizedDispatcherRoute(routeObj, storeView.storeCode)
    }
  }
}
