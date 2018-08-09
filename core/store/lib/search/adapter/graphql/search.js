import config from 'config'
import { prepareGraphQlBody } from './gqlQuery'
import { currentStoreView, prepareStoreView } from '../../../multistore'
import fetch from 'isomorphic-fetch'

export function search (Query) {
  const gqlQueryBody = prepareGraphQlBody(Query)

  const storeView = (Query.store === null) ? currentStoreView() : prepareStoreView(Query.store, config)

  if (storeView.storeId === undefined || storeView.storeId == null || !Query.type) {
    throw new Error('Store and Query.type are required arguments for executing Graphql query')
  }

  let urlGql = config.server.protocol + '://' + config.graphql.host + ':' + config.graphql.port + '/graphql'
  urlGql = urlGql + '/' + encodeURIComponent(storeView.storeId) + '/'

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
