import config from '../../config'
import * as types from '../mutation-types'
import _ from 'lodash'
import { entityKeyName } from '../../lib/entities'
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
  attributes: {},
  attributeLabels: {},
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
        return Object.assign(hit._source, { _score: hit._score, slug: hit._source.hasOwnProperty('name') ? slugify(hit._source.name) + '-' + hit._source.id : '' }) // TODO: assign slugs server side
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
  loadCategories (context, { parent = null, size = 150, start = 0 }) {
    const commit = context.commit
    let qr = '*'

    if (parent && typeof parent !== 'undefined') {
      qr = 'parent_id:' + parent.id
    }

    return new Promise((resolve, reject) => {
      if (state.categories.length > 0) { // already loaded
        resolve(state.categories)
      } else {
        client.search({
          index: config.elasticsearch.index, // TODO: add grouped prodduct and bundled product support
          type: 'category',
          q: qr,
          size: 150,
          from: start,
          '_sourceInclude': ['name', 'position', 'id', 'parent_id']

        }).then(function (resp) {
          commit(types.CATALOG_UPD_CATEGORIES, resp)
          resolve(resp)
        }).catch(function (err) {
          reject(err)
        })
      }
    })
  },

  /**
   * Load attributes with specific codes
   * @param {Object} context
   * @param {Array} attrCodes attribute codes to load
   */
  loadAttributes (context, { attrCodes = null, size = 150, start = 0 }) {
    const commit = context.commit

    let qrObj = bodybuilder()
    for (let attrCode of attrCodes) {
      qrObj = qrObj.orFilter('term', 'attribute_code', attrCode)
    }

    return context.dispatch('quickSearchByQuery', { entityType: 'attribute', query: qrObj.build() }).then(function (resp) {
      commit(types.CATALOG_UPD_ATTRIBUTES, resp)
    }).catch(function (err) {
      console.error(err)
    })
  },

  /**
   * Load category object by specific field - using local storage/indexed Db
   * loadCategories() should be called at first!
   * @param {Object} commit
   * @param {String} key
   * @param {String} value
   * @param {Bool} setCurrentCategory default=true and means that state.current_category is set to the one loaded
   */
  getCategoryBy (context, { key, value, setCurrentCategory = true }) {
    const state = context.state
    const commit = context.commit
    return new Promise((resolve, reject) => {
      let setcat = (error, category) => {
        if (error) reject(null)

        if (setCurrentCategory) {
          commit(types.CATALOG_UPD_CURRENT_CATEGORY, category)
        }
        resolve(category)
      }

      if (state.categories.length > 0) { // SSR - there were some issues with using localForage, so it's the reason to use local state instead, when possible
        let category = state.categories.find((itm) => { return itm[key] === value })
        setcat(null, category)
      } else {
        const catCollection = global.db.categoriesCollection
        console.log(entityKeyName(key, value))
        catCollection.getItem(entityKeyName(key, value), setcat)
      }
    })
  },

  /**
   * Search ElasticSearch catalog of products using simple text query
   * @param {String} queryText full text search query
   * @param {Int} start start index
   * @param {Int} size page size
   * @return {Promise}
   */
  quickSearchByText (context, { queryText, start = 0, size = 50 }) {
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
   * @param {Object} query elasticSearch request body
   * @param {Int} start start index
   * @param {Int} size page size
   * @return {Promise}
   */
  quickSearchByQuery (context, { query, start = 0, size = 50, entityType = 'product' }) {
    size = parseInt(size)
    if (size <= 0) size = 50
    if (start < 0) start = 0

    return new Promise((resolve, reject) => {
      client.search({
        index: config.elasticsearch.index, // TODO: add grouped prodduct and bundled product support
        type: entityType,
        body: query,
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
   * Search products by specific field
   * @param {String} fieldName field name to search by
   * @param {Object} value expected value
   */
  searchProductBy (context, { fieldName, value }) {
    return this.quickSearchByQuery(context, { query: bodybuilder().query('match', fieldName, value).build() })
  },

  /**
   * Search ElasticSearch catalog of products
   * @param {String} Object ElasticSearch query object
   * @param {Object} aggregates - agg. config for elasticsearch
   * @param {Int} start start index
   * @param {Int} size page size
   * Use bodybuilder to build the query, aggregations etc: http://bodybuilder.js.org/
   */
  search (context, { query, start = 0, size = 50 }) {
    const commit = context.commit

    size = parseInt(size)
    if (size <= 0) size = 50
    if (start < 0) start = 0
    commit(types.CATALOG_UPD_SEARCH_QUERY, query)
    console.log(query)
    client.search({
      index: config.elasticsearch.index, // TODO: add grouped prodduct and bundled product support
      body: query
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
      try {
        catCollection.setItem(entityKeyName('slug', category.slug.toLowerCase()), category).catch((reason) => {
          console.debug(reason) // it doesn't work on SSR
        }) // populate cache by slug
        catCollection.setItem(entityKeyName('id', category.id), category).catch((reason) => {
          console.debug(reason) // it doesn't work on SSR
        }) // populate cache by id
      } catch (e) {
        console.error(e)
      }
    }
  },
  /**
   * Store attributes by code in state and localForage
   * @param {} state
   * @param {Array} attributes
   */
  [types.CATALOG_UPD_ATTRIBUTES] (state, attributes) {
    let attrList = attributes.items // extract fields from ES _source
    let attrHash = {}

    for (let attr of attrList) {
      attrHash[attr.attribute_code] = attr

      const attrCollection = global.db.attributesCollection
      try {
        attrCollection.setItem(entityKeyName('attribute_code', attr.attribute_code.toLowerCase()), attr).catch((reason) => {
          console.debug(reason) // it doesn't work on SSR
        }) // populate cache by slug
      } catch (e) {
        console.error(e)
      }
    }
    state.attributes = attrHash
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
