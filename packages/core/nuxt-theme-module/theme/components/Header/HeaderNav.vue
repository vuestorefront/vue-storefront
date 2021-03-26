<template>
  <SfHeaderNavigation>
    <SfHeaderNavigationItem
      v-for="category in categories"
      :key="category.name"
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
        v-if="category && category.children && category.children.length"
      >
        <SfMegaMenuColumn
          v-for="subCategory in category.children"
          :key="subCategory.id"
          :title="subCategory.name"
        >
          <SfList>
            <SfListItem
              v-for="subCategoryChild in subCategory.children"
              :key="subCategoryChild.name"
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

      currentCatSlug.value = slug;
      const { childCount } = categories.value.find(category => category.slug === currentCatSlug.value);
      emit('setOverlay', Boolean(childCount));
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

<style lang='scss'>
.sf-mega-menu__bar.sf-bar {
  display: flex;
  @include for-desktop {
    display:  none;
  }
}
</style>
