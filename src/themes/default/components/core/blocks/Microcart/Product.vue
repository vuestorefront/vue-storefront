<template>
  <li class="row py10 bg-cl-white" :class="{ 'relative': editMode }">
    <div class="mx10 w-100 py10 mb15 edit-mode flex between-xs middle-xs" v-if="editMode">
      Edit mode
      <button class="brdr-none bg-cl-transparent" @click="closeEditMode">
        <span class="cl-accent">
          <i class="material-icons cl-accent mr5">
            close
          </i>
        </span>
      </button>
    </div>
    <div class="blend">
      <div class="ml10 bg-cl-secondary">
        <product-image :image="image" />
      </div>
    </div>
    <div class="col-xs pt15 flex pl35 flex-wrap">
      <div class="flex flex-nowrap details">
        <div class="flex w-100 flex-wrap between-xs">
          <div :class="{ 'w-100 pb10': !productsAreReconfigurable }">
            <div>
              <router-link
                class="serif h4 name"
                :to="productLink"
                data-testid="productLink"
                @click.native="$store.commit('ui/setMicrocart', false)"
              >
                {{ product.name | htmlDecode }}
              </router-link>
              <div class="h6 cl-bg-tertiary pt5 sku" data-testid="productSku">
                {{ product.sku }}
              </div>
              <div class="h6 cl-bg-tertiary pt5 options" v-if="isOnline && !editMode && product.totals && product.totals.options">
                <div v-for="opt in product.totals.options" :key="opt.label">
                  <span class="opn">{{ opt.label }}: </span>
                  <span class="opv" v-html="opt.value" />
                </div>
              </div>
              <div class="h6 cl-bg-tertiary pt5 options" v-else-if="!editMode && product.options">
                <div v-for="opt in product.options" :key="opt.label">
                  <span class="opn">{{ opt.label }}: </span>
                  <span class="opv" v-html="opt.value" />
                </div>
              </div>
              <div class="h6 pt5 cl-error" v-if="product.errors && Object.keys(product.errors).length > 0">
                {{ product.errors | formatProductMessages }}
              </div>
              <div class="h6 pt5 cl-success" v-if="product.info && Object.keys(product.info).length > 0 && Object.keys(product.errors).length === 0">
                {{ product.info | formatProductMessages }}
              </div>
            </div>
          </div>
          <div class="h5 cl-accent lh25 qty">
            <base-input-number
              :name="$t('Quantity')"
              :value="productQty"
              @input="updateProductQty"
              :min="1"
            />
          </div>
        </div>
        <div class="flex mr10 align-right start-xs between-sm prices">
          <div class="prices" v-if="!displayItemDiscounts || !isOnline">
            <span class="h4 serif cl-error price-special" v-if="product.special_price">
              {{ product.priceInclTax * product.qty | price }}&nbsp;
            </span>
            <span class="h6 serif price-original" v-if="product.special_price">
              {{ product.originalPriceInclTax * product.qty | price }}
            </span>
            <span class="h4 serif price-regular" v-else data-testid="productPrice">
              {{ (product.originalPriceInclTax ? product.originalPriceInclTax : product.priceInclTax) * product.qty | price }}
            </span>
          </div>
          <div class="prices" v-else-if="isOnline && product.totals">
            <span class="h4 serif cl-error price-special" v-if="product.totals.discount_amount">
              {{ product.totals.row_total - product.totals.discount_amount + product.totals.tax_amount | price }}&nbsp;
            </span>
            <span class="h6 serif price-original" v-if="product.totals.discount_amount">
              {{ product.totals.row_total_incl_tax | price }}
            </span>
            <span class="h4 serif price-regular" v-if="!product.totals.discount_amount">
              {{ product.totals.row_total_incl_tax | price }}
            </span>
          </div>
          <div class="prices" v-else>
            <span class="h4 serif price-regular">
              {{ (product.regular_price || product.price_incl_tax) * product.qty | price }}
            </span>
          </div>
        </div>
      </div>
      <div class="w-100 pb15 flex flex-wrap bottom-xs" v-if="editMode">
        <div class="ml0 flex flex-wrap filters" v-if="productsAreReconfigurable">
          <div class="h5 pt5 w-100" v-for="(option, index) in product.configurable_options" :key="index">
            <div class="h6 cl-bg-tertiary mr10">
              {{ option.label }}:
            </div>
            <div class="flex flex-wrap pt5" v-if="option.label == 'Color' && editMode">
              <color-selector
                v-for="filter in getAvailableFilters[option.attribute_code]"
                v-if="isOptionAvailable(filter)"
                :key="filter.id"
                :variant="filter"
                :selected-filters="getSelectedOptions"
                @change="editModeSetFilters"
              />
            </div>
            <div class="flex flex-wrap pt5" v-else-if="option.label == 'Size' && editMode">
              <size-selector
                class="mr10 mb10"
                v-for="filter in getAvailableFilters[option.attribute_code]"
                v-if="isOptionAvailable(filter)"
                :key="filter.id"
                :variant="filter"
                :selected-filters="getSelectedOptions"
                @change="editModeSetFilters"
              />
            </div>
          </div>
        </div>
        <button-full class="update-button mb10 mr10" @click.native="updateProductVariant">
          {{ $t('Update item') }}
        </button-full>
      </div>
      <div class="w-100 flex middle-xs actions" :class="{ 'end-xs pb5': !productsAreReconfigurable }" v-if="!editMode">
        <edit-button class="mx5" @click="openEditMode" v-if="productsAreReconfigurable && !editMode" />
        <remove-button class="mx5" @click="removeItem" />
      </div>
    </div>
  </li>
</template>

<script>
import config from 'config'
import Product from '@vue-storefront/core/compatibility/components/blocks/Microcart/Product'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { formatProductLink } from '@vue-storefront/core/modules/url/helpers'

import ProductImage from 'theme/components/core/ProductImage'
import ColorSelector from 'theme/components/core/ColorSelector.vue'
import SizeSelector from 'theme/components/core/SizeSelector.vue'
import RemoveButton from './RemoveButton'
import EditButton from './EditButton'
import BaseInputNumber from 'theme/components/core/blocks/Form/BaseInputNumber'
import { onlineHelper } from '@vue-storefront/core/helpers'
import { ProductOption } from '@vue-storefront/core/modules/catalog/components/ProductOption'
import ButtonFull from 'theme/components/theme/ButtonFull'
import EditMode from './EditMode'

export default {
  components: {
    RemoveButton,
    BaseInputNumber,
    ProductImage,
    ColorSelector,
    SizeSelector,
    EditButton,
    ButtonFull
  },
  mixins: [Product, ProductOption, EditMode],
  data () {
    return {
      displayItemDiscounts: config.cart.displayItemDiscounts,
      productsAreReconfigurable: config.cart.productsAreReconfigurable && ['simple', 'configurable'].includes(this.product.type_id) && !(this.product.custom_options && this.product.custom_options.length > 0)
    }
  },
  computed: {
    isOnline () {
      return onlineHelper.isOnline
    },
    image () {
      return {
        loading: this.thumbnail,
        src: this.thumbnail
      }
    },
    productLink () {
      return formatProductLink(this.product, currentStoreView().storeCode)
    },
    editMode () {
      return this.getEditingProductId === this.product.id
    },
    productQty () {
      return this.editMode ? this.getEditingQty : this.product.qty
    }
  },
  methods: {
    updateProductVariant () {
      this.updateVariant()
      this.closeEditMode()
    },
    updateProductQty (qty) {
      if (this.editMode) {
        this.editModeSetQty(qty)
        return
      }

      this.updateQuantity(qty)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
  .blend {
    flex: 0 0 150px;
  }

  .image {
    mix-blend-mode: multiply;
    vertical-align: top;
    width: 150px;
    @media (max-width: 767px) {
      width: 100px;
    }
  }

  .details {
    flex: 1 1 auto;
    display: flex;
    flex-flow: row wrap;
  }

  .name {
    @media (max-width: 767px) {
      font-size: 14px;
    }
  }

  .options, .sku {
    @media (max-width: 767px) {
      font-size: 10px;
    }
  }

  .qty {
    padding-right: 30px;

    @media (max-width: 767px) {
      font-size: 12px;
    }
  }

  .actions {
    margin: 0 -5px;
  }

  .prices {
    flex-direction: column;
    @media (max-width: 767px) {
      padding: 0;
      font-size: 12px;
    }
  }

  .price-special {
    @media (max-width: 767px) {
      font-size: 14px;
    }
  }

  .price-original {
    text-decoration: line-through;
  }

  input {
    width: 30px;
  }

  .flex-nowrap {
    flex-wrap: nowrap;
  }

  .flex-wrap {
    flex-wrap: wrap;
  }

  .edit-mode {
    border-bottom: 1px solid color(white-smoke);
  }

  .filters {
    flex: 1 1 200px;
  }

  .update-button {
    font-size: 14px;
    min-width: 150px;
    width: 150px;
    padding: 10px;
  }
</style>
