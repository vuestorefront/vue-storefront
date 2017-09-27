import config from '../../config'
import * as types from '../mutation-types'
import _ from 'lodash'
const bodybuilder = require('bodybuilder')
import { slugify } from '../../lib/filters'

let es = require('elasticsearch')
let client = new es.Client({
  host: config.elasticsearch.host,
  httpAuth: config.elasticsearch.httpAuth,
  log: 'debug',
  apiVersion: '5.5',
  requestTimeout: 5000
})

const state = {
  categories: [],
  results: [],
  current_category: null,
  _flt_query: {} // elastic search filter query
}

const getters = {
}

/**
 * Helper function to handle ElasticSearch Results
 * @param {Object} resp result from ES call
 * @param {Int} start pagination data
 * @param {Int} size pagination data
 */
function _handleEsResult (resp, start = 0, size = 50) {
  if (resp == null) {
    throw new Error('Invalid ES result - null not exepcted')
  }
  if (resp.hasOwnProperty('hits')) {
    return {
      items: _.map(resp.hits.hits, function (hit) {
        return Object.assign(hit._source, { _score: hit._score, slug: hit._source.hasOwnProperty('name') ? slugify(hit._source.name) : '' })
      }), // TODO: add scoring information
      total: resp.hits.total,
      start: start,
      pageSize: size,
      aggregations: resp.aggregations
    }
  } else {
    if (resp.error) {
      throw new Error(JSON.stringify(resp.error))
    } else {
      throw new Error('Unknown error with ES result in _handleEsResult')
    }
  }
}

// actions
const actions = {
  /**
   * Load categories within specified parent
   * @param {Object} commit promise
   * @param {Object} parent parent category
   */
  loadCategories ({ commit }, parent) {
    let qr = '*'

    if (typeof parent !== 'undefined') {
      qr = 'parent_id:' + parent.id
    }

    return new Promise((resolve, reject) => {
      client.search({
        index: config.elasticsearch.index, // TODO: add grouped prodduct and bundled product support
        type: 'category',
        q: qr,
        '_sourceInclude': ['name', 'position', 'id', 'parent_id']

      }).then(function (resp) {
        commit(types.CATALOG_UPD_CATEGORIES, resp)
        resolve(resp)
      }).catch(function (err) {
        reject(err)
      })
    })
  },

  /**
   * Load category object by slug - using local storage/indexed Db
   * loadCategories() should be called at first!
   * @param {Object} commit
   * @param {String} category
   * @param {Bool} setCurrentCategory default=true and means that state.current_category is set to the one loaded
   */
  getCategoryBySlug ({ commit }, slug, setCurrentCategory = true) {
    return new Promise((resolve, reject) => {
      const catCollection = global.db.categoriesCollection
      catCollection.getItem(slug, (error, category) => {
        if (error) reject(null)

        if (setCurrentCategory) {
          commit(types.CATALOG_UPD_CURRENT_CATEGORY, category)
        }
        resolve(category)
      })
    })
  },

  /**
   * Search ElasticSearch catalog of products using simple text query
   * @param {String} queryText full text search query
   * @param {Int} start start index
   * @param {Int} size page size
   * @return {Promise}
   */
  quickSearchByText ({ commit }, queryText, start = 0, size = 50) {
    size = parseInt(size)
    if (size <= 0) size = 50
    if (start < 0) start = 0

    return new Promise((resolve, reject) => {
      client.search({
        index: config.elasticsearch.index, // TODO: add grouped prodduct and bundled product support
        type: 'product',
        q: queryText,
        size: size,
        from: start

      }).then(function (resp) {
        resolve(_handleEsResult(resp, start, size))
      }).catch(function (err) {
        reject(err)
      })
    })
  },

  /**
   * Search ElasticSearch catalog of products using simple text query
   * Use bodybuilder to build the query, aggregations etc: http://bodybuilder.js.org/
   * @param {Object} bodyObj elasticSearch request body
   * @param {Int} start start index
   * @param {Int} size page size
   * @return {Promise}
   */
  quickSearchByQuery ({ commit }, bodyObj, start = 0, size = 50) {
    size = parseInt(size)
    if (size <= 0) size = 50
    if (start < 0) start = 0

    return new Promise((resolve, reject) => {
      client.search({
        index: config.elasticsearch.index, // TODO: add grouped prodduct and bundled product support
        type: 'product',
        body: bodyObj
      }).then(function (resp) {
        resolve(_handleEsResult(resp, start, size))
      }).catch(function (err) {
        reject(err)
      })
    })
  },

  /**
   * Search products by specific field
   * @param {String} fieldName field name to search by
   * @param {Object} value expected value
   */
  searchProductBy ({ commit }, fieldName, value) {
    return this.quickSearchByQuery({ commit }, bodybuilder().query('match', fieldName, value).build())
  },

  /**
   * Search ElasticSearch catalog of products
   * @param {String} Object ElasticSearch query object
   * @param {Object} aggregates - agg. config for elasticsearch
   * @param {Int} start start index
   * @param {Int} size page size
   * Use bodybuilder to build the query, aggregations etc: http://bodybuilder.js.org/
   */
  search ({ commit }, bodyObj, start = 0, size = 50) {
    size = parseInt(size)
    if (size <= 0) size = 50
    if (start < 0) start = 0
    commit(types.CATALOG_UPD_SEARCH_QUERY, bodyObj)
    console.log(bodyObj)
    client.search({
      index: config.elasticsearch.index, // TODO: add grouped prodduct and bundled product support
      body: bodyObj
    }).then(function (resp) {
      commit(types.CATALOG_UPD_PRODUCTS, _handleEsResult(resp, start, size))
    }).catch(function (err) {
      throw new Error(err)
    })
  }
}

// mutations
const mutations = {
  [types.CATALOG_UPD_CATEGORIES] (state, categories) {
    state.categories = _handleEsResult(categories).items // extract fields from ES _source

    for (let category of state.categories) {
      const catCollection = global.db.categoriesCollection
      catCollection.setItem(category.slug.toLowerCase(), category).catch((reason) => {
        console.error(reason)
      }) // populate cache
    }
  },

  [types.CATALOG_UPD_CURRENT_CATEGORY] (state, category) {
    state.current_category = category
  },

  [types.CATALOG_UPD_SEARCH_QUERY] (bodyObj) {
    state._flt_query = bodyObj
  },

  [types.CATALOG_UPD_PRODUCTS] (state, products) {
    state.results = products // extract fields from ES _source
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
