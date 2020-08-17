<template>
  <div id="category">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />

    <div class="navbar section">
      <div class="navbar__aside desktop-only">
        <SfHeading :level="3" :title="$t('Categories')" class="navbar__title" />
      </div>
      <div class="navbar__main">
        <SfButton data-cy="category-btn_filters"
          class="sf-button--text navbar__filters-button"
          aria-label="Filters"
          @click="isFilterSidebarOpen = true"
        >
          <SfIcon
            size="18px"
            color="#BEBFC4"
            icon="filter"
            class="navbar__filters-icon"
            data-cy="category-icon_"
          />
          {{ $t('Filters') }}
        </SfButton>
        <div class="navbar__sort desktop-only">
          <span class="navbar__label">{{ $t('Sort by') }}:</span>
          <SfSelect class="navbar__select" v-model="sortBy" data-cy="category-select_sortBy">
            <SfSelectOption
              v-for="option in availableSortingOptions"
              :key="option.value"
              :value="option.value"
              class="sort-by__option"
              >{{ option.label }}</SfSelectOption
            >
          </SfSelect>
        </div>
        <div class="navbar__counter">
          <span class="navbar__label desktop-only">{{ $t('Products found') }}: </span>
          <span class="desktop-only">{{ totalProducts }}</span>
          <span class="navbar__label mobile-only">{{ totalProducts }} Items</span>
        </div>
        <div class="navbar__view">
          <span class="navbar__view-label desktop-only">{{ $t('View') }}</span>
          <SfIcon
            data-cy="category-icon_grid-view"
            class="navbar__view-icon"
            :color="isGridView ? '#1D1F22' : '#BEBFC4'"
            icon="tiles"
            size="12px"
            role="button"
            aria-label="Change to grid view"
            :aria-pressed="isGridView"
            @click="isGridView = true"
          >
          </SfIcon>
          <SfIcon
            data-cy="category-icon_list-view"
            class="navbar__view-icon"
            :color="!isGridView ? '#1D1F22' : '#BEBFC4'"
            icon="list"
            size="12px"
            role="button"
            aria-label="Change to list view"
            :aria-pressed="!isGridView"
            @click="isGridView = false"
          />
        </div>
      </div>
    </div>

    <div class="main section">
      <div class="sidebar desktop-only">
        <SfLoader :class="{ loading }" :loading="loading">
          <SfAccordion :firstOpen="true" :showChevron="false">
            <SfAccordionItem
              v-for="(cat, i) in categoryTree && categoryTree.items"
              :key="i"
              :header="cat.label"
            >
              <SfList class="list">
                <SfListItem class="list__item">
                  <SfMenuItem :data-cy="`category-link_subcategory_${cat.slug}`" :label="cat.label">
                    <template #label>
                      <nuxt-link :to="localePath(getCategoryPath(cat))" :class="isCategorySelected(cat.slug) ? 'sidebar--cat-selected' : ''">All</nuxt-link>
                    </template>
                  </SfMenuItem>
                </SfListItem>
                <SfListItem class="list__item" v-for="(subCat, j) in cat.items" :key="j">
                  <SfMenuItem :data-cy="`category-link_subcategory_${subCat.slug}`" :label="subCat.label">
                    <template #label="{ label }">
                      <nuxt-link :to="localePath(getCategoryPath(subCat))" :class="isCategorySelected(subCat.slug) ? 'sidebar--cat-selected' : ''">{{ label }}</nuxt-link>
                    </template>
                  </SfMenuItem>
                </SfListItem>
              </SfList>
            </SfAccordionItem>
          </SfAccordion>
        </SfLoader>
      </div>
      <div class="products">
        <transition-group
          v-if="isGridView"
          appear
          name="products__slide"
          tag="div"
          class="products__grid"
        >
          <SfProductCard
            data-cy="category-product-card"
            v-for="(product, i) in products"
            :key="productGetters.getSlug(product)"
            :style="{ '--index': i }"
            :title="productGetters.getName(product)"
            :image="productGetters.getCoverImage(product)"
            :regular-price="productGetters.getFormattedPrice(productGetters.getPrice(product).regular)"
            :special-price="productGetters.getFormattedPrice(productGetters.getPrice(product).special)"
            :max-rating="5"
            :score-rating="3"
            :show-add-to-cart-button="true"
            :isOnWishlist="false"
            :isAddedToCart="isOnCart(product)"
            @click:wishlist="toggleWishlist(i)"
            @click:add-to-cart="addToCart(product, 1)"
            :link="localePath(`/p/${productGetters.getId(product)}/${productGetters.getSlug(product)}`)"
            class="products__product-card"
          />
        </transition-group>
        <transition-group
          v-else
          appear
          name="products__slide"
          tag="div"
          class="products__list"
        >
          <SfProductCardHorizontal
            data-cy="category-product-cart_wishlist"
            v-for="(product, i) in products"
            :key="productGetters.getSlug(product)"
            :style="{ '--index': i }"
            :title="productGetters.getName(product)"
            :description="productGetters.getDescription(product)"
            :image="productGetters.getCoverImage(product)"
            :regular-price="productGetters.getFormattedPrice(productGetters.getPrice(product).regular)"
            :special-price="productGetters.getFormattedPrice(productGetters.getPrice(product).special)"
            :max-rating="5"
            :score-rating="3"
            :is-on-wishlist="false"
            class="products__product-card-horizontal"
            @click:wishlist="toggleWishlist(i)"
            :link="localePath(`/p/${productGetters.getId(product)}/${productGetters.getSlug(product)}`)"
          />
        </transition-group>
        <SfPagination
          data-cy="category-pagination"
          v-show="totalPages > 1"
          class="products__pagination"
          :current="currentPage"
          :total="totalPages"
          :visible="5"
        />
        <!-- TODO: change accordingly when designed by UI team: https://github.com/DivanteLtd/storefront-ui/issues/941 -->
        <div
          v-show="totalPages > 1"
          class="products__pagination__options"
        >
          <span class="products__pagination__label">Items per page:</span>
          <SfSelect class="items-per-page" v-model="itemsPerPage">
            <SfSelectOption
              v-for="option in perPageOptions"
              :key="option"
              :value="option"
              class="items-per-page__option"
              >{{ option }}</SfSelectOption
            >
          </SfSelect>
        </div>
        <!-- end of TODO -->
      </div>
    </div>
    <SfSidebar
      :visible="isFilterSidebarOpen"
      title="Filters"
      @close="isFilterSidebarOpen = false"
    >
      <Filters
        :filters="filters"
        @click:apply-filters="applyFilters"
      >
        <template #categories-mobile>
          <SfAccordionItem
            header="Category"
            class="filters__accordion-item"
          >
            <SfAccordion class="categories mobile-only">
              <SfAccordionItem
                v-for="cat in categoryTree && categoryTree.items"
                :key="`category-${cat.slug}`"
                :header="cat.label"
              >
                <SfList class="list">
                  <SfListItem class="list__item">
                    <SfMenuItem
                      :data-cy="`category-link_subcategory_${cat.slug}`"
                      :label="cat.label"
                      icon=""
                    >
                      <template #label>
                        <nuxt-link :to="localePath(getCategoryPath(cat))" :class="isCategorySelected(cat.slug) ? 'sidebar--cat-selected' : ''">All</nuxt-link>
                      </template>
                    </SfMenuItem>
                  </SfListItem>
                  <SfListItem class="list__item" v-for="subCat in cat.items" :key="`subcat-${subCat.slug}`">
                    <SfMenuItem
                      :data-cy="`category-link_subcategory_${subCat.slug}`"
                      :label="subCat.label"
                      icon=""
                    >
                      <template #label="{ label }">
                        <nuxt-link :to="localePath(getCategoryPath(subCat))" :class="isCategorySelected(subCat.slug) ? 'sidebar--cat-selected' : ''">{{ label }}</nuxt-link>
                      </template>
                    </SfMenuItem>
                  </SfListItem>
                </SfList>
              </SfAccordionItem>
            </SfAccordion>
          </SfAccordionItem>
        </template>
      </Filters>
    </SfSidebar>
  </div>
</template>

<script>
import {
  SfSidebar,
  SfButton,
  SfList,
  SfIcon,
  SfHeading,
  SfMenuItem,
  SfFilter,
  SfProductCard,
  SfProductCardHorizontal,
  SfPagination,
  SfAccordion,
  SfSelect,
  SfBreadcrumbs,
  SfLoader,
  SfColor
} from '@storefront-ui/vue';
import { computed, ref, watch, onMounted } from '@vue/composition-api';
import { useCategory, useProduct, useCart, useWishlist, productGetters, categoryGetters } from '<%= options.generate.replace.composables %>';
import { getCategorySearchParameters, getCategoryPath } from '~/helpers/category';
import { getFiltersFromUrl, getFiltersForUrl } from '~/helpers/filters';
import { useAsync } from 'nuxt-composition-api';
import Filters from '../components/Filters';

const perPageOptions = [20, 40, 100];

// TODO: to be implemented in https://github.com/DivanteLtd/next/issues/211
const fallbackBreadcrumbs = [
  { text: 'Home', route: { link: '#' } },
  { text: 'Women', route: { link: '#' } }
];

export default {
  transition: 'fade',
  setup(props, context) {
    const { query } = context.root.$route;
    onMounted(() => context.root.$scrollTo(context.root.$el, 2000));

    const { categories, search, loading } = useCategory('categories');
    const {
      products: categoryProducts,
      totalProducts,
      search: productsSearch,
      loading: productsLoading,
      availableFilters,
      availableSortingOptions
    } = useProduct('categoryProducts');
    const { loadCart, addToCart, isOnCart } = useCart();
    const { addToWishlist } = useWishlist();

    const currentPage = ref(parseInt(query.page, 10) || 1);
    const itemsPerPage = ref(parseInt(query.items, 10) || perPageOptions[0]);
    const sortBy = ref(query.sort || (availableSortingOptions?.value && availableSortingOptions?.value[0] ? availableSortingOptions.value[0]?.value : null));
    const filters = ref(null);

    const productsSearchParams = computed(() => ({
      catId: (categories.value[0] || {}).id,
      page: currentPage.value,
      perPage: itemsPerPage.value,
      filters: filters.value,
      sort: sortBy.value
    }));

    useAsync(async () => {
      // TODO: simplify
      await search(getCategorySearchParameters(context));
      await productsSearch(productsSearchParams.value);
      filters.value = getFiltersFromUrl(context, availableFilters.value);
      await productsSearch(productsSearchParams.value);
      await loadCart();
    });

    watch([itemsPerPage, sortBy, filters], () => {
      if (categories.value.length) {
        productsSearch(productsSearchParams.value);
        context.root.$router.push({ query: {
          ...context.root.$route.query,
          ...getFiltersForUrl(filters.value),
          sort: sortBy.value,
          items: itemsPerPage.value !== perPageOptions[0] ? itemsPerPage.value : undefined
        }});
      }
    }, { deep: true });

    const products = computed(() => productGetters.getFiltered(categoryProducts.value, { master: true }));
    const categoryTree = computed(() => categoryGetters.getTree(categories.value[0]));

    const isCategorySelected = (slug) => slug === (categories.value && categories.value[0].slug);

    const isGridView = ref(true);
    const isFilterSidebarOpen = ref(false);

    function toggleWishlist(index) {
      addToWishlist(products.value[index]);
    }

    const applyFilters = (updatedFilters) => {
      filters.value = updatedFilters;
      productsSearch(productsSearchParams.value);
      isFilterSidebarOpen.value = false;
    };

    const breadcrumbs = computed(() => categoryGetters.getBreadcrumbs ? categoryGetters.getBreadcrumbs(categories.value[0]) : fallbackBreadcrumbs);

    return {
      products,
      productsLoading,
      categoryTree,
      getCategoryPath,
      isCategorySelected,
      loading,
      productGetters,
      totalProducts,
      totalPages: computed(() => Math.ceil(totalProducts.value / itemsPerPage.value)),
      currentPage,
      itemsPerPage,
      perPageOptions: computed(() => perPageOptions),
      sortBy,
      isFilterSidebarOpen,
      availableSortingOptions,
      filters,
      breadcrumbs,
      applyFilters,
      toggleWishlist,
      addToCart,
      isOnCart,
      isGridView
    };
  },
  components: {
    SfButton,
    SfSidebar,
    SfIcon,
    SfList,
    SfFilter,
    SfProductCard,
    SfProductCardHorizontal,
    SfPagination,
    SfMenuItem,
    SfAccordion,
    SfSelect,
    SfBreadcrumbs,
    SfLoader,
    SfColor,
    SfHeading,
    Filters
  }
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
#category {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: 0 auto;
  }
}
.main {
  &.section {
    padding: var(--spacer-xs);
    @include for-desktop {
      padding: 0;
    }
  }
}
.breadcrumbs {
  padding: var(--spacer-base) var(--spacer-base) var(--spacer-base)
    var(--spacer-sm);
}
.navbar {
  position: relative;
  display: flex;
  border: 1px solid var(--c-light);
  border-width: 0 0 1px 0;
  @include for-desktop {
    border-width: 1px 0 1px 0;
  }
  &.section {
    padding: var(--spacer-sm);
    @include for-desktop {
      padding: 0;
    }
  }
  &__aside,
  &__main {
    display: flex;
    align-items: center;
    padding: var(--spacer-sm) 0;
  }
  &__aside {
    flex: 0 0 15%;
    padding: var(--spacer-sm) var(--spacer-sm);
    border: 1px solid var(--c-light);
    border-width: 0 1px 0 0;
  }
  &__main {
    flex: 1;
    padding: 0;
    @include for-desktop {
      padding: var(--spacer-xs) var(--spacer-xl);
    }
  }
  &__title {
    --heading-title-font-weight: var(--font-light);
    --heading-title-font-size: var(--font-xl);
  }
  &__filters-icon {
    margin: 0 var(--spacer-sm) 0 0;
  }
  &__filters-button {
    display: flex;
    align-items: center;
    @include for-mobile {
      order: 1;
    }
    svg {
      fill: var(--c-text-muted);
      transition: fill 150ms ease;
    }
    &:hover {
      svg {
        fill: var(--c-primary);
      }
    }
  }
  &__label {
    font-family: var(--font-family-secondary);
    font-weight: var(--font-normal);
    color: var(--c-text-muted);
    margin: 0 var(--spacer-2xs) 0 0;
  }
  &__select {
    --select-width: 220px;
    --select-padding: 0;
    --select-selected-padding: 0 var(--spacer-lg) 0 var(--spacer-2xs);
    --select-margin: 0;
    --select-error-message-height: 0;
  }
  &__sort {
    display: flex;
    align-items: center;
    margin: 0 auto 0 var(--spacer-2xl);
  }
  &__counter {
    font-family: var(--font-family-secondary);
    margin: auto;
    @include for-desktop {
      margin: auto 0 auto auto;
    }
  }
  &__view {
    display: flex;
    align-items: center;
    @include for-desktop {
      margin: 0 0 0 var(--spacer-2xl);
    }
    @include for-mobile {
      order: -1;
    }
    &-icon {
      cursor: pointer;
      margin: 0 var(--spacer-base) 0 0;
      &:last-child {
        margin: 0;
      }
    }
    &-label {
      margin: 0 var(--spacer-sm) 0 0;
      font: var(--font-medium) var(--font-xs) / 1.6 var(--font-family-secondary);
      text-decoration: underline;
    }
  }
}
.sort-by {
  --select-dropdown-z-index: 1;
  flex: unset;
  width: 11.875rem;
}
.main {
  display: flex;
}
.sidebar {
  flex: 0 0 15%;
  padding: var(--spacer-sm);
  border: 1px solid var(--c-light);
  border-width: 0 1px 0 0;
}
.sidebar-filters {
  --sidebar-title-display: none;
  --sidebar-top-padding: 0;
  @include for-desktop {
    --sidebar-content-padding: 0 var(--spacer-xl);
    --sidebar-bottom-padding: 0 var(--spacer-xl);
  }
}
.list {
  --menu-item-font-size: var(--font-sm);
  &__item {
    &:not(:last-of-type) {
      --list-item-margin: 0 0 var(--spacer-sm) 0;
    }
  }
}
.products {
  box-sizing: border-box;
  flex: 1;
  margin: 0;
  &__grid,
  &__list {
    display: flex;
    flex-wrap: wrap;
  }
  &__grid {
    justify-content: space-between;
  }
  &__grid,
  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    @include for-desktop {
      justify-content: flex-start;
    }
  }
  &__product-card {
    --product-card-padding: var(--spacer);
    flex: 1 1 50%;
    @include for-desktop {
      --product-card-padding: var(--spacer-sm);
      flex: 1 1 25%;
    }
  }
  &__product-card-horizontal {
    flex: 0 0 100%;
  }
  &__slide-enter {
    opacity: 0;
    transform: scale(0.5);
  }
  &__slide-enter-active {
    transition: all 0.2s ease;
    transition-delay: calc(0.1s * var(--index));
  }
  @include for-desktop {
    margin: var(--spacer-sm) 0 0 var(--spacer-sm);
    &__pagination {
      display: flex;
      justify-content: center;
      margin: var(--spacer-xl) 0 0 0;
    }
    &__product-card-horizontal {
      margin: var(--spacer-lg) 0;
    }
    &__product-card {
      flex: 1 1 25%;
    }
    &__list {
      margin: 0 0 0 var(--spacer-sm);
    }
  }
}
.filters {
  &__title {
    --heading-title-font-size: var(--font-xl);
    margin: var(--spacer-xl) 0 var(--spacer-base) 0;
    &:first-child {
      margin: calc(var(--spacer-xl) + var(--spacer-base)) 0 var(--spacer-xs) 0;
    }
  }
  &__color {
    margin: var(--spacer-xs) var(--spacer-xs) var(--spacer-xs) 0;
  }
  &__item {
    --filter-label-color: var(--c-secondary-variant);
    --filter-count-color: var(--c-secondary-variant);
    --checkbox-padding: 0 var(--spacer-sm) 0 var(--spacer-xl);
    padding: var(--spacer-sm) 0;
    border-bottom: 1px solid var(--c-light);
    &:last-child {
      border-bottom: 0;
    }
    @include for-desktop {
      --checkbox-padding: 0;
      margin: var(--spacer-sm) 0;
      border: 0;
      padding: 0;
    }
  }
  &__accordion-item {
    --accordion-item-content-padding: 0;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    width: 100vw;
  }
  &__buttons {
    margin: var(--spacer-sm) 0;
  }
  &__button-clear {
    --button-background: var(--c-light);
    --button-color: var(--c-dark-variant);
    margin: var(--spacer-xs) 0 0 0;
  }
}
</style>
