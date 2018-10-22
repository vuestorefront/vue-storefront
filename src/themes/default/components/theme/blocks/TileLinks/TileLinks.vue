<template>
  <div class="row center-xs">
    <div
      class="col-sm-4 pb15"
      v-for="(tile, index) in social_tiles"
      :key="index"
    >
      <div
        class="tile center-xs middle-xs"
      >
        <img
          class="tile-image"
          v-lazy="tile.image"
          :alt="tile.alt"
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import socialData from 'theme/resource/ig_feed.json'

export default {
  name: 'TileLinks',
  computed: {
    ...mapGetters({
      social_tiles: 'social/getSocialTiles'
    })
  },
  created () {
    this.updateSocialTiles(socialData)
  },
  methods: {
    ...mapActions({
      updateSocialTiles: 'social/updateSocialTiles'
    })
  }
}
</script>

<style lang="scss" scoped>
@import "~theme/css/animations/transitions";

.tile {
  display: flex;
  overflow: hidden;
}

.tile-image {
  width: 100%;
  height: 100%;
  transition: transform 0.3s $motion-main;

  &:hover,
  &:focus {
    transform: scale(1.2);
  }
}
</style>
