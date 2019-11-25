<template>
  <modal-switcher v-if="loadLanguagesModal" :change-store-advice="changeStoreAdvice" />
</template>

<script>
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

const ModalSwitcher = () => import(/* webpackChunkName: "vsf-languages-modal" */ 'theme/components/core/blocks/Switcher/Language.vue')

export default {
  components: {
    ModalSwitcher
  },
  data () {
    return {
      loadLanguagesModal: false,
      changeStoreAdvice: false,
      languageAccepted: false
    }
  },
  computed: {
    storeView () {
      return currentStoreView()
    },
    isCorrectStoreviewLanguage () {
      if (this.languageAccepted) {
        return true
      }

      const { defaultLocale, defaultLanguage } = this.storeView.i18n
      return this.browserLanguages.find(lang =>
        [defaultLocale, defaultLanguage].includes(lang) ||
        defaultLocale.startsWith(lang) ||
        defaultLanguage.startsWith(lang)
      ) || false
    },
    browserLanguages () {
      let found = [];
      if (typeof navigator !== 'undefined') {
        if (navigator.languages) {
          navigator.languages.forEach(l => found.push(l))
        }
        if (navigator.userLanguage) {
          found.push(navigator.userLanguage);
        }
        if (navigator.language) {
          found.push(navigator.language);
        }
      }

      return found.length > 0 ? found : undefined;
    }
  },
  methods: {
    showLanguagesModal (changeStoreAdvice = false) {
      this.loadLanguagesModal = true
      this.changeStoreAdvice = changeStoreAdvice

      this.$bus.$emit('modal-show', 'modal-switcher')
    }
  },
  beforeMount () {
    this.$bus.$on('modal-toggle-switcher', this.showLanguagesModal)
  },
  async mounted () {
    const claim = await this.$store.dispatch('claims/check', { claimCode: 'languageAccepted' })
    if (!claim) {
      this.$store.dispatch(
        'claims/set',
        { claimCode: 'languageAccepted', value: this.isCorrectStoreviewLanguage }
      )
    } else {
      this.languageAccepted = claim.value
    }

    if (!this.isCorrectStoreviewLanguage) {
      this.showLanguagesModal(true)
    }
  }
}
</script>
