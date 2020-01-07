<template>
  <SfHeader active-sidebar="activeSidebar">
    <template #logo>
      <nuxt-link to="/" class="sf-header__logo">
        <SfImage src="/icons/logo.svg" alt="Vue Storefront Next" class="sf-header__logo-image"/>
      </nuxt-link>
    </template>
    <template #navigation>
      <nuxt-link to="/c/women">
        <SfHeaderNavigationItem>
          WOMEN
        </SfHeaderNavigationItem>
      </nuxt-link>
      <nuxt-link to="/c/men">
        <SfHeaderNavigationItem>
          MEN
        </SfHeaderNavigationItem>
      </nuxt-link>
      <nuxt-link to="/c/cat">
        <SfHeaderNavigationItem>
          KIDS
        </SfHeaderNavigationItem>
      </nuxt-link>
    </template>
  </SfHeader>
</template>

<script>
import { SfHeader, SfImage } from '@storefront-ui/vue'

export default {
  components: {
    SfHeader,
    SfImage
  },
}
</script>

<style lang="scss" scoped>
.sf-header__logo-image {
  height: 100%;
}
</style>
