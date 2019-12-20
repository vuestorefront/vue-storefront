<template>
  <div id="layout">
    <AppHeader />
    <nuxt />
    <BottomNavigation />
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader.vue'
import BottomNavigation from '~/components/BottomNavigation.vue'
import AppFooter from '~/components/AppFooter.vue'

export default {
  components: {
    AppHeader,
    BottomNavigation,
    AppFooter
  }
}
</script>
<style lang="scss">
@import "~@storefront-ui/vue/styles.scss";
@import "~@storefront-ui/shared/styles/helpers/visibility";
@import "~@storefront-ui/vue/src/utilities/transitions/transitions";

#layout {
  box-sizing: border-box;
  @media screen and (min-width: $desktop-min) {
    max-width: 1240px;
    margin: auto;  }
}

body {
  padding: 0;
  margin: 0;
}
</style>
