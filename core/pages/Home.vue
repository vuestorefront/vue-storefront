<template>
  <div id="hp">
    Core Home
  </div>
</template>

<script>
import EventBus from 'core/plugins/event-bus'
import MainSlider from 'core/components/blocks/MainSlider/mainSlider'
import ProductTile from 'core/components/productTile'
import { mapGetters } from 'vuex'
import i18n from 'core/lib/i18n'
import Composite from 'core/mixins/composite'

export default {
  name: 'Home',
  metaInfo () {
    return {
      title: this.$route.meta.title || i18n.t('Home Page'),
      meta: this.$route.meta.description ? [{vmid: 'description', description: this.$route.meta.description}] : []
    }
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
  },
  mixins: [Composite]
}
</script>
