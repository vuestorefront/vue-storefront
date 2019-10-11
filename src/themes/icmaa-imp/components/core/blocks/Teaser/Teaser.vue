<template>
  <div id="teaser">
    <template v-if="showLarge && teaserLarge">
      <teaser-large :teaser="teaserLarge" class="t-mb-8" />
    </template>
    <template v-if="teaserSmall && teaserSmall.length > 0">
      <template v-if="showSmallInRow">
        <div class="t-flex t-flex-wrap t--mx-4 t-px-4">
          <teaser-small-row v-for="(teaser, index) in teaserSmall" :teaser="teaser" :index="index" :key="'small_' + index" />
        </div>
      </template>
      <template v-else>
        <teaser-small v-for="(teaser, index) in teaserSmall" :teaser="teaser" :index="index" :key="'small_' + index" :class="{ 't-mb-8': index !== (teaserSmall.length - 1) }" />
      </template>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import TeaserLarge from 'theme/components/core/blocks/Teaser/TeaserLarge'
import TeaserSmall from 'theme/components/core/blocks/Teaser/TeaserSmall'
import TeaserSmallRow from 'theme/components/core/blocks/Teaser/TeaserSmallRow'

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
    showSmallInRow: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 4
    }
  },
  components: {
    TeaserLarge,
    TeaserSmall,
    TeaserSmallRow
  },
  computed: {
    ...mapGetters('icmaaTeaser', ['getSmallTeaser', 'getLargeTeaser']),
    teaserLarge () {
      return this.getLargeTeaser(this.tags)[0]
    },
    teaserSmall () {
      const teaser = this.getSmallTeaser(this.tags)
      return teaser.slice(0, this.TeaserSmallRow ? 4 : this.limit)
    }
  },
  mounted () {
    this.$store.dispatch('icmaaTeaser/list', this.tags)
  }
}
</script>
