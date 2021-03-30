<template>
  <SfMegaMenu
    visible
    @close="toggleMobileMenu"
  >
    <SfMegaMenuColumn
      v-for="category in categories"
      :key="category.name"
      :title="category.name"
    >
      <template #title="{ title, changeActive }">
        <SfMenuItem
          :label="title"
          class="sf-mega-menu-column__header"
          @click="changeActive(title); handleClickCategory(category.slug)"
        />
      </template>
      <SfList>
        <SfListItem
          v-for="subCategoryChild in category.children"
          :key="subCategoryChild.name"
        >
          <SfMenuItem
            :label="subCategoryChild.name"
            :link="localePath(`/c/${subCategoryChild.slug}`)"
            @click.native="toggleMobileMenu()"
          >
            <SfLink>
              {{ subCategoryChild.name }}
            </SfLink>
          </SfMenuItem>
        </SfListItem>
      </SfList>
      <NewCatBanners v-if="hasBanners()" />
    </SfMegaMenuColumn>
  </SfMegaMenu>
</template>

<script>
import { SfMegaMenu, SfMenuItem, SfList } from '@storefront-ui/vue';
import { useCategory } from '<%= options.generate.replace.composables %>';
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
  setup () {
    const { categories, search } = useCategory('menu-categories');
    const currentCatSlug = ref('');
    const categoriesWithBanners = ref(['new']);
    const { toggleMobileMenu } = useUiState();

    const handleClickCategory = (slug) => {
      currentCatSlug.value = slug;
    };

    const hasBanners = () => categoriesWithBanners.value.find(category => category === currentCatSlug.value);

    onSSR(async () => {
      await search({});
    });

    return {
      categories,
      currentCatSlug,
      handleClickCategory,
      toggleMobileMenu,
      hasBanners
    };
  }
};
</script>
