import store from '@vue-storefront/store'

export const thumbnail = {
  methods: {
    /**
     * Return thumbnail url for specific base url
     * @param {String} relativeUrl
     * @param {Int} width
     * @param {Int} height
     */
    getThumbnail (relativeUrl, width, height) {
      if (relativeUrl && relativeUrl.indexOf('://') > 0) return relativeUrl
      return relativeUrl && relativeUrl.indexOf('no_selection') < 0 ? `${store.state.config.images.baseUrl}${parseInt(width)}/${parseInt(height)}/resize${relativeUrl}` : store.state.config.images.productPlaceholder || ''
    }
  }
}
