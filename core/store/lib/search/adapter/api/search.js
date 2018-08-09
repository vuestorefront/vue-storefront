import config from 'config'
import { prepareElasticsearchQueryBody } from './elasticsearchQuery'
import { currentStoreView, prepareStoreView } from '../../../multistore'
import fetch from 'isomorphic-fetch'

export function search (Query) {
  const buildURLQuery = obj => Object.entries(obj).map(pair => pair.map(encodeURIComponent).join('=')).join('&')

  let ElasticsearchQueryBody = prepareElasticsearchQueryBody(Query.searchQuery)

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
