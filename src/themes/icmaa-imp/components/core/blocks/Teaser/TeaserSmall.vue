<template>
  <div id="teaser-small" class="t-flex t-flex-col md:t-flex-row t-mx-4" :style="{ 'background-color': teaser.backgroundColor }">
    <retina-image :image="imageUrl" class="t-w-full md:t-w-1/2" v-if="showLeft" />
    <div class="t-w-full md:t-w-1/2 t-flex t-items-center">
      <div class="t-p-8">
        <h1 class="t-w-full t-leading-tight t-font-bold t-text-2.5xl t-mb-5" :style="{ color: teaser.textColor }">
          {{ teaser.text1 }}
        </h1>
        <div class="t-w-full t-text-sm t-mb-10" :style="{ color: teaser.textColor }">
          {{ teaser.text2 }}
        </div>
        <div class="t-w-full">
          <button-component class="t-text-xs t-uppercase t-truncate" :type="'ghost-custom'" :custom-color="teaser.textColor">
            {{ teaser.buttonText }}
          </button-component>
        </div>
        <div v-if="teaser.text3" class="t-w-full t-hidden lg:t-block t-text-sm t-mt-24" :style="{ color: teaser.textColor }">
          * {{ teaser.text3 }}
        </div>
      </div>
    </div>
    <retina-image :image="imageUrl" class="t-w-full md:t-w-1/2" v-if="!showLeft" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getThumbnailPath } from '@vue-storefront/core/helpers'
import RetinaImage from 'theme/components/core/blocks/RetinaImage'
import ButtonComponent from 'theme/components/core/blocks/Button'

export default {
  name: 'TeaserSmall',
  components: {
    RetinaImage,
    ButtonComponent
  },
  props: {
    teaser: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters({ viewport: 'ui/getViewport' }),
    imageUrl () {
      return getThumbnailPath('/' + this.teaser['imageUrl'], 0, 0, 'media')
    },
    isUneven () {
      return this.index % 2 === 0
    },
    showLeft () {
      return this.isUneven || this.viewport === 'sm' || !this.viewport
    }
  }
}
</script>
