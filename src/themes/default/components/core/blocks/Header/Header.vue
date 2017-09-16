<template>
    <header>
        <div class="container">
            <div class="row middle-md">
                <div class="col-md-1 middle-md">
                    <div class="box">
                        <hamburger-icon class="p15 icon"/>
                    </div>
                </div>
                <div class="col-md-9 center-md">
                    <div class="box">              
                        <logo width="65px" height="30px" class="p5"/>
                    </div>
                </div>
                <div class="col-md-2 end-md">
                    <div class="box">
                        <search-icon class="p15 icon" />
                        <wishlist-icon class="p15 icon" />         
                        <microcart-icon class="p15 icon" />
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
        border-bottom: 1px solid #E0E0E0;
    }
    .icon:hover {
        background-color: #F2F2F2;
        cursor: pointer;
    }
</style>
