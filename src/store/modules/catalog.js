import config from '../../config'
import * as types from '../mutation-types'
import _ from 'lodash'

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
  _flt_query: {} // elastic search filter query
}

const getters = {
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

    client.search({
      index: config.elasticsearch.index, // TODO: add grouped prodduct and bundled product support
      type: 'category',
      q: qr,
      '_sourceInclude': ['name', 'position', 'id', 'parent_id']

    }).then(function (resp) {
      commit(types.UPD_CATEGORIES, resp.hits)
    }).catch(function (err) {
      throw new Error(err.message)
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

    return client.search({
      index: config.elasticsearch.index, // TODO: add grouped prodduct and bundled product support
      type: 'product',
      q: queryText,
      size: size,
      from: start

    }).catch(function (err) {
      throw new Error(err.message)
    })
  },

  /**
   * Search ElasticSearch catalog of products using simple text query
   * @param {Object} bodyObj elasticSearch request body
   * @param {Int} start start index
   * @param {Int} size page size
   * @return {Promise}
   */
  quickSearchByQuery ({ commit }, bodyObj, start = 0, size = 50) {
    size = parseInt(size)
    if (size <= 0) size = 50
    if (start < 0) start = 0

    return client.search({
      index: config.elasticsearch.index, // TODO: add grouped prodduct and bundled product support
      type: 'product',
      body: bodyObj
    }).catch(function (err) {
      throw new Error(err.message)
    })
  },

  /**
   * Search ElasticSearch catalog of products
   * @param {String} Object ElasticSearch query object
   * @param {Object} aggregates - agg. config for elasticsearch
   * @param {Int} start start index
   * @param {Int} size page size
   *
   *
   * {
  "query": {
    "filtered": {
      "filter": {
        "bool": {
          "must": [
            {"term": { "tag": "solr" }},
            {"term": { "user": "betty" }}
            ]
        }
      }
    }
  },
"aggs": {
   "agg_user": {
      "terms": {
         "field": "user"
      }
   },
   "agg_tag": {
      "terms": {
         "field": "tag"
      }
   }
  }
} => https://stackoverflow.com/questions/30011037/how-to-apply-faceted-search-in-elastic-search-with-multiple-filters
you can use https://github.com/danpaz/bodybuilder
   */
  search ({ commit }, bodyObj, start = 0, size = 50) {
    size = parseInt(size)
    if (size <= 0) size = 50
    if (start < 0) start = 0
    commit(types.UPD_SEARCH_QUERY, bodyObj)
    console.log(bodyObj)
    client.search({
      index: config.elasticsearch.index, // TODO: add grouped prodduct and bundled product support
      body: bodyObj
    }).then(function (resp) {
      commit(types.UPD_PRODUCTS, resp.hits)
    }).catch(function (err) {
      throw new Error(err)
    })
  }
}

// mutations
const mutations = {
  [types.UPD_CATEGORIES] (state, categories) {
    state.categories = _.map(categories.hits, '_source') // extract fields from ES _source
  },

  [types.UPD_SEARCH_QUERY] (bodyObj) {
    state._flt_query = bodyObj
  },

  [types.UPD_PRODUCTS] (state, products) {
    state.results = _.map(products.hits, '_source') // extract fields from ES _source
    console.log(JSON.stringify(state.results))
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
