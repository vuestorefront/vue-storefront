<template>
  <div
    :class="['cms-content', { 'container': sync }]"
    v-if="data"
    v-html="data.content"
  />
</template>

<script>
import store from '@vue-storefront/core/store'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

export default {
  name: 'CmsData',
  props: {
    id: {
      type: Number,
      default: null,
      required: false
    },
    identifier: {
      type: String,
      default: null,
      required: false
    },
    type: {
      type: String,
      required: true
    },
    sync: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  created () {
    this.$store.dispatch(
      'cms/loadCms',
      {
        url: this.getEndpointPath(),
        type: this.type
      }
    )
  },
  computed: {
    data () {
      if (this.id) {
        return this.$store.getters[`cms/get${this.type}`](this.id)
      } else {
        return this.$store.getters[`cms/get${this.type}Identifier`](this.identifier)
      }
    },
    currentStore () {
      return currentStoreView()
    },
    storeView () {
      return (this.isMultistoreEnable && this.currentStore) ? this.currentStore.storeId : 0
    }
  },
  data () {
    return {
      isMultistoreEnable: store.state.config.storeViews.multistore
    }
  },
  methods: {
    getEndpointPath () {
      let url
      if (this.id) {
        url = (store.state.config.cms.endpoint)
          .replace('{{type}}', this.type)
          .replace('{{cmsId}}', this.id)
      } else if (this.identifier) {
        url = (store.state.config.cms.endpointIdentifier)
          .replace('{{type}}', this.type)
          .replace('{{cmsIdentifier}}', this.identifier)
          .replace('{{storeId}}', this.storeView)
      }
      return url
    }
  }
}
</script>
