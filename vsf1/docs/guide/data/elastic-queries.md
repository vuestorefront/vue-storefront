# ElasticSearch Queries

## Getting data from ElasticSearch

Vue Storefront stores most of the catalog data within the Elasticsearch data store. Please have a look at our architecture diagram:

![Architecture diagram](../images/Vue-storefront-architecture.png).

To properly access Elasticsearch data, you should implement a specific Vuex action. Here is an example of [vuex action for getting the data](https://github.com/vuestorefront/vue-storefront/blob/master/core/modules/catalog/store/category/actions.ts#L40) :

```js
import { quickSearchByQuery } from '@vue-storefront/core/lib/search'
import createCategoryListQuery from '@vue-storefront/core/modules/catalog/helpers/createCategoryListQuery'

   /**
   * Load categories within specified parent
   * @param {Object} commit promise
   * @param {Object} parent parent category
   */
  async list ({ commit, state, dispatch }, { parent = null, key = null, value = null, level = null, onlyActive = true, onlyNotEmpty = false, size = 4000, start = 0, sort = 'position:asc', includeFields = config.entities.optimize ? config.entities.category.includeFields : null, excludeFields = config.entities.optimize ? config.entities.category.excludeFields : null, skipCache = false, updateState = true }) {
    const { searchQuery, isCustomizedQuery } = createCategoryListQuery({ parent, level, key, value, onlyActive, onlyNotEmpty })
    const shouldLoadCategories = skipCache || ((!state.list || state.list.length === 0) || isCustomizedQuery)

    if (shouldLoadCategories) {
      const resp = await quickSearchByQuery({ entityType: 'category', query: searchQuery, sort, size, start, includeFields, excludeFields })

      if (updateState) {
        await dispatch('registerCategoryMapping', { categories: resp.items })

        commit(types.CATEGORY_UPD_CATEGORIES, { ...resp, includeFields, excludeFields })
        EventBus.$emit('category-after-list', { query: searchQuery, sort, size, start, list: resp })
      }

      return resp
    }

    const list = { items: state.list, total: state.list.length }

    if (updateState) {
      EventBus.$emit('category-after-list', { query: searchQuery, sort, size, start, list })
    }

    return list
  },
```

As You may see, we're using [quickSearchByQuery](https://github.com/vuestorefront/vue-storefront/blob/master/core/lib/search.ts#L31) for executing search. This method is pretty interesting because:

- It uses the `searchQuery` query object, which has an ability to apply filters in common way.
- It does cache the received data into `localForage` collection, named `elasticCache`; the next call with the same queryObject will return the data directly from browser storage, not hitting the server.

We do not build another Elasticsearch query on this step. We use a search layer object containing all necessary filters and search text. ES query builds using the powerful bodybuilder package right before sending Elasticsearch request. Please take a look at the [reference docs for more options](https://github.com/danpaz/bodybuilder).
