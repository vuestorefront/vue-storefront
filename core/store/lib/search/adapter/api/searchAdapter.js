import map from 'lodash-es/map'
import config from 'config'
import { prepareElasticsearchQueryBody } from './elasticsearchQuery'
import fetch from 'isomorphic-fetch'
import { slugify } from '../../../../helpers'
import { currentStoreView, prepareStoreView } from '../../../multistore'
import SearchQuery from 'core/store/lib/search/searchQuery'

export class SearchAdapter {
  search (Query) {
    const buildURLQuery = obj => Object.entries(obj).map(pair => pair.map(encodeURIComponent).join('=')).join('&')

    let ElasticsearchQueryBody = ''
    if (Query.searchQuery instanceof SearchQuery) {
      ElasticsearchQueryBody = prepareElasticsearchQueryBody(Query.searchQuery)
    } else {
      // backward compatibility for old themes uses bodybuilder
      ElasticsearchQueryBody = Query.searchQuery
    }

    if (Query.hasOwnProperty('groupId')) {
      ElasticsearchQueryBody.groupId = Query.groupId
    }
    if (Query.hasOwnProperty('groupToken')) {
      ElasticsearchQueryBody.groupToken = Query.groupToken
    }

    const storeView = (Query.store === null) ? currentStoreView() : prepareStoreView(Query.store, config)

    Query.index = storeView.elasticsearch.index

    let url = storeView.elasticsearch.host
    if (!url.startsWith('http')) {
      url = 'http://' + url
    }
    const httpQuery = {
      'size': Query.size,
      'from': Query.from,
      'sort': Query.sort
    }
    if (Query._sourceExclude) {
      httpQuery._source_exclude = Query._sourceExclude.join(',')
    }
    if (Query._sourceInclude) {
      httpQuery._source_include = Query._sourceInclude.join(',')
    }
    if (Query.q) {
      httpQuery.q = Query.q
    }

    if (!Query.index || !Query.type) {
      throw new Error('Query.index and Query.type are required arguments for executing ElasticSearch query')
    }

    url = url + '/' + encodeURIComponent(Query.index) + '/' + encodeURIComponent(Query.type) + '/_search'
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

  handleResult (resp, type, start = 0, size = 50) {
    if (resp === null) {
      throw new Error('Invalid ES result - null not exepcted')
    }
    if (resp.hasOwnProperty('hits')) {
      return {
        items: map(resp.hits.hits, hit => {
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
        throw new Error('Unknown error with ES result in handleResult')
      }
    }
  }
}
