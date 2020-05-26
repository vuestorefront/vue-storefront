<template>
  <div class="mb35" v-if="order">
    <!-- My order header -->
    <div class="row mb15">
      <div class="col-xs-12 col-md-2 col-lg-1">
        <return-icon class="p12 icon pointer" />
      </div>
      <div class="col-xs-12 col-md-6">
        <h3 class="m0 mb5 mt5">
          {{ $t('Order #{id}', { id: order.increment_id }) }}
          <span class="brdr-1 brdr-cl-bg-secondary py5 px10 ml20 sans-serif fs-medium-small weight-400 cl-secondary">
            {{ order.status | capitalize }}
          </span>
        </h3>
      </div>
    </div>
    <!-- My order body -->
    <div class="row fs16 mb20">
      <div class="col-xs-12 h4">
        <p>{{ order.created_at | date('LLL', storeView) }}</p>
        <p class="mt35">
          <a href="#" class="underline" @click.prevent="remakeOrder(singleOrderItems)">{{ $t('Remake order') }}</a>
        </p>
      </div>
    </div>
    <div class="row fs16 mb35">
      <div class="col-xs-12 h4">
        <h4>{{ $t('Items ordered') }}</h4>
        <table class="brdr-1 brdr-cl-bg-secondary">
          <thead>
            <tr>
              <th class="serif lh20">
                {{ $t('Product Name') }}
              </th>
              <th class="serif lh20">
                {{ $t('SKU') }}
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
              <th class="serif lh20">
                {{ $t('Thumbnail') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="brdr-top-1 brdr-cl-bg-secondary" v-for="item in singleOrderItems" :key="item.item_id">
              <td class="fs-medium lh25" :data-th="$t('Product Name')">
                {{ item.name }}
              </td>
              <td class="fs-medium lh25" :data-th="$t('SKU')">
                {{ item.sku }}
              </td>
              <td class="fs-medium lh25" :data-th="$t('Price')">
                {{ item.price_incl_tax | price(storeView) }}
              </td>
              <td class="fs-medium lh25 align-right" :data-th="$t('Qty')">
                {{ item.qty_ordered }}
              </td>
              <td class="fs-medium lh25" :data-th="$t('Subtotal')">
                {{ item.row_total_incl_tax | price(storeView) }}
              </td>
              <td class="fs-medium lh25">
                <product-image :image="{src: itemThumbnail[item.sku]}" />
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="brdr-top-1 brdr-cl-bg-secondary">
              <td colspan="5" class="align-right">
                {{ $t('Subtotal') }}
              </td>
              <td>{{ order.subtotal | price(storeView) }}</td>
            </tr>
            <tr>
              <td colspan="5" class="align-right">
                {{ $t('Shipping') }}
              </td>
              <td>{{ order.shipping_amount | price(storeView) }}</td>
            </tr>
            <tr>
              <td colspan="5" class="align-right">
                {{ $t('Tax') }}
              </td>
              <td>{{ order.tax_amount + order.discount_tax_compensation_amount | price(storeView) }}</td>
            </tr>
            <tr v-if="order.discount_amount">
              <td colspan="5" class="align-right">
                {{ $t('Discount') }}
              </td>
              <td>{{ order.discount_amount | price(storeView) }}</td>
            </tr>
            <tr>
              <td colspan="5" class="align-right">
                {{ $t('Grand total') }}
              </td>
              <td>{{ order.grand_total | price(storeView) }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <div class="row fs16 mb35">
      <div class="col-xs-12 h4">
        <h4>{{ $t('Order informations') }}</h4>
        <div class="row">
          <div class="col-sm-6 col-md-3" v-if="shippingAddress">
            <h5>{{ $t('Shipping address') }}</h5>
            <address>
              <p>{{ shippingAddress.firstname }} {{ shippingAddress.lastname }}</p>
              <p>{{ shippingAddress.street[0] }} {{ shippingAddress.street[1] }}</p>
              <p>{{ shippingAddress.postcode }} {{ shippingAddress.city }}</p>
              <p>{{ shippingAddress.country }}</p>
            </address>
          </div>
          <div class="col-sm-6 col-md-3" v-if="order.shipping_description">
            <h5>{{ $t('Shipping method') }}</h5>
            <p>{{ order.shipping_description }}</p>
          </div>
          <div class="col-sm-6 col-md-3">
            <h5>{{ $t('Billing address') }}</h5>
            <address>
              <p>{{ billingAddress.firstname }} {{ billingAddress.lastname }}</p>
              <p>{{ billingAddress.street[0] }} {{ billingAddress.street[1] }}</p>
              <p>{{ billingAddress.postcode }} {{ billingAddress.city }}</p>
              <p>{{ billingAddress.country }}</p>
            </address>
          </div>
          <div class="col-sm-6 col-md-3">
            <h5>{{ $t('Payment method') }}</h5>
            <p>{{ paymentMethod }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import MyOrder from '@vue-storefront/core/compatibility/components/blocks/MyAccount/MyOrder'
import ReturnIcon from 'theme/components/core/blocks/Header/ReturnIcon'
import ProductImage from 'theme/components/core/ProductImage'
import { getThumbnailPath, productThumbnailPath } from '@vue-storefront/core/helpers'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { mapActions } from 'vuex'

export default {
  mixins: [MyOrder],
  components: {
    ReturnIcon,
    ProductImage
  },
  data () {
    return {
      itemThumbnail: []
    }
  },
  computed: {
    storeView () {
      return currentStoreView()
    }
  },
  methods: {
    ...mapActions({
      getProduct: 'product/single'
    })
  },
  mounted () {
    this.singleOrderItems.forEach(async item => {
      if (!this.itemThumbnail[item.sku]) {
        const product = await this.getProduct({ options: { sku: item.sku } })
        const thumbnail = productThumbnailPath(product)
        Vue.set(this.itemThumbnail, item.sku, getThumbnailPath(thumbnail, 280, 280))
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-tertiary: color(tertiary);
$color-white-smoke: color(white-smoke);

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

a {
  &:after {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: $color-tertiary;
  }

  &:hover {
    &:after {
      opacity: 0;
    }
  }
}

address {
  font-style: normal;
}

</style>
