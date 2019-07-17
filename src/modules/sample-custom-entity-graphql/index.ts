import { getSearchAdapter } from '@vue-storefront/core/lib/search/adapter/searchAdapterFactory'
import { processESResponseType } from '@vue-storefront/core/lib/search/adapter/graphql/processor/processType'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import SearchQuery from '@vue-storefront/core/lib/search/searchQuery'
import { Logger } from '@vue-storefront/core/lib/logger'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { StorefrontModule } from '@vue-storefront/module'

const TEST_ENTITY_TYPE = 'testentity'

export const CustomEntityGqlModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  EventBus.$on('application-after-init', async () => {
    Logger.debug('Example of custom entity graphql extension')()

    // create GraphQL searchAdapter
    let searchAdapter = await getSearchAdapter('graphql')

    // register custom entity type using registerEntityTypeByQuery
    // different GraphQL servers could be used for different entity types
    // resolver for testentity should be implemented on the GraphQL server provided
    searchAdapter.registerEntityTypeByQuery(TEST_ENTITY_TYPE, {
      url: 'http://localhost:8080/graphql/',
      query: require('./testentity.gql'),
      queryProcessor: (query) => {
        // function that can modify the query each time before it's being executed
        return query
      },
      resultPorcessor: (resp, start, size) => {
        if (resp === null) {
          throw new Error('Invalid GraphQL result - null not expected')
        }
        if (resp.hasOwnProperty('data')) {
          return processESResponseType(resp.data.testentity, start, size)
        } else {
          if (resp.error) {
            throw new Error(JSON.stringify(resp.error))
          } else {
            throw new Error('Unknown error with GraphQL result in resultProcessor for entity type \'category\'')
          }
        }
      }
    })

    const storeView = currentStoreView()

    // create an empty SearchQuery to get all data for the new custom entity
    const searchQuery = new SearchQuery()

    // prepare a SearchRequest object
    const Request = {
      store: storeView.storeCode, // TODO: add grouped product and bundled product support
      type: TEST_ENTITY_TYPE,
      searchQuery: searchQuery,
      sort: ''
    }

    // apply test search
    searchAdapter.search(Request).then((resp) => { // we're always trying to populate cache - when online
      const res = searchAdapter.entities[Request.type].resultPorcessor(resp, 0, 200)
      Logger.log('Testentity response: ', res)()
    })
  })
}
