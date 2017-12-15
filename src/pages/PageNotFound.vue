<template>
  <div id="page_not_found">
    Core Page Not Found
  </div>
</template>

<script>
  import builder from 'bodybuilder'

  export default {
    name: 'PageNotFound',
    asyncData ({ store, route }) { // this is for SSR purposes to prefetch data
      return new Promise((resolve, reject) => {
        console.log('Entering asyncData for PageNotFound ' + new Date())
        let ourBestsellersQuery = builder().build()
        store.dispatch('category/list', {}).then((categories) => {
          store.dispatch('product/list', {
            query: ourBestsellersQuery,
            size: 8,
            sort: 'created_at:desc'
          }).then(function (res) {
            if (res) {
              store.state.homepage.bestsellers = res.items
              return resolve()
            }
          })
        })
      })
    }
  }
</script>