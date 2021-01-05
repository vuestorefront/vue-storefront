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
        </SfMegaMenuColumn>
        <NewCatBanners v-if="currentCatSlug === 'new'" />
      </SfMegaMenu>
    </SfHeaderNavigationItem>
  </SfHeaderNavigation>
</template>

<script>
import { SfMegaMenu, SfMenuItem, SfList } from '@storefront-ui/vue';
import { useCategory } from '<%= options.generate.replace.composables %>';
import { onSSR } from '@vue-storefront/core';
import { ref } from '@vue/composition-api';

export default {
  name: 'HeaderNav',
  components: {
    SfMegaMenu,
    SfMenuItem,
    SfList,
    NewCatBanners: () => import('./NewCatBanners')
  },
  setup (_, { emit }) {
    const { categories, search } = useCategory('menu-categories');
    const currentCatSlug = ref('');

    const handleMouseEnter = (slug) => {
      if (currentCatSlug.value) return;

      emit('setOverlay', true);
      currentCatSlug.value = slug;
    };

    const handleMouseLeave = () => {
      emit('setOverlay', false);
      currentCatSlug.value = '';
    };

    onSSR(async () => {
      await search({});
    });

    return {
      categories,
      currentCatSlug,
      handleMouseEnter,
      handleMouseLeave
    };
  }
};
</script>
