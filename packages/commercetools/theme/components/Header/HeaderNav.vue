<template>
  <SfHeaderNavigation>
    <SfHeaderNavigationItem
      v-for="category in categories"
      :key="category.id"
      :label="category.name"
      @mouseenter="() => handleMouseEnter(category.slug)"
      @mouseleave="() => handleMouseLeave()"
      @click="handleMouseLeave()"
      :link="localePath(`/c/${category.slug}`)"
    >
      <SfMegaMenu
        is-absolute
        :visible="currentCatSlug === category.slug"
        :title="category.name"
        @close="currentCatSlug = ''"
        v-if="activeSubCategory && activeSubCategory[0] && activeSubCategory[0].children"
      >
        <SfMegaMenuColumn
          v-for="subCategory in activeSubCategory[0].children"
          :key="subCategory.id"
          :title="subCategory.name"
        >
          <SfLoader :loading="subCategoriesLoading">
            <SfList>
              <SfListItem
                v-for="subCategoryChild in subCategory.children"
                :key="subCategoryChild.id"
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
        <NewCatBanners v-if="!subCategoriesLoading && hasBanners()" />
      </SfMegaMenu>
    </SfHeaderNavigationItem>
  </SfHeaderNavigation>
</template>

<script>
import { SfMegaMenu, SfMenuItem, SfList, SfBanner, SfLoader } from '@storefront-ui/vue';
import { useCategory } from '@vue-storefront/commercetools';
import { onSSR } from '@vue-storefront/core';
import { reactive, ref } from '@vue/composition-api';
import debounce from 'lodash.debounce';

export default {
  name: 'HeaderNav',
  components: {
    SfMegaMenu,
    SfMenuItem,
    SfList,
    SfBanner,
    SfLoader,
    NewCatBanners: () => import('./NewCatBanners')
  },
  setup (_, { emit }) {
    const { categories, search } = useCategory('menu-categories');
    const { categories: subCategories, search: subCategoriesSearch, loading: subCategoriesLoading } = useCategory('menu-subCategories');
    const currentCatSlug = ref('');
    const activeSubCategory = ref(null);
    const fetchedSubCategories = reactive({});
    const categoriesWithBanners = ref(['new']);

    const handleMouseEnter = debounce(async slug => {
      currentCatSlug.value = slug;
      const { childCount } = categories.value.find(category => category.slug === currentCatSlug.value);
      emit('setOverlay', Boolean(childCount));

      if (!fetchedSubCategories[slug] && Boolean(childCount)) {
        await subCategoriesSearch({ slug });
        fetchedSubCategories[slug] = subCategories.value;
      }
      activeSubCategory.value = fetchedSubCategories[currentCatSlug.value];
    }, 200);

    const handleMouseLeave = debounce(() => {
      emit('setOverlay', false);
      currentCatSlug.value = '';
    }, 200);

    const hasBanners = () => categoriesWithBanners.value.find(category => category === currentCatSlug.value);

    onSSR(async () => {
      await search({ customQuery: { categories: 'megamenu-categories-query' } });
    });

    return {
      categories,
      fetchedSubCategories,
      activeSubCategory,
      subCategories,
      currentCatSlug,
      subCategoriesLoading,
      handleMouseEnter,
      handleMouseLeave,
      hasBanners
    };
  }
};
</script>

<style lang='scss'>
.sf-mega-menu__bar.sf-bar {
  display: flex;
  @include for-desktop {
    display:  none;
  }
}
</style>
