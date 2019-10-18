<template>
  <div class="header">
    <header class="t-fixed t-w-full t-bg-white" :class="{ 'is-visible': navVisible }">
      <div class="t-h-50px t-flex t-bg-black">
        <div class="t-container t-px-2 t-flex-initial t-flex t-justify-between">
          <button-ui-sidebar icon="dehaze" title="Menu" ui-state="sidebar" ui-action="setSidebar" />
          <div class="t-flex-auto sm:t-border-r t-border-base-tone " />
          <button-account />
          <button-ui-sidebar icon="favorite_border" title="Wishlist" ui-state="wishlist" ui-action="setWishlist" qty-getter="wishlist/getWishlistItemsCount" />
          <button-cart :last="true" />
          <language-switcher />
        </div>
      </div>

      <div class="t-h-60px t-flex">
        <div class="t-container t-px-4 t-flex t-items-center">
          <search-input />
          <div class="t-flex-expand t-w-4" />
          <meta-navigation />
          <logo width="174" height="43" class="logo t-flex-fix t--mr-4 xl:t-mr-0" />
        </div>
      </div>
    </header>
    <div class="header-placeholder" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CurrentPage from 'theme/mixins/currentPage'
import Logo from 'theme/components/core/blocks/Header/Logo'
import ButtonUiSidebar from 'theme/components/core/blocks/Header/ButtonUiSidebar'
import ButtonCart from 'theme/components/core/blocks/Header/ButtonCart'
import ButtonAccount from 'theme/components/core/blocks/Header/ButtonAccount'
import SearchInput from 'theme/components/core/blocks/Header/SearchInput'
import MetaNavigation from 'theme/components/core/blocks/Header/MetaNavigation'
import LanguageSwitcher from 'theme/components/core/blocks/Header/LanguageSwitcher'

export default {
  name: 'Header',
  components: {
    Logo,
    ButtonUiSidebar,
    ButtonCart,
    ButtonAccount,
    SearchInput,
    MetaNavigation,
    LanguageSwitcher
  },
  mixins: [CurrentPage],
  data () {
    return {
      navVisible: true,
      isScrolling: false,
      scrollTop: 0,
      lastScrollTop: 0,
      navbarHeight: 110
    }
  },
  beforeMount () {
    window.addEventListener(
      'scroll',
      () => {
        this.isScrolling = true
      },
      { passive: true }
    )

    setInterval(() => {
      if (this.isScrolling) {
        this.hasScrolled()
        this.isScrolling = false
      }
    }, 250)
  },
  methods: {
    hasScrolled () {
      this.scrollTop = window.scrollY
      if (
        this.scrollTop > this.lastScrollTop &&
        this.scrollTop > this.navbarHeight
      ) {
        this.navVisible = false
      } else {
        this.navVisible = true
      }
      this.lastScrollTop = this.scrollTop
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-icon-hover: color(secondary, $colors-background);

header, .header-placeholder {
  height: 110px;
}

header {
  top: -110px;
  z-index: 2;
  transition: top 0.2s ease-in-out;
  &.is-visible {
    top: 0;
  }
}
</style>
