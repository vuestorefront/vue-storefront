import { getThumbnailPath } from '@vue-storefront/core/helpers'

export const thumbnail = {
  methods: {
    /**
     * Return thumbnail URL for specific base url and path
     * @param {string} relativeUrl
     * @param {number} width
     * @param {number} height
     * @param {string} pathType
     */
    getThumbnail: (relativeUrl, width, height, pathType) => getThumbnailPath(relativeUrl, width, height, pathType),

    /**
     * Return thumbnail URL for specific base url using media path
     * @param {string} relativeUrl
     * @param {number} width
     * @param {number} height
     */
    getMediaThumbnail: (relativeUrl, width, height) => getThumbnailPath(relativeUrl, width, height, 'media')
  }
}
