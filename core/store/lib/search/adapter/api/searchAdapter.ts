import map from 'lodash-es/map'
import rootStore from '../../../../'
import { prepareElasticsearchQueryBody } from './elasticsearchQuery'
import fetch from 'isomorphic-fetch'
import { slugify } from '../../../../helpers'
import { currentStoreView, prepareStoreView } from '../../../multistore'
import SearchQuery from 'core/store/lib/search/searchQuery'
import HttpQuery from 'core/store/types/search/HttpQuery'
import Response from 'core/store/types/search/Response'

export class SearchAdapter {
  search (Request) {
    const buildURLQuery = obj => Object.entries(obj).map(pair => pair.map(encodeURIComponent).join('=')).join('&')

    let ElasticsearchQueryBody = {}
    if (Request.searchQuery instanceof SearchQuery) {
      ElasticsearchQueryBody = prepareElasticsearchQueryBody(Request.searchQuery)
    } else {
      // backward compatibility for old themes uses bodybuilder
      ElasticsearchQueryBody = Request.searchQuery
    }
    if (Request.hasOwnProperty('groupId') && Request.groupId !== null) {
      ElasticsearchQueryBody['groupId'] = Request.groupId
    }
    if (Request.hasOwnProperty('groupToken') && Request.groupToken !== null) {
      ElasticsearchQueryBody['groupToken'] = Request.groupToken
    }

    const storeView = (Request.store === null) ? currentStoreView() : prepareStoreView(Request.store)

    Request.index = storeView.elasticsearch.index

    let url = storeView.elasticsearch.host
    if (!url.startsWith('http')) {
      url = 'http://' + url
    }
    const httpQuery: HttpQuery = {
      size: Request.size,
      from: Request.from,
      sort: Request.sort
    }

    if (Request._sourceExclude) {
      httpQuery._source_exclude = Request._sourceExclude.join(',')
    }
    if (Request._sourceInclude) {
      httpQuery._source_include = Request._sourceInclude.join(',')
    }
    if (Request.q) {
      httpQuery.q = Request.q
    }

    if (!Request.index || !Request.type) {
      throw new Error('Query.index and Query.type are required arguments for executing ElasticSearch query')
    }

    url = url + '/' + encodeURIComponent(Request.index) + '/' + encodeURIComponent(Request.type) + '/_search'
    url = url + '?' + buildURLQuery(httpQuery)

    return fetch(url, { method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ElasticsearchQueryBody)
    }).then(resp => { return resp.json() })
  }

  handleResult (resp, type, start = 0, size = 50): Response {
    if (resp === null) {
      throw new Error('Invalid ES result - null not exepcted')
    }
    if (resp.hasOwnProperty('hits')) {
      return {
        items: map(resp.hits.hits, hit => {
          return Object.assign(hit._source, { _score: hit._score, slug: (hit._source.hasOwnProperty('url_key') && rootStore.state.config.products.useMagentoUrlKeys) ? hit._source.url_key : (hit._source.hasOwnProperty('name') ? slugify(hit._source.name) + '-' + hit._source.id : '') }) // TODO: assign slugs server side
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
        throw new Error('Unknown error with ES result in handleResult')
      }
    }
  }
}
