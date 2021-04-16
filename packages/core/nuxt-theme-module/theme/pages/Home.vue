<template>
  <div id="home">
    <LazyHydrate when-idle>
      <SfHero class="hero">
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
    </LazyHydrate>

    <LazyHydrate when-visible>
      <SfBannerGrid :banner-grid="1" class="banner-grid">
        <template v-for="item in banners" v-slot:[item.slot]>
          <SfBanner
            :key="item.slot"
            :title="item.title"
            :subtitle="item.subtitle"
            :description="item.description"
            :button-text="item.buttonText"
            :image="item.image"
            :class="item.class"
          />
        </template>
      </SfBannerGrid>
    </LazyHydrate>

    <LazyHydrate when-visible>
      <div class="similar-products">
        <SfHeading title="Match with it" :level="3"/>
        <nuxt-link :to="localePath('/c/women')" class="smartphone-only">See all</nuxt-link>
      </div>
    </LazyHydrate>

    <LazyHydrate when-visible>
        <SfCarousel class="carousel" :settings="{ peek: 16, breakpoints: { 1023: { peek: 0, perView: 2 } } }">
          <template #prev="{go}">
            <SfArrow
              aria-label="prev"
              class="sf-arrow--left sf-arrow--long"
              @click="go('prev')"
            />
          </template>
          <template #next="{go}">
            <SfArrow
              aria-label="next"
              class="sf-arrow--right sf-arrow--long"
              @click="go('next')"
            />
          </template>
          <SfCarouselItem class="carousel__item" v-for="(product, i) in products" :key="i">
            <SfProductCard
              :title="product.title"
              :image="product.image"
              :regular-price="product.price.regular"
              :max-rating="product.rating.max"
              :score-rating="product.rating.score"
              :show-add-to-cart-button="true"
              :is-on-wishlist="product.isInWishlist"
              link="/"
              class="carousel__item__product"
              @click:wishlist="toggleWishlist(i)"
            />
          </SfCarouselItem>
        </SfCarousel>
    </LazyHydrate>

    <LazyHydrate when-visible>
      <SfCallToAction
        title="Subscribe to Newsletters"
        button-text="Subscribe"
        description="Be aware of upcoming sales and events. Receive gifts and special offers!"
        image="/homepage/newsletter.webp"
        class="call-to-action"
      />
    </LazyHydrate>

    <LazyHydrate when-visible>
      <InstagramFeed />
    </LazyHydrate>

    <LazyHydrate when-visible>
      <MobileStoreBanner/>
    </LazyHydrate>
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
  SfBannerGrid,
  SfHeading,
  SfArrow,
  SfButton
} from '@storefront-ui/vue';
import InstagramFeed from '~/components/InstagramFeed.vue';
import MobileStoreBanner from '~/components/MobileStoreBanner.vue';
import LazyHydrate from 'vue-lazy-hydration';

export default {
  name: 'Home',
  components: {
    InstagramFeed,
    SfHero,
    SfBanner,
    SfCallToAction,
    SfSection,
    SfCarousel,
    SfProductCard,
    SfImage,
    SfBannerGrid,
    SfHeading,
    SfArrow,
    SfButton,
    MobileStoreBanner,
    LazyHydrate
  },
  data() {
    return {
      heroes: [
        {
          title: 'Colorful summer dresses are already in store',
          subtitle: 'SUMMER COLLECTION 2019',
          buttonText: 'Learn more',
          background: '#eceff1',
          image: '/homepage/bannerH.webp',
          link: '/c/women/women-clothing-shirts'
        },
        {
          title: 'Colorful summer dresses are already in store',
          subtitle: 'SUMMER COLLECTION 2019',
          buttonText: 'Learn more',
          background: '#efebe9',
          image: '/homepage/bannerA.webp',
          link: '/c/women/women-shoes-sandals',
          className:
            'sf-hero-item--position-bg-top-left sf-hero-item--align-right'
        },
        {
          title: 'Colorful summer dresses are already in store',
          subtitle: 'SUMMER COLLECTION 2019',
          buttonText: 'Learn more',
          background: '#fce4ec',
          image: '/homepage/bannerB.webp',
          link: '/c/women/women-clothing-dresses'
        }
      ],
      banners: [
        {
          slot: 'banner-A',
          subtitle: 'Dresses',
          title: 'Cocktail & Party',
          description:
            'Find stunning women\'s cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses from all your favorite brands.',
          buttonText: 'Shop now',
          image: {
            mobile: '/homepage/bannerB.webp',
            desktop: '/homepage/bannerF.webp'
          },
          class: 'sf-banner--slim desktop-only',
          link: '/c/women/women-clothing-skirts'
        },
        {
          slot: 'banner-B',
          subtitle: 'Dresses',
          title: 'Linen Dresses',
          description:
            'Find stunning women\'s cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses from all your favorite brands.',
          buttonText: 'Shop now',
          image: '/homepage/bannerE.webp',
          class: 'sf-banner--slim banner-central desktop-only',
          link: '/c/women/women-clothing-dresses'
        },
        {
          slot: 'banner-C',
          subtitle: 'T-Shirts',
          title: 'The Office Life',
          image: '/homepage/bannerC.webp',
          class: 'sf-banner--slim banner__tshirt',
          link: '/c/women/women-clothing-shirts'
        },
        {
          slot: 'banner-D',
          subtitle: 'Summer Sandals',
          title: 'Eco Sandals',
          image: '/homepage/bannerG.webp',
          class: 'sf-banner--slim',
          link: '/c/women/women-shoes-sandals'
        }
      ],
      products: [
        {
          title: 'Cream Beach Bag',
          image: '/homepage/productA.webp',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isInWishlist: true
        },
        {
          title: 'Cream Beach Bag',
          image: '/homepage/productB.webp',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isInWishlist: false
        },
        {
          title: 'Cream Beach Bag',
          image: '/homepage/productC.webp',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isInWishlist: false
        },
        {
          title: 'Cream Beach Bag',
          image: '/homepage/productA.webp',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isInWishlist: false
        },
        {
          title: 'Cream Beach Bag',
          image: '/homepage/productB.webp',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isInWishlist: false
        },
        {
          title: 'Cream Beach Bag',
          image: '/homepage/productC.webp',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isInWishlist: false
        },
        {
          title: 'Cream Beach Bag',
          image: '/homepage/productA.webp',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isInWishlist: false
        },
        {
          title: 'Cream Beach Bag',
          image: '/homepage/productB.webp',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isInWishlist: false
        }
      ]
    };
  },
  methods: {
    toggleWishlist(index) {
      this.products[index].isInWishlist = !this.products[index].isInWishlist;
    }
  }
};
</script>

<style lang="scss" scoped>
#home {
  box-sizing: border-box;
  padding: 0 var(--spacer-sm);
  @include for-desktop {
    max-width: 1240px;
    padding: 0;
    margin: 0 auto;
  }
}

.hero {
  margin: var(--spacer-xl) auto var(--spacer-lg);
  --hero-item-background-position: center;
  ::v-deep .sf-link:hover {
    color: var(--c-white);
  }
  @include for-desktop {
    margin: var(--spacer-xl) auto var(--spacer-2xl);
  }
  .sf-hero-item {
    &:nth-child(even) {
      --hero-item-background-position: left;
      @include for-mobile {
        --hero-item-background-position: 30%;
       ::v-deep .sf-hero-item__wrapper {
         &.sf-button {
            align-items: flex-end;
            text-align: right;
            padding: var(--spacer-sm) var(--spacer-sm) var(--spacer-sm) var(--spacer-2xl);
         }
        }
        ::v-deep .sf-hero-item__subtitle,
        ::v-deep .sf-hero-item__title {
          width: 100%;
        }
      }
    }
  }
  ::v-deep .sf-hero__control {
    &--right, &--left {
      display: none;
    }
  }
}

.banner-grid {
  --banner-container-width: 50%;
  margin: var(--spacer-xl) 0;
  ::v-deep .sf-link:hover {
    color: var(--c-white);
  }
  @include for-desktop {
    margin: var(--spacer-2xl) 0;
    ::v-deep .sf-link {
      --button-width: auto;
    }
  }
}

.banner {
  &__tshirt {
    background-position: left;
  }
  &-central {
    @include for-desktop {
      --banner-container-flex: 0 0 70%;
    }
  }
}

.similar-products {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: var(--spacer-2xs);
  --heading-padding: 0;
  border-bottom: 1px var(--c-light) solid;
  @include for-desktop {
    border-bottom: 0;
    justify-content: center;
    padding-bottom: 0;
  }
}

.call-to-action {
  background-position: right;
  margin: var(--spacer-xs) 0;
  @include for-desktop {
    margin: var(--spacer-xl) 0 var(--spacer-2xl) 0;
  }
}

.carousel {
    margin: 0 calc(var(--spacer-sm) * -1) 0 0;
  @include for-desktop {
    margin: 0;
  }
  &__item {
    margin: 1.375rem 0 2.5rem 0;
    @include for-desktop {
      margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
    }
    &__product {
      --product-card-add-button-transform: translate3d(0, 30%, 0);
    }
  }
  ::v-deep .sf-arrow--long .sf-arrow--right {
    --arrow-icon-transform: rotate(180deg);
     -webkit-transform-origin: center;
     transform-origin: center;
  }
}

</style>
