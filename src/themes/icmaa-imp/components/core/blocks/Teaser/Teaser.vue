<template>
  <div id="teaser">
    <div class="placeholder" v-if="loading">
      <div class="xs:t-px-0 sm:t-px-4 t-mb-8" v-if="showLarge">
        <placeholder :ratio="isMobile ? '1:1' : '2:1'" />
      </div>
      <div class="t-flex t-px-4 t-flex-wrap t--mx-4">
        <div v-for="(n, i) in 4" :key="'placeholder-' + i" class="t-px-4" :class="{ 't-w-1/2 lg:t-w-1/4 t-mb-8': showSmallInRow, 't-w-full': !showSmallInRow, 't-mb-8': !showSmallInRow && i !== 3 }">
          <placeholder :ratio="'32:35'" v-if="showSmallInRow" />
          <placeholder :ratio="isMobile ? '215:334' : '2:1'" v-else />
        </div>
      </div>
    </div>
    <template v-else>
      <template v-if="showLarge && teaserLarge">
        <teaser-fullsize :teaser="teaserLarge" class="t-mb-8" />
      </template>
      <template v-if="teaserSmall && teaserSmall.length > 0">
        <template v-if="showSmallInRow">
          <div class="t-flex t-flex-wrap t--mx-4 t-px-4">
            <teaser-small v-for="(teaser, index) in teaserSmall" :teaser="teaser" :index="index" :key="'small_' + index" />
          </div>
        </template>
        <template v-else>
          <teaser-split v-for="(teaser, index) in teaserSmall" :teaser="teaser" :index="index" :key="'small_' + index" :class="{ 't-mb-8': index !== (teaserSmall.length - 1) }" />
        </template>
      </template>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Placeholder from 'theme/components/core/blocks/Placeholder'
import TeaserFullsize from 'theme/components/core/blocks/Teaser/TeaserFullsize'
import TeaserSplit from 'theme/components/core/blocks/Teaser/TeaserSplit'
import TeaserSmall from 'theme/components/core/blocks/Teaser/TeaserSmall'

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
  data () {
    return {
      loading: true
    }
  },
  components: {
    Placeholder,
    TeaserFullsize,
    TeaserSplit,
    TeaserSmall
  },
  computed: {
    ...mapGetters('icmaaTeaser', ['getSmallTeaser', 'getLargeTeaser']),
    ...mapGetters({ viewport: 'ui/getViewport' }),
    teaserLarge () {
      return this.getLargeTeaser(this.tags)[0]
    },
    teaserSmall () {
      const teaser = this.getSmallTeaser(this.tags)
      return teaser.slice(0, this.TeaserSmallRow ? 4 : this.limit)
    },
    isMobile () {
      return ['xs', 'sm'].includes(this.viewport)
    }
  },
  async mounted () {
    await this.$store.dispatch('icmaaTeaser/list', this.tags)
    this.loading = false
  }
}
</script>
