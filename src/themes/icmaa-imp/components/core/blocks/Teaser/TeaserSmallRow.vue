<template>
  <div id="teaser-small-row" class="t-flex-fix t-w-1/2 md:t-w-1/4 t-px-4 t-flex t-flex-col t-relative t-cursor-pointer t-webkit-tap-transparent" @click="redirect">
    <div class="t-absolute t-top-0 t-right-0 t-text-sm t-py-2 t-px-3 t-mr-4" :class="{ 't-text-white': !textColor, 't-bg-base-primary': !backgroundColor }" :style="{ 'background-color': backgroundColor, 'color': textColor }" v-if="teaser.buttonText">
      {{ teaser.buttonText }}
    </div>
    <retina-image :image="imageUrl" :alt="teaser.text1 | htmlDecode" class="t-flex-fix t-max-w-full" />
    <div class="t-flex-grow t-text-sm t-text-primary t-text-primary t-leading-tight t-pt-4" :class="{ 't-pb-8': !lastRow }">
      {{ teaser.text1 }}
    </div>
  </div>
</template>

<script>
import TeaserMixin from 'icmaa-teaser/mixins/teaserMixin'
import RetinaImage from 'theme/components/core/blocks/RetinaImage'
import ButtonComponent from 'theme/components/core/blocks/Button'

export default {
  name: 'TeaserSmall',
  mixins: [ TeaserMixin ],
  components: {
    RetinaImage
  },
  computed: {
    lastRow () {
      return this.index + 1 > 2
    }
  }
}
</script>
