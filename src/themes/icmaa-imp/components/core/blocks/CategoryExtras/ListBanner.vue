<template>
  <div v-if="isVisible">
    <router-link :to="localizedRoute(link)" :title="category.name" v-if="link" class="t-block">
      <retina-image :image="banner" :alt="category.name" class="t-w-screen" />
    </router-link>
    <retina-image v-else :image="banner" :alt="category.name" class="t-w-screen" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getThumbnailPath } from '@vue-storefront/core/helpers'
import RetinaImage from 'theme/components/core/blocks/RetinaImage'

import { isDatetimeInBetween } from 'icmaa-config/helpers/datetime'

export default {
  name: 'CategoryExtrasListBanner',
  components: {
    RetinaImage
  },
  computed: {
    ...mapGetters({
      category: 'category-next/getCurrentCategory',
      categoryExtras: 'icmaaCategoryExtras/getCategoryExtrasByCurrentCategory'
    }),
    isVisible () {
      if (!this.categoryExtras) {
        return false
      }

      const { listBannerShowFrom, listBannerShowTo, active } = this.categoryExtras
      return active && this.banner &&
        isDatetimeInBetween(listBannerShowFrom, listBannerShowTo)
    },
    banner () {
      if (!this.categoryExtras.listBannerImage) {
        return false
      }

      return getThumbnailPath('/' + this.categoryExtras.listBannerImage, 0, 0, 'media')
    },
    link () {
      return !this.categoryExtras.listBannerLink ? false : this.categoryExtras.listBannerLink
    }
  }
}
</script>
