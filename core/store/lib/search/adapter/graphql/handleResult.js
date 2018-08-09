import map from 'lodash-es/map'
import config from 'config'
import { slugify } from '../../../../helpers'

/**
* Helper function to handle ElasticSearch Results
* @param {Object} resp result from ES call
* @param {String} type entity type
* @param {Int} start pagination data
* @param {Int} size pagination data
*/
export function handleResult (resp, type, start = 0, size = 50) {
  if (resp === null) {
    throw new Error('Invalid graphQl result - null not exepcted')
  }

  if (resp.hasOwnProperty('data')) {
    let response = []
    switch (type) {
      case 'product':
        response = processProductsType(resp.data.products, start, size)
        break
      case 'attribute':
        response = processESResponseType(resp.data.customAttributeMetadata, start, size)
        break
    }

    return response
  } else {
    if (resp.error) {
      throw new Error(JSON.stringify(resp.error))
    } else {
      throw new Error('Unknown error with graphQl result in _handleGqlResult')
    }
  }
}

function processESResponseType (resp, start, size) {
  const response = {
    items: map(resp.hits.hits, function (hit) {
      return Object.assign(hit._source, {
        _score: hit._score,
        slug: (hit._source.hasOwnProperty('url_key') && config.products.useMagentoUrlKeys)
          ? hit._source.url_key
          : (hit._source.hasOwnProperty('name') ? slugify(hit._source.name) + '-' + hit._source.id : '')
      }) // TODO: assign slugs server side
    }), // TODO: add scoring information
    total: resp.hits.total,
    start: start,
    perPage: size,
    aggregations: resp.aggregations
  }
  return response
}

function processProductsType (resp, start, size) {
  const response = {
    items: map(resp.items, function (item) {
      let options = {}
      if (item._score) {
        options._score = item._score
        delete item._score
      }
      options.slug = (item.hasOwnProperty('url_key') &&
     config.products.useMagentoUrlKeys)
        ? item.url_key : (item.hasOwnProperty('name')
          ? slugify(item.name) + '-' + item.id : '')

      return Object.assign(item, options) // TODO: assign slugs server side
    }), // TODO: add scoring information
    total: resp.total_count,
    start: start,
    perPage: size,
    aggregations: resp.aggregations
  }
  return response
}
