<template>
  <header>
    Core Header
    <!-- Components that can be included by default from mixin -->
    <logo />
    <search-icon />
    <microcart-icon />
    <hamburger-icon />
    <return-icon />
    <wishlist-icon />
    <compare-icon />
    <account-icon />
  </header>
</template>

<script>
import Logo from '../../Logo.vue'

import AccountIcon from './AccountIcon.vue'
import SearchIcon from './SearchIcon.vue'
import MicrocartIcon from './MicrocartIcon.vue'
import HamburgerIcon from './HamburgerIcon.vue'
import ReturnIcon from './ReturnIcon.vue'
import WishlistIcon from './WishlistIcon.vue'
import CompareIcon from './CompareIcon.vue'

export default {
  name: 'MainHeader',
  components: {
    AccountIcon,
    Logo,
    SearchIcon,
    MicrocartIcon,
    HamburgerIcon,
    ReturnIcon,
    WishlistIcon,
    CompareIcon
  }
}
</script>
