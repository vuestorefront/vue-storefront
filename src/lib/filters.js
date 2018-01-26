import Vue from 'vue'
import config from 'config'
import he from 'he'

/**
 * Return thumbnail url for specific base url
 * @param {String} relativeUrl
 * @param {Int} width
 * @param {Int} height
 */
export function thumbnail (relativeUrl, width, height) {
  return relativeUrl ? `${config.images.baseUrl}${parseInt(width)}/${parseInt(height)}/resize${relativeUrl}` : config.images.productPlaceholder || ''
}

/**
 * Return attribute name or option for product
 * @param {Object} product
 * @param {Object} attribute descriptor - attribute entity
 */
export function displayAttribute (product, attribute) {
  return '<strong>' + attribute.default_frontend_label + '</strong>: ' + product[attribute.attribute_code]
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
 * Decodes any named and numerical character references in text
 * @param {String} value
 */
export function htmlDecode (value) {
  if (value) return he.decode(value)
  else return ''
}

/**
 * Register Vue common filters
 * @param {Object} app
 * @param {Object} config
 */
export function registerFilters (app) {
  Vue.filter('thumbnail', thumbnail)
  Vue.filter('slugify', slugify)
  Vue.filter('htmlDecode', htmlDecode)
  Vue.filter('price', price)
  Vue.filter('displayAttribute', displayAttribute)
}

/**
 * Re-fromat category path to be suitable for breadcrumb
 * @param {Array} categoryPath
 */
export function breadCrumbRoutes (categoryPath) {
  const tmpRts = []
  for (let sc of categoryPath) {
    tmpRts.push({
      name: sc.name,
      route_link: '/c/' + sc.slug
    })
  }

  return tmpRts
}
