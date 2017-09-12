<template>
    <div id="header">
        Header
        <logo />
        <search-icon />
        <microcart-icon />
        <hamburger-icon />
        <wishlist-icon />
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

export default {
  components: {
    MicrocartIcon
  },
  mixins: [coreComponent('core/blocks/Header/Header')]
}
</script>

<style scoped>

</style>
