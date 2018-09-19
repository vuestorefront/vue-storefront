import rootStore from '../../../../'
import { prepareGraphQlBody } from './gqlQuery'
import { currentStoreView, prepareStoreView } from '../../../multistore'
import fetch from 'isomorphic-fetch'
import Response from 'core/store/types/search/Response'
import {processESResponseType, processProductsType} from './processor/processType'

export class SearchAdapter {
  search (Request) {
    const gqlQueryBody = prepareGraphQlBody(Request)
    const storeView = (Request.store === null) ? currentStoreView() : prepareStoreView(Request.store)

    if (storeView.storeCode === undefined || storeView.storeCode == null || !Request.type) {
      throw new Error('Store and Request.type are required arguments for executing Graphql query')
    }

    let urlGql = rootStore.state.config.server.protocol + '://' + rootStore.state.config.graphql.host + ':' + rootStore.state.config.graphql.port + '/graphql'
    const urlStoreCode = (storeView.storeCode !== '') ? encodeURIComponent(storeView.storeCode) + '/' : ''
    urlGql = urlGql + '/' + urlStoreCode
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
  }

  handleResult (resp, type, start = 0, size = 50): Response {
    if (resp === null) {
      throw new Error('Invalid graphQl result - null not exepcted')
    }

    if (resp.hasOwnProperty('data')) {
      switch (type) {
        case 'product':
          return processProductsType(resp.data.products, start, size)
        case 'attribute':
          return processESResponseType(resp.data.customAttributeMetadata, start, size)
        case 'category':
          return processESResponseType(resp.data.categories, start, size)
        case 'taxrule':
          return processESResponseType(resp.data.taxrule, start, size)
      }

    } else {
      if (resp.error) {
        throw new Error(JSON.stringify(resp.error))
      } else {
        throw new Error('Unknown error with graphQl result in _handleGqlResult')
      }
    }
  }
}
