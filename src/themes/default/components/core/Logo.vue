<template>
  <router-link :to="localizedRoute('/')" :title="$t('Home Page')" class="no-underline inline-flex">
    <img
      :width="width"
      :height="height"
      src="/assets/logo.svg"
      alt="Vuestore logo"
    >
  </router-link>
</template>

<script>
import { localizedRoute as localizedRouteHelper, currentStoreView } from '@vue-storefront/store/lib/multistore'

export default {
  props: {
    width: {
      type: [String, Number],
      required: true
    },
    height: {
      type: [String, Number],
      required: true
    }
  },
  methods: {
    localizedRoute (routeObj) {
      const storeView = currentStoreView()
      return localizedRouteHelper(routeObj, storeView.storeCode)
    }
  }
}
</script>
