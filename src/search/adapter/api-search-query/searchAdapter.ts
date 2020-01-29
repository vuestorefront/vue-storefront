import fetch from 'isomorphic-fetch'
import { processURLAddress } from '@vue-storefront/core/helpers'
import queryString from 'query-string'
import { currentStoreView, prepareStoreView } from '@vue-storefront/core/lib/multistore'
import { SearchQuery } from 'storefront-query-builder'
import HttpQuery from '@vue-storefront/core/types/search/HttpQuery'
import config from 'config'
import getApiEndpointUrl from '@vue-storefront/core/helpers/getApiEndpointUrl'

import { Logger } from '@vue-storefront/core/lib/logger'
import { SearchAdapter as OrgSearchAdapter } from '@vue-storefront/core/lib/search/adapter/api-search-query/searchAdapter'

export class SearchAdapter extends OrgSearchAdapter {
  public async search (Request) {
    const rawQueryObject = Request.searchQuery
    const response_format = 'compact'
    let request_format = 'search-query'

    if (!this.entities[Request.type]) {
      throw new Error('No entity type registered for ' + Request.type)
    }
    if (!(Request.searchQuery instanceof SearchQuery)) {
      request_format = 'dsl'
      Logger.warn('You are using a DSL query in `search-query` api.', 'api-search-query')()
    }
    if (Request.hasOwnProperty('groupId') && Request.groupId !== null) {
      rawQueryObject['groupId'] = Request.groupId
    }
    if (Request.hasOwnProperty('groupToken') && Request.groupToken !== null) {
      rawQueryObject['groupToken'] = Request.groupToken
    }
    const storeView = (Request.store === null) ? currentStoreView() : await prepareStoreView(Request.store)
    Request.index = storeView.elasticsearch.index

    let url = processURLAddress(getApiEndpointUrl(storeView.elasticsearch, 'host'))

    if (this.entities[Request.type].url) {
      url = getApiEndpointUrl(this.entities[Request.type], 'url')
    }

    const httpQuery: HttpQuery = {
      size: Request.size,
      from: Request.from,
      sort: Request.sort,
      request_format,
      response_format
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
    if (config.elasticsearch.queryMethod === 'GET') {
      httpQuery.request = JSON.stringify(rawQueryObject)
    }
    url = url + '/' + encodeURIComponent(Request.index) + '/' + encodeURIComponent(Request.type) + '/_search'
    url = url + '?' + queryString.stringify(httpQuery)
    return fetch(url, { method: config.elasticsearch.queryMethod,
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: config.elasticsearch.queryMethod === 'POST' ? JSON.stringify(rawQueryObject) : null
    })
      .then(resp => { return resp.json() })
      .catch(error => {
        throw new Error('FetchError in request to API: ' + error.toString())
      })
  }
}
