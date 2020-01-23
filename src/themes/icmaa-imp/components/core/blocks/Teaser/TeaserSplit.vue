<template>
  <div class="teaser-split t-flex t-flex-col md:t-flex-row t-mx-4 t-cursor-pointer t-webkit-tap-transparent" :class="{ 't-bg-white': !backgroundColor }" :style="{ 'background-color': backgroundColor }" @click="redirect">
    <retina-image :image="imageUrl" :width="624" :height="624" :placeholder="true" ratio="1:1" class="t-w-full md:t-w-1/2 md:t-h-full" :alt="teaser.text1 | htmlDecode" v-if="showLeft" />
    <div class="t-w-full md:t-w-1/2 t-flex t-items-center">
      <div class="t-w-full t-p-8">
        <h2 class="t-w-full t-leading-tight t-font-bold t-text-2-1/2xl t-mb-5">
          <router-link :to="link" :title="teaser.text1 | htmlDecode" :class="{ 't-text-base-darkest': !textColor }" :style="{ color: textColor }">
            {{ teaser.text1 }}
          </router-link>
        </h2>
        <div class="t-w-full t-text-sm t-mb-10" :class="{ 't-text-base-darkest': !textColor }" :style="{ color: textColor }">
          {{ teaser.text2 }}
        </div>
        <div class="t-w-full">
          <button-component class="t-text-xs t-uppercase t-truncate" :type="textColor ? 'ghost-custom' : 'ghost'" :custom-color="textColor">
            {{ teaser.buttonText }}
          </button-component>
        </div>
        <div v-if="teaser.text3" class="t-w-full t-hidden lg:t-block t-text-sm t-mt-24" :class="{ 't-text-base-darkest': !textColor }" :style="{ color: textColor }">
          * {{ teaser.text3 }}
        </div>
      </div>
    </div>
    <retina-image :image="imageUrl" :width="624" :height="624" :placeholder="true" ratio="1:1" class="t-w-full md:t-w-1/2 md:t-h-full" :alt="teaser.text1 | htmlDecode" v-if="!showLeft" />
  </div>
</template>

<script>
import TeaserMixin from 'icmaa-teaser/mixins/teaserMixin'
import RetinaImage from 'theme/components/core/blocks/RetinaImage'
import ButtonComponent from 'theme/components/core/blocks/Button'

export default {
  name: 'TeaserSplit',
  mixins: [ TeaserMixin ],
  components: {
    RetinaImage,
    ButtonComponent
  },
  computed: {
    isUneven () {
      return this.index % 2 === 0
    },
    showLeft () {
      return this.isUneven || !this.viewport || ['xs', 'sm'].includes(this.viewport)
    }
  }
}
</script>
