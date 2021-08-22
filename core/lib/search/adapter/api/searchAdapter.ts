import map from 'lodash-es/map'
import { elasticsearch } from 'storefront-query-builder'
import fetch from 'isomorphic-fetch'
import { slugify, processURLAddress } from '@vue-storefront/core/helpers'
import queryString from 'query-string'
import { currentStoreView, prepareStoreView } from '@vue-storefront/core/lib/multistore'
import { SearchQuery } from 'storefront-query-builder'
import HttpQuery from '@vue-storefront/core/types/search/HttpQuery'
import { SearchResponse } from '@vue-storefront/core/types/search/SearchResponse'
import config from 'config'
import getApiEndpointUrl from '@vue-storefront/core/helpers/getApiEndpointUrl'
import rootStore from '@vue-storefront/core/store'

export class SearchAdapter {
  public entities: any

  public constructor () {
    this.entities = []
    this.initBaseTypes()
  }

  public async search (Request) {
    if (!this.entities[Request.type]) {
      throw new Error('No entity type registered for ' + Request.type)
    }
    let ElasticsearchQueryBody = {}
    if (Request.searchQuery instanceof SearchQuery) {
      const bodybuilder = await import(/* webpackChunkName: "bodybuilder" */ 'bodybuilder')
      ElasticsearchQueryBody = await elasticsearch.buildQueryBodyFromSearchQuery({ config, queryChain: bodybuilder.default(), searchQuery: Request.searchQuery })
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

    let url = processURLAddress(getApiEndpointUrl(storeView.elasticsearch, 'host'))

    if (this.entities[Request.type].url) {
      url = getApiEndpointUrl(this.entities[Request.type], 'url')
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

    let queryMethod = config.elasticsearch.queryMethod
    if (Request.type === 'product' && Request.sort) {
      const [ sortByField, sortOrder ] = Request.sort.split(':', 2)
      if (sortByField === 'position') {
        const currentCategoryId = rootStore.getters['category-next/getCurrentCategory'].id
        if (currentCategoryId) {
          // It's mandatory to send a POST request, in this case, otherwise, this sorting won't work
          queryMethod = 'POST'
          ElasticsearchQueryBody['sort'] = [{
            'category.position': {
              order: sortOrder || 'asc',
              mode: 'min',
              nested_path: 'category',
              nested_filter: {
                term: { category_category_id: currentCategoryId }
              }
            }
          }]
        }
      }
    }

    return fetch(url, {
      method: queryMethod,
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: queryMethod === 'POST' ? JSON.stringify(ElasticsearchQueryBody) : null
    })
      .then(resp => { return resp.json() })
      .catch(error => {
        throw new Error('FetchError in request to ES: ' + error.toString())
      })
  }

  public handleResult (resp, type, start = 0, size = 50): SearchResponse {
    if (resp === null) {
      throw new Error('Invalid ES result - null not exepcted')
    }
    if (resp.hasOwnProperty('hits')) {
      return {
        items: map(resp.hits.hits, hit => {
          return Object.assign(hit._source, { _score: hit._score, slug: hit._source.slug ? hit._source.slug : ((hit._source.hasOwnProperty('url_key') && config.products.useMagentoUrlKeys) ? hit._source.url_key : (hit._source.hasOwnProperty('name') ? slugify(hit._source.name) + '-' + hit._source.id : '')) }) // TODO: assign slugs server side
        }), // TODO: add scoring information
        total: resp.hits.total,
        start: start,
        perPage: size,
        aggregations: resp.aggregations,
        attributeMetadata: resp.attribute_metadata,
        suggestions: resp.suggest
      }
    } else {
      const isErrorObject = (resp && resp.code) >= 400 ? resp : null
      if (resp.error || isErrorObject) {
        throw new Error(JSON.stringify(resp.error || resp))
      } else {
        throw new Error('Unknown error with elasticsearch result in resultProcessor for entity type \'' + type + '\'')
      }
    }
  }

  public registerEntityType (entityType, { url = '', url_ssr = '', queryProcessor, resultProcessor }) {
    this.entities[entityType] = {
      queryProcessor: queryProcessor,
      resultProcessor: resultProcessor
    }
    if (url !== '') {
      this.entities[entityType]['url'] = url
    }
    if (url_ssr !== '') {
      this.entities[entityType]['url_ssr'] = url_ssr
    }
    return this
  }

  public initBaseTypes () {
    const baseTypes = config.elasticsearch.entityTypes;

    baseTypes.forEach(type => {
      this.registerEntityType(type, {
        queryProcessor: (query) => {
          // function that can modify the query each time before it's being executed
          return query
        },
        resultProcessor: (resp, start, size) => {
          return this.handleResult(resp, type, start, size)
        }
      })
    })
  }
}
