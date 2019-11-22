import { SearchAdapter as OrgSearchAdapter } from '@vue-storefront/core/lib/search/adapter/api/searchAdapter'
import { prepareElasticsearchQueryBody } from './elasticsearchQuery'

import config from 'config'
import fetch from 'isomorphic-fetch'
import queryString from 'query-string'
import HttpQuery from '@vue-storefront/core/types/search/HttpQuery'
import SearchQuery from '@vue-storefront/core/lib/search/searchQuery'
import { processURLAddress } from '@vue-storefront/core/helpers'
import { currentStoreView, prepareStoreView } from '@vue-storefront/core/lib/multistore'

export class SearchAdapter extends OrgSearchAdapter {
  /**
   * Duplicate of @vue-storefront/core/lib/search/adapter/api/searchAdapter.ts
   * to include our extended `prepareElasticsearchQueryBody` method changes
   * @param Request
   */
  public async search (Request) {
    if (!this.entities[Request.type]) {
      throw new Error('No entity type registered for ' + Request.type)
    }
    let ElasticsearchQueryBody = {}
    if (Request.searchQuery instanceof SearchQuery) {
      ElasticsearchQueryBody = await prepareElasticsearchQueryBody(Request.searchQuery)
      if (Request.searchQuery.getSearchText() !== '') {
        ElasticsearchQueryBody['min_score'] = config.elasticsearch.min_score
      }
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

    const storeView = (Request.store === null) ? currentStoreView() : await prepareStoreView(Request.store)

    Request.index = storeView.elasticsearch.index

    let url = processURLAddress(storeView.elasticsearch.host)

    if (this.entities[Request.type].url) {
      url = this.entities[Request.type].url
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
    if (config.elasticsearch.queryMethod === 'GET') {
      httpQuery.request = JSON.stringify(ElasticsearchQueryBody)
    }
    url = url + '/' + encodeURIComponent(Request.index) + '/' + encodeURIComponent(Request.type) + '/_search'
    url = url + '?' + queryString.stringify(httpQuery)
    return fetch(url, { method: config.elasticsearch.queryMethod,
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: config.elasticsearch.queryMethod === 'POST' ? JSON.stringify(ElasticsearchQueryBody) : null
    })
      .then(resp => { return resp.json() })
      .catch(error => {
        throw new Error('FetchError in request to ES: ' + error.toString())
      })
  }
}
