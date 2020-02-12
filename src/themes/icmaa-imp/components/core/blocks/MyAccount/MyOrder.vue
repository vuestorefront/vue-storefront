<template>
  <div>
    <div class="t-p-4 t-bg-white t-mb-4" v-if="order && typeof order !== 'undefined'">
      <headline icon="local_mall">
        {{ $t('Order') }}
        <span v-if="order" class="t-text-sm t-text-base-light t-flex-grow lg:t-flex-fix t-ml-4"># {{ order.increment_id }}</span>
      </headline>
      <div class="t-flex t-flex-wrap t-justify-between t-text-sm t-text-base-tone">
        <div class="t-w-1/2 lg:t-w-1/4 t-mb-4 lg:t-mb-0">
          <div class="t-font-bold t-mb-1 t-text-base-lighter t-text-xxs t-uppercase">
            {{ $t('Date') }}
          </div>
          {{ order.created_at | date }}
        </div>
        <div class="t-w-1/2 lg:t-w-1/4 t-mb-4 lg:t-mb-0">
          <div class="t-font-bold t-mb-1 t-text-base-lighter t-text-xxs t-uppercase">
            {{ $t('Status') }}
          </div>
          <status-icon :status="order.status" />
        </div>
        <div class="t-w-full lg:t-w-2/4 t-flex t-flex-wrap t-items-center t-justify-between lg:t-justify-end">
          <router-link :to="localizedRoute('/service')" class="t-w-full t-mb-2 lg:t-w-auto lg:t-mb-0 lg:t-mr-4 t-font-light t-text-normal">
            {{ $t('Are there any questions left?') }}
          </router-link>
          <button-component type="ghost" @click="$router.push(localizedRoute(`/my-account/order-review/${order.id}`))">
            {{ $t('Review order') }}
          </button-component>
        </div>
      </div>
    </div>
    <div class="t-p-4 t-bg-white t-mb-4">
      <div class="t-flex t-flex-wrap t--mx-2 t-text-sm t-text-base-tone">
        <div class="t-w-full sm:t-w-1/2 t-order-1 sm:t-order-none t-px-2 t-mb-4">
          <div class="t-font-bold t-mb-1 t-text-base-lighter t-text-xxs t-uppercase">
            {{ $t('Billing address') }}
          </div>
          <p>{{ billingAddress.firstname }} {{ billingAddress.lastname }}</p>
          <p>{{ billingAddress.street[0] }} {{ billingAddress.street[1] }}</p>
          <p>{{ billingAddress.postcode }} {{ billingAddress.city }}</p>
          <p>{{ billingAddress.country }}</p>
        </div>
        <div class="t-w-full sm:t-w-1/2 t-order-3 sm:t-order-none t-px-2 t-mb-4">
          <div class="t-font-bold t-mb-1 t-text-base-lighter t-text-xxs t-uppercase">
            {{ $t('Shipping address') }}
          </div>
          <p>{{ shippingAddress.firstname }} {{ shippingAddress.lastname }}</p>
          <p>{{ shippingAddress.street[0] }} {{ shippingAddress.street[1] }}</p>
          <p>{{ shippingAddress.postcode }} {{ shippingAddress.city }}</p>
          <p>{{ shippingAddress.country }}</p>
        </div>
        <div class="t-w-full sm:t-w-1/2 t-order-2 sm:t-order-none t-px-2 t-mb-4 sm:t-mb-0">
          <div class="t-font-bold t-mb-1 t-text-base-lighter t-text-xxs t-uppercase">
            {{ $t('Payment method') }}
          </div>
          <p v-if="paymentMethod">
            {{ paymentMethod }}
          </p>
          <p v-else>
            {{ $t('No informations') }}
          </p>
        </div>
        <div class="t-w-full sm:t-w-1/2 t-order-4 sm:t-order-none t-px-2">
          <div class="t-font-bold t-mb-1 t-text-base-lighter t-text-xxs t-uppercase">
            {{ $t('Shipping method') }}
          </div>
          <p v-if="order.shipping_description">
            {{ order.shipping_description }}
          </p>
          <p v-else>
            {{ $t('No informations') }}
          </p>
          <tracking-link :order-id="order.id" :status="order.status" class="t-mt-2">
            <button-component type="ghost" icon="local_shipping">
              {{ $t('Shipment tracking') }}
            </button-component>
          </tracking-link>
        </div>
      </div>
    </div>

    <div>
      <div class="t-text-base-tone t-text-xl t-font-thin t-mb-4 t-pl-4">
        {{ $t('Items ordered') }}
      </div>
      <div class="t-hidden md:t-flex t-items-center t-bg-white t-p-4 t-pb-0">
        <div class="t-w-8/12 t-font-bold t-text-base-lighter t-text-xxs t-uppercase">
          {{ $t('Product name') }}
        </div>
        <div class="t-w-2/12 t-text-right t-font-bold t-text-base-lighter t-text-xxs t-uppercase">
          {{ $t('Qty') }}
        </div>
        <div class="t-w-2/12 t-text-right t-font-bold t-text-base-lighter t-text-xxs t-uppercase">
          {{ $t('Subtotal') }}
        </div>
      </div>
      <div class="t-mb-1 t-bg-white t-p-4 t-text-sm t-text-base-tone" v-for="item in singleOrderItemsWithOptions" :key="item.item_id">
        <div class="t-flex t-flex-wrap t-items-end">
          <div class="t-w-full md:t-w-8/12 t-mb-2 md:t-mb-0 t-text-sm" :data-div="$t('Product Name')">
            <router-link :to="item.product_link" class="t-text-primary">
              {{ item.name }}
            </router-link>
            <div v-for="(option, i) in item.options" :key="i">
              {{ option.label }}: {{ option.value }}
            </div>
          </div>
          <div class="t-w-2/3 md:t-w-2/12 t-text-right">
            {{ item.qty_ordered }}
            <span class="t-text-xxs t-uppercase md:t-hidden" v-text="$t('Pcs.')" />
          </div>
          <div class="t-w-1/3 md:t-w-2/12 t-text-right" :data-div="$t('Subtotal')">
            {{ item.row_total_incl_tax | price }}
          </div>
        </div>
      </div>
    </div>

    <div class="t-p-4 t-bg-white t-mb-4">
      <div class="t-flex t-flex-wrap t--mx-2 t-text-sm t-text-base-tone">
        <div class="t-w-2/3 lg:t-w-3/4 t-px-2 t-text-right" v-text="$t('Subtotal')" />
        <div class="t-w-1/3 lg:t-w-1/4 t-px-2 t-text-right" v-text="price(order.subtotal)" />
        <div class="t-w-2/3 lg:t-w-3/4 t-px-2 t-text-right" v-text="$t('Shipping')" />
        <div class="t-w-1/3 lg:t-w-1/4 t-px-2 t-text-right" v-text="price(order.shipping_amount)" />
        <div class="t-w-2/3 lg:t-w-3/4 t-px-2 t-text-right" v-text="$t('Tax')" />
        <div class="t-w-1/3 lg:t-w-1/4 t-px-2 t-text-right" v-text="price((order.tax_amount + order.discount_tax_compensation_amount))" />
        <div class="t-w-2/3 lg:t-w-3/4 t-px-2 t-text-right" v-text="$t('Discount')" />
        <div class="t-w-1/3 lg:t-w-1/4 t-px-2 t-text-right" v-text="price(order.discount_amount)" />
        <div class="t-w-2/3 lg:t-w-3/4 t-px-2 t-text-right t-text-lg t-font-bold t-text-base-darkest t-mt-2" v-text="$t('Grand total')" />
        <div class="t-w-1/3 lg:t-w-1/4 t-px-2 t-text-right t-text-lg t-font-bold t-text-base-darkest t-mt-2" v-text="price(order.grand_total)" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { formatProductLink } from 'icmaa-url/helpers'
import { price } from 'icmaa-config/helpers/price'
import i18n from '@vue-storefront/i18n'
import Headline from 'theme/components/core/blocks/MyAccount/Headline'
import MyOrder from '@vue-storefront/core/compatibility/components/blocks/MyAccount/MyOrder'
import TrackingLink from 'icmaa-tracking/components/TrackingLink'
import StatusIcon from 'theme/components/core/blocks/MyAccount/MyOrders/StatusIcon'
import ButtonComponent from 'theme/components/core/blocks/Button'

export default {
  mixins: [MyOrder],
  components: {
    Headline,
    StatusIcon,
    TrackingLink,
    ButtonComponent
  },
  computed: {
    ...mapGetters({
      getOptionLabel: 'attribute/getOptionLabel'
    }),
    singleOrderItemsWithOptions () {
      return this.singleOrderItems.map(item => {
        const product = this.getProduct(item)
        item.product_link = product ? formatProductLink(product, currentStoreView().storeCode) : ''
        item.options = this.getProductOptions(item)
        return item
      })
    },
    attributeCodes () {
      let attributeCodes = []
      if (!this.order.products) {
        return attributeCodes
      }

      this.order.products
        .filter(p => p.configurable_options)
        .forEach(p => {
          p.configurable_options.forEach(ch => {
            if (!attributeCodes.includes(ch.attribute_code)) {
              attributeCodes.push(ch.attribute_code)
            }
          })
        })

      return attributeCodes
    }
  },
  methods: {
    price,
    getProduct (orderItem) {
      if (!this.order || !this.order.products) {
        return false
      }

      return this.order.products.find(p => p.id === orderItem.product_id) || false
    },
    getProductOptions (orderItem) {
      if (!this.order || !this.order.products) {
        return []
      }

      const product = this.getProduct(orderItem)
      if (!product || !product.configurable_options) {
        return []
      }

      const options = []
      product.configurable_options.forEach(o => {
        const attributeKey = o.attribute_code
        const label = /size/.test(attributeKey) ? i18n.t('Size') : o.label
        const childProduct = product.configurable_children.find(c => c.sku === orderItem.sku)
        const optionId = childProduct[o.attribute_code]
        const value = this.getOptionLabel({ attributeKey, optionId })
        options.push({ label, value })
      })

      return options
    }
  },
  async mounted () {
    await await this.$store.dispatch('attribute/list', { filterValues: this.attributeCodes })
  }
}
</script>
