<template>
  <div>
    <div v-for="page in pages" :key="getPageId(page)">
      <div v-for="(block, i) in getBlocks(page)" :key="i">
        <div v-html="block" />
      </div>
    </div>
  </div>
</template>
<script>

import { ref, computed } from '@vue/composition-api'
import { usePrismic, getPages, getBlocks, getPageId } from '@vue-storefront/prismic'

export default {
  setup() {
    const { doc, search, loading, error } = usePrismic()
    const pages = computed(() => getPages(doc.value))

    search({
      at: {
        fragment: 'document.type',
        value: 'privacy-policy'
      },
    })

    search({}, {
      pageSize: 1,
    })

    return {
      pages,
      loading,
      error,
      getBlocks,
      getPageId
    }
  }
}
</script>
