<template>
  <div class="container">
    <button @click="loadProduct">load</button>
    <div v-if="product">

    <img :src="'https://demo.storefrontcloud.io/img/310/300/resize/' + product.image" />
    {{ product.name }}
    {{ product.price }} $
        </div>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import { setup } from '@vue-storefront/api-client'
import { useProduct } from '@vue-storefront/composables'

export default {
  setup () {
    setup({
      baseURL: 'http://localhost:8080/apiv2/',
    })
    const { product } = useProduct('MS09')
    const loadProduct = () => {

    }

  return {
      product,
      loadProduct
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
