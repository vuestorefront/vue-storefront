<template>
  <div v-if="product">
    <product-tile :product="product" :show-price="false">
      <template v-slot:imageOverlay>
        <button-component type="transparent" :rounded="false" icon="close" icon-position="right" :icon-only="true" :confirm="true" padding-x="t-px-2 lg:t-px-3" @click="removeAlert" class="t-absolute t-bottom-0 t-right-0 t-z-1 lg:t-h-12 t-bg-white">
          {{ $t('Delete') }}
        </button-component>
      </template>
    </product-tile>
    <div v-if="options.length > 0" class="t-mt-2">
      <div v-for="(option, i) in options" :key="i" class="t-flex t-items-center">
        <span v-text="option.label + ':'" class="t-text-xs t-mr-2" />
        <button-component type="tag" size="xs" :cursor-pointer="false" v-text="option.value" class="t-mr-2" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { htmlDecode } from '@vue-storefront/core/lib/store/filters'
import { formatProductLink } from 'icmaa-url/helpers'
import i18n from '@vue-storefront/i18n'

import ProductTile from 'theme/components/core/ProductTile'
import ButtonComponent from 'theme/components/core/blocks/Button'

export default {
  name: 'MyProductsAlertProduct',
  components: {
    ProductTile,
    ButtonComponent
  },
  props: {
    stockItemId: {
      type: [String, Number],
      required: true
    }
  },
  computed: {
    ...mapGetters({
      getOptionLabel: 'attribute/getOptionLabel',
      getParentProductByStockItem: 'icmaaProductAlert/getParentProductByStockItem',
      getProducts: 'icmaaProductAlert/getProducts'
    }),
    product () {
      return this.getParentProductByStockItem(this.stockItemId)
    },
    productId () {
      return this.product.id
    },
    childProduct () {
      return this.product.configurable_children.find(el => el.id === this.stockItemId)
    },
    options () {
      const options = []
      this.product.configurable_options.forEach(o => {
        const attributeKey = o.attribute_code
        const label = /size/.test(attributeKey) ? i18n.t('Size') : o.label
        const optionId = this.childProduct[o.attribute_code]
        const value = this.getOptionLabel({ attributeKey, optionId })
        options.push({ label, value })
      })

      return options
    }
  },
  methods: {
    async removeAlert () {
      await this.$store.dispatch('icmaaProductAlert/removeProductStockAlert', this.stockItemId)
      this.$store.dispatch('notification/spawnNotification', {
        type: 'success',
        message: i18n.t('You successfully unsupscripted for this stock notification.'),
        action1: { label: i18n.t('OK') }
      })
    }
  }
}
</script>
