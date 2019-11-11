<template>
  <a :href="storeView.url" class="t-flex t-items-center t-rounded-sm t-border t-border-base-lightest t-p-2 t-cursor-pointer" :class="{ 't-bg-base-lightest': isCurrent }">
    <flag-icon :iso="i18n.defaultCountry" class="t-flex-fix t-mr-2" format="4x3" width="40" height="30" />
    <div class="t-text-sm t-leading-none">{{ i18n.fullCountryName }}</div>
  </a>
</template>

<script>
import config from 'config'
import FlagIcon from 'theme/components/core/blocks/FlagIcon'

export default {
  components: {
    FlagIcon
  },
  props: {
    storeView: {
      type: Object,
      required: true
    },
    isCurrent: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    i18n () {
      return this.getI18n(this.storeView)
    }
  },
  methods: {
    getI18n (storeView) {
      if (!storeView.i18n) {
        return storeView.extend ? this.getI18n(config.storeViews[storeView.extend]) : config.i18n
      }

      return storeView.i18n
    }
  }
}
</script>
