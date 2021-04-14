<template>
  <div>
    <SfHeaderNavigation v-if="!isMobile">
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
          v-if="activeCategory && activeCategory[0] && activeCategory[0].children"
        >
          <SfMegaMenuColumn
            v-for="subCategory in activeCategory[0].children"
            :key="subCategory.id"
            :title="subCategory.name"
          >
            <SfLoader :loading="subCategoriesLoading">
              <SfList v-if="!subCategoriesLoading">
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
          <NewCatBanners v-if="!subCategoriesLoading && hasBanners" />
        </SfMegaMenu>
      </SfHeaderNavigationItem>
    </SfHeaderNavigation>
    <transition name="sf-fade" mode="out-in">
      <SfMegaMenu
        v-if="isMobile && isMobileMenuOpen"
        visible
        @close="toggleMobileMenu"
        class="mobile-menu"
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
              @click="changeActive(title); handleClickCategoryLvl(category.slug, 1)"
            />
          </template>
          <SfLoader :loading="subCategoriesLoading">
            <SfList v-if="!subCategoriesLoading && activeCategory && activeCategory[0] && activeCategory[0].children">
              <SfListItem
                v-for="subCategory in activeCategory[0].children"
                :key="subCategory.id"
              >
                <SfMenuItem
                  :label="subCategory.name"
                  @click.native="handleClickCategoryLvl(subCategory.slug, 2)"
                >
                  <SfLink>
                    {{ subCategory.name }}
                  </SfLink>
                </SfMenuItem>
              </SfListItem>
            </SfList>
          </SfLoader>
          <NewCatBanners v-if="!subCategoriesLoading && hasBanners" />
        </SfMegaMenuColumn>
      </SfMegaMenu>
    </transition>
  </div>
</template>

<script>
import { SfMegaMenu, SfMenuItem, SfList, SfBanner, SfLoader } from '@storefront-ui/vue';
import { useCategory } from '@vue-storefront/commercetools';
import { useUiState } from '~/composables';
import { onSSR } from '@vue-storefront/core';
import { ref, computed } from '@vue/composition-api';
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
  props: {
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  setup (_, { emit, root }) {
    const { categories, search } = useCategory('menu-categories');
    const { categories: subCategories, search: subCategoriesSearch, loading: subCategoriesLoading } = useCategory('menu-subCategories');
    const { toggleMobileMenu, isMobileMenuOpen } = useUiState();
    const currentCatSlug = ref('');
    const activeCategory = ref(null);
    const fetchedSubCategories = ref({});
    const categoriesWithBanners = ref([
      { slug: 'new' }
    ]);

    const getCurrentCat = (source, slug) => source.find(src => src.slug === slug);

    const fetchSubCategories = async slug => {
      await subCategoriesSearch({ slug });
      fetchedSubCategories.value = {
        ...fetchedSubCategories.value,
        [slug]: subCategories.value
      };
    };

    const handleMouseEnter = debounce(async slug => {
      currentCatSlug.value = slug;
      const { childCount } = getCurrentCat(categories.value, slug);
      emit('setOverlay', Boolean(childCount));

      if (!fetchedSubCategories.value[slug] && Boolean(childCount)) {
        await fetchSubCategories(slug);
      }
      activeCategory.value = fetchedSubCategories.value[slug];
    }, 200);

    const handleMouseLeave = debounce(() => {
      emit('setOverlay', false);
      currentCatSlug.value = '';
    }, 200);

    const getSubCategories = async (slug, childCount) => {
      if (!childCount) {
        root.$router.push(`/c/${slug}`);
        toggleMobileMenu();
      }
      if (!fetchedSubCategories.value[slug]) {
        await fetchSubCategories(slug);
      }
      activeCategory.value = fetchedSubCategories.value[slug];
    };

    const handleClickCategoryLvl = async (slug, lvl) => {
      currentCatSlug.value = slug;
      let childCount;
      const hasChildren = activeCategory.value && activeCategory.value[0] && activeCategory.value[0].children;

      if (lvl === 1) childCount = getCurrentCat(categories.value, slug).childCount;
      else if (lvl === 2 && hasChildren) childCount = getCurrentCat(activeCategory.value[0].children, slug).childCount;

      await getSubCategories(slug, childCount);
    };

    const hasBanners = computed(() => getCurrentCat(categoriesWithBanners.value, currentCatSlug.value));

    onSSR(async () => {
      await search({ customQuery: { categories: 'megamenu-categories-query' } });
    });

    return {
      categories,
      activeCategory,
      subCategories,
      currentCatSlug,
      subCategoriesLoading,
      handleMouseEnter,
      handleMouseLeave,
      handleClickCategoryLvl,
      hasBanners,
      toggleMobileMenu,
      isMobileMenuOpen
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
.sf-mega-menu.mobile-menu {
  position: absolute;
  overflow-y: auto;
  top: 0;
  z-index: 1;
  width: 100%;
  --mega-menu-aside-menu-height: calc(100vh - var(--bottom-navigation-height) - var(--bar-height));
}
</style>
