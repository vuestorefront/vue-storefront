<template>
  <div class="compare">
    <div class="bg-cl-secondary py35 pl20">
      <div class="container">
        <breadcrumbs :with-homepage="true" :routes="[]" active-route="Compare" />
        <h2>{{ title }}</h2>
      </div>
    </div>
    <div class="py35">
      <div class="row" v-if="items.length">
        <div class="col-xs-12">
          <div class="compare__products-table">
            <div class="compare__features">
              <div class="compare__top-info">
                {{ $t('Products') }}
              </div>
              <ul class="compare__features-list">
                <li
                  v-for="(attr, index) in all_comparable_attributes"
                  :key="index"
                  class="compare__features-item"
                >
                  {{ attr.default_frontend_label }}
                </li>
              </ul>
            </div>
            <div class="compare__products-wrapper">
              <ul class="compare__products-columns">
                <li
                  v-for="(product, index) in items"
                  :key="index"
                  class="compare__product"
                  data-testid="comparedProduct"
                >
                  <div class="compare__top-info">
                    <div class="check" />
                    <product-tile class="col-md-12 collection-product" :product="product" />
                  </div>
                  <ul class="compare__features-list">
                    <li
                      v-for="(attr, attIndex) in all_comparable_attributes"
                      :key="attIndex"
                      class="compare__features-item"
                    >
                      <product-attribute
                        :key="attr.attribute_code"
                        :product="product"
                        :attribute="attr"
                        empty-placeholder="N/A"
                      />
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="container" v-else>
        <div class="row">
          <div class="col-xs-12">
            <h4 class="cl-accent ml30">
              {{ $t('You have no items to compare.') }}
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Compare from '@vue-storefront/core/pages/Compare'
import Breadcrumbs from '../components/core/Breadcrumbs'
import ProductTile from '../components/core/ProductTile'
import ProductAttribute from '../components/core/blocks/Compare/ProductAttribute'
import i18n from '@vue-storefront/i18n'

export default {
  components: {
    Breadcrumbs,
    ProductTile,
    ProductAttribute
  },
  mixins: [Compare],
  props: {
    title: {
      type: String,
      required: true
    }
  },
  metaInfo () {
    return {
      title: this.$route.meta.title || this.title || i18n.t('Compare Products'),
      meta: this.$route.meta.description
        ? [{ vmid: 'description', description: this.$route.meta.description }]
        : []
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';

$color-white: color(white);
$border: mix(#000, $color-white, 10%);
$color-product-bg: color(secondary, $colors-background);

$products-column-width-mobile: 140px;
$products-column-width: 280px;
$features-column-width-mobile: 110px;
$features-column-width: 210px;

$screen-l: 1170px;

*,
*::after,
*::before {
  box-sizing: border-box;
}

.compare {
  &__products-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    border-style: solid;
    border-color: $border;
    border-width: 1px 0 1px 0;
  }

  &__products-columns {
    margin: 0 0 0 $features-column-width-mobile;
    padding: 0;
    display: flex;

    @media (min-width: $screen-l) {
      margin-left: $features-column-width;
    }
  }

  &__products-table {
    position: relative;
    overflow: hidden;
  }

  &__features {
    position: absolute;
    z-index: 3;
    top: 0;
    left: 0;
    width: $features-column-width-mobile;
    border-style: solid;
    border-color: $border;
    border-width: 1px 0 1px 0;
    background-color: mix(#000, $color-white, 2%);
    opacity: 0.95;

    @media (min-width: $screen-l) {
      width: $features-column-width;
    }
  }

  &__product {
    list-style: none;
    position: relative;
    float: left;
    width: $products-column-width-mobile;
    text-align: center;
    transition: opacity 0.3s, visibility 0.3s, transform 0.3s;

    @media (min-width: $screen-l) {
      width: $products-column-width;
    }
  }

  &__attributes {
    font-weight: bold;
    font-size: 0.6rem;
    line-height: 14px;
    padding: 15px 5px;
    text-align: left;

    @media (min-width: $screen-l) {
      padding: 25px 10px;
      line-height: 16px;
      font-size: 0.7rem;
    }
  }

  &__top-info {
    position: relative;
    height: 250px;
    width: $products-column-width-mobile;
    text-align: center;
    border-color: $border;
    border-style: solid;
    border-width: 0 1px 0 0;
    transition: height 0.3s;
    cursor: pointer;
    background: $color-product-bg;
    overflow: hidden;

    @media (min-width: $screen-l) {
      height: 385px;
      width: $products-column-width;
    }

    .compare__features & {
      @extend .compare__attributes;
      width: $features-column-width-mobile;
      cursor: auto;
      background: mix(#000, $color-white, 2%);

      @media (min-width: $screen-l) {
        width: $features-column-width;
      }
    }
  }

  &__features-list {
    margin: 0;
    padding: 0;
  }

  &__features-item {
    @extend .compare__attributes;
    border-color: $border;
    border-style: solid;
    border-width: 1px 1px 0 0;
    list-style: none;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    .compare__products-columns & {
      font-weight: normal;
      text-align: center;
    }
  }

  &__remove {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
