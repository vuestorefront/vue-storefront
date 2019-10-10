<template>
  <div id="teaser" class="lg:t-pt-4 t-pb-4">
    <template v-if="showLarge && teaserLarge">
      <teaser-large :teaser="teaserLarge" class="t-mb-4" />
    </template>
    <template v-if="teaserSmall && teaserSmall.length > 0">
      <teaser-small v-for="(teaser, index) in teaserSmall" :teaser="teaser" :index="index" :key="'small_' + index" :class="{ 't-mb-4': index !== (teaserSmall.length - 1) }" />
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import TeaserLarge from 'theme/components/core/blocks/Teaser/TeaserLarge';
import TeaserSmall from 'theme/components/core/blocks/Teaser/TeaserSmall';

export default {
  name: 'Teaser',
  props: {
    tags: {
      type: String,
      required: true
    },
    showLarge: {
      type: Boolean,
      default: true
    },
    limit: {
      type: Number,
      default: 4
    }
  },
  components: {
    TeaserLarge,
    TeaserSmall
  },
  computed: {
    ...mapGetters('icmaaTeaser', ['getSmallTeaser', 'getLargeTeaser']),
    teaserLarge () {
      return this.getLargeTeaser(this.tags)[0]
    },
    teaserSmall () {
      const teaser = this.getSmallTeaser(this.tags)
      return teaser.slice(0, this.limit - 1)
    }
  },
  mounted () {
    this.$store.dispatch('icmaaTeaser/list', this.tags)
  }
}
</script>
