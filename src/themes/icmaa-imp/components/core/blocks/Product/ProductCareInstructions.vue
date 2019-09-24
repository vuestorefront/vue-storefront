<template>
  <div class="t-flex t-flex-wrap">
    <div v-for="(care, index) in careInstructions" :key="index" class="t-w-full t-flex t-items-center t-text-sm" :class="{ 't-mb-4': index !== careInstructions.length - 1 }">
      <img :src="care.image" :srcset="`${care.image} 1x, ${care.imageAt2x} 2x`" :title="care.title" class="t-mr-4">
      <span>{{ care.title }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      getAttributeLabel: 'attribute/getAttributeLabel',
      getOptionLabel: 'attribute/getOptionLabel'
    }),
    attributeCode () {
      return 'features_care'
    },
    careInstructionIds () {
      return this.product[this.attributeCode]
    },
    careInstructions () {
      const imagePath = '/assets/features/care-instructions/'
      return this.careInstructionIds.map(id => {
        return {
          title: this.getOptionLabel({ attributeKey: this.attributeCode, optionId: id }),
          image: imagePath + id + '.png',
          imageAt2x: imagePath + id + '@2x.png'
        }
      })
    }
  }
}
</script>
