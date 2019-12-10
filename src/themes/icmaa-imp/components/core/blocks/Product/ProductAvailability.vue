<template>
  <div class="t-flex t-items-center t-text-sm" :class="[stockStatus.color]">
    <material-icon icon="lens" size="sm" class="t-mr-1" />
    {{ $t(stockStatus.text) }}
  </div>
</template>

<script>
import { toDayjsDate, getCurrentStoreviewDayjsDatetime } from 'icmaa-config/helpers/datetime'
import MaterialIcon from 'theme/components/core/blocks/MaterialIcon'

export default {
  name: 'ProductAvailability',
  components: { MaterialIcon },
  props: {
    product: {
      type: Object,
      required: true
    },
    showText: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      statusMap: {
        'available': { text: 'In stock & shippable', color: 't-text-alt-3' },
        'lessstock': { text: 'Only a few left', color: 't-text-alt-2' },
        'unavailable': { text: 'Currently out of stock', color: 't-text-alert' },
        'preorder': { text: 'Currently in pre-order', color: 't-text-alt-1' },
        'endofsale': { text: 'Not available in time', color: 't-text-base-tone' }
      }
    }
  },
  computed: {
    confChildrenQty () {
      if (this.product.type_id !== 'configurable') {
        return 0
      }

      let qty = 0
      this.product.configurable_children.foreach(c => {
        if (c.stock.is_in_stock === true) {
          qty += c.stock.qty
        }
      })

      return qty
    },
    isEndOfSale () {
      return this.endOfSale <= 0
    },
    endOfSale () {
      const current = getCurrentStoreviewDayjsDatetime()
      if (this.product.ticket_endofsale) {
        let endOfSale = toDayjsDate(this.product.ticket_endofsale)

        // If endOfSale date is on weekend, subtract until weekday
        if ([0, 6].includes(endOfSale.day())) {
          endOfSale = endOfSale.subtract(endOfSale.day() === 0 ? 2 : 1, 'day')
        }

        return endOfSale.diff(current, 'day')
      }

      return false
    },
    stockStatus () {
      let status = 'available'
      let qty = this.product.stock.qty + this.confChildrenQty

      if (!this.product.stock.is_in_stock || qty === 0) {
        status = 'unavailable'
      } else if (this.product.stock.is_in_stock && qty <= 5) {
        status = 'lessstock'
      }

      if (this.product.preorder) {
        status = 'preorder'
      } else if (this.isEndOfSale) {
        status = 'endofsale'
      }

      return this.statusMap[status]
    }
  }
}
</script>
