<template>
    <header class="brdr-underline bg-white">
        <div class="container">
            <div class="row between-xs middle-xs">
                <div class="col-md-2 middle-xs">
                    <div class="box">
                        <hamburger-icon class="p15 icon"/>
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
        </div>
    </header>
</template>

<script>
import { coreComponent } from 'lib/themes'

import Logo from '../../Logo.vue'

import MicrocartIcon from './MicrocartIcon.vue'
import HamburgerIcon from './HamburgerIcon.vue'
import SearchIcon from '../../SearchIcon.vue'
import WishlistIcon from './WishlistIcon.vue'

export default {
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
</style>
