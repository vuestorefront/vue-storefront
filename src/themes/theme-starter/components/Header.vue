<template>
  <header>
    Header:
    <router-link :to="localizedRoute('/')">Homepage</router-link>
  </header>
</template>

<script>
  import { localizedRoute as localizedRouteHelper, currentStoreView } from '@vue-storefront/store/lib/multistore'

  export default {
    methods: {
      localizedRoute (routeObj) {
        const storeView = currentStoreView()
        return localizedRouteHelper(routeObj, storeView.storeCode)
      }
    }
  }
</script>
