<template>
  <SfMegaMenu
    :visible="visible"
    title="Search Results"
    class="search-results"
  >
    <SfMegaMenuColumn v-if="categories.length > 0 && 0"
                      title="Categories"
                      class="search-results__categories sf-mega-menu-column--pined-content-on-mobile">
      <SfList>
        <SfListItem v-for="(category, key) in categories" :key="key">
          {{category.name}}
        </SfListItem>
      </SfList>
    </SfMegaMenuColumn>
    <SfMegaMenuColumn title="Product results"
                      class="search-results__products sf-mega-menu-column--pined-content-on-mobile">
      <template #title="{title}">
        <SfMenuItem
          :label="title"
          class="sf-mega-menu-column__header"
          style="--menu-item-mobile-nav-icon-display: none;"
        >
          <template #label>
            <div style="display: flex; align-items: center;">
              {{title}} <span
              style="margin: 0 0 0 var(--spacer-sm); color:var(--c-gray); font: var(--font-normal) var(--font-sm)/1.4 var(--font-family-secondary); text-transform: lowercase">({{ products ? products.length : 0 }} items)</span>
            </div>
          </template>
        </SfMenuItem>
      </template>
      <SfScrollable style="--scrollable-max-height: 630px;" show-text="" hide-text="">
        <div style="display: flex; flex-wrap: wrap;">
          <ProductTile
            v-for="(product, i) in products"
            :key="productGetters.getSlug(product)"
            :product-key="i"
            :product="product"
            @click.native="$emit('hideSearchBox')"
          />
        </div>
      </SfScrollable>
    </SfMegaMenuColumn>
  </SfMegaMenu>
</template>

<script>
import { SfList, SfScrollable, SfProductCard, SfMenuItem, SfMegaMenu } from '@storefront-ui/vue';
import { categoryGetters, productGetters, useCart } from '@vue-storefront/shopify';
import ProductTile from './ProductTile';

export default {
  components: {
    SfMegaMenu,
    SfList,
    SfProductCard,
    SfScrollable,
    SfMenuItem,
    ProductTile
  },
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    categories: {
      type: Array,
      default: () => []
    },
    products: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    const { isOnCart } = useCart();

    return {
      categoryGetters,
      productGetters,
      isOnCart
    };
  }
};
</script>

<style lang="scss">
  .search-results {
    position: absolute;
    left: 0;
    top: 100%;
    z-index: 1;
    background: white;
    border-bottom: 1px solid var(--c-light);

    &__categories {
      flex: 0 0 220px;
      --menu-item-mobile-nav-icon-display: none;
    }

    &__products {
      flex: 1;
      margin: auto;
    }
    .sf-mega-menu__menu {
      flex: 1;
      width: 100%;
    }
  }
</style>
