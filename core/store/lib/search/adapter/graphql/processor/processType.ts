import Response from '@vue-storefront/store/types/search/Response'
import map from 'lodash-es/map'
import { slugify } from '../../../../../helpers'
import rootStore from '../../../../../'

export function processESResponseType (resp, start, size): Response {
  const response = {
    items: map(resp.hits.hits, hit => {
      return Object.assign(hit._source, {
        _score: hit._score,
        slug: (hit._source.hasOwnProperty('url_key') && rootStore.state.config.products.useMagentoUrlKeys)
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

export function processProductsType (resp, start, size): Response {
  const response = {
    items: map(resp.items, item => {
      let options = {}
      if (item._score) {
        options['_score'] = item._score
        delete item._score
      }
      options['slug'] = (item.hasOwnProperty('url_key') &&
      rootStore.state.config.products.useMagentoUrlKeys)
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
