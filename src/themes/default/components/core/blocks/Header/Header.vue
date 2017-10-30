<template>
    <header class="brdr-underline">
        <div class="container">
            <div class="row middle-xs">
                <div class="col-md-2 middle-md">
                    <div class="box">
                        <hamburger-icon class="p15 icon"/>
                    </div>
                </div>
                <div class="col-md-8 center-md">
                    <div class="box">              
                        <logo width="36px" height="41px" class="p5"/>
                    </div>
                </div>
                <div class="col-md-2 end-md">
                    <div class="box">
                        <search-icon class="p12 icon" />
                        <wishlist-icon class="p12 icon" />         
                        <microcart-icon class="p12 icon" />
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
    }
    .icon {
        opacity: 0.6;
    }
    .icon:hover {
        background-color: #F2F2F2;
        cursor: pointer;
        opacity: 1;
    }
    @media (max-width: )
</style>
