<template>
  <div class="teaser-fullsize t-mx-0 sm:t-mx-4 t-cursor-pointer t-webkit-tap-transparent" @click="redirect">
    <div class="t-relative">
      <retina-image :alt="teaser.text1 | htmlDecode" :image="imageUrl" :width="1248" :height="730" :placeholder="true" ratio="133:78" class="t-w-full" />
      <h2 class="t-flex t-justify-center t-items-center t-absolute t-bottom-0 t-inset-x-0 t-mb-6 t-text-sm t-text-small t-uppercase">
        <router-link :to="link" :title="teaser.text1 | htmlDecode" :class="{ 't-text-white': !textColor }" :style="{ color: textColor }">
          {{ teaser.text1 }}
          <material-icon icon="arrow_forward" size="sm" class="t-ml-2" />
        </router-link>
      </h2>
    </div>
  </div>
</template>

<script>
import { getThumbnailPath } from '@vue-storefront/core/helpers'
import TeaserMixin from 'icmaa-teaser/mixins/teaserMixin'
import MaterialIcon from 'theme/components/core/blocks/MaterialIcon'
import RetinaImage from 'theme/components/core/blocks/RetinaImage'

export default {
  name: 'TeaserFullsize',
  mixins: [ TeaserMixin ],
  components: {
    MaterialIcon,
    RetinaImage
  }
}
</script>
