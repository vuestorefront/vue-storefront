import he from 'he'

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
  return value ? he.decode(value) : ''
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
