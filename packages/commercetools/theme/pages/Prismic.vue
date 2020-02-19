<template>
  <div>
    <div v-for="page in pages" :key="getPageId(page)">
      <div v-for="(block, i) in getBlocks(page)" :key="i">
        <div v-html="block" />
      </div>
      <div v-for="(slices, i) in getSlices(page)" :key="`slice-${i}`">
        <p>slice #{{i+1}}</p>
        <div v-for="(slice, j) in slices" :key="`slice-${i}-${j}`">
          <div v-html="slice" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { ref, computed } from '@vue/composition-api'
import { usePrismic, getPages, getBlocks, getSlices, getPageId } from '@vue-storefront/prismic'

export default {
  setup() {
    const { doc, search, loading, error } = usePrismic()
    const pages = computed(() => getPages(doc.value))

    search({
      at: {
        fragment: 'document.type',
        value: 'slices'
      },
    })

    return {
      pages,
      loading,
      error,
      getBlocks,
      getSlices,
      getPageId
    }
  }
}
</script>
