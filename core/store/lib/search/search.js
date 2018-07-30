import map from 'lodash-es/map'
import { slugify } from '../../helpers'
import { prepareGraphQlBody } from './adapter/graphql/gqlQuery'
import { prepareElasticsearchQueryBody } from './adapter/api/elasticsearchQuery'
import { currentStoreView, prepareStoreView } from '../multistore'
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
function searchGql (Query) {
  const gqlQueryBody = prepareGraphQlBody(Query)

  console.log(gqlQueryBody)

  let urlGql = config.server.protocol + '://' + config.graphql.host + ':' + config.graphql.port + '/graphql'

  return fetch(urlGql, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: gqlQueryBody
  })
    .then(resp => {
      // console.log('data returned:', resp.json())
      return resp.json()
    })
    // .then(data => console.log('data returned:', data.ProductList))
}

/**
 * Execute ElasticSearch query
 */
function searchES (elasticQuery) {
  const buildURLQuery = obj => Object.entries(obj).map(pair => pair.map(encodeURIComponent).join('=')).join('&')

  elasticQuery.body = prepareElasticsearchQueryBody(elasticQuery.body)

  const storeView = (elasticQuery.store === null) ? currentStoreView() : prepareStoreView(elasticQuery.store, config)

  elasticQuery.index = storeView.elasticsearch.index

  let url = storeView.elasticsearch.host
  if (!url.startsWith('http')) {
    url = 'http://' + url
  }
  const httpQuery = {
    'size': elasticQuery.size,
    'from': elasticQuery.from,
    'sort': elasticQuery.sort
  }
  if (elasticQuery._sourceExclude) {
    httpQuery._source_exclude = elasticQuery._sourceExclude.join(',')
  }
  if (elasticQuery._sourceInclude) {
    httpQuery._source_include = elasticQuery._sourceInclude.join(',')
  }
  if (elasticQuery.q) {
    httpQuery.q = elasticQuery.q
  }

  if (!elasticQuery.index || !elasticQuery.type) {
    throw new Error('elasticQuery.index and elasticQuery.type are required arguments for executing ElasticSearch query')
  }

  url = url + '/' + encodeURIComponent(elasticQuery.index) + '/' + encodeURIComponent(elasticQuery.type) + '/_search'
  url = url + '?' + buildURLQuery(httpQuery)

  return fetch(url, { method: 'POST',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(elasticQuery.body)
  }).then(resp => { return resp.json() })
}

/**
 * Execute search query
 */
function search (Query) {
  if (config.server.api === 'graphql' || Query.body.getSearchText() !== '') {
    return searchGql(Query)
  } else {
    return searchES(Query)
  }
}

/**
 * Helper function to handle ElasticSearch Results
 * @param {Object} resp result from ES call
 * @param {Int} start pagination data
 * @param {Int} size pagination data
 */
function _handleResult (resp, start = 0, size = 50) {
  if (config.server.api === 'graphql' || resp.hasOwnProperty('data')) {
    return _handleGqlResult(resp, start, size)
  } else {
    return _handleEsResult(resp, start, size)
  }
}

/**
 * Helper function to handle ElasticSearch Results
 * @param {Object} resp result from ES call
 * @param {Int} start pagination data
 * @param {Int} size pagination data
 */
function _handleGqlResult (resp, start = 0, size = 50) {
  if (resp === null) {
    throw new Error('Invalid graphQl result - null not exepcted')
  }

  console.log(resp)
  if (resp.hasOwnProperty('data')) {
    return {
      items: map(resp.data.searchProducts.hits.hits, function (hit) {
        return Object.assign(hit._source, { _score: hit._score, slug: (hit._source.hasOwnProperty('url_key') && config.products.useMagentoUrlKeys) ? hit._source.url_key : (hit._source.hasOwnProperty('name') ? slugify(hit._source.name) + '-' + hit._source.id : '') }) // TODO: assign slugs server side
      }), // TODO: add scoring information
      total: resp.data.searchProducts.hits.total,
      start: start,
      perPage: size,
      aggregations: resp.data.searchProducts.aggregations
    }
  } else {
    if (resp.error) {
      throw new Error(JSON.stringify(resp.error))
    } else {
      throw new Error('Unknown error with graphQl result in _handleGqlResult')
    }
  }
}

/**
 * Helper function to handle ElasticSearch Results
 * @param {Object} resp result from ES call
 * @param {Int} start pagination data
 * @param {Int} size pagination data
 */
function _handleEsResult (resp, start = 0, size = 50) {
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

/**
 * Search ElasticSearch catalog of products using simple text query
 * Use bodybuilder to build the query, aggregations etc: http://bodybuilder.js.org/
 * @param {Object} searchQuery query object
 * @param {Int} start start index
 * @param {Int} size page size
 * @return {Promise}
 */
export function quickSearchByQueryObj ({ searchQuery, start = 0, size = 50, entityType = 'product', sort = '', storeCode = null, excludeFields = null, includeFields = null }) {
  size = parseInt(size)
  if (size <= 0) size = 50
  if (start < 0) start = 0

  return new Promise((resolve, reject) => {
    const Query = {
      store: storeCode, // TODO: add grouped prodduct and bundled product support
      type: entityType,
      body: searchQuery,
      size: size,
      from: start,
      sort: sort
    }

    if (excludeFields) Query._sourceExclude = excludeFields
    if (includeFields) Query._sourceInclude = includeFields
    const cache = global.$VS.db.elasticCacheCollection // switch to appcache?
    const cacheKey = hash(Query)
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
    search(Query).then(function (resp) { // we're always trying to populate cache - when online
      const res = _handleResult(resp, start, size)
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
