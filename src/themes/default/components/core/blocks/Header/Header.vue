<template>
  <div class="header">
    <header
      class="fixed w-100 brdr-bottom bg-cl-primary brdr-cl-secondary"
      :class="{ 'is-visible': navVisible }"
    >
      <div class="container">
        <div class="row between-xs middle-xs px15" v-if="!isCheckout">
          <div class="col-sm-4 col-xs-2 middle-xs">
            <div>
              <template v-if="!isProductPage">
                <hamburger-icon class="p15 icon bg-cl-secondary pointer" v-if="!isProductPage"/>
              </template>
              <template v-else>
                <return-icon class="p15 icon bg-cl-secondary pointer" v-if="isProductPage"/>
              </template>
            </div>
          </div>
          <div class="col-xs-2 visible-xs">
            <search-icon class="p15 icon pointer" />
          </div>
          <div class="col-sm-4 col-xs-4 center-xs">
            <div>
              <logo width="36px" height="41px"/>
            </div>
          </div>
          <div class="col-xs-2 visible-xs">
            <wishlist-icon class="p15 icon pointer" />
          </div>
          <div class="col-sm-4 col-xs-2 end-xs">
            <div class="inline-flex">
              <search-icon class="p15 icon hidden-xs pointer" />
              <wishlist-icon class="p15 icon hidden-xs pointer" />
              <compare-icon class="p15 icon hidden-xs pointer" />
              <microcart-icon class="p15 icon pointer" />
              <account-icon class="p15 icon hidden-xs pointer" />
            </div>
          </div>
        </div>
        <div class="row between-xs middle-xs px15 py5" v-if="isCheckout">
          <div class="col-xs-5 col-md-3 middle-xs">
            <div>
              <router-link to="/" class="cl-tertiary links">
                {{ $t('Return to shopping') }}
              </router-link>
            </div>
          </div>
          <div class="col-xs-2 col-md-6 center-xs">
            <logo width="36px" height="41px"/>
          </div>
          <div class="col-xs-5 col-md-3 end-xs">
            <div>
              <a v-if="!currentUser" href="#" @click="gotoAccount" class="cl-tertiary links">
                {{ $t('Login to your account') }}
              </a>
              <span v-else>
                {{ $t('You are logged in as') }} {{ currentUser.firstname }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div class="header-placeholder"/>
  </div>
</template>

<script>
import Header from 'core/components/blocks/Header/Header'
import { mapState } from 'vuex'

import Logo from '../../Logo.vue'

import AccountIcon from './AccountIcon.vue'
import MicrocartIcon from './MicrocartIcon.vue'
import HamburgerIcon from './HamburgerIcon.vue'
import ReturnIcon from './ReturnIcon.vue'
import SearchIcon from './SearchIcon.vue'
import WishlistIcon from './WishlistIcon.vue'
import CompareIcon from './CompareIcon.vue'

export default {
  data () {
    return {
      productPageRoutes: [
        'product',
        'simple-product',
        'configurable-product',
        'downloadable-product',
        'grouped-product'
      ],
      isCheckout: false,
      isProductPage: false,
      navVisible: true
    }
  },
  beforeCreated () {
    if (this.productPageRoutes.includes(this.$route.name)) {
      this.isProductPage = true
    }
  },
  created () {
    if (this.$route.name === 'checkout') {
      this.isCheckout = true
    }
  },
  beforeMount () {
    let didScroll
    let lastScrollTop = 0
    const delta = 5
    const navbarHeight = 54

    window.addEventListener('scroll', () => {
      didScroll = true
    })

    setInterval(() => {
      if (didScroll) {
        hasScrolled.apply(this)
        didScroll = false
      }
    }, 250)

    function hasScrolled () {
      let st = document.scrollingElement.scrollTop

      if (Math.abs(lastScrollTop - st) <= delta) {
        return
      }
      if (st > lastScrollTop && st > navbarHeight) {
        this.navVisible = false
      } else {
        this.navVisible = true
      }
      lastScrollTop = st
    }
  },
  watch: {
    '$route.name': function () {
      if (this.productPageRoutes.includes(this.$route.name)) {
        this.isProductPage = true
      } else {
        this.isProductPage = false
      }

      if (this.$route.name === 'checkout') {
        this.isCheckout = true
        this.menuFixed = true
      } else {
        this.isCheckout = false
        this.menuFixed = false
      }
    }
  },
  computed: {
    ...mapState({
      isOpenLogin: state => state.ui.signUp,
      currentUser: state => state.user.current
    })
  },
  methods: {
    gotoAccount () {
      this.$bus.$emit('modal-toggle', 'modal-signup')
    }
  },
  components: {
    AccountIcon,
    MicrocartIcon,
    HamburgerIcon,
    WishlistIcon,
    CompareIcon,
    SearchIcon,
    ReturnIcon,
    Logo
  },
  mixins: [Header]
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-icon-hover: color(secondary, $colors-background);

header {
  height: 54px;
  top: -54px;
  z-index: 2;
  transition: top 0.2s ease-in-out;
}
.icon {
  opacity: 0.6;
  &:hover,
  &:focus {
    background-color: $color-icon-hover;
    opacity: 1;
  }
}
.header-placeholder {
  height: 54px;
}
.links {
  text-decoration: underline;
}
.is-visible {
  top: 0 !important;
}
@media (max-width: 767px) {
  .row.middle-xs {
    margin: 0 -15px;

    &.py5 {
      margin: 0;
    }
  }
  .col-xs-2:first-of-type {
      padding-left: 0;
  }
  .col-xs-2:last-of-type {
      padding-right: 0;
  }
  a, span {
    font-size: 12px;
  }
}
</style>
