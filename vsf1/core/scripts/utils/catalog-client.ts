import queryString from 'query-string'
import fetch from 'isomorphic-fetch'
import getApiEndpointUrl from '@vue-storefront/core/helpers/getApiEndpointUrl';

export const processURLAddress = (url: string = '', config: any) => {
  if (url.startsWith('/')) return `${getApiEndpointUrl(config.api, 'url')}${url}`
  return url
}
export async function search (request, storeView, config) {
  const elasticsearchQueryBody = request.searchQuery
  if (!request.index) request.index = storeView.elasticsearch.index
  let url = processURLAddress(getApiEndpointUrl(storeView.elasticsearch, 'host'), config)

  const httpQuery: {
    size: number,
    from: number,
    sort: string,
    _source_exclude?: string[],
    _source_include?: string[],
    q?: string,
    request?: string
  } = {
    size: request.size,
    from: request.from,
    sort: request.sort
  }

  if (request._sourceExclude) {
    httpQuery._source_exclude = request._sourceExclude.join(',')
  }
  if (request._sourceInclude) {
    httpQuery._source_include = request._sourceInclude.join(',')
  }
  if (request.q) {
    httpQuery.q = request.q
  }

  if (!request.index || !request.type) {
    throw new Error('Query.index and Query.type are required arguments for executing ElasticSearch query')
  }
  if (config.elasticsearch.queryMethod === 'GET') {
    httpQuery.request = JSON.stringify(elasticsearchQueryBody)
  }
  url = url + '/' + encodeURIComponent(request.index) + '/' + encodeURIComponent(request.type) + '/_search'
  url = url + '?' + queryString.stringify(httpQuery)
  return fetch(url, { method: config.elasticsearch.queryMethod,
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: config.elasticsearch.queryMethod === 'POST' ? JSON.stringify(elasticsearchQueryBody) : null
  })
    .then(resp => { return resp.json() })
    .catch(error => {
      throw new Error('FetchError in request to ES: ' + error.toString())
    })
}
