<template>
  <modal name="modal-order-confirmation" :width="640">
    <p slot="header">
      {{ $t('Confirm your order') }}
    </p>
    <div slot="content">
      <p>{{ $t('Please confirm order you placed when you was offline') }}</p>
      <div class="mb40" v-for="(order, key) in ordersData" :key="key">
        <h3>{{ $t('Order #{id}', { id: key + 1}) }}</h3>
        <h4>{{ $t('Items ordered') }}</h4>
        <table class="brdr-1 brdr-cl-bg-secondary">
          <thead>
            <tr>
              <th class="serif lh20">
                {{ $t('Product Name') }}
              </th>
              <th class="serif lh20">
                {{ $t('Price') }}
              </th>
              <th class="serif lh20">
                {{ $t('Qty') }}
              </th>
              <th class="serif lh20">
                {{ $t('Subtotal') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="brdr-top-1 brdr-cl-bg-secondary" v-for="(product, productKey) in order.products" :key="productKey">
              <td class="fs-medium lh25" :data-th="$t('Product Name')">
                {{ product.name }}
                <span class="block mt5 lh16 fs-medium-small" v-for="(option, optionKey) in product.options" :key="optionKey">
                  <strong>{{ option.label }}: </strong> {{ option.value }}
                </span>
              </td>
              <td class="fs-medium lh25" :data-th="$t('Price')">
                {{ product.price_incl_tax | price(storeView) }}
              </td>
              <td class="fs-medium lh25 align-right" :data-th="$t('Qty')">
                {{ product.qty }}
              </td>
              <td class="fs-medium lh25" :data-th="$t('Subtotal')">
                {{ product.price_incl_tax * product.qty | price(storeView) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="row between-xs middle-xs mt40">
        <div class="col-xs-12 col-sm-6 cancel-order">
          <a href="#" @click.prevent="cancelOrders()">{{ $t('Cancel') }}</a>
        </div>
        <div class="col-xs-12 col-sm-6">
          <button-full @click.native="confirmOrders()">
            {{ $t('Confirm your order') }}
          </button-full>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import { ConfirmOrders } from '@vue-storefront/core/modules/offline-order/components/ConfirmOrders'
import { CancelOrders } from '@vue-storefront/core/modules/offline-order/components/CancelOrders'
import Modal from 'theme/components/core/Modal'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

export default {
  props: {
    ordersData: {
      required: false,
      type: Array,
      default: () => []
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$bus.$emit('modal-show', 'modal-order-confirmation')
    })
  },
  computed: {
    storeView () {
      return currentStoreView()
    }
  },
  methods: {
    confirmOrders () {
      ConfirmOrders.methods.confirmOrders.call(this)
      this.$bus.$emit('modal-hide', 'modal-order-confirmation')
    },
    cancelOrders () {
      CancelOrders.methods.cancelOrders.call(this)
      this.$bus.$emit('modal-hide', 'modal-order-confirmation')
    }
  },
  components: {
    Modal,
    ButtonFull
  },
  mixins: [ ConfirmOrders, CancelOrders ]
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-tertiary: color(tertiary);
$color-white-smoke: color(white-smoke);

.modal {
  font-size: 18px;
}

table {
  border-collapse: collapse;
  width: 100%;

  @media (max-width: 767px) {
    border-top: none;
  }

  th, td {
    text-align: left;
    padding: 20px;

    &.align-right {
      text-align: right;

      @media (max-width: 767px) {
        text-align: left;
      }

    }

    @media (max-width: 1199px) {
      padding: 10px;
    }

  }

  thead {
    @media (max-width: 767px) {
      display: none;
    }
  }

  tbody {

    tr {
      @media (max-width: 767px) {
        display: block
      }

      &:nth-child(even) {
        td {
          background-color: $color-white-smoke;
        }
      }

    }

    td {
      vertical-align: top;

      @media (max-width: 767px) {
        display: block;
        text-align: left;
        padding: 10px 20px;
        &:before {
          content: attr(data-th) ': ';
          font-weight: 700;
        }
      }

      &:first-child {
        @media (max-width: 767px) {
          padding: 20px 20px 10px 20px;
        }
      }

      &:last-child {
        @media (max-width: 767px) {
          padding: 10px 20px 20px 20px;
        }
      }
    }

  }

  tfoot {

    tr {
      @media (max-width: 767px) {
        display: block
      }

      &:last-child {
        td:last-child {
         padding-bottom: 20px
        }
      }

    }

    td {
      @media (max-width: 767px) {
        display: block
      }

      &:first-child {
        @media (max-width: 767px) {
          font-weight: 700;
          padding: 20px 20px 5px 20px;
        }
      }

      &:last-child {
        @media (max-width: 767px) {
          padding: 5px 20px 0 20px;
        }
      }

    }

  }

  i {
    vertical-align: middle;
  }

}

.cancel-order {
  text-align: center;
  margin-bottom: 30px;

  @media only screen and (min-width: 576px) {
    text-align: left;
    margin-bottom: 0;
  }
}
</style>
