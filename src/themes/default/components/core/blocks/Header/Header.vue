<template>
<div class="header">
    <header class="brdr-underline bg-white">
        <div class="container">
            <div class="row between-xs middle-xs px15" v-show="!isCheckout">
                <div class="col-md-2 middle-xs">
                    <div class="box">
                        <hamburger-icon class="p15 icon bg-lightgray"/>
                    </div>
                </div>
                <div class="col-md-8 center-xs">
                    <div class="box">              
                        <logo width="36px" height="41px"/>
                    </div>
                </div>
                <div class="col-md-2 end-xs">
                    <div class="box inline-flex">
                        <search-icon class="p15 icon search-icon" />
                        <wishlist-icon class="p15 icon wishlist-icon" />         
                        <microcart-icon class="p15 icon microcart-icon" />
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
                <div class="col-md-6 middle-xs end-xs">
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

import MicrocartIcon from './MicrocartIcon.vue'
import HamburgerIcon from './HamburgerIcon.vue'
import SearchIcon from '../../SearchIcon.vue'
import WishlistIcon from './WishlistIcon.vue'

export default {
  data () {
    return {
      isCheckout: false
    }
  },
  created () {
    if (this.$route.path === '/checkout') {
      this.isCheckout = true
    }
  },
  watch: {
    '$route.path': function () {
      if (this.$route.path === '/checkout') {
        this.isCheckout = true
      } else {
        this.isCheckout = false
      }
    }
  },
  components: {
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
        border-bottom-color: #E0E0E0;
        position: fixed;
        height: 55px;
        top: 0;
        width: 100%;
        z-index: 2;
    }
    .icon {
        opacity: 0.6;
    }
    .icon:hover {
        background-color: #F2F2F2;
        cursor: pointer;
        opacity: 1;
    }
    @media (max-width: 510px) {
        .search-icon {
            display: none;
        }
        .wishlist-icon {
            display: none;
        }
    }
    .header-placeholder {
        height: 55px;
    }
    .links {
        text-decoration: undeline;
    }
</style>
