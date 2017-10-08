import Vue from 'vue'
import config from '../config'

/**
 * Return thumbnail url for specific base url
 * @param {String} relativeUrl
 * @param {Int} width
 * @param {Int} height
 */
export function thumbnail (relativeUrl, width, height) {
  return config.images.baseUrl + parseInt(width) + '/' + parseInt(height) + '/resize' + relativeUrl
}

/**
 * Create slugify -> "create-slugify" permalink  of text
 * @param {String} text
 */
export function slugify (text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
}

/**
 * Converts number to price string
 * @param {Number} value
 */
export function price (value) {
  return '$' + parseFloat(value).toFixed(2)
}

/**
 * Register Vue common filters
 * @param {Object} app
 * @param {Object} config
 */
export function registerFilters (app) {
  Vue.filter('thumbnail', thumbnail)
  Vue.filter('slugify', slugify)
  Vue.filter('price', price)
}
