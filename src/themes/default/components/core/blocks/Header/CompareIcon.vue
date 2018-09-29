<template>
  <router-link :to="localizedRoute('/compare')" class="compare-icon no-underline inline-flex" v-if="isActive">
    <i class="material-icons">compare</i>
  </router-link>
</template>

<script>
import CompareIcon from '@vue-storefront/core/components/blocks/Header/CompareIcon'
import { localizedRoute as localizedRouteHelper, currentStoreView } from '@vue-storefront/store/lib/multistore'

export default {
  mixins: [CompareIcon],
  methods: {
    localizedRoute (routeObj) {
      const storeView = currentStoreView()
      return localizedRouteHelper(routeObj, storeView.storeCode)
    }
  }
}
</script>
