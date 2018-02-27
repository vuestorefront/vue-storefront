## Getting data from ElasticSearch

VueStorefront stores most of the catalog data within the ElasticSearch data store. [Please take a look at our architecture diagram](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/media/Vue-storefront-architecture.png).

To properly access ElasticSearch data You should implement specific Vuex action. Here is an example of [vuex action for getting the data](https://github.com/DivanteLtd/vue-storefront/blob/c954b96f6633a201e10bed1d2e4c0def1aeb3071/core/store/modules/category.js#L38) :


```js
import { quickSearchByQuery } from 'core/lib/search'

  /**
   * Load categories within specified parent
   * @param {Object} commit promise
   * @param {Object} parent parent category
   */
  list (context, { parent = null, onlyActive = true, onlyNotEmpty = false, size = 4000, start = 0, sort = 'position:asc' }) {
    const commit = context.commit
    let qrObj = bodybuilder()
    if (parent && typeof parent !== 'undefined') {
      qrObj = qrObj.filter('term', 'parent_id', parent.id)
    }

    if (onlyActive === true) {
      qrObj = qrObj.andFilter('term', 'is_active', true) // show only active cateogires
    }

    if (onlyNotEmpty === true) {
      qrObj = qrObj.andFilter('range', 'product_count', {'gt': 0}) // show only active cateogires
    }

    return quickSearchByQuery({ entityType: 'category', query: qrObj.build(), sort: sort, size: size, start: start }).then(function (resp) {
      commit(types.CATEGORY_UPD_CATEGORIES, resp)
      EventBus.$emit('category-after-list', { query: qrObj, sort: sort, size: size, start: start, list: resp })
      return resp
    }).catch(function (err) {
      console.error(err)
    })
  }
```

As You may see we're using [quickSearchByQuery](https://github.com/DivanteLtd/vue-storefront/blob/c954b96f6633a201e10bed1d2e4c0def1aeb3071/core/lib/search.js#L60) for executing the ES Search. This method is pretty interesting because:
- it uses the [elasticsearch-js](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html) module to access ES cluser,
- it does cache the received data into `localForage` collection named `elasticCache`; the next call with the same queryObject will return the data directly from the browser storage, not hiting the server.

For building the elasticsearch-js compliant ES queries we're using the powerfull bodybuilder package. Please take a look at the [reference docs for more options](https://github.com/danpaz/bodybuilder).
