<template>
  <div
    :class="['cms-content', { 'container': sync }]"
    v-if="getCmsData"
    v-html="getCmsData.content"
  />
</template>

<script>
import { isServer } from '@vue-storefront/core/helpers'
export default {
  name: 'CmsBlock',
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
    sync: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  serverPrefetch () {
    return this.fetchCmsBlock()
  },
  created () {
    if (!isServer) {
      this.fetchCmsBlock()
    }
  },
  methods: {
    fetchCmsBlock () {
      let queryKey = ''
      let queryValue = ''
      if (this.id) {
        queryKey = 'id'
        queryValue = this.id
      } else if (this.identifier) {
        queryKey = 'identifier'
        queryValue = this.identifier
      }
      if (queryKey && queryValue) {
        return this.$store.dispatch('cmsBlock/single', {
          key: queryKey,
          value: queryValue
        })
      }
    }
  },
  computed: {
    getCmsData () {
      if (this.id) {
        return this.$store.getters[`cmsBlock/getCmsBlockById`](this.id)
      } else if (this.identifier) {
        return this.$store.getters[`cmsBlock/getCmsBlockByIdentifier`](this.identifier)
      }
      return null
    }
  }
}
</script>
