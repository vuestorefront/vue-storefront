<template>
  <div id='hp'>
    Core Home
  </div>
</template>

<script>
import MainSlider from '../components/core/blocks/MainSlider/MainSlider.vue'
import ProductTile from '../components/core/ProductTile.vue'
let bodybuilder = require('bodybuilder')

export default {
  name: 'Home',
  beforeMount () {
    this.$store.dispatch('checkout/loadQueue')
    this.$store.dispatch('checkout/placeOrder',
      {
        'products': [
          {
            'sku': 'product_dynamic_1',
            'qty': 1,
            'name': 'Product one',
            'price': 19,
            'product_type': 'simple'
          },
          {
            'sku': 'product_dynamic_2',
            'qty': 1,
            'name': 'Product two',
            'price': 54,
            'product_type': 'simple'
          }
        ],
        'addressInformation': {
          'shippingAddress': {
            'region': 'MH',
            'region_id': 0,
            'country_id': 'PL',
            'street': [
              'Street name line no 1',
              'Street name line no 2'
            ],
            'company': 'Company name',
            'telephone': '123123123',
            'postcode': '00123',
            'city': 'Cityname',
            'firstname': 'John ',
            'lastname': 'Doe',
            'email': 'john@doe.com',
            'region_code': 'MH',
            'sameAsBilling': 1
          },
          'billingAddress': {
            'region': 'MH',
            'region_id': 0,
            'country_id': 'PL',
            'street': [
              'Street name line no 1',
              'Street name line no 2'
            ],
            'company': 'abc',
            'telephone': '1111111',
            'postcode': '00123',
            'city': 'Mumbai',
            'firstname': 'Sameer',
            'lastname': 'Sawant',
            'email': 'john@doe.com',
            'prefix': 'address_',
            'region_code': 'MH'
          },
          'shipping_method_code': 'flatrate',
          'shipping_carrier_code': 'flatrate',
          'payment_method_code': 'cashondelivery'
        }
      })

    this.$store.dispatch('cart/loadCart')
    // this.$store.dispatch('catalog/quickSearchByText', 'bag')

    const inst = this
    this.$store.dispatch('catalog/quickSearchByQuery',
      bodybuilder().query('match', 'name', 'Bag').aggregation('terms', 'category.id').build() // docs: http://bodybuilder.js.org/
    ).then(function (res) {
      inst.newProducts = res.items
    })
  },
  components: {
    ProductTile,
    MainSlider
  }
}
</script>

<style scoped>

</style>
