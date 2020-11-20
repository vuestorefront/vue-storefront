<template>
  <div id="home">
    <SfHero class="section">
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
    <SfBannerGrid :banner-grid="1" class="section banner-grid">
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
    <SfCallToAction
      title="Subscribe to Newsletters"
      button-text="Subscribe"
      description="Be aware of upcoming sales and events. Receive gifts and special offers!"
      image="/homepage/newsletter.webp"
      class="call-to-action"
    />
    <SfSection title-heading="Best Sellers" class="section">
      <SfCarousel class="carousel" :settings="{ peek: 16, breakpoints: { 1023: { peek: 0, perView: 2 } } }">
        <SfCarouselItem class="carousel__item" v-for="(product, i) in products" :key="i">
          <SfProductCard
            data-cy="home-url_product"
            :title="product.title"
            :image="product.image"
            :regular-price="product.price.regular"
            :max-rating="product.rating.max"
            :score-rating="product.rating.score"
            :show-add-to-cart-button="true"
            :is-on-wishlist="product.isOnWishlist"
            link="/"
            class="carousel__item__product"
            @click:wishlist="toggleWishlist(i)"
          />
        </SfCarouselItem>
      </SfCarousel>
    </SfSection>
    <InstagramFeed />
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
} from '@storefront-ui/vue';
import InstagramFeed from '~/components/InstagramFeed.vue';

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
    SfBannerGrid
  },
  data() {
    return {
      heroes: [
        {
          title: 'Colorful summer dresses are already in store',
          subtitle: 'SUMMER COLLECTION 2019',
          buttonText: 'Learn more',
          background: '#eceff1',
          image: '/homepage/bannerH.webp'
        },
        {
          title: 'Colorful summer dresses are already in store',
          subtitle: 'SUMMER COLLECTION 2019',
          buttonText: 'Learn more',
          background: '#efebe9',
          image: '/homepage/bannerA.webp',
          className:
            'sf-hero-item--position-bg-top-left sf-hero-item--align-right'
        },
        {
          title: 'Colorful summer dresses are already in store',
          subtitle: 'SUMMER COLLECTION 2019',
          buttonText: 'Learn more',
          background: '#fce4ec',
          image: '/homepage/bannerB.webp'
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
          class: 'sf-banner--slim'
        },
        {
          slot: 'banner-B',
          subtitle: 'Dresses',
          title: 'Linen Dresses',
          description:
            'Find stunning women\'s cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses from all your favorite brands.',
          buttonText: 'Shop now',
          image: '/homepage/bannerE.webp',
          class: 'sf-banner--slim banner-central'
        },
        {
          slot: 'banner-C',
          subtitle: 'T-Shirts',
          title: 'The Office Life',
          image: '/homepage/bannerC.webp',
          class: 'sf-banner--slim banner__tshirt'
        },
        {
          slot: 'banner-D',
          subtitle: 'Summer Sandals',
          title: 'Eco Sandals',
          image: '/homepage/bannerG.webp',
          class: 'sf-banner--slim'
        }
      ],
      products: [
        {
          title: 'Cream Beach Bag',
          image: '/homepage/productA.webp',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isOnWishlist: true
        },
        {
          title: 'Cream Beach Bag',
          image: '/homepage/productB.webp',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isOnWishlist: false
        },
        {
          title: 'Cream Beach Bag',
          image: '/homepage/productC.webp',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isOnWishlist: false
        },
        {
          title: 'Cream Beach Bag',
          image: '/homepage/productA.webp',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isOnWishlist: false
        },
        {
          title: 'Cream Beach Bag',
          image: '/homepage/productB.webp',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isOnWishlist: false
        },
        {
          title: 'Cream Beach Bag',
          image: '/homepage/productC.webp',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isOnWishlist: false
        },
        {
          title: 'Cream Beach Bag',
          image: '/homepage/productA.webp',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isOnWishlist: false
        },
        {
          title: 'Cream Beach Bag',
          image: '/homepage/productB.webp',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isOnWishlist: false
        }
      ]
    };
  },
  methods: {
    toggleWishlist(index) {
      this.products[index].isOnWishlist = !this.products[index].isOnWishlist;
    }
  }
};
</script>

<style lang="scss" scoped>
#home {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: 0 auto;
  }
}
.section {
  padding: 0 var(--spacer-sm);
  @include for-desktop {
    padding: 0;
  }
}

.sf-hero-item {
  background-position: center;
}

.banner-grid {
  --banner-container-width: 50%;
  margin: var(--spacer-xl) 0;
  @include for-desktop {
    margin: var(--spacer-2xl) 0;
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

.call-to-action {
  margin: var(--spacer-xl) 0;
  @include for-desktop {
    margin: var(--spacer-2xl) 0 0 0;
  }
}

.carousel {
    margin: 0 calc(var(--spacer-sm) * -1) 0 0;
  @include for-desktop {
    margin: 0;
  }
  &__item {
    margin: 1.9375rem 0 2.4375rem 0;
    &__product {
      --product-card-add-button-transform: translate3d(0, 30%, 0);
    }
  }
}

.images-grid {
  max-width: 60rem;
  margin: 0 auto;
  &__row {
    display: flex;
    & + & {
      margin: calc(var(--spacer-xl) / 2) 0 0 0;
      @include for-desktop {
        margin: var(--spacer-xl) 0 0 0;
      }
    }
  }
  &__col {
    flex: 1;
    margin: 0;
    & + & {
      margin: 0 0 0 calc(var(--spacer-xl) / 2);
      @include for-desktop {
        margin: 0 0 0 var(--spacer-xl);
      }
    }
  }
}
</style>
