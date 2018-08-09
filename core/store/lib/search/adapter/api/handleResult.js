import map from 'lodash-es/map'
import config from 'config'
import { slugify } from '../../../../helpers'

/**
* Helper function to handle ElasticSearch Results
* @param {Object} resp result from ES call
* @param {Int} start pagination data
* @param {Int} size pagination data
*/
export function handleResult (resp, type, start = 0, size = 50) {
  if (resp === null) {
    throw new Error('Invalid ES result - null not exepcted')
  }
  if (resp.hasOwnProperty('hits')) {
    return {
      items: map(resp.hits.hits, function (hit) {
        return Object.assign(hit._source, { _score: hit._score, slug: (hit._source.hasOwnProperty('url_key') && config.products.useMagentoUrlKeys) ? hit._source.url_key : (hit._source.hasOwnProperty('name') ? slugify(hit._source.name) + '-' + hit._source.id : '') }) // TODO: assign slugs server side
      }), // TODO: add scoring information
      total: resp.hits.total,
      start: start,
      perPage: size,
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
