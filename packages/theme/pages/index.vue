<template>
  <div class="container">
    <!-- <img :src="'https://demo.storefrontcloud.io/img/310/300/resize/' + product.image" />
    {{ product.name }}
    {{ product.price }} $ -->
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import { setup } from '@vue-storefront/api-client'
import { useProduct } from '@vue-storefront/composables'

export default {
  setup () {
    // const { product } = useProduct('MS09')
    return {
      // product
    }
  }
}
</script>
