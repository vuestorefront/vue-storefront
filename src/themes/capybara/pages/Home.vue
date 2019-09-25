<template>
  <div id="home">
    <SfHero>
      <router-link to="#" v-for="(slide, i) in slides" :key="i">
        <SfHeroItem
          :title="slide.title"
          :subtitle="slide.subtitle"
          :button-text="slide.buttonText"
          :background="slide.background"
          :image="slide.image"
          :class="slide.className"
        />
      </router-link>
    </SfHero>
    <SfBannerGrid :banner-grid="1" class="banners section">
      <template #bannerA>
        <router-link to="#">
          <SfBanner
            subtitle="Dresses"
            title="COCKTAIL PARTY"
            description="Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses from all your favorite brands."
            button-text="SHOP NOW"
            image="/assets/homepage/bannerF.png"
            class="sf-banner--slim"
          />
        </router-link>
      </template>
      <template #bannerB>
        <router-link to="#">
          <SfBanner
            subtitle="Dresses"
            title="LINEN DRESSES"
            description="Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses from all your favorite brands."
            button-text="SHOP NOW"
            image="/assets/homepage/bannerE.png"
            class="sf-banner--slim banner-central"
          />
        </router-link>
      </template>
      <template #bannerC>
        <router-link to="#">
          <SfBanner
            subtitle="T-Shirts"
            title="THE OFFICE LIFE"
            image="/assets/homepage/bannerC.png"
            class="sf-banner--slim"
          />
        </router-link>
      </template>
      <template #bannerD>
        <router-link to="#">
          <SfBanner
            subtitle="Summer shoes"
            title="ECO SANDALS"
            image="/assets/homepage/bannerG.png"
            class="sf-banner--slim"
          />
        </router-link>
      </template>
    </SfBannerGrid>
    <SfCallToAction
      title="Subscribe to Newsletters"
      button-text="Subscribe"
      description="Be aware of upcoming sales and events. Receive gifts and special offers!"
      class="call-to-action-newsletter"
      image="/assets/homepage/newsletter.png"
    />
    <SfSection
      title="Best Sellers"
    >
      <SfCarousel class="product-carousel">
        <SfCarouselItem v-for="(product, i) in newProducts" :key="i">
          <SfProductCard
            :product="product"
            class="product-card"
          />
        </SfCarouselItem>
      </SfCarousel>
    </SfSection>
    <SfSection
      title-heading="Share Your Look"
      subtitle-heading="#YOURLOOK"
      class="section"
    >
      <div class="grid grid-images">
        <div class="grid__row">
          <div class="grid__col">
            <SfImage src="/assets/homepage/imageA.png">
              katherina_trn
            </SfImage>
          </div>
          <div class="grid__col">
            <SfImage src="/assets/homepage/imageB.png">
              katherina_trn
            </SfImage>
          </div>
        </div>
        <div class="grid__row">
          <div class="grid__col">
            <SfImage src="/assets/homepage/imageC.png">
              katherina_trn
            </SfImage>
          </div>
          <div class="grid__col">
            <SfImage src="/assets/homepage/imageD.png">
              katherina_trn
            </SfImage>
          </div>
        </div>
      </div>
    </SfSection>
    <SfBanner
      image="/assets/homepage/bannerD.png"
      class="banner-application desktop-only"
    >
      <template #subtitle>
        <div class="banner-application__subtitle">Fashion to Take Away</div>
      </template>
      <template #title>
        <h1 class="banner-application__title">
          Download our application to your&nbsp;mobile
        </h1>
      </template>
      <template #call-to-action>
        <div>
          <img
            class="banner-application__download"
            src="/assets/homepage/google.png"
            alt=""
          >
          <img
            class="banner-application__download"
            src="/assets/homepage/apple.png"
            alt=""
          >
        </div>
      </template>
    </SfBanner>
  </div>
</template>

<script>
import {
  SfHero,
  SfCallToAction,
  SfSection,
  SfCarousel,
  SfImage,
  SfBannerGrid,
  SfProductCard,
  SfBanner
} from '@storefront-ui/vue';

import { isServer } from '@vue-storefront/core/helpers'

export default {
  name: 'HomePage',
  computed: {
    newProducts () {
      return this.$store.getters['homepage/getNewProducts']
    },
    slides () {
      return this.$store.getters['homepage/getSlides']
    }
  },
  async asyncData ({ store, route }) {
    await store.dispatch('homepage/loadNewProducts')
    await store.dispatch('homepage/loadSlides')
  },
  beforeRouteEnter (to, from, next) {
    if (!isServer && !from.name) { // Loading products to cache on SSR render
      next(vm => {
        vm.$store.dispatch('homepage/loadNewProducts')
      })
    } else {
      next()
    }
  },
  components: {
    SfHero,
    SfBanner,
    SfCallToAction,
    SfSection,
    SfCarousel,
    SfProductCard,
    SfImage,
    SfBannerGrid
  }
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/src/css/variables";
@import "~@storefront-ui/shared/styles/helpers/visibility";

@mixin for-desktop {
  @media screen and (min-width: $desktop-min) {
    @content;
  }
}

#home {
  box-sizing: border-box;
  margin: 0 0 60px 0;
  @include for-desktop {
    max-width: 1240px;
    margin: auto;
  }
}
.call-to-action-newsletter {
  margin: $spacer-big 0;
  box-sizing: border-box;
  @include for-desktop {
    margin: $spacer-extra-big * 2 0;
  }
}
.product-card {
  max-width: unset;
  &:hover {
    @include for-desktop {
      box-shadow: 0px 4px 20px rgba(168, 172, 176, 0.19);
    }
  }
}
.product-carousel {
  margin: -20px -#{$spacer-big} -20px 0;
  @include for-desktop {
    margin: -20px 0;
  }
  /deep/ .sf-carousel__wrapper {
    padding: 20px 0;
    @include for-desktop {
      padding: 20px;
      max-width: calc(100% - 216px);
    }
  }
}
.banner-central {
  @include for-desktop {
    padding-right: 30%;
  }
}
.banner-application {
  min-height: 420px;
  max-width: 1040px;
  margin: auto;
  padding-right: calc(25% + 5rem);
  padding-left: 2.5rem;
  line-height: 1.6;
  &__title {
    margin: $spacer-big 0 0 0;
    font-size: $h1-font-size-desktop;
    font-weight: $h1-font-weight-desktop;
  }
  &__subtitle {
    color: #a3a5ad;
    font-family: $body-font-family-primary;
    font-size: $font-size-extra-big-desktop;
    font-weight: $body-font-weight-primary;
  }
  &__download {
    max-height: 47px;
    margin-top: $spacer-extra-big;
    & + & {
      margin-left: $spacer-big;
    }
  }
}
.banners {
  margin: $spacer-big 0;
  @include for-desktop {
    margin: $spacer-extra-big 0;
  }
}
.grid {
  max-width: 960px;
  margin: auto;
  &__row {
    display: flex;
    & + & {
      margin-top: $spacer-big / 2;
      @include for-desktop {
        margin-top: $spacer-big;
      }
    }
  }
  &__col {
    margin: 0;
    & + & {
      margin-left: $spacer-big / 2;
      @include for-desktop {
        margin-left: $spacer-big;
      }
    }
  }
}
.sf-banner {
  flex: 1;
}
.section {
  @media (max-width: $desktop-min) {
    padding-left: $spacer-big;
    padding-right: $spacer-big;
  }
}
.bottom-navigation-circle {
  opacity: 1;
}
</style>
