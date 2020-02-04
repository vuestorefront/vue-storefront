<template>
  <div class="t-container">
    <div class="t-flex t-flex-wrap t-py-4">
      <navigation class="service-navigation t-w-full lg:t-w-2/12 t-px-4 lg:t-mt-4 t-mb-4" />
      <div class="cms-page-rte t-w-full lg:t-w-10/12 t-px-4">
        <div class="t-p-4 lg:t-p-8 t-bg-white">
          <h1 v-html="headline" v-if="headline" class="t-text-2xl t-font-medium t-mb-3" />
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from 'theme/components/core/blocks/ICMAA/Cms/Pages/Service/Navigation'

export default {
  name: 'ServiceLayout',
  props: {
    headline: {
      type: [String, Boolean],
      default: false
    }
  },
  components: {
    Navigation
  }
}
</script>
