<template>
  <div class="t-container">
    <div class="t-flex t-flex-wrap t-py-4">
      <navigation class="t-w-full lg:t-w-2/12 t-px-4" />
      <div class="t-w-full lg:t-w-10/12 t-px-4">
        <h1 v-html="headline" v-if="headline" />
        <slot />
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
