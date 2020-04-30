<template>
  <div id="category">
    <Header />
    <div class="main section">
      <div class="sidebar desktop-only">
        <SfLoader :class="{ loading }" :loading="loading">
          <SfAccordion :firstOpen="true" :showChevron="false">
            <SfAccordionItem
              v-for="(cat, i) in categoryTree && categoryTree.items"
              :key="i"
              :header="cat.label"
            >
              <template>
                <SfList class="list">
                  <SfListItem class="list__item">
                    <SfMenuItem :label="cat.label">
                      <template #label>
                        <nuxt-link :to="localePath(getCategoryPath(cat)) + `?store=${multistoreGetters.getId(selectedStore)}`" :class="isCategorySelected(cat.slug) ? 'sidebar--cat-selected' : ''">All</nuxt-link>
                      </template>
                    </SfMenuItem>
                  </SfListItem>
                  <SfListItem class="list__item" v-for="(subCat, j) in cat.items" :key="j">
                    <SfMenuItem :label="subCat.label">
                      <template #label="{ label }">
                        <nuxt-link :to="localePath(getCategoryPath(subCat)) + `?store=${multistoreGetters.getId(selectedStore)}`" :class="isCategorySelected(subCat.slug) ? 'sidebar--cat-selected' : ''">{{ label }}</nuxt-link>
                      </template>
                    </SfMenuItem>
                  </SfListItem>
                </SfList>
              </template>
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
            @click:wishlist="toggleWishlist(i)"
            :link="localePath(`/p/${productGetters.getId(product)}/${productGetters.getSlug(product)}?store=${multistoreGetters.getId(selectedStore)}`)"
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
            :link="localePath(`/p/${productGetters.getId(product)}/${productGetters.getSlug(product)}?store=${multistoreGetters.getId(selectedStore)}`)"
          />
        </transition-group>
        <SfPagination
          v-show="totalPages > 1"
          class="products__pagination"
          :current="currentPage"
          @click="goToPage"
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
      <div class="filters desktop-only">
        <SfHeading
          :level="4"
          title="Collection"
          class="filters__title sf-heading--left"
        />
        <SfFilter
          v-for="filter in filters.collection"
          :key="filter.value"
          :label="filter.label"
          :count="filter.count"
          :selected="filter.selected"
          class="filters__item"
          @change="filter.selected = !filter.selected"
        />
        <SfHeading
          :level="4"
          title="Color"
          class="filters__title sf-heading--left"
        />
        <div class="filters__colors">
          <SfColor
            v-for="filter in filters.color"
            :key="filter.value"
            :color="filter.color"
            :selected="filter.selected"
            class="filters__color"
            @click="filter.selected = !filter.selected"
          />
        </div>
        <SfHeading
          :level="4"
          title="Size"
          class="filters__title sf-heading--left"
        />
        <SfFilter
          v-for="filter in filters.size"
          :key="filter.value"
          :label="filter.label"
          :count="filter.count"
          :selected="filter.selected"
          class="filters__item"
          @change="filter.selected = !filter.selected"
        />
        <SfHeading
          :level="4"
          title="Price"
          class="filters__title sf-heading--left"
        />
        <SfFilter
          v-for="filter in filters.price"
          :key="filter.value"
          :label="filter.label"
          :count="filter.count"
          :selected="filter.selected"
          class="filters__item"
          @change="filter.selected = !filter.selected"
        />
       <SfHeading
          :level="4"
          title="Material"
          class="filters__title sf-heading--left"
        />
        <SfFilter
          v-for="filter in filters.material"
          :key="filter.value"
          :value="filter.value"
          :label="filter.label"
          :selected="filter.selected"
          class="filters__item"
          @change="filter.selected = !filter.selected"
        />

        <div class="filters__buttons">
          <SfButton
            @click="isFilterSidebarOpen = false"
            class="sf-button--full-width"
            >Done</SfButton
          >
          <SfButton
            @click="clearAllFilters"
            class="sf-button--full-width filters__button-clear"
            >Clear all</SfButton
          >
        </div>
      </div>
       <SfAccordion class="filters mobile-only">
        <SfAccordionItem header="Collection" class="filters__accordion-item">
          <SfFilter
            v-for="filter in filters.collection"
            :key="filter.value"
            :label="filter.label"
            :count="filter.count"
            :selected="filter.selected"
            class="filters__item"
            @change="filter.selected = !filter.selected"
          />
        </SfAccordionItem>
        <SfAccordionItem header="Color" class="filters__accordion-item">
          <SfFilter
            v-for="filter in filters.color"
            :key="filter.value"
            :label="filter.label"
            :color="filter.color"
            :selected="filter.selected"
            class="filters__item"
            @change="filter.selected = !filter.selected"
          />
        </SfAccordionItem>
        <SfAccordionItem header="Size" class="filters__accordion-item">
          <SfFilter
            v-for="filter in filters.size"
            :key="filter.value"
            :label="filter.label"
            :count="filter.count"
            :selected="filter.selected"
            class="filters__item"
            @change="filter.selected = !filter.selected"
          />
        </SfAccordionItem>
        <SfAccordionItem header="Price" class="filters__accordion-item">
          <SfFilter
            v-for="filter in filters.price"
            :key="filter.value"
            :label="filter.label"
            :count="filter.count"
            :selected="filter.selected"
            class="filters__item"
            @change="filter.selected = !filter.selected"
          />
        </SfAccordionItem>
        <SfAccordionItem header="Material" class="filters__accordion-item">
          <SfFilter
            v-for="filter in filters.material"
            :key="filter.value"
            :value="filter.value"
            :label="filter.label"
            :selected="filter.selected"
            class="filters__item"
            @change="filter.selected = !filter.selected"
          />
        </SfAccordionItem>
      </SfAccordion>
    </SfSidebar>
    <StoreLocator :store="multistoreGetters.getName(selectedStore)" />
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
import { computed, ref, watch } from '@vue/composition-api';
import { useCategory, useProduct, productGetters, categoryGetters } from '@vue-storefront/commercetools';
import { getCategorySearchParameters, getCategoryPath } from '~/helpers/category';
import { onSSR } from '@vue-storefront/core';
import { useMultistore, multistoreGetters } from '@vue-storefront/commercetools';
import Header from './../components/Header';
import StoreLocator from './../components/StoreLocator';

const perPageOptions = [20, 40, 100];

const sortByOptions = [
  { value: 'latest', label: 'Latest' },
  { value: 'price-up', label: 'Price from low to high' },
  { value: 'price-down', label: 'Price from high to low' }
];

// TODO: to be implemented in https://github.com/DivanteLtd/next/issues/200
const filters = {
  collection: [
    { label: 'Summer fly', value: 'summer-fly', count: '10', selected: false },
    { label: 'Best 2018', value: 'best-2018', count: '23', selected: false },
    { label: 'Your choice', value: 'your-choice', count: '54', selected: false }
  ],
  color: [
    { label: 'Red', value: 'red', color: '#990611', selected: false },
    { label: 'Black', value: 'black', color: '#000000', selected: false },
    { label: 'Yellow', value: 'yellow', color: '#DCA742', selected: false },
    { label: 'Blue', value: 'blue', color: '#004F97', selected: false },
    { label: 'Navy', value: 'navy', color: '#656466', selected: false }
  ],
  size: [
    { label: 'Size 2 (XXS)', value: 'xxs', count: '10', selected: false },
    { label: 'Size 4-6 (XS)', value: 'xs', count: '23', selected: false },
    { label: 'Size 8-10 (S)', value: 's', count: '54', selected: false },
    { label: 'Size 12-14 (M)', value: 'm', count: '109', selected: false },
    { label: 'Size 16-18 (L)', value: 'l', count: '23', selected: false },
    { label: 'Size 20-22(XL)', value: 'xl', count: '12', selected: false },
    { label: 'Size 24-26 (XXL)', value: 'xxl', count: '2', selected: false }
  ],
  price: [
    { label: 'Under $200', value: 'under-200', count: '23', selected: false },
    { label: 'Under $300', value: 'under-300', count: '54', selected: false }
  ],
  material: [
    { label: 'Cotton', value: 'coton', count: '33', selected: false },
    { label: 'Silk', value: 'silk', count: '73', selected: false }
  ]
};

// TODO: to be implemented in https://github.com/DivanteLtd/next/issues/211
const breadcrumbs = [
  { text: 'Home', route: { link: '#' } },
  { text: 'Women', route: { link: '#' } }
];

function updateFilter() {}

function clearAllFilters() {
  const filtersNames = Object.keys(filters);
  filtersNames.forEach((name) => {
    filters[name].forEach((value) => {
      value.selected = false;
    });
  });
}

export default {
  transition: 'fade',
  setup(props, context) {
    const { query } = context.root.$route;
    const { selectedStore, selectStore } = useMultistore();
    const { categories, search, loading } = useCategory('categories');
    const { products: categoryProducts, totalProducts, search: productsSearch, loading: productsLoading } = useProduct('categoryProducts');
    const currentPage = ref(parseInt(query.page, 10) || 1);
    const itemsPerPage = ref(parseInt(query.items, 10) || perPageOptions[0]);

    onSSR(async () => {
      console.log('test');
      await selectStore(query.store);
      await search(getCategorySearchParameters(context));
      await productsSearch({
        catId: (categories.value[0] || {}).id,
        page: currentPage.value,
        perPage: itemsPerPage.value
      });
    });

    watch([currentPage, itemsPerPage], () => {
      if (categories.value.length) {
        productsSearch({
          catId: categories.value[0].id,
          page: currentPage.value,
          perPage: itemsPerPage.value
        });
        context.root.$router.push({ query: {
          items: itemsPerPage.value !== perPageOptions[0] ? itemsPerPage.value : undefined,
          page: currentPage.value !== 1 ? currentPage.value : undefined,
          ...query
        }});
      }
    });

    const products = computed(() => productGetters.getFiltered(categoryProducts.value, { master: true }));
    const categoryTree = computed(() => categoryGetters.getTree(categories.value[0]));

    const isCategorySelected = (slug) => slug === (categories.value && categories.value[0].slug);

    const sortBy = ref('price-up');
    const isGridView = ref(true);
    const isFilterSidebarOpen = ref(false);

    function toggleWishlist(index) {
      products.value[index].isOnWishlist = !this.products.value[index].isOnWishlist;
    }

    const goToPage = (pageNumber) => {
      currentPage.value = pageNumber;
      context.root.$scrollTo(context.root.$el, 2000);
    };

    return {
      multistoreGetters,
      selectedStore,
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
      sortByOptions: computed(() => sortByOptions),
      filters: ref(filters),
      breadcrumbs: computed(() => breadcrumbs),
      updateFilter,
      clearAllFilters,
      toggleWishlist,
      isGridView,
      goToPage
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
    Header,
    StoreLocator
  }
};
</script>

<style lang="scss">
@import "~@storefront-ui/vue/styles";
@import "main.scss";

#category {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: 0 auto;
  }
}
.main {
  margin-top: 30px;

  &.section {
    padding: var(--spacer-xs);
    @include for-desktop {
      padding: 0;
    }
  }
}
.breadcrumbs {
  padding: var(--spacer-base) 0 var(--spacer-base)
    var(--spacer-xs);
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
  &__filters-button {
    display: flex;
    align-items: center;
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

  &__sort {
    --select-margin: 0;
    --select-padding: 0 var(--spacer-lg) 0 var(--spacer-2xs);
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
    margin: 0 var(--spacer-xl);
    @include for-desktop {
      margin: 0 0 0 var(--spacer-2xl);
    }
    &-icon {
      cursor: pointer;
    }
    &-label {
      margin: 0 var(--spacer-sm) 0 0;
      font: var(--font-medium) var(--font-xs) / 1.6 var(--font-family-secondary);
      text-decoration: underline;
    }
  }
}
.main {
  display: flex;
}
.sidebar {
  flex: 0 0 20%;
  padding-right: var(--spacer-sm);
  border: 1px solid var(--c-light);
  border-width: 0 1px 0 0;
}

.sf-accordion {
  background: #f4f4f4;
  border-radius: 10px;
  padding: 15px 30px;
}

.sf-accordion-item__header {
  background: transparent;
}

.products {
  box-sizing: border-box;
  flex: 1;
  @include for-desktop {
    margin: var(--spacer-xl);
  }
  @include for-mobile {
    display: flex;
    flex-direction: column;
    justify-items: center;

    &__pagination {
      display: inline-block;
      margin-left: auto;
      margin-right: auto;
    }
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
  // TODO: change accordingly when designed by UI team: https://github.com/DivanteLtd/storefront-ui/issues/941, https://github.com/DivanteLtd/storefront-ui/issues/1001
  &__pagination__options {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;

    .items-per-page {
      min-width: 3rem;
    }
  }

  &__pagination__label {
    color: var(--c-text-muted);
  }
  // end of TODO
  &__product-card-horizontal {
    --product-card-horizontal-padding: var(--spacer-xs);
    flex: 0 0 100%;
    @include for-desktop {
      --product-card-horizontal-padding: var(--spacer-sm);
    }
  }
  &__slide-enter {
    opacity: 0;
    transform: scale(0.5);
  }
  &__slide-enter-active {
    transition: all 0.2s ease;
    transition-delay: calc(0.1s * var(--index));
  }
  &__pagination {
    @include for-desktop {
      display: flex;
      justify-content: center;
      margin: var(--spacer-2xl) 0 0 0;
    }
  }
}
.list {
  &__item {
    &:not(:last-of-type) {
      --list-item-margin: 0 0 var(--spacer-sm) 0;
    }
  }
}
.filters {
  &__title {
    --heading-title-font-size: var(--font-xl);
    margin: var(--spacer-xl) 0 var(--spacer-base) 0;
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
