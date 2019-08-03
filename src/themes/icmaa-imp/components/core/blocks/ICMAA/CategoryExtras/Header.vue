<template>
  <div v-if="categoryExtras">
    <p v-html="categoryExtras.description" class="t-text-sm t-leading-tight t-text-gray-700" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('icmaaCmsCategoryExtras', ['categoryExtrasByCurrentCategory']),
    categoryExtras () {
      return this.categoryExtrasByCurrentCategory
    }
  }
}
</script>
