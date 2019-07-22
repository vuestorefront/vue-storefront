<template>
  <div id="home">
    <SfHero>
      <SfHeroItem
        v-for="(hero, i) in heroes"
        :key="i"
        :title="hero.title"
        :subtitle="hero.subtitle"
        :button-text="hero.buttonText"
        :background="hero.background"
        :image="hero.image"
        :class="hero.className"
      />
    </SfHero>
    <SfBannerGrid :banner-grid="1" class="banners">
      <template #bannerA>
        <SfBanner
          subtitle="Dresses"
          title="COCKTAIL PARTY"
          description="Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses from all your favorite brands."
          button-text="SHOP NOW"
          image="/assets/homepage/bannerF.png"
          class="sf-banner--left sf-banner--container-full"
        />
      </template>
      <template #bannerB>
        <SfBanner
          subtitle="Dresses"
          title="LINEN DRESSES"
          description="Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses from all your favorite brands."
          button-text="SHOP NOW"
          image="/assets/homepage/bannerE.png"
          class="sf-banner--left"
        />
      </template>
      <template #bannerC>
        <SfBanner
          subtitle="T-Shirts"
          title="THE OFFICE LIFE"
          image="/assets/homepage/bannerC.png"
          class="sf-banner--left sf-banner--container-full"
        />
      </template>
      <template #bannerD>
        <SfBanner
          subtitle="Summer shoes"
          title="ECO SANDALS"
          image="/assets/homepage/bannerG.png"
          class="sf-banner--left sf-banner--container-full"
        />
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
      :heading="{
        title: 'Best Sellers'
      }"
    >
      <SfCarousel :settings="{ gap: 0 }" class="product-carousel">
        <SfCarouselItem v-for="(product, i) in products" :key="i">
          <SfProductCard
            :title="product.title"
            :image="product.image"
            :price="product.price"
            :rating="product.rating"
            class="product-card"
          />
        </SfCarouselItem>
      </SfCarousel>
    </SfSection>
    <SfSection
      :heading="{
        title: 'Share Your Look',
        subtitle: '#YOURLOOK'
      }"
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
      title="Download our application to your mobile"
      subtitle="Fashion to Take Away"
      image="/assets/homepage/bannerD.png"
      class="banner-application sf-banner--left sf-banner--center desktop-only"
    >
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
  SfBanner,
  SfCallToAction,
  SfSection,
  SfCarousel,
  SfProductCard,
  SfImage,
  SfBannerGrid
} from '@storefrontui/vue';

export default {
  name: 'Home',
  data () {
    return {
      heroes: [
        {
          title: 'Colorful summer dresses are already in store',
          subtitle: 'SUMMER COLLECTION 2019',
          buttonText: 'Learn more',
          background: '#eceff1',
          image: '/assets/homepage/bannerH.png'
        },
        {
          title: 'Colorful summer dresses are already in store',
          subtitle: 'SUMMER COLLECTION 2019',
          buttonText: 'Learn more',
          background: '#efebe9',
          image: '/assets/homepage/bannerA.png',
          className:
            'sf-hero-item--position-bg-top-left sf-hero-item--align-right'
        },
        {
          title: 'Colorful summer dresses are already in store',
          subtitle: 'SUMMER COLLECTION 2019',
          buttonText: 'Learn more',
          background: '#fce4ec',
          image: '/assets/homepage/bannerB.png'
        }
      ],
      products: [
        {
          title: 'Cream Beach Bag',
          image: '/assets/homepage/productA.png',
          price: { regularPrice: '50.00 $' },
          rating: { max: 5, score: 4 }
        },
        {
          title: 'Cream Beach Bag',
          image: '/assets/homepage/productB.png',
          price: { regularPrice: '50.00 $' },
          rating: { max: 5, score: 4 }
        },
        {
          title: 'Cream Beach Bag',
          image: '/assets/homepage/productC.png',
          price: { regularPrice: '50.00 $' },
          rating: { max: 5, score: 4 }
        },
        {
          title: 'Cream Beach Bag',
          image: '/assets/homepage/productA.png',
          price: { regularPrice: '50.00 $' },
          rating: { max: 5, score: 4 }
        },
        {
          title: 'Cream Beach Bag',
          image: '/assets/homepage/productB.png',
          price: { regularPrice: '50.00 $' },
          rating: { max: 5, score: 4 }
        },
        {
          title: 'Cream Beach Bag',
          image: '/assets/homepage/productC.png',
          price: { regularPrice: '50.00 $' },
          rating: { max: 5, score: 4 }
        },
        {
          title: 'Cream Beach Bag',
          image: '/assets/homepage/productA.png',
          price: { regularPrice: '50.00 $' },
          rating: { max: 5, score: 4 }
        },
        {
          title: 'Cream Beach Bag',
          image: '/assets/homepage/productB.png',
          price: { regularPrice: '50.00 $' },
          rating: { max: 5, score: 4 }
        }
      ]
    };
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
@import "~@storefrontui/vue/src/css/variables";
@import "~@storefrontui/shared/styles/helpers/visibility";

#home {
  max-width: 1240px;
  margin: auto;
  padding: 0 $spacer-big;
  box-sizing: border-box;
  @media screen and (min-width: $desktop-min) {
    padding: 0;
  }
}
.call-to-action-newsletter {
  margin: $spacer-big 0;
  @media screen and (min-width: $desktop-min) {
    margin: $spacer-extra-big * 2 0;
  }
}
.product-card {
  max-width: unset;
  &:hover {
    box-shadow: 0px 4px 20px rgba(168, 172, 176, 0.19);
  }
}
.product-carousel {
  margin: -20px 0;
  /deep/ .sf-carousel__wrapper {
    padding: 20px 0;
    @media screen and (min-width: $desktop-min) {
      padding: 20px;
      max-width: calc(100% - 216px);
    }
  }
}
.banner-application {
  min-height: 420px;
  max-width: 1040px;
  margin: auto;
  &__title {
    padding: 0;
    margin: 0;
    margin-top: $spacer-big;
    font-size: 2.25rem;
    font-weight: 400;
    line-height: 1.388;
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
  @media screen and (min-width: $desktop-min) {
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
      @media screen and (min-width: $desktop-min) {
        margin-top: $spacer-big;
      }
    }
  }
  &__col {
    margin: 0;
    & + & {
      margin-left: $spacer-big / 2;
      @media screen and (min-width: $desktop-min) {
        margin-left: $spacer-big;
      }
    }
  }
}
.sf-banner {
  flex: 1;
}
</style>
