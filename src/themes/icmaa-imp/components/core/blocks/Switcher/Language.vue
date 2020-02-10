<template>
  <modal name="modal-switcher" :width="500" @close="setLanguageAccepted">
    <div slot="header">
      {{ $t('Switch store') }}
    </div>
    <div class="t-flex t-flex-wrap t--mx-2 t--mb-4">
      <div class="t-w-full t-px-2 t-pb-4 t-text-sm" v-if="changeStoreAdvice">
        <span>{{ $t('We detected a different language.') }}</span><br>
        <span class="t-font-bold">{{ $t('Are you in the right store?') }}</span>
      </div>
      <div class="t-w-1/2 t-px-2 t-pb-4" v-for="(storeView) in storeViews" :key="storeView.languageCode" @click="setLanguageAccepted">
        <language-button :store-view="storeView" :is-current="storeView.storeCode === currentStoreView.storeCode" />
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
  props: {
    changeStoreAdvice: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentStoreView () {
      return currentStoreView()
    },
    storeViews () {
      return config.icmaa.languageSwitcher.map(l => ({
        url: l[0],
        storeCode: l[1],
        languageCode: l[2],
        name: l[3]
      }))
    }
  },
  methods: {

    setLanguageAccepted () {
      if (this.changeStoreAdvice) {
        this.$store.dispatch('claims/set', { claimCode: 'languageAccepted', value: true })
      }
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
