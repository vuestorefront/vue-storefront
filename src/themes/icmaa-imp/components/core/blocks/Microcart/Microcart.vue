<template>
  <sidebar :title="$t('Shopping cart')" class="microcart t-relative" data-testid="microcart" :close-on-click="false">
    <template v-slot:top-after-title>
      <button-component v-if="productsInCart.length" type="transparent" size="sm" icon="delete" :icon-only="true" @click="clearCart">
        {{ $t('Clear cart') }}
      </button-component>
    </template>
    <div class="t-pb-20">
      <h4 v-if="!productsInCart.length" class="">
        {{ $t('Your shopping cart is empty.') }}
      </h4>
      <template v-if="productsInCart.length">
        <coupon />
        <ul class="t-mb-4">
          <product v-for="product in productsInCart" :key="product.checksum || product.sku" :product="product" />
        </ul>
        <div class="t-mb-4">
          <div v-for="(segment, index) in filteredTotals" :key="`total-${index}`" class="t-flex t-items-center t-justify-between t-mb-2 t-text-sm">
            <span>
              {{ segment.title }}
            </span>
            <span v-if="segment.value !== null">
              {{ segment.value | price }}
            </span>
          </div>
          <div class="t-flex t-items-center t-justify-between t-font-bold" v-for="(segment, index) in grandTotals" :key="`grand-total-${index}`">
            <span>
              {{ segment.title }}
            </span>
            <span>
              {{ segment.value | price }}
            </span>
          </div>
        </div>

        <template v-if="!isCheckoutMode">
          <button-component type="primary" class="t-w-full" :link="{ name: 'checkout' }" @click.native="toCheckout">
            {{ $t('Go to checkout') }}
          </button-component>
        </template>
      </template>
    </div>
  </sidebar>
</template>

<script>
import { mapGetters } from 'vuex'
import i18n from '@vue-storefront/i18n'
import VueOfflineMixin from 'vue-offline/mixin'
import onEscapePress from '@vue-storefront/core/mixins/onEscapePress'
import ButtonComponent from 'theme/components/core/blocks/Button'
import Sidebar from 'theme/components/theme/blocks/AsyncSidebar/Sidebar'
import Product from 'theme/components/core/blocks/Microcart/Product'
import Coupon from 'theme/components/core/blocks/Microcart/Coupon'

export default {
  components: {
    ButtonComponent,
    Coupon,
    Sidebar,
    Product
  },
  mixins: [VueOfflineMixin, onEscapePress],
  data () {
    return {
      componentLoaded: false
    }
  },
  props: {
    isCheckoutMode: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.componentLoaded = true
    })
  },
  computed: {
    ...mapGetters({
      productsInCart: 'cart/getCartItems',
      totals: 'cart/getTotals'
    }),
    filteredTotals () {
      return this.totals.filter(segment => segment.code !== 'grand_total')
    },
    grandTotals () {
      return this.totals.filter(segment => segment.code === 'grand_total')
    }
  },
  methods: {
    toCheckout () {
      this.$store.dispatch('ui/closeAll')
      this.$router.push(this.localizedRoute('/checkout'))
    },
    clearCart () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'warning',
        message: i18n.t('Are you sure you would like to remove all the items from the shopping cart?'),
        action1: { label: i18n.t('Cancel'), action: 'close' },
        action2: {
          label: i18n.t('OK'),
          action: async () => {
            await this.$store.dispatch('cart/clear', { recreateAndSyncCart: false }) // just clear the items without sync
            await this.$store.dispatch('cart/sync', { forceClientState: true })
          }
        },
        hasNoTimeout: true
      })
    }
  }
}
</script>
