<template>
  <div>
    <div v-if="categoryExtras">
      <p v-html="categoryExtras.description" class="t-text-sm t-leading-tight t-text-gray-700" />
    </div>
    <div class="t-flex t-flex-wrap" v-if="spotifyLogoItems">
      <department-logo v-for="(logo, index) in spotifyLogoItems" :key="index" v-bind="logo.data()" />
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
      categoryExtras: 'icmaaCmsCategoryExtras/getCategoryExtrasByCurrentCategory',
      spotifyLogoItems: 'icmaaCmsCategoryExtras/getSpotifyLogolineItemsByCurrentCategory'
    })
  }
}
</script>
