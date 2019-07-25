<template>
  <router-link :to="localizedRoute('/')" :title="$t('Home Page')" class="no-underline inline-flex">
    <img
      :width="width"
      :height="height"
      src="/assets/logo.svg"
      :alt="$t(appName)"
    >
  </router-link>
</template>

<script>
import config from 'config'

export default {
  data () {
    return {
      appName: config.appName ? config.appName : 'Vuestore'
    }
  },
  props: {
    width: {
      type: [String, Number],
      required: true
    },
    height: {
      type: [String, Number],
      required: true
    }
  }
}
</script>
