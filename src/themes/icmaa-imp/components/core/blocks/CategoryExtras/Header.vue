<template>
  <div v-if="categoryExtras && categoryExtras.active">
    <retina-image :image="banner" alt="" v-if="banner" />
    <p v-if="categoryExtras.description !== ''" v-html="categoryExtras.description" class="t-text-sm t-leading-tight t-text-gray-700" />
    <div class="t-mx-4 t-my-2 t-flex t-justify-between" v-if="spotifyLogoItems">
      <span class="t-flex-fix t-hidden lg:t-inline-block t-flex t-self-center t-text-base-light t-text-sm t-mr-8">{{ $t('Similar bands:') }}</span>
      <department-logo v-for="(logo, index) in spotifyLogoItems" :key="index" v-bind="logo.data()" class="t-flex-fix t-opacity-60 hover:t-opacity-100" :class="{ 't-mr-4': isLast(index, spotifyLogoItems)}" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getThumbnailPath } from '@vue-storefront/core/helpers'
import DepartmentLogo from 'theme/components/core/blocks/CategoryExtras/DepartmentLogo.vue'
import RetinaImage from 'theme/components/core/blocks/RetinaImage'

import sampleSize from 'lodash-es/sampleSize'

export default {
  name: 'CategoryExtrasHeader',
  components: {
    DepartmentLogo,
    RetinaImage
  },
  computed: {
    ...mapGetters({
      categoryExtras: 'icmaaCategoryExtras/getCategoryExtrasByCurrentCategory',
      getSpotifyLogoItems: 'icmaaCategoryExtras/getSpotifyLogolineItemsByCurrentCategory',
      viewport: 'ui/getViewport'
    }),
    banner () {
      if (!this.categoryExtras.bannerImage) {
        return false
      }

      return getThumbnailPath('/' + this.categoryExtras.bannerImage, 0, 0, 'media')
    },
    spotifyLogoItems () {
      return sampleSize(
        this.getSpotifyLogoItems,
        this.viewport === 'sm' ? 4 : 5
      )
    }
  },
  methods: {
    isLast (index, array) {
      return index !== (array.length - 1)
    }
  }
}
</script>
