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
        :visible="currentCatSlug === category.slug"
        :title="category.name"
        @close="currentCatSlug = ''"
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
        <NewCatBanners v-if="currentCatSlug === 'new'" />
      </SfMegaMenu>
    </SfHeaderNavigationItem>
  </SfHeaderNavigation>
</template>

<script>
import { SfMegaMenu, SfMenuItem, SfList, SfBanner, SfLoader } from '@storefront-ui/vue';
import { useCategory } from '@vue-storefront/commercetools';
import { onSSR } from '@vue-storefront/core';
import { computed, ref } from '@vue/composition-api';
import { rootCategoriesQuery } from '../../queries/topCategories';
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

    const handleMouseEnter = debounce((slug) => {
      if (currentCatSlug.value) return;

      currentCatSlug.value = slug;
      const catChild = computed(() => categories.value.find(category => category.slug === currentCatSlug.value));
      emit('setOverlay', Boolean(catChild.value.childCount));
      subCategoriesSearch({ slug });
    }, 200);

    const handleMouseLeave = debounce(() => {
      emit('setOverlay', false);
      currentCatSlug.value = '';
    }, 200);

    onSSR(async () => {
      await search({ customQuery: rootCategoriesQuery });
    });

    return {
      categories,
      subCategories,
      currentCatSlug,
      subCategoriesLoading,
      handleMouseEnter,
      handleMouseLeave
    };
  }
};
</script>
