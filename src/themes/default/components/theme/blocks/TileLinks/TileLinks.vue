<template>
  <div class="tile-links">
    <div class="row center-xs">
      <div class="tile-container middle-xs center-xs row col-md-4" v-for="tile in social_tiles">
        <tile-link :tile="tile" />
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

<style lang="scss" scoped>
  .tile-links{
    padding-right: .5rem;
    padding-left: .5rem;
  }
  .tile-container{
    padding: 15px;
    @media screen and (max-width: 75em){
      flex: 0 0 100%;
      max-width: 100%;
      padding: 0;
      padding-bottom: 15px;
      padding-top: 15px;
    }
  }
</style>