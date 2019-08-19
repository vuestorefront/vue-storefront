import { getThumbnailPath as _thumbnailHelper } from '@vue-storefront/core/helpers'

export const thumbnail = {
  methods: {
    /**
     * Return thumbnail URL for specific base url
     * @param {String} relativeUrl
     * @param {Int} width
     * @param {Int} height
     */
    getThumbnail (relativeUrl, width, height) {
      return _thumbnailHelper(relativeUrl, width, height)
    }
  }
}
