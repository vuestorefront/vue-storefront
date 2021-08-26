import { prepareQueryVars } from './gqlQuery'
import { currentStoreView, prepareStoreView } from '@vue-storefront/core/lib/multistore'
import fetch from 'isomorphic-fetch'
import { processESResponseType, processProductsType, processCmsType } from './processor/processType'
import { SearchQuery } from 'storefront-query-builder'
import config from 'config'
import { isServer } from '@vue-storefront/core/helpers'
import getApiEndpointUrl from '@vue-storefront/core/helpers/getApiEndpointUrl';

export class SearchAdapter {
  public entities: any

  public constructor () {
    this.entities = []
    this.initBaseTypes()
  }
  /**
   * register entit type using registerEntityTypeByQuery
   * @param {Request} Request request object
   * @return {Promise}
  */
  public async search (Request) {
    if (!(Request.searchQuery instanceof SearchQuery)) {
      throw new Error('SearchQuery instance has wrong class required to process with graphQl request.')
    }

    if (!this.entities[Request.type]) {
      throw new Error('No entity type registered for ' + Request.type)
    }

    const storeView = (Request.store === null) ? currentStoreView() : await prepareStoreView(Request.store)
    if (storeView.storeCode === undefined || storeView.storeCode == null || !Request.type) {
      throw new Error('Store and SearchRequest.type are required arguments for executing Graphql query')
    }

    const gqlQueryVars = prepareQueryVars(Request)
    const query = this.entities[Request.type].query

    const gqlQueryBody = JSON.stringify({
      query,
      variables: gqlQueryVars
    })

    // define GraphQL url from searchAdapter entity or use default graphQl host with storeCode param
    let urlGql = ''
    if (getApiEndpointUrl(this.entities[Request.type], 'url')) {
      urlGql = getApiEndpointUrl(this.entities[Request.type], 'url')
    } else {
      const serverProtocol = isServer ? getApiEndpointUrl(config.server, 'protocol') : config.server.protocol
      const host = isServer ? getApiEndpointUrl(config.graphql, 'host') : config.graphql.host
      const port = isServer ? getApiEndpointUrl(config.graphql, 'port') : config.graphql.port
      urlGql = serverProtocol + '://' + host + ':' + port + '/graphql'
      const urlStoreCode = (storeView.storeCode !== '') ? encodeURIComponent(storeView.storeCode) + '/' : ''
      urlGql = urlGql + '/' + urlStoreCode
    }

    return fetch(urlGql, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: gqlQueryBody
    })
      .then(resp => {
        return resp.json()
      })
      .catch(error => {
        throw new Error('FetchError in request to ES: ' + error.toString())
      })
  }

  /**
   * register entit type using registerEntityTypeByQuery
   * @param {string} gql gql file path
   * @param {String} url server URL
   * @param {function} queryProcessor some function which can update query if needed
   * @param {function} resultProcessor process results of response
   * @return {Object}
  */
  public registerEntityType (entityType, { url = '', url_ssr = '', gql, queryProcessor, resultProcessor }) {
    this.entities[entityType] = {
      query: require(`${gql}`),
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

  /**
   * register entit type using registerEntityTypeByQuery
   * @param {graphQl} query is the GraphQL query
   * @param {String} url server URL
   * @param {function} queryProcessor some function which can update query if needed
   * @param {function} resultProcessor process results of response
   * @return {Object}
  */
  public registerEntityTypeByQuery (entityType, { url = '', url_ssr = '', query, queryProcessor, resultProcessor }) {
    this.entities[entityType] = {
      query: query,
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

  // initialise default entitypes
  public initBaseTypes () {
    this.registerEntityType('product', {
      gql: './queries/products.gql',
      queryProcessor: (query) => {
        // function that can modify the query each time before it's being executed
        return query
      },
      resultProcessor: (resp, start, size) => {
        if (resp === null) {
          throw new Error('Invalid graphQl result - null not exepcted')
        }
        if (resp.hasOwnProperty('data')) {
          return processProductsType(resp.data.products, start, size)
        } else {
          if (resp.error) {
            throw new Error(JSON.stringify(resp.error))
          } else {
            throw new Error('Unknown error with graphQl result in resultProcessor for entity type \'product\'')
          }
        }
      }
    })

    this.registerEntityType('attribute', {
      gql: './queries/customAttributeMetadata.gql',
      queryProcessor: (query) => {
        // function that can modify the query each time before it's being executed
        return query
      },
      resultProcessor: (resp, start, size) => {
        if (resp === null) {
          throw new Error('Invalid graphQl result - null not exepcted')
        }
        if (resp.hasOwnProperty('data')) {
          return processESResponseType(resp.data.customAttributeMetadata, start, size)
        } else {
          if (resp.error) {
            throw new Error(JSON.stringify(resp.error))
          } else {
            throw new Error('Unknown error with graphQl result in resultProcessor for entity type \'attribute\'')
          }
        }
      }
    })
    this.registerEntityType('review', {
      gql: './queries/reviews.gql',
      queryProcessor: (query) => {
        // function that can modify the query each time before it's being executed
        return query
      },
      resultProcessor: (resp, start, size) => {
        if (resp === null) {
          throw new Error('Invalid graphQl result - null not exepcted')
        }
        if (resp.hasOwnProperty('data')) {
          return processESResponseType(resp.data.reviews, start, size)
        } else {
          if (resp.error) {
            throw new Error(JSON.stringify(resp.error))
          } else {
            throw new Error('Unknown error with graphQl result in resultProcessor for entity type \'review\'')
          }
        }
      }
    })
    this.registerEntityType('category', {
      gql: './queries/categories.gql',
      queryProcessor: (query) => {
        // function that can modify the query each time before it's being executed
        return query
      },
      resultProcessor: (resp, start, size) => {
        if (resp === null) {
          throw new Error('Invalid graphQl result - null not exepcted')
        }
        if (resp.hasOwnProperty('data')) {
          return processESResponseType(resp.data.categories, start, size)
        } else {
          if (resp.error) {
            throw new Error(JSON.stringify(resp.error))
          } else {
            throw new Error('Unknown error with graphQl result in resultProcessor for entity type \'category\'')
          }
        }
      }
    })

    this.registerEntityType('taxrule', {
      gql: './queries/taxrule.gql',
      queryProcessor: (query) => {
        // function that can modify the query each time before it's being executed
        return query
      },
      resultProcessor: (resp, start, size) => {
        if (resp === null) {
          throw new Error('Invalid graphQl result - null not exepcted')
        }
        if (resp.hasOwnProperty('data')) {
          return processESResponseType(resp.data.taxrule, start, size)
        } else {
          if (resp.error) {
            throw new Error(JSON.stringify(resp.error))
          } else {
            throw new Error('Unknown error with graphQl result in resultProcessor for entity type \'taxrule\'')
          }
        }
      }
    })

    this.registerEntityType('cms_page', {
      gql: './queries/cmsPage.gql',
      queryProcessor: (query) => {
        // function that can modify the query each time before it's being executed
        return query
      },
      resultProcessor: (resp, start, size) => {
        if (resp === null) {
          throw new Error('Invalid graphQl result - null not exepcted')
        }
        if (resp.hasOwnProperty('data')) {
          return processCmsType(resp.data.cmsPages, start, size)
        } else {
          if (resp.error) {
            throw new Error(JSON.stringify(resp.error))
          } else {
            throw new Error('Unknown error with graphQl result in resultProcessor for entity type \'cmsPage\'')
          }
        }
      }
    })

    this.registerEntityType('cms_block', {
      gql: './queries/cmsBlock.gql',
      queryProcessor: (query) => {
        // function that can modify the query each time before it's being executed
        return query
      },
      resultProcessor: (resp, start, size) => {
        if (resp === null) {
          throw new Error('Invalid graphQl result - null not exepcted')
        }
        if (resp.hasOwnProperty('data')) {
          return processCmsType(resp.data.cmsBlocks, start, size)
        } else {
          if (resp.error) {
            throw new Error(JSON.stringify(resp.error))
          } else {
            throw new Error('Unknown error with graphQl result in resultProcessor for entity type \'cmsBlock\'')
          }
        }
      }
    })

    this.registerEntityType('cms_hierarchy', {
      gql: './queries/cmsHierarchy.gql',
      queryProcessor: (query) => {
        // function that can modify the query each time before it's being executed
        return query
      },
      resultProcessor: (resp, start, size) => {
        if (resp === null) {
          throw new Error('Invalid graphQl result - null not exepcted')
        }
        if (resp.hasOwnProperty('data')) {
          return processCmsType(resp.data.cmsHierarchies, start, size)
        } else {
          if (resp.error) {
            throw new Error(JSON.stringify(resp.error))
          } else {
            throw new Error('Unknown error with graphQl result in resultProcessor for entity type \'cmsHierarchy\'')
          }
        }
      }
    })
  }
}
