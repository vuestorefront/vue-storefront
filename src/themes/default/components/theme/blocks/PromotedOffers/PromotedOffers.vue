<template>
  <section class="offers container my30">
    <div class="row m0">
      <div class="offer-container col-xs-12 col-sm-6 px15">
      <router-link :to="banners.mainBanner.link">
        <div
          class="offer p5 flex center-xs middle-xs c-white"
          v-lazy:background-image="banners.mainBanner.image"
        >
          <p class="subtitle m0 serif h3 uppercase">
            {{ banners.mainBanner.subtitle}}
          </p>
          <h2 class="title m0 h1">
            {{ banners.mainBanner.title }}
          </h2>
        </div>
      </router-link>
      </div>

      <div class="col-xs-12 col-sm-6 p0">
        <div
          class="offer-container px15 pb30"
          v-for="banner in banners.smallBanners"
        >
          <router-link :to="banner.link">
            <div
              class="offer offer-small p5 flex center-xs middle-xs c-white"
              v-lazy:background-image="banner.image"
            >
              <p class="subtitle m0 serif h3 uppercase">{{ banner.subtitle }}</p>
              <h2 class="title m0 h1">{{ banner.title }}</h2>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'promoted-offers',
  computed: {
    ...mapGetters({
      banners: 'promoted/getPromotedOffers'
    })
  }
}
</script>

<style lang="scss" scoped>
 .offers {
    @media (max-width: 767px) {
      padding: 0 15px;
    }
  }
  .offer-container {
    &:last-child {
      padding-bottom: 0;
    }

    @media (max-width: 767px) {
      padding: 5px 0;
    }
  }
  .offer {
    height: 750px;
    flex-direction: column;
    box-sizing: border-box;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.9;
    transition: 0.3s all;

    &:hover {
      opacity: 1;
    }

    @media (max-width: 767px) {
      height: 200px;
    }
  }
  .offer-small {
    height: 360px;

    @media (max-width: 767px) {
      height: 200px;
    }
  }
  .title {
    @media (max-width: 767px) {
      font-size: 36px;
    }
  }
  .subtitle {
    @media (max-width: 767px) {
      font-size: 18px;
    }
  }
</style>
