import * as types from '../mutation-types'
const bodybuilder = require('bodybuilder')
import { quickSearchByQuery } from '../../api/search'
import { entityKeyName } from '../../lib/entities'

const state = {
  list: [],
  current: null,
  product_selected_variant: null
}

const getters = {
}
// actions
const actions = {

  /**
   * Search ElasticSearch catalog of products using simple text query
   * Use bodybuilder to build the query, aggregations etc: http://bodybuilder.js.org/
   * @param {Object} query elasticSearch request body
   * @param {Int} start start index
   * @param {Int} size page size
   * @return {Promise}
   */
  list (context, { query, start = 0, size = 50, entityType = 'product', sort = '' }) {
    return quickSearchByQuery({ query, start, size, entityType, sort }).then((resp) => {
      context.commit(types.CATALOG_UPD_PRODUCTS, resp)
      return resp
    }).catch(function (err) {
      console.error(err)
    })
  },

  /**
   * Search products by specific field
   * @param {String} fieldName field name to search by
   * @param {Object} value expected value
   */
  single (context, { fieldName, value, setCurrentProduct = true, selectDefaultVariant = true }) {
    const cacheKey = entityKeyName(fieldName, value)
    const cache = global.db.productsCollection // switch to appcache?

    return new Promise((resolve, reject) => {
      const benchmarkTime = new Date()
      cache.getItem(cacheKey, (err, res) => {
        if (err) {
          console.log(err)
        }

        const setupProduct = (prod) => {
          if (setCurrentProduct) {
            context.state.current = prod
          }
          if (prod.type_id === 'configurable') { // TODO: kind of inheritance or trait here to avoid ifology?
            if (prod.configurable_children.length > 0 && selectDefaultVariant) {
              context.commit(types.CATALOG_UPD_SELECTED_VARIANT, prod.configurable_children[0]) // select the first variant - TODO: add support for variant selection from product list (parameters)
            }
          }
          return prod
        }

        if (res !== null) {
          console.debug('Product:single - result from localForage for ' + cacheKey + '),  ms=' + (new Date().getTime() - benchmarkTime.getTime()))
          resolve(setupProduct(res))
        } else {
          quickSearchByQuery({ query: bodybuilder().query('match', fieldName, value).build() }).then((res) => {
            if (res && res.items.length > 0) {
              resolve(setupProduct(res.items[0])) // we don't store result into cache here as it's already populated by quickSerchByQuery (diffrent key)
            }
          })
        }
      }).catch((err) => { console.error('Cannot read cache for ' + cacheKey + ', ' + err) })
    })
  },

  /**
   * Configure product - finding best suited variant regarding configuration attribute
   */
  configure (context, { product = null, configuration }) {
    const state = context.state
    if (product === null) {
      product = state.current
    }

    let selectedVariant = product.configurable_children.find((child) => {
      let match = true
      for (let option of Object.keys(configuration)) {
        let attr = child.custom_attributes.find((a) => {
          return a.attribute_code === configuration[option].attribute_code
        })

        console.log(attr)
        if (attr) {
          match = attr.value.toString() === configuration[option].id.toString()
        }
      }

      return match
    })

    context.commit(types.CATALOG_UPD_SELECTED_VARIANT, selectedVariant)
    return selectedVariant
  },

  /**
  * Select product on product page
   * @param {Object} context
   * @param {Object} child_product
   */
  selectVariant (context, { child_product }) {
    context.commit(types.CATALOG_UPD_SELECTED_VARIANT, child_product)
  }
}

// mutations
const mutations = {
  [types.CATALOG_UPD_PRODUCTS] (state, products) {
    const cache = global.db.productsCollection // switch to appcache?
    for (let prod of products.items) { // we store each product separately in cache to have offline acces for products/single method
      const cacheKey = entityKeyName('id', prod.id)
      cache.setItem(cacheKey, prod).catch((err) => { console.error('Cannot store cache for ' + cacheKey + ', ' + err) })
    }
    state.list = products // extract fields from ES _source
  },
  [types.CATALOG_UPD_SELECTED_VARIANT] (state, product) {
    state.product_selected_variant = product
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
