<template>
  <div>
    <SfOverlay :visible="!!hovered" />
    <SfHeader
      data-cy="app-header"
      @click:cart="toggleCartSidebar"
      @click:wishlist="toggleWishlistSidebar"
      @click:account="handleAccountClick"
      @enter:search="changeSearchTerm"
      @change:search="p => term = p"
      :searchValue="term"
      :cartItemsQty="cartTotalItems"
      :accountIcon="accountIcon"
      class="sf-header--has-mobile-search"
    >
      <!-- TODO: add mobile view buttons after SFUI team PR -->
      <template #logo>
        <nuxt-link data-cy="app-header-url_logo" :to="localePath('/')" class="sf-header__logo">
          <SfImage src="/icons/logo.svg" alt="Vue Storefront Next" class="sf-header__logo-image"/>
        </nuxt-link>
      </template>
      <template #navigation>
        <SfHeaderNavigation>
          <SfHeaderNavigationItem
            v-for="(category, index) in categories"
            :key="index"
            :label="category.name"
            @mouseenter="hovered = category.slug; fetchSubCategory()"
            @mouseleave="hovered = ''; fetchSubCategory()"
            @click="hovered = ''"
            :link="localePath(`/c/${category.slug}`)"
          >
            <SfMegaMenu
              :is-absolute="true"
              :visible="hovered === category.slug"
              :title="category.name"
              @close="hovered = ''"
              v-if="category.childCount"
            >
              <SfMegaMenuColumn
                v-for="(subCategory, subIndex) in subCategories && subCategories[0] && subCategories[0].children"
                :key="subIndex"
                :title="subCategory.name"
              >
                <SfLoader :loading="subCategoriesLoading">
                  <SfList>
                    <SfListItem
                      v-for="(subCategoryChild, childIndex) in subCategory.children"
                      :key="childIndex"
                    >
                      <SfMenuItem :label="subCategoryChild.name" :link="localePath(`/c/${subCategoryChild.slug}`)">
                        <SfLink>
                          {{ subCategoryChild.name }}
                        </SfLink>
                      </SfMenuItem>
                    </SfListItem>
                  </SfList>
                </SfLoader>
              </SfMegaMenuColumn>
              <SfMegaMenuColumn
                v-if="isCategoryWithBanners && !subCategoriesLoading"
                title="Featured"
                class="sf-mega-menu-column--pined-content-on-mobile sf-mega-menu-column--hide-header-on-mobile sb-mega-menu__featured"
              >
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
              </SfMegaMenuColumn>
            </SfMegaMenu>
          </SfHeaderNavigationItem>
        </SfHeaderNavigation>
      </template>
      <template #aside>
        <LocaleSelector class="smartphone-only" />
      </template>
    </SfHeader>
  </div>
</template>

<script>
import { SfHeader, SfImage, SfMegaMenu, SfList, SfLink, SfMenuItem, SfBanner, SfOverlay, SfLoader } from '@storefront-ui/vue';
import { useUiState } from '~/composables';
import { useCart, useWishlist, useUser, useCategory, cartGetters } from '@vue-storefront/commercetools';
import { computed, ref } from '@vue/composition-api';
import { onSSR } from '@vue-storefront/core';
import { useUiHelpers } from '~/composables';
import LocaleSelector from './LocaleSelector';
import { menuCatQuery } from '../queries/topCategories';
import debounce from 'lodash.debounce';

export default {
  components: {
    SfHeader,
    SfImage,
    SfMegaMenu,
    SfList,
    SfLink,
    SfLoader,
    SfBanner,
    SfMenuItem,
    SfOverlay,
    LocaleSelector
  },
  setup(props, { root }) {
    const { toggleCartSidebar, toggleWishlistSidebar, toggleLoginModal } = useUiState();
    const { changeSearchTerm, getFacetsFromURL } = useUiHelpers();
    const { isAuthenticated, load } = useUser();
    const { cart, loadCart } = useCart();
    const { loadWishlist } = useWishlist();
    const { categories, search } = useCategory('menu-categories');
    const { categories: subCategories, search: subCategoriesSearch, loading: subCategoriesLoading } = useCategory('menu-subCategories');
    const term = ref(getFacetsFromURL().term);
    const hovered = ref('');
    const categoriesWithBanners = ref(['new']);

    const cartTotalItems = computed(() => {
      const count = cartGetters.getTotalItems(cart.value);
      return count ? count.toString() : null;
    });

    const accountIcon = computed(() => isAuthenticated.value ? 'profile_fill' : 'profile');

    const isCategoryWithBanners = computed(() => categoriesWithBanners.value.includes(hovered.value));

    // TODO: https://github.com/DivanteLtd/vue-storefront/issues/4927
    const handleAccountClick = async () => {
      if (isAuthenticated.value) {
        return root.$router.push('/my-account');
      }

      toggleLoginModal();
    };

    const fetchSubCategory = debounce(() => {
      if (hovered.value) subCategoriesSearch({ slug: hovered.value });
    }, 200);

    onSSR(async () => {
      await load();
      await loadCart();
      await loadWishlist();
      await search({}, menuCatQuery);
    });

    return {
      accountIcon,
      cartTotalItems,
      handleAccountClick,
      toggleCartSidebar,
      toggleWishlistSidebar,
      changeSearchTerm,
      term,
      hovered,
      categoriesWithBanners,
      isCategoryWithBanners,
      categories,
      subCategories,
      fetchSubCategory,
      subCategoriesLoading
    };
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

<style lang="scss" scoped>
.sf-header {
  --header-padding:  var(--spacer-sm);
  @include for-desktop {
    --header-padding: 0;
    z-index: var(--header-wrapper-z-index, 1);
  }
  &__logo-image {
    height: 100%;
  }
}

.nav-item {
  --header-navigation-item-margin: 0 var(--spacer-base);
}

.sb-mega-menu {
  &__featured {
    flex: 0 0 43.125rem;
  }
  &__banners {
    display: flex;
    flex-direction: column;
    padding: var(--spacer-base);
    @include for-desktop {
      flex-direction: row;
      padding: 0;
    }
  }
  &__banner{
    &:first-child{
      margin: 0 0 var(--spacer-sm) 0;
      @include for-desktop {
        margin: 0 var(--spacer-sm) 0 0;
      }
    }
  }
}
</style>
