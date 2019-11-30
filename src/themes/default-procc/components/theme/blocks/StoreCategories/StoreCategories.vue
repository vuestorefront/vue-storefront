<template>
  <section v-if="!singleBanner" class="offers container my30 px15">
    <div class="row">
      <div
        class="offer-container col-xs-12 col-sm-6 pb15"
        v-for="(banner, index) in banners.mainBanners" v-if="banners.mainBanners.length!==0"
        :key="index"
      >
        <router-link :to="localizedRoute(banner.link, banner.storeCode)">
          <div
            class="offer"
            v-lazy:background-image="banner.image"
          >
            <h2 class="title m0 h1" :style="{color: banner.name_color}">
              {{ banner.title }}
            </h2>
            <p class="subtitle m0 serif h3 uppercase" :style="{color: banner.description_color}">
              {{ banner.subtitle }}
            </p>
          </div>
        </router-link>
      </div>

      <div class="col-xs-12 col-sm-6">
        <div
          class="offer-container pb15"
          v-for="(banner, index) in banners.smallBanners" v-if="banners.smallBanners.length!==0"
          :key="index"
        >
          <router-link :to="localizedRoute(banner.link, banner.storeCode)">
            <div
              class="offer offer-small border-box p5 flex bg-cl-th-accent"
              v-lazy:background-image="banner.image"
            >
              <h2 class="title m0 h1" :style="{color: banner.name_color}">{{ banner.title }}</h2>
              <p class="subtitle m0 serif h3 uppercase" :style="{color: banner.description_color}">{{ banner.subtitle }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import _ from 'lodash'
export default {
  name: 'StoreCategories',
  props: {
    singleBanner: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      banners: 'categories/getStoreCategories',
      currentImage: 'categories/getHeadImage'
    })
  },
  async created () {
    await this.updateStoreCategories()
  },
  beforeUpdate () {
    this.sortBanners()
  },
  mounted () {
    this.sortBanners()
  },
  methods: {
    ...mapActions({
      updateStoreCategories: 'categories/updateStoreCategories'
    }),
    sortBanners () {
      let sortBanner = []
      if (this.banners.mainBanners.length !== 0) {
        sortBanner.push(this.banners.default.mainBanners)
        if (this.banners.default.smallBanners.length !== 0) {
          sortBanner.push(this.banners.default.smallBanners)
        }
        sortBanner = _.orderBy(_.flatten(sortBanner), 'productCount', 'desc')
        if (!_.isUndefined(this.banners.default.smallBanners) && !_.isNull(this.banners.default.smallBanners)) {
          this.banners.default.mainBanners = [sortBanner[0]]
        }
        if (!_.isUndefined(this.banners.default.smallBanners) && !_.isNull(this.banners.default.smallBanners) && this.banners.default.smallBanners.length !== 0) {
          this.banners.default.smallBanners = (this.banners.default.smallBanners.length > 1) ? [sortBanner[1], sortBanner[2]] : [sortBanner[1]]
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .title-highlight {
    background-color: rgba(255, 255, 255, 0.4);
    padding: 0.5rem 0.5rem 0.7rem 0.5rem;
    line-height: 3rem;
  }
  .subtitle-highlight {
    background-color: rgba(255, 255, 255, 0.4);
    padding: 0.5rem;
    line-height: 1.4rem;
  }
  .offer-container {
    &:last-child {
      padding-bottom: 0;
    }
  }
  .offer {
    height: 735px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 1;
    transition: 0.3s all;

    &:hover {
      opacity: 0.9;
    }

    @media (max-width: 767px) {
      height: 200px;
    }

    .title {
      text-align: center;
      margin-top: 2rem;
      @media (max-width: 767px) {
        background-color: rgba(255,255,255,0.4);
        padding: 0.5rem;
        line-height: 2.4rem;
      }
    }

    .subtitle {
      font-family: 'Roboto', sans-serif;
      @media (max-width: 767px) {
        background-color: rgba(255,255,255,0.4);
        padding: 0.5rem;
      }
    }
  }
  .offer-small {
    height: 360px;

    @media (max-width: 767px) {
      height: 200px;
    }
  }
  .offer-product {
    height: 330px;
    background-position: 50% 20%;

    @media (max-width: 767px) {
      height: 330px;
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
