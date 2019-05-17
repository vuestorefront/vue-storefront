import map from 'lodash-es/map'
import rootStore from '@vue-storefront/core/store'
import { prepareElasticsearchQueryBody } from './elasticsearchQuery'
import fetch from 'isomorphic-fetch'
import { slugify, processURLAddress } from '@vue-storefront/core/helpers'
import queryString from 'query-string'
import { currentStoreView, prepareStoreView } from '../../../multistore'
import SearchQuery from '@vue-storefront/core/lib/search/searchQuery'
import HttpQuery from '@vue-storefront/core/types/search/HttpQuery'
import { SearchResponse } from '@vue-storefront/core/types/search/SearchResponse'

export class SearchAdapter {
  public entities: any

  constructor () {
    this.entities = []
    this.initBaseTypes()
  }

  async search (Request) {
    if (!this.entities[Request.type]) {
      throw new Error('No entity type registered for ' + Request.type )
    }
    let ElasticsearchQueryBody = {}
    if (Request.searchQuery instanceof SearchQuery) {
      ElasticsearchQueryBody = await prepareElasticsearchQueryBody(Request.searchQuery)
      if (Request.searchQuery.getSearchText() !== '') {
        ElasticsearchQueryBody['min_score'] = rootStore.state.config.elasticsearch.min_score
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

    const storeView = (Request.store === null) ? currentStoreView() : prepareStoreView(Request.store)

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
    if (rootStore.state.config.elasticsearch.queryMethod === 'GET') {
      httpQuery.request = JSON.stringify(ElasticsearchQueryBody)
    }
    url = url + '/' + encodeURIComponent(Request.index) + '/' + encodeURIComponent(Request.type) + '/_search'
    url = url + '?' + queryString.stringify(httpQuery)
    return fetch(url, { method: rootStore.state.config.elasticsearch.queryMethod,
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: rootStore.state.config.elasticsearch.queryMethod === 'POST' ? JSON.stringify(ElasticsearchQueryBody) : null
    }).then(resp => { return resp.json() })
  }

  handleResult (resp, type, start = 0, size = 50): SearchResponse {
    if (resp === null) {
      throw new Error('Invalid ES result - null not exepcted')
    }
    if (resp.hasOwnProperty('hits')) {
      return {
        items: map(resp.hits.hits, hit => {
          return Object.assign(hit._source, { _score: hit._score, slug: hit._source.slug ? hit._source.slug : ((hit._source.hasOwnProperty('url_key') && rootStore.state.config.products.useMagentoUrlKeys) ? hit._source.url_key : (hit._source.hasOwnProperty('name') ? slugify(hit._source.name) + '-' + hit._source.id : '')) }) // TODO: assign slugs server side
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
        throw new Error('Unknown error with elasticsearch result in resultPorcessor for entity type \''+type+'\'')
      }
    }
  }

  registerEntityType (entityType, { url = '', queryProcessor, resultPorcessor }) {
    this.entities[entityType] = {
      queryProcessor: queryProcessor,
      resultPorcessor: resultPorcessor
    }
    if (url !== '') {
      this.entities[entityType]['url'] = url
    }
    return this
  }

  initBaseTypes() {
    this.registerEntityType('product', {
      queryProcessor: (query) => {
        // function that can modify the query each time before it's being executed
        return query
      },
      resultPorcessor: (resp, start, size) =>  {
        return this.handleResult(resp, 'product', start, size)
      }
    })

    this.registerEntityType('attribute', {
      queryProcessor: (query) => {
        // function that can modify the query each time before it's being executed
        return query
      },
      resultPorcessor: (resp, start, size) =>  {
        return this.handleResult(resp, 'attribute', start, size)
      }
    })

    this.registerEntityType('category', {
      queryProcessor: (query) => {
        // function that can modify the query each time before it's being executed
        return query
      },
      resultPorcessor: (resp, start, size) =>  {
        return this.handleResult(resp, 'category', start, size)
      }
    })

    this.registerEntityType('taxrule', {
      queryProcessor: (query) => {
        // function that can modify the query each time before it's being executed
        return query
      },
      resultPorcessor: (resp, start, size) =>  {
        return this.handleResult(resp, 'taxrule', start, size)
      }
    })

    this.registerEntityType('review', {
      queryProcessor: (query) => {
        // function that can modify the query each time before it's being executed
        return query
      },
      resultPorcessor: (resp, start, size) =>  {
        return this.handleResult(resp, 'review', start, size)
      }
    })
    this.registerEntityType('cms_page', {
      queryProcessor: (query) => {
        // function that can modify the query each time before it's being executed
        return query
      },
      resultPorcessor: (resp, start, size) =>  {
        return this.handleResult(resp, 'cms_page', start, size)
      }
    })
    this.registerEntityType('cms_block', {
      queryProcessor: (query) => {
        // function that can modify the query each time before it's being executed
        return query
      },
      resultPorcessor: (resp, start, size) =>  {
        return this.handleResult(resp, 'cms_block', start, size)
      }
    })
    this.registerEntityType('cms_hierarchy', {
      queryProcessor: (query) => {
        // function that can modify the query each time before it's being executed
        return query
      },
      resultPorcessor: (resp, start, size) =>  {
        return this.handleResult(resp, 'cms_hierarchy', start, size)
      }
    })
  }
}
