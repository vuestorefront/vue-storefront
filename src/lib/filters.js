import Vue from 'vue'
import config from '../config'

export function thumb (baseUrl, width, height) {
  return config.images.baseUrl + parseInt(width) + '/' + parseInt(height) + '/resize' + baseUrl
}

/**
 * Register Vue common filters
 * @param {Object} app
 * @param {Object} config
 */
export function registerFilters (app) {
  Vue.filter('thumb', thumb)
}
