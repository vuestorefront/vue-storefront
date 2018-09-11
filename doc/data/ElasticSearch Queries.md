## Getting data from ElasticSearch

VueStorefront stores most of the catalog data within the ElasticSearch data store. [Please take a look at our architecture diagram](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/media/Vue-storefront-architecture.png).

To properly access ElasticSearch data You should implement specific Vuex action. Here is an example of [vuex action for getting the data](https://github.com/DivanteLtd/vue-storefront/blob/c954b96f6633a201e10bed1d2e4c0def1aeb3071/core/store/modules/category.js#L38) :


```js
import { quickSearchByQuery } from '../../lib/search'

  /**
   * Load categories within specified parent
   * @param {Object} commit promise
   * @param {Object} parent parent category
   */
  list (context, { parent = null, onlyActive = true, onlyNotEmpty = false, size = 4000, start = 0, sort = 'position:asc', includeFields = config.entities.optimize ? config.entities.category.includeFields : null }) {
    const commit = context.commit

    let searchQuery = new SearchQuery()
    if (parent && typeof parent !== 'undefined') {
      searchQuery = searchQuery.applyFilter({key: 'parent_id', value: {'eq': parent.id}})
    }

    if (onlyActive === true) {
      searchQuery = searchQuery.applyFilter({key: 'is_active', value: {'eq': true}})
    }

    if (onlyNotEmpty === true) {
      searchQuery = searchQuery.applyFilter({key: 'product_count', value: {'gt': 0}})
    }

    if (!context.state.list | context.state.list.length === 0) {
      return quickSearchByQuery({ entityType: 'category', query: searchQuery, sort: sort, size: size, start: start, includeFields: includeFields }).then(function (resp) {
        commit(types.CATEGORY_UPD_CATEGORIES, resp)
        EventBus.$emit('category-after-list', { query: searchQuery, sort: sort, size: size, start: start, list: resp })
        return resp
      }).catch(function (err) {
      console.error(err)
    })
  }
```

As You may see we're using [quickSearchByQuery](https://github.com/DivanteLtd/vue-storefront/blob/c954b96f6633a201e10bed1d2e4c0def1aeb3071/core/lib/search/search.js#L60) for executing Search. This method is pretty interesting because:
- it uses the searchQuery query object which has ability to apply filters in common way
- it does cache the received data into `localForage` collection named `elasticCache`; the next call with the same queryObject will return the data directly from the browser storage, not hiting the server.

We do not build elasticsearch query on this step more. We use search layer object conatinied  all necessary filters and seartch text. ES query builds using the powerfull bodybuilder package right before sending Elasticsearch request. Please take a look at the [reference docs for more options](https://github.com/danpaz/bodybuilder).
