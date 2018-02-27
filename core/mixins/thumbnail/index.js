import config from 'config'

export const thumbnail = {
  methods: {
    /**
     * Return thumbnail url for specific base url
     * @param {String} relativeUrl
     * @param {Int} width
     * @param {Int} height
     */
    getThumbnail (relativeUrl, width, height) {
      return relativeUrl ? `${config.images.baseUrl}${parseInt(width)}/${parseInt(height)}/resize${relativeUrl}` : config.images.productPlaceholder || ''
    }
  }
}
