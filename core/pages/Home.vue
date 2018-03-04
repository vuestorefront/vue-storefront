<template>
  <div id="hp">
    Core Home
  </div>
</template>

<script>
import EventBus from 'core/plugins/event-bus'
import MainSlider from 'core/components/blocks/MainSlider/MainSlider.vue'
import ProductTile from 'core/components/ProductTile.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  metaInfo: {
    title: 'Home Page'
  },
  asyncData ({ store, route }) { // this is for SSR purposes to prefetch data
    return new Promise((resolve, reject) => {
      console.log('Entering asyncData for Home root ' + new Date())
      EventBus.$emitFilter('home-after-load', { store: store, route: route }).then((results) => {
        return resolve()
      }).catch((err) => {
        console.error(err)
        return resolve()
      })
    })
  },
  beforeMount () {
    this.$store.dispatch('category/reset')
  },
  computed: {
    ...mapGetters({
      rootCategories: 'category/list'
    })
  },
  components: {
    ProductTile,
    MainSlider
  }
}
</script>
