<template>
  <sidebar :title="productOptionsLabel" :close-on-click="false">
    <div class="t-flex t-flex-wrap t-pb-20">
      <template v-if="product.type_id === 'configurable'">
        <div class="error t-w-full " v-if="product.errors && Object.keys(product.errors).length > 0">
          {{ product.errors | formatProductMessages }}
        </div>
        <div v-for="option in productOptions" :key="option.id" class="t-w-full t-flex t-flex-col">
          <default-selector
            v-for="(filter, key) in availableFilters[option.attribute_code]"
            :key="key"
            :option="filter"
            @change="changeFilter"
            :price="getOptionPrice(filter)"
            :is-last="key === Object.keys(availableFilters[option.attribute_code]).length - 1"
            :is-loading="isLoading"
            :is-active="selectedOption && selectedOption.id === filter.id"
          />
        </div>
      </template>
      <product-links
        v-if="product.type_id === 'grouped'"
        :products="product.product_links"
      />
      <product-bundle-options
        v-if="product.bundle_options && product.bundle_options.length > 0"
        :product="product"
      />
      <product-custom-options
        v-else-if="product.custom_options && product.custom_options.length > 0"
        :product="product"
      />
      <model :product="product" class="t-w-full t-p-4 t-mt-6 t-mb-px t-bg-base-lightest t-text-sm t-text-base-tone" />
      <router-link to="size-chart" class="t-w-full t-p-4 t-bg-base-lightest t-text-sm t-text-primary">
        {{ $t('Which size fits me?') }}
        <material-icon icon="call_made" size="md" class="t-float-right t-align-middle" />
      </router-link>
    </div>
  </sidebar>
</template>

<script>
import i18n from '@vue-storefront/i18n'
import { mapGetters } from 'vuex'
import { notifications } from '@vue-storefront/core/modules/cart/helpers'
import Composite from '@vue-storefront/core/mixins/composite'
import ProductPriceMixin from 'theme/mixins/product/priceMixin'
import ProductOptionsMixin from 'theme/mixins/product/optionsMixin'
import ProductAddToCartMixin from 'theme/mixins/product/addtocartMixin'
import ProductStockAlertMixin from 'icmaa-product-alert/mixins/productStockAlertMixin'

import Sidebar from 'theme/components/core/blocks/AsyncSidebar/Sidebar'
import DefaultSelector from 'theme/components/core/blocks/AddToCartSidebar/DefaultSelector'
import ProductLinks from 'theme/components/core/ProductLinks.vue'
import ProductCustomOptions from 'theme/components/core/ProductCustomOptions.vue'
import ProductBundleOptions from 'theme/components/core/ProductBundleOptions.vue'
import Model from 'theme/components/core/blocks/AddToCartSidebar/Model'
import MaterialIcon from 'theme/components/core/blocks/MaterialIcon'

export default {
  name: 'AddToCartSidebar',
  mixins: [ Composite, ProductOptionsMixin, ProductAddToCartMixin, ProductPriceMixin, ProductStockAlertMixin ],
  components: {
    Sidebar,
    DefaultSelector,
    ProductBundleOptions,
    ProductCustomOptions,
    ProductLinks,
    Model,
    MaterialIcon
  },
  data () {
    return {
      selectedOption: undefined,
      loading: false,
      quantity: 0
    }
  },
  mounted () {
    this.setSelectedOptionByCurrentConfigurableProduct()
  },
  computed: {
    ...mapGetters({
      product: 'product/getCurrentProduct',
      originalProduct: 'product/getOriginalProduct',
      configuration: 'product/getCurrentProductConfiguration',
      options: 'product/getCurrentProductOptions',
      isAddingToCart: 'cart/getIsAdding'
    }),
    isLoading () {
      return this.loading || this.isAddingToCart
    }
  },
  methods: {
    setSelectedOptionByCurrentConfigurableProduct () {
      if (this.product.type_id !== 'configurable') {
        return
      }

      this.productOptions.find(filter => {
        const options = this.availableFilters[filter.attribute_code]
        return options.find(option => {
          const selectedVariantFilter = this.selectedFilters[option.type]
          if (!selectedVariantFilter) {
            return false
          }

          if (Array.isArray(selectedVariantFilter)) {
            return !!selectedVariantFilter.find(o => o.id === option.id)
          }

          if (selectedVariantFilter.id === option.id) {
            this.selectedOption = option
          }
        })
      })
    },
    changeFilter (option) {
      if (option.available) {
        this.$bus.$emit(
          'filter-changed-product',
          Object.assign({ attribute_code: option.type }, option)
        )
        this.setSelectedOptionByCurrentConfigurableProduct()

        this.loading = true
        this.getQuantity()
          .then(() => this.addToCart(this.product))
          .then(() => {
            this.loading = false
          })
      } else {
        this.selectedOption = option
        this.addProductStockAlert(option)
      }
    },
    getOptionPrice (option) {
      if (this.hasMultiplePrices) {
        const product = this.product.configurable_children.find(child => child[option.type] === option.id)
        if (product) {
          return product.original_price_incl_tax
        }
      }

      return false
    }
  }
}
</script>
