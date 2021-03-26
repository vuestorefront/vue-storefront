<template>
  <SfMegaMenu
    visible
    @close="toggleMobileMenu"
  >
    <SfMegaMenuColumn
      v-for="category in categories"
      :key="category.id"
      :title="category.name"
    >
      <template #title="{ title, changeActive }">
        <SfMenuItem
          :label="title"
          class="sf-mega-menu-column__header"
          @click="changeActive(title); handleClickCategory(category.slug)"
        />
      </template>
      <SfList v-if="activeCategory && activeCategory[0] && activeCategory[0].children">
        <SfListItem
          v-for="subCategory in activeCategory[0].children"
          :key="subCategory.id"
        >
          <SfMenuItem
            :label="subCategory.name"
            @click.native="handleClickSubCategory(subCategory.slug)"
          >
            <SfLink>
              {{ subCategory.name }}
            </SfLink>
          </SfMenuItem>
        </SfListItem>
      </SfList>
      <NewCatBanners v-if="currentCatSlug === 'new'" />
    </SfMegaMenuColumn>
  </SfMegaMenu>
</template>

<script>
import { SfMegaMenu, SfMenuItem, SfList, SfLoader } from '@storefront-ui/vue';
import { useCategory } from '@vue-storefront/commercetools';
import { useUiState } from '~/composables';
import { onSSR } from '@vue-storefront/core';
import { ref } from '@vue/composition-api';

export default {
  name: 'MobileMenu',
  components: {
    SfMegaMenu,
    SfMenuItem,
    SfList,
    SfLoader,
    NewCatBanners: () => import('./NewCatBanners')
  },
  setup (_, { root }) {
    const { categories, search } = useCategory('menu-categories');
    const { categories: subCategories, search: subCategoriesSearch, loading: subCategoriesLoading } = useCategory('menu-subCategories');
    const currentCatSlug = ref('');
    const deepCatSlug = ref('');
    const activeCategory = ref(null);
    const fetchedCategories = ref({});
    const { toggleMobileMenu } = useUiState();

    const getSubCategories = async (slug, childCount) => {
      if (!childCount) {
        root.$router.push(`/c/${slug}`);
        toggleMobileMenu();
      }
      if (!fetchedCategories.value[slug]) {
        await subCategoriesSearch({ slug });
        fetchedCategories.value = {
          ...fetchedCategories.value,
          [slug]: subCategories.value
        };
      }
      activeCategory.value = fetchedCategories.value[slug];
    };

    const handleClickCategory = async slug => {
      currentCatSlug.value = slug;
      const { childCount } = categories.value.find(category => category.slug === currentCatSlug.value);

      await getSubCategories(slug, childCount);
    };

    const handleClickSubCategory = async slug => {
      deepCatSlug.value = slug;
      if (activeCategory.value && activeCategory.value[0] && activeCategory.value[0].children) {
        const { childCount } = activeCategory.value[0].children.find(child => child.slug === deepCatSlug.value);

        await getSubCategories(slug, childCount);
      }
    };

    onSSR(async () => {
      await search({ customQuery: { categories: 'root-categories-query' } });
    });

    return {
      categories,
      activeCategory,
      currentCatSlug,
      handleClickCategory,
      handleClickSubCategory,
      toggleMobileMenu,
      subCategoriesLoading
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
