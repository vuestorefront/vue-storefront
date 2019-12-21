<template>
  <div class="row center-xs">
    <div
      class="col-sm-4 pb15"
      v-for="(banner, index) in banners.productBanners" v-if="banners.productBanners"
      :key="index"
    >
      <router-link :to="localizedRoute(banner.link)">
        <div
          class="tile center-xs tile-small middle-xs"
        >
          <img
            class="tile-image"
            v-lazy="banner.image"
            :alt="banner.title"
          >
        </div>
      </router-link>
    </div>
    <div v-if="(!banners.productBanners) || (banners.productBanners.length === 0)">
      <h3 class="align-center cl-accent">
        Product will available soon for you :)
      </h3>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'TileLinks',
  computed: {
    ...mapGetters({
      banners: 'procc/getStoreBanners'
    })
  },
  async created () {
    await this.updateStoreBanners()
    console.log('TileLinks banners', this.banners)
  },
  methods: {
    ...mapActions({
      updateStoreBanners: 'procc/updateStoreBanners'
    })
  }
}
</script>

<style lang='scss' scoped>
  @import '~theme/css/animations/transitions';

  .tile {
    display: flex;
    overflow: hidden;
  }

  .tile-image {
    /*width: 100%;*/
    width: auto;
    height: 100%;
    transition: transform 0.4s $motion-main;

    &:hover,
    &:focus {
      transform: scale(1.2);
    }
  }
  .tile-small {
    height: 360px;

    @media (max-width: 767px) {
      height: 200px;
    }
  }
</style>
