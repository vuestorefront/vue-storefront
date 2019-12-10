<template>
  <router-link :to="productLink" tag="li" class="t-flex t-flex-wrap t-px-2 t-bg-white t-py-4 t-cursor-pointer">
    <div class="t-w-full md:t-w-7/12 t-px-2 t-flex-grow">
      <div class="t-text-primary t-mb-2 md:t-mb-0 t-leading-tight md:t-leading-normal">
        {{ translatedProductName }}
      </div>
      <div class="t-text-sm">
        <span v-text="product.ticket_city" />
        <span class="t-uppercase" v-if="product.ticket_venue && product.ticket_venue.length > 0" v-text="`@ ${product.ticket_venue}`" />
      </div>
    </div>
    <div class="t-flex md:t-block t-w-full md:t-w-2/12 t-px-2 t-items-baseline t-text-sm md:t-text-base t-mb-2 md:t-mb-0">
      <div class="t-mr-2" v-text="ticketEventdate" />
      <div class="md:t-text-sm" v-text="product.ticket_start" />
    </div>
    <div class="t-flex md:t-block t-w-full md:t-w-2/12 t-px-2">
      <div class="t-flex-grow t-order-2 md:t-order-0 t-text-right md:t-text-left">
        <span class="price-original t-text-base-light t-line-through t-mr-2" v-if="product.special_price && parseFloat(product.original_price_incl_tax) > 0">
          {{ price(product.original_price_incl_tax) }}
        </span>
        <span class="price-special t-text-sale t-font-bold" v-if="product.special_price && parseFloat(product.special_price) > 0">
          <span v-if="hasMultiplePrices" v-text="$t('as low as')" />
          {{ price(product.price_incl_tax) }}
        </span>
        <span class="price t-text-base-dark t-font-bold" v-if="!product.special_price && parseFloat(product.price_incl_tax) > 0">
          <span v-if="hasMultiplePrices" v-text="$t('as low as')" />
          {{ price(product.price_incl_tax) }}
        </span>
      </div>
      <ProductAvailability :product="product" class="t-order-1 md:t-order-0" />
    </div>
    <div class="t-hidden md:t-block md:t-w-1/12 t-px-2 t-flex-1 t-self-center">
      <button-component type="transparent" icon="keyboard_arrow_right" :icon-only="true">
        {{ $t('Show product') }}
      </button-component>
    </div>
  </router-link>
</template>

<script>
import config from 'config'
import ProductAvailability from 'theme/components/core/blocks/Product/ProductAvailability'
import ButtonComponent from 'theme/components/core/blocks/Button'
import ProductTileMixin from 'theme/mixins/product/tileMixin'
import ProductNameMixin from 'icmaa-catalog/mixins/ProductNameMixin'
import ProductPriceMixin from 'theme/mixins/product/priceMixin'
import { toDate } from 'icmaa-config/helpers/datetime'

export default {
  name: 'ProductTicketTile',
  mixins: [ProductTileMixin, ProductNameMixin, ProductPriceMixin],
  components: {
    ProductAvailability,
    ButtonComponent
  },
  props: {
    labelsActive: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ticketEventdate () {
      return toDate(this.product.ticket_eventdate)
    }
  }
}
</script>
