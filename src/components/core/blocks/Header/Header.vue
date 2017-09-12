<template>
  <div id="header">
      Core Header
      <!-- Components that can be included by default from mixin -->
      <logo />
      <search-icon />
      <microcart-icon />
      <hamburger-icon />
      <wishlist-icon />
  </div>
</template>

<script>
import Logo from '../../Logo.vue'
import SearchIcon from '../../SearchIcon.vue'

import MicrocartIcon from './MicrocartIcon.vue'
import HamburgerIcon from './HamburgerIcon.vue'
import WishlistIcon from './WishlistIcon.vue'

export default {
  name: 'main-header',
  components: {
    Logo,
    SearchIcon,
    MicrocartIcon,
    HamburgerIcon,
    WishlistIcon
  }
}
</script>
