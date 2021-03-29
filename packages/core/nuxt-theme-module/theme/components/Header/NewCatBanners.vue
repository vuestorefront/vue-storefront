<template>
  <div class="sb-mega-menu__banners">
    <SfBanner
      v-for="(banner, key) in banners"
      :key="key"
      :title="banner.title"
      :subtitle="banner.subtitle"
      :image="banner.pictures"
      class="sb-mega-menu__banner"
    />
  </div>
</template>

<script>
import { SfBanner } from '@storefront-ui/vue';

export default {
  name: 'NewCatBanners',
  components: {
    SfBanner
  },
  data() {
    return {
      banners: [
        {
          title: 'THE OFFICE LIFE',
          subtitle: 'T-shirts',
          pictures: {
            mobile: '/megamenu/bannerA.webp',
            desktop: '/megamenu/bannerA.webp'
          }
        },
        {
          title: 'ECO SANDALS',
          subtitle: 'T-shirts',
          pictures: {
            mobile: '/megamenu/bannerB.webp',
            desktop: '/megamenu/bannerB.webp'
          }
        }
      ]
    };
  }
};
</script>

<style scoped lang='scss'>
.sb-mega-menu {
  &__featured {
    flex: 0 0 43.125rem;
  }
  &__banners {
    display: flex;
    flex-direction: column;
    margin: var(--spacer-base) var(--spacer-base) var(--bottom-navigation-height, 4.85rem) var(--spacer-base);
    @include for-desktop {
      flex-direction: row;
      padding: 0;
    }
  }
  &__banner {
    &:first-child{
      margin: 0 0 var(--spacer-sm) 0;
      @include for-desktop {
        margin: 0 var(--spacer-sm) 0 0;
      }
    }
  }
}
</style>
