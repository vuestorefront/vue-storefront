<template>
  <div id="page_not_found">
    Core Page Not Found
  </div>
</template>

<script>
import builder from 'bodybuilder'
import EventBus from 'core/plugins/event-bus'
import i18n from 'core/lib/i18n'

export default {
  name: 'PageNotFound',
  metaInfo () {
    return {
      title: this.$route.meta.title || this.$props.title || i18n.t('404 Page Not Found'),
      meta: [
        {
          vmid: 'description',
          description: this.$route.meta.description
        }
      ]
    }
  },
  asyncData ({ store, route }) { // this is for SSR purposes to prefetch data
    return new Promise((resolve, reject) => {
      console.log('Entering asyncData for PageNotFound ' + new Date())
      let ourBestsellersQuery = builder().query('range', 'visibility', { 'gte': 3, 'lte': 4 }/** Magento visibility in search & categories */).build()
      store.dispatch('category/list', {}).then((categories) => {
        store.dispatch('product/list', {
          query: ourBestsellersQuery,
          size: 8,
          sort: 'created_at:desc'
        }).then(function (res) {
          if (res) {
            store.state.homepage.bestsellers = res.items
            EventBus.$emitFilter('pagenotfound-after-load', { store: store, route: route }).then((results) => {
              return resolve()
            }).catch((err) => {
              console.error(err)
              return resolve()
            })
          }
        })
      })
    })
  }
}
</script>
