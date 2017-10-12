import * as types from '../mutation-types'
const bodybuilder = require('bodybuilder')
import { quickSearchByQuery } from '../../api/search'

const state = {
  products: [],
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
  single (context, { fieldName, value }) {
    return quickSearchByQuery({ query: bodybuilder().query('match', fieldName, value).build() }).then((res) => {
      if (res && res.items.length > 0) {
        const prod = res.items[0]

        if (prod.type_id === 'configurable') { // TODO: kind of inheritance or trait here to avoid ifology?
          if (prod.configurable_children.length > 0) {
            context.commit(types.CATALOG_UPD_SELECTED_VARIANT, prod.configurable_children[0]) // select the first variant - TODO: add support for variant selection from product list (parameters)
          }
        }

        return prod
      }
    })
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
    state.results = products // extract fields from ES _source
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
