import { SearchResponse } from '@vue-storefront/core/types/search/SearchResponse'
import map from 'lodash-es/map'
import { slugify } from '@vue-storefront/core/helpers'
import config from 'config'

export function processESResponseType (resp, start, size): SearchResponse {
  const response = {
    items: map(resp.hits.hits, hit => {
      return Object.assign(hit._source, {
        _score: hit._score,
        slug: hit._source.slug ? hit._source.slug : ((hit._source.hasOwnProperty('url_key') && config.products.useMagentoUrlKeys)
          ? hit._source.url_key
          : (hit._source.hasOwnProperty('name') ? slugify(hit._source.name) + '-' + hit._source.id : ''))
      }) // TODO: assign slugs server side
    }), // TODO: add scoring information
    total: resp.hits.total,
    start: start,
    perPage: size,
    aggregations: resp.aggregations,
    suggestions: resp.suggest
  }

  return response
}

export function processProductsType (resp, start, size): SearchResponse {
  const response = {
    items: map(resp.items, item => {
      let options = {}
      if (item._score) {
        options['_score'] = item._score
        delete item._score
      }
      options['slug'] = item.slug ? item.slug : ((item.url_key &&
      config.products.useMagentoUrlKeys)
        ? item.url_key : (item.name
          ? slugify(item.name) + '-' + item.id : ''))

      return Object.assign(item, options) // TODO: assign slugs server side
    }), // TODO: add scoring information
    total: resp.total_count,
    start: start,
    perPage: size,
    aggregations: resp.aggregations,
    suggestions: resp.suggest
  }

  return response
}

export function processCmsType (resp, start, size): SearchResponse {
  const response = {
    items: resp.items,
    total: resp.total_count,
    start: start,
    perPage: size,
    aggregations: resp.aggregations,
    suggestions: resp.suggest
  }

  return response
}
