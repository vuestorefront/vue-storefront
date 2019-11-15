<template>
  <modal name="modal-switcher" :width="500">
    <div slot="header">
      {{ $t('Switch store') }}
    </div>
    <div class="t-flex t-flex-wrap t--mx-2 t--mb-4">
      <div class="t-w-1/2 t-px-2 t-pb-4" v-for="(storeView) in storeViews" :key="storeView.storeCode">
        <language-button :store-view="storeView" :is-current="storeView.storeId === currentStoreView.storeId" />
      </div>
    </div>
  </modal>
</template>

<script>
import config from 'config'
import { mapGetters } from 'vuex'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

import Modal from 'theme/components/core/Modal.vue'
import LanguageButton from 'theme/components/core/blocks/Switcher/LanguageButton'

export default {
  components: {
    Modal,
    LanguageButton
  },
  computed: {
    ...mapGetters({ storeConfigs: 'icmaaConfig/getMap' }),
    currentStoreView () {
      return currentStoreView()
    },
    storeViews () {
      return this.storeConfigs.map(s => config.storeViews[s.storeCode])
    }
  },
  methods: {
    close () {
      this.$bus.$emit('modal-hide', 'modal-switcher')
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.componentLoaded = true
      this.$bus.$emit('modal-show', 'modal-switcher')
    })
  }
}
</script>
