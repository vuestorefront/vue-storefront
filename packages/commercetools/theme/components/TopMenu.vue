<template>
  <SfHeaderNavigation>
    <SfHeaderNavigationItem
      v-for="(category, index) in categories"
      :key="index"
      :label="category.name"
      @mouseenter="() => handleMouseEnter(category.slug)"
      @mouseleave="() => handleMouseLeave()"
      @click="handleMouseLeave()"
      :link="localePath(`/c/${category.slug}`)"
    >
      <SfMegaMenu
        :is-absolute="true"
        :visible="categorySlug === category.slug"
        :title="category.name"
        @close="categorySlug = ''"
        v-if="category && category.children.length"
      >
        <SfMegaMenuColumn
          v-for="(subCategory, subIndex) in category.children"
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
          v-if="isCategoryWithBanners"
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

<script>
import { SfMegaMenu, SfMenuItem, SfList, SfBanner, SfLoader } from '@storefront-ui/vue';
import { useCategory } from '@vue-storefront/commercetools';
import { onSSR } from '@vue-storefront/core';
import { computed, ref } from '@vue/composition-api';
import { menuCatQuery } from '../queries/topCategories';
import debounce from 'lodash.debounce';

export default {
  name: 'TopMenu',
  components: {
    SfMegaMenu,
    SfMenuItem,
    SfList,
    SfBanner,
    SfLoader
  },
  setup (_, { emit }) {
    const { categories, search } = useCategory('menu-categories');
    const { categories: subCategories, search: subCategoriesSearch, loading: subCategoriesLoading } = useCategory('menu-subCategories');
    const categorySlug = ref('');
    const categoriesWithBanners = ref(['new']);

    const isCategoryWithBanners = computed(() => categoriesWithBanners.value.includes(categorySlug.value));

    const handleMouseEnter = debounce((slug) => {
      if (categorySlug.value) return;

      emit('setOverlay', true);
      categorySlug.value = slug;
      subCategoriesSearch({ slug });
    }, 200);

    const handleMouseLeave = debounce(() => {
      emit('setOverlay', false);
      categorySlug.value = '';
    }, 200);

    onSSR(async () => {
      await search({ customQuery: menuCatQuery });
    });

    return {
      categories,
      subCategories,
      categorySlug,
      subCategoriesLoading,
      categoriesWithBanners,
      isCategoryWithBanners,
      handleMouseEnter,
      handleMouseLeave
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

<style scoped lang='scss'>
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
