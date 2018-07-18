import map from 'lodash-es/map'
import { slugify } from '../helpers'
import { prepareGraphQlBody } from '../helpers/gqlQueryBuilder'
import { currentStoreView } from './multistore'
import hash from 'object-hash'
import config from 'config'
import fetch from 'isomorphic-fetch'

function isOnline () {
  if (typeof navigator !== 'undefined') {
    return navigator.onLine
  } else {
    return true // SSR
  }
}

/**
 * Execute GraphQl query
 */
function searchGql (gqlQuery) {
  let urlGql = config.server.protocol + '://' + config.graphql.host + ':' + config.graphql.port + '/graphql'

  const body = prepareGraphQlBody(gqlQuery)

  return fetch(urlGql, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: body
  })
    .then(resp => {
      // console.log('data returned:', resp.json())
      return resp.json()
    })
    // .then(data => console.log('data returned:', data.ProductList))
}

/**
 * Helper function to handle ElasticSearch Results
 * @param {Object} resp result from ES call
 * @param {Int} start pagination data
 * @param {Int} size pagination data
 */
function _handleGqlResult (resp, start = 0, size = 50) {
  // console.log(resp)
  if (resp == null) {
    throw new Error('Invalid ES result - null not exepcted')
  }
  if (resp.hasOwnProperty('data')) {
    let itemsValues = {
      items: map(resp.data.ProductList, function (hit) {
        // console.log(hit)
        return Object.assign(hit._source, { slug: (hit.hasOwnProperty('url_key') && config.products.useMagentoUrlKeys) ? hit.url_key : (hit.hasOwnProperty('name') ? slugify(hit.name) + '-' + hit.id : '') }) // TODO: assign slugs server side
      }), // TODO: add scoring information
      // total: resp.hits.total,
      start: start,
      perPage: size,
      aggregations: resp.aggregations
    }
    return itemsValues
  } else {
    if (resp.error) {
      throw new Error(JSON.stringify(resp.error))
    } else {
      throw new Error('Unknown error with ES result in _handleGqlResult')
    }
  }
}

/**
 * Search ElasticSearch catalog of products using simple text query
 * Use bodybuilder to build the query, aggregations etc: http://bodybuilder.js.org/
 * @param {Object} queryBodyParams request params body
 * @param {Int} start start index
 * @param {Int} size page size
 * @return {Promise}
 */
export function quickSearchByQueryGql ({ queryBodyParams, start = 0, size = 50, entityType = 'product', sort = '', index = null, excludeFields = null, includeFields = null }) {
  size = parseInt(size)
  if (size <= 0) size = 50
  if (start < 0) start = 0

  return new Promise((resolve, reject) => {
    const storeView = currentStoreView()

    const gqlQuery = {
      index: index || storeView.elasticsearch.index, // TODO: add grouped prodduct and bundled product support
      type: entityType,
      body: queryBodyParams,
      size: size,
      from: start,
      sort: sort
    }

    if (excludeFields) gqlQuery._sourceExclude = excludeFields
    if (includeFields) gqlQuery._sourceInclude = includeFields
    const cache = global.$VS.db.elasticCacheCollection // switch to appcache?
    const cacheKey = hash(gqlQuery)
    let servedFromCache = false
    const benchmarkTime = new Date()
    cache.getItem(cacheKey, (err, res) => {
      if (err) {
        console.log(err)
      }

      if (res !== null) {
        res.cache = true
        res.noresults = false
        res.offline = !isOnline() // TODO: refactor it to checking ES heartbit
        resolve(res)
        console.debug('Result from cache for ' + cacheKey + ' (' + entityType + '), ms=' + (new Date().getTime() - benchmarkTime.getTime()))
        servedFromCache = true
      } else {
        if (!isOnline()) {
          console.debug('No results and offline ' + cacheKey + ' (' + entityType + '), ms=' + (new Date().getTime() - benchmarkTime.getTime()))

          res = {
            items: [],
            total: 0,
            start: 0,
            perPage: 0,
            aggregations: {},
            offline: true,
            cache: true,
            noresults: true
          }

          servedFromCache = true
          resolve(res)
        }
      }
    }).catch((err) => { console.error('Cannot read cache for ' + cacheKey + ', ' + err) })

    // Use test graphql for simple product search
    searchGql(gqlQuery).then(function (resp) { // we're always trying to populate cache - when online
      const res = _handleGqlResult(resp, start, size)
      cache.setItem(cacheKey, res).catch((err) => { console.error('Cannot store cache for ' + cacheKey + ', ' + err) })
      if (!servedFromCache) { // if navigator onLine == false means ES is unreachable and probably this will return false; sometimes returned false faster than indexedDb cache returns result ...
        console.debug('Result from ES for ' + cacheKey + ' (' + entityType + '),  ms=' + (new Date().getTime() - benchmarkTime.getTime()))
        res.cache = false
        res.noresults = false
        res.offline = false
        resolve(res)
      }
    }).catch(function (err) {
      // reject(err)
      console.error(err)
    })
  })
}
