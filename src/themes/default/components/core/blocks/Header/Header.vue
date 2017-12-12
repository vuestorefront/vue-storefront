<template>
<div class="header">
    <header class="brdr-bottom bg-white brdr-c-alto"  :class="{ 'is-visible': menuFixed }">
        <div class="container">
            <div class="row between-xs middle-xs px15" v-show="!isCheckout">
                <div class="col-md-3 middle-xs">
                    <div class="box">
                        <hamburger-icon class="p15 icon bg-lightgray"/>
                    </div>
                </div>
                <div class="col-md-6 center-xs">
                    <div class="box">
                        <logo width="36px" height="41px"/>
                    </div>
                </div>
                <div class="col-md-3 end-xs">
                    <div class="box inline-flex">
                        <search-icon class="p15 icon hidden-xs" />
                        <wishlist-icon class="p15 icon hidden-xs" />
                        <microcart-icon class="p15 icon" />
                        <account-icon class="p15 icon hidden-xs" />
                    </div>
                </div>
            </div>
             <div class="row between-xs middle-xs px15" v-show="isCheckout">
                <div class="col-md-1">
                    <div class="box py10">
                        <img src="assets/launcher-icon-1x.png" height="35px">
                    </div>
                </div>
                <div class="col-md-5 m5dle-xs links">
                    <div class="box py15">
                        <router-link to="/">Return to the shopping</router-link>
                    </div>
                </div>
                <div class="col-md-6 middle-xs end-xs hidden-xs">
                    <img src="/assets/badges.png">
                </div>
            </div>
        </div>
    </header>
    <div class="header-placeholder">
    </div>
</div>
</template>

<script>
import { coreComponent } from 'lib/themes'

import Logo from '../../Logo.vue'

import AccountIcon from './AccountIcon.vue'
import MicrocartIcon from './MicrocartIcon.vue'
import HamburgerIcon from './HamburgerIcon.vue'
import SearchIcon from './SearchIcon.vue'
import WishlistIcon from './WishlistIcon.vue'

export default {
  data () {
    return {
      isCheckout: false,
      menuFixed: false
    }
  },
  created () {
    if (this.$route.path === '/checkout') {
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
        this.menuFixed = false
      } else {
        this.menuFixed = true
      }
      lastScrollTop = st
    }
  },
  watch: {
    '$route.path': function () {
      if (this.$route.path === '/checkout') {
        this.menuFixed = true
      } else {
        this.menuFixed = false
      }
    }
  },
  components: {
    AccountIcon,
    MicrocartIcon,
    HamburgerIcon,
    WishlistIcon,
    SearchIcon,
    Logo
  },
  mixins: [coreComponent('core/blocks/Header/Header')]
}
</script>

<style scoped>
    header {
        position: fixed;
        height: 54px;
        top: -54px;
        width: 100%;
        z-index: 2;
        transition: top 0.2s ease-in-out;
    }
    .icon {
        opacity: 0.6;
    }
    .icon:hover {
        background-color: #F2F2F2;
        cursor: pointer;
        opacity: 1;
    }
    .header-placeholder {
        height: 54px;
    }
    .links {
        text-decoration: undeline;
    }
    .is-visible {
        top: 0 !important;
    }
    
</style>
