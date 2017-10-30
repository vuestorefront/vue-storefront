<template>
  <div class="tile-links">
    <div class="row">
      <div class="col-md-12">
        <div class="row center-xs p15">
          <div class="col-md-4 p15" v-for="tile in social_tiles">
            <tile-link :tile="tile" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import TileLink from './TileLink.vue'
export default {
  name: 'tile-links',
  computed: {
    ...mapGetters({
      social_tiles: 'social/getSocialTiles'
    })
  },
  components: {
    TileLink
  }
}
</script>

<style scoped>
</style>