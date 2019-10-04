<template>
  <div v-if="categoryExtras" class="t-w-full">
    <p v-if="categoryExtras.description !== ''" v-html="categoryExtras.description" class="t-text-sm t-leading-tight t-text-gray-700" />
    <div class="t-my-4 t-flex t-flex-wrap" v-if="spotifyLogoItems">
      <department-logo v-for="(logo, index) in spotifyLogoItems" :key="index" v-bind="logo.data()" :class="{ 't-mr-4': isLast(index, spotifyLogoItems)}" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DepartmentLogo from 'theme/components/core/blocks/ICMAA/CategoryExtras/DepartmentLogo.vue'

export default {
  components: {
    DepartmentLogo
  },
  computed: {
    ...mapGetters({
      categoryExtras: 'icmaaCategoryExtras/getCategoryExtrasByCurrentCategory',
      spotifyLogoItems: 'icmaaCategoryExtras/getSpotifyLogolineItemsByCurrentCategory'
    })
  },
  methods: {
    isLast (index, array) {
      return index !== (array.length - 1)
    }
  }
}
</script>
