const state = {
}

const getters = {
}

// actions
const actions = {
  search (context) {
    let es = require('elasticsearch')

    let client = new es.Client({
      host: 'localhost:8080/api/catalog',
      log: 'trace'
    })

    client.search({
      index: 'vue_storefront_catalog', // TODO: add grouped prodduct and bundled product support
      'q': '*',
      'size': 1
    }).then(function (resp) {
      console.log(resp.hits)
    }, function (err) {
      console.trace(err.message)
    })
  }
}

// mutations
const mutations = {
}

export default {
  state,
  getters,
  actions,
  mutations
}
