<template>
    <div id="header">
        <div class="row middle-md">
            <div class="col-md-1">
                <div class="box">
                    <hamburger-icon />
                </div>
            </div>
            <div class="col-md-9 center-md">
                <div class="box">              
                    <logo />
                </div>
            </div>
            <div class="col-md-2 center-md">
                <div class="box">
                    <search-icon class="mx10" />
                    <wishlist-icon class="mx10" />         
                    <microcart-icon class="mx10" />
                </div>
            </div>
        </div>
        <ul>
            <li>
                <router-link to="/" exact>Home</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { coreComponent } from 'lib/themes'
import MicrocartIcon from './MicrocartIcon.vue'
import HamburgerIcon from './HamburgerIcon.vue'
import SearchIcon from '../../SearchIcon.vue'
import WishlistIcon from './WishlistIcon.vue'

export default {
  components: {
    MicrocartIcon,
    HamburgerIcon,
    WishlistIcon,
    SearchIcon
  },
  mixins: [coreComponent('core/blocks/Header/Header')]
}
</script>

<style scoped>

</style>
