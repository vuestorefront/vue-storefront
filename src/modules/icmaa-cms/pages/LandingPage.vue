<template>
  <div id="cms-landing-page" class="t-container t-p-4" v-if="page">
    <block-wrapper :components="page.content" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import BlockWrapper from 'icmaa-cms/components/Wrapper'
import CmsMetaMixin from 'icmaa-meta/mixins/cmsMeta'

export default {
  name: 'LandingPage',
  mixins: [ CmsMetaMixin ],
  components: {
    BlockWrapper
  },
  computed: {
    ...mapGetters({
      rawLandingPages: 'icmaaCmsLangingPages/getAll'
    }),
    identifier () {
      return this.$route.params.identifier
    },
    page () {
      return this.rawLandingPages && this.rawLandingPages.find(p => p.identifier === this.identifier)
    }
  },
  async asyncData ({ store }) {
    await store.dispatch('icmaaCmsLangingPages/single', { value: this.identifier })
  }
}
</script>
