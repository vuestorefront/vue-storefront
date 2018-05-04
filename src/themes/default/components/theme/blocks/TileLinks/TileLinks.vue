<template>
  <div class="row center-xs">
    <div
      class="col-sm-4 pb15"
      v-for="(tile, index) in social_tiles"
      :key="index"
    >
      <router-link
        :to="tile.link"
        class="tile center-xs middle-xs no-underline"
      >
        <img
          class="tile-image"
          v-lazy="tile.image"
          :alt="tile.alt"
        >
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import socialData from 'theme/resource/ig_feed.json'

export default {
  name: 'TileLinks',
  created () {
    this.updateSocialTiles(socialData)
  },
  computed: {
    ...mapGetters({
      social_tiles: 'social/getSocialTiles'
    })
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
