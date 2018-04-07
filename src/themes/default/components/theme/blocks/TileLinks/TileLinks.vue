<template>
  <div class="tile-links">
    <div class="row center-xs">
      <div
        class="tile-container middle-xs center-xs row col-md-4 p15"
        v-for="(tile, index) in social_tiles"
        :key="index"
      >
        <tile-link :tile="tile" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import socialData from 'theme/resource/ig_feed.json'
import TileLink from './TileLink.vue'

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
  },
  components: {
    TileLink
  }
}
</script>

<style lang="scss" scoped>
  .tile-links {
    @media (max-width: 1199px) {
      padding-top: 15px;
    }

    @media (max-width: 767px) {
      padding: 15px;
    }
  }

  .tile-container {
    @media (max-width: 1199px) {
      margin-top: -15px;
    }

    @media (max-width: 767px) {
      flex: 100%;
    }
  }
</style>
