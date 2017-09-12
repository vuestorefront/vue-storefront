import config from '../../config'
import * as types from '../mutation-types'
import _ from 'lodash'

let es = require('elasticsearch')
let client = new es.Client({
  host: config.elasticsearch.host,
  log: 'error'
})

const state = {
  categories: []
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
    }, function (err) {
      throw new Error(err.message)
    })
  },
  /**
   * Search ElasticSearch catalog - products OR categories
   * @param {Object} context search parameters to be used
   */
  search ({ commit }, { query, start, limit }) {
    client.search({
      index: config.elasticsearch.index, // TODO: add grouped prodduct and bundled product support
      'q': '*',
      'size': 1
//      '_sourceInclude': ['name', 'position', 'id', 'parent_id']
    }).then(function (resp) {
      console.log(resp.hits)
    }, function (err) {
      throw new Error(err.message)
    })
  }
}

// mutations
const mutations = {
  [types.UPD_CATEGORIES] (state, categories) {
    state.categories = _.map(categories.hits, '_source') // extract fields from ES _source
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
