<template>
  <div v-if="isVisible">
    <div class="category-header t-relative">
      <retina-image :image="banner" :alt="category.name" v-if="banner" class="t-w-screen" />
      <div class="t-flex t-items-center t-justify-end t-absolute t-bottom-0 t-left-0 t-pb-6 t-px-6 t-w-full">
        <slot />
      </div>
    </div>
    <div class="t-px-4 t-py-2 t-flex t-justify-between" v-if="spotifyLogoItems && spotifyLogoItems.length > 0">
      <span class="t-flex-fix t-hidden lg:t-inline-block t-flex t-self-center t-text-base-light t-text-sm t-mr-8">{{ $t('Similar bands:') }}</span>
      <department-logo v-for="(logo, index) in spotifyLogoItems" :key="index" v-bind="logo.data()" class="t-flex-fix t-opacity-60 hover:t-opacity-100" :class="{ 't-mr-4': isLast(index, spotifyLogoItems)}" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getThumbnailPath } from '@vue-storefront/core/helpers'
import DepartmentLogo from 'theme/components/core/blocks/CategoryExtras/DepartmentLogo'
import RetinaImage from 'theme/components/core/blocks/RetinaImage'

import { isDatetimeInBetween } from 'icmaa-config/helpers/datetime'
import sampleSize from 'lodash-es/sampleSize'

export default {
  name: 'CategoryExtrasHeader',
  components: {
    DepartmentLogo,
    RetinaImage
  },
  props: {
    spotifyLogoLimit: {
      type: [Boolean, Number],
      default: false
    }
  },
  computed: {
    ...mapGetters({
      category: 'icmaaCategoryExtras/getCurrentCategory',
      categoryExtras: 'icmaaCategoryExtras/getCategoryExtrasByCurrentCategory',
      getSpotifyLogoItems: 'icmaaCategoryExtras/getSpotifyLogolineItemsByCurrentCategory',
      viewport: 'ui/getViewport'
    }),
    isVisible () {
      const { bannerShowFrom, bannerShowTo, active } = this.categoryExtras
      return this.categoryExtras && active &&
        (this.banner || this.spotifyLogoItems.length > 0) &&
        isDatetimeInBetween(bannerShowFrom, bannerShowTo)
    },
    banner () {
      if (!this.categoryExtras.bannerImage) {
        return false
      }

      return getThumbnailPath('/' + this.categoryExtras.bannerImage, 0, 0, 'media')
    },
    spotifyLogoItems () {
      return Object.values(this.getSpotifyLogoItems).slice(0, this.spotifyLogoLimit || (['xs', 'sm'].includes(this.viewport) ? 4 : 10))
    }
  },
  methods: {
    isLast (index, array) {
      return index !== (array.length - 1)
    }
  }
}
</script>
