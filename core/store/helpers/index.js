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
 * Re-format category path to be suitable for breadcrumb
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

/**
 * Return configurable product thumbnail depending on the configurable_children
 * @param {object} product
 * @param {bool} ignoreConfig
 */
export function productThumbnailPath (product, ignoreConfig = false) {
  let thumbnail = product.image
  if ((product.type_id && product.type_id === 'configurable') && product.hasOwnProperty('configurable_children') &&
    product.configurable_children.length && (ignoreConfig || !product.is_configured) &&
    ('image' in product.configurable_children[0])
  ) {
    thumbnail = product.configurable_children[0].image
  }
  return thumbnail
}
