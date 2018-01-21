<template>
  <router-link to="/" title="Home Page" class="no-underline inline-flex">
      <img
        :width="width"
        :height="height"
        src="/assets/logo.svg"
        alt="Vuestore logo"
      >
  </router-link>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  props: {
    width: {
      required: true
    },
    height: {
      required: true
    }
  },
  mixins: [coreComponent('core/Logo')]
}
</script>
