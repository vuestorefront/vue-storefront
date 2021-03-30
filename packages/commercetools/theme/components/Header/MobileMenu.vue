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
      <div v-if="!subCategoriesLoading">
        <transition name="sf-fade" mode="out-in">
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
        </transition>
      </div>
      <svg
        v-else
        role="img"
        width="38"
        height="38"
        viewBox="0 0 38 38"
        xmlns="http://www.w3.org/2000/svg"
        class="sf-loader__spinner"
      >
        <g fill="none" fill-rule="evenodd">
          <g transform="translate(1 1)" stroke-width="2">
            <circle stroke-opacity=".5" cx="18" cy="18" r="18" />
            <path d="M36 18c0-9.94-8.06-18-18-18">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="1s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        </g>
      </svg>
      <NewCatBanners v-if="hasBanners()" />
    </SfMegaMenuColumn>
  </SfMegaMenu>
</template>

<script>
import { SfMegaMenu, SfMenuItem, SfList } from '@storefront-ui/vue';
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
    NewCatBanners: () => import('./NewCatBanners')
  },
  setup (_, { root }) {
    const { categories, search } = useCategory('menu-categories');
    const { categories: subCategories, search: subCategoriesSearch, loading: subCategoriesLoading } = useCategory('menu-subCategories');
    const currentCatSlug = ref('');
    const activeCategory = ref(null);
    const fetchedCategories = ref({});
    const categoriesWithBanners = ref(['new']);
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
      currentCatSlug.value = slug;
      if (activeCategory.value && activeCategory.value[0] && activeCategory.value[0].children) {
        const { childCount } = activeCategory.value[0].children.find(child => child.slug === currentCatSlug.value);

        await getSubCategories(slug, childCount);
      }
    };

    const hasBanners = () => categoriesWithBanners.value.find(category => category === currentCatSlug.value);

    onSSR(async () => {
      await search({ customQuery: { categories: 'megamenu-categories-query' } });
    });

    return {
      categories,
      activeCategory,
      currentCatSlug,
      handleClickCategory,
      handleClickSubCategory,
      toggleMobileMenu,
      subCategoriesLoading,
      hasBanners
    };
  }
};
</script>

<style lang='scss' scoped>
.sf-loader__spinner {
  margin-top: 3.75rem;
  width: 100%;
}
</style>
