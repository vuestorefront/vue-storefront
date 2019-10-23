<template>
  <div id="teaser-large" class="xs:t-mx-0 sm:t-mx-4 t-cursor-pointer t-webkit-tap-transparent" @click="redirect">
    <div class="t-relative">
      <retina-image :image="imageUrl" :alt="teaser.text1 | htmlDecode" :placeholder="true" :ratio="ratio" class="t-w-full" />
      <div class="t-flex t-justify-center t-items-center t-absolute t-bottom-0 t-inset-x-0 t-mb-6 t-text-sm t-text-small t-uppercase" :class="{ 't-text-white': !textColor }" :style="{ color: textColor }">
        {{ teaser.text1 }}
        <material-icon icon="arrow_forward" size="sm" class="t-ml-2" />
      </div>
    </div>
  </div>
</template>

<script>
import { getThumbnailPath } from '@vue-storefront/core/helpers'
import TeaserMixin from 'icmaa-teaser/mixins/teaserMixin'
import MaterialIcon from 'theme/components/core/blocks/MaterialIcon'
import RetinaImage from 'theme/components/core/blocks/RetinaImage'

export default {
  name: 'TeaserLarge',
  mixins: [ TeaserMixin ],
  components: {
    MaterialIcon,
    RetinaImage
  },
  computed: {
    ratio () {
      return this.viewport === 'sm' ? '133:78' : '12:7'
    },
    imageUrl () {
      const image = this.viewport !== 'sm' && this.teaser['largeImageUrl'] ? 'largeImageUrl' : 'imageUrl'
      return getThumbnailPath('/' + this.teaser[image], 0, 0, 'media')
    }
  }
}
</script>
