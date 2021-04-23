<template>
  <div>
    <SfHeaderNavigation v-if="!isMobile">
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
                <SfMenuItem :label="subCategoryChild.name" :link="localePath(`/c/${currentCatSlug}/${subCategoryChild.slug}`)">
                  <SfLink>
                    {{ subCategoryChild.name }}
                  </SfLink>
                </SfMenuItem>
              </SfListItem>
            </SfList>
          </SfMegaMenuColumn>
          <NewCatBanners v-if="hasBanners" />
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
          <NewCatBanners v-if="hasBanners" />
        </SfMegaMenuColumn>
      </SfMegaMenu>
    </transition>
  </div>
</template>

<script>
import { SfMegaMenu, SfMenuItem, SfList } from '@storefront-ui/vue';
import { useCategory } from '<%= options.generate.replace.composables %>';
import { useUiState } from '~/composables';
import { onSSR } from '@vue-storefront/core';
import { ref, computed } from '@vue/composition-api';

export default {
  name: 'HeaderNav',
  components: {
    SfMegaMenu,
    SfMenuItem,
    SfList,
    NewCatBanners: () => import('./NewCatBanners')
  },
  props: {
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  setup (_, { emit }) {
    const { categories, search } = useCategory('menu-categories');
    const { toggleMobileMenu, isMobileMenuOpen } = useUiState();
    const currentCatSlug = ref('');
    const categoriesWithBanners = ref([
      { slug: 'new' }
    ]);

    const getCurrentCat = (source, slug) => source.find(src => src.slug === slug);

    const handleMouseEnter = (slug) => {
      if (currentCatSlug.value) return;

      currentCatSlug.value = slug;
      const { childCount } = getCurrentCat(categories.value, slug);
      emit('setOverlay', Boolean(childCount));
    };

    const handleMouseLeave = () => {
      emit('setOverlay', false);
      currentCatSlug.value = '';
    };

    const handleClickCategory = (slug) => {
      currentCatSlug.value = slug;
    };

    const hasBanners = computed(() => getCurrentCat(categoriesWithBanners.value, currentCatSlug.value));

    onSSR(async () => {
      await search({});
    });

    return {
      categories,
      currentCatSlug,
      handleMouseEnter,
      handleMouseLeave,
      handleClickCategory,
      toggleMobileMenu,
      isMobileMenuOpen,
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
.mobile-menu {
  position: absolute;
  overflow-y: auto;
  top: 0;
  z-index: 1;
  width: 100%;
  --mega-menu-aside-menu-height: calc(100vh - var(--bottom-navigation-height) - var(--bar-height));
  &-fade {
    &-enter-active,
    &-leave-active {
      transition: opacity 0.25s linear;
    }
    &-enter,
    &-leave,
    &-leave-to {
      opacity: 0;
    }
  }
}
</style>
