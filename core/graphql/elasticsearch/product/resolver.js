const config = require('config')
const client = require('../client')

async function search (id) {
  let allRecords = ''
  const response = await client.search({
    index: config.elasticsearch.index,
    type: 'product',
    body: {
      query: {
        match: {
          id: id
        }
      }
    }
  })

  response.hits.hits.forEach(function (hit) {
    allRecords = hit._source
  })

  return allRecords
}

async function searchList (req) {
  let allRecords = []
  const response = await client.search({
    index: config.elasticsearch.index,
    type: 'product',
    body: {
      query: {
        multi_match: {
          query: req,
          fields: ['name', 'description']
        }
      }
    }
  })

  response.hits.hits.forEach(function (hit) {
    allRecords.push(hit._source)
  })

  return allRecords
}

const resolver = {
  Query: {
    Product: (_, { id }) => search(id),
    ProductList: (_, { query }) => searchList(query)
  }
}

module.exports = resolver
