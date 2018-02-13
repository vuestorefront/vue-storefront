<template>
  <div class="compare">
    <div class="bg-lightgray py35 pl20">
      <div class="container">
        <breadcrumbs :routes="[{name: 'Homepage', route_link: '/'}]" active-route="Compare"/>
        <h2>{{ title }}</h2>
      </div>
    </div>

    <div class="py35 px20">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <div v-if="items.length">
              <div class="py10 align-right">
                <a href="javascript:window.print()" title="Print This Page">Print This Page</a>
              </div>
              <div class="compare-wrapper">
                <table class="w-100 mw-100">
                  <thead>
                    <tr>
                      <th/>
                      <td v-for="(product, index) in items" :key="index" class="align-right">
                        <span @click="removeFromCompare(product)">
                          <remove-button/>
                        </span>
                      </td>
                    </tr>
                  </thead>
                  <tbody class="brdr-bottom brdr-c-alto">
                    <tr>
                      <th/>
                      <td v-for="(product, index) in items" :key="index" class="p5">
                        <product-tile class="col-md-12 collection-product" :product="product"/>
                      </td>
                    </tr>
                  </tbody>
                  <tbody class="brdr-bottom brdr-c-alto">
                    <tr>
                      <th class="p15 align-left">SKU</th>
                      <td v-for="(product, index) in items" :key="index" class="p15">
                        {{ product.sku }}
                      </td>
                    </tr>
                    <tr>
                      <th class="p15 align-left">Description</th>
                      <td v-for="(product, index) in items" :key="index" class="p15">
                        <div v-html="product.description"/>
                      </td>
                    </tr>
                    <tr v-for="(attr, index) in all_comparable_attributes" :key="index">
                      <th class="p15 align-left">
                        {{ attr.default_frontend_label }}
                      </th>
                      <td v-for="(product, index) in items" :key="index" class="p15">
                        <product-attribute
                          :key="attr.attribute_code"
                          :product="product"
                          :attribute="attr"
                          empty-placeholder="N/A"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <template v-else>
              <h4 class="c-darkgray ml30">You have no items to compare.</h4>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { corePage } from 'lib/themes'
import Breadcrumbs from '../components/core/Breadcrumbs'
import RemoveButton from '../components/core/blocks/Compare/RemoveButton'
import ProductTile from '../components/core/ProductTile'
import ProductAttribute from '../components/core/blocks/Compare/ProductAttribute'

export default {
  components: {
    Breadcrumbs,
    ProductTile,
    RemoveButton,
    ProductAttribute
  },
  mixins: [corePage('Compare')]
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/base/global_vars';
  $alto: map-get($colors, alto);

  .compare-wrapper {
    overflow-x: auto;
  }

  table {
    table-layout: fixed;
    border-collapse: collapse;
    border-spacing: 0;
  }

  th {
    border-right: 1px solid $alto;
  }

  td,
  th {
    width: 180px;

    &:last-child {
      border-right: 1px solid $alto;
    }
  }
</style>
