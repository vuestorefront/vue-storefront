<template>
  <div class="inspiration-tile w-100">
    <router-link
      :to="localizedRoute({ name: product.type_id + '-product', params: { parentSku: product.sku, slug: product.slug }})"
    >
      <div class="product-image bg-cl-secondary">
        <img :src="thumbnail" class="product-thumbnail">
      </div>
    </router-link>
  </div>
</template>

<script>
import { localizedRoute as localizedRouteHelper, currentStoreView } from '@vue-storefront/store/lib/multistore'

export default {
  name: 'Inspirations',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    thumbnail () {
      return this.getThumbnail(this.product.image, 310, 300)
    }
  },
  methods: {
    localizedRoute (routeObj) {
      const storeView = currentStoreView()
      return localizedRouteHelper(routeObj, storeView.storeCode)
    }
  }
}
</script>

<style scoped>
  .inspiration-tile {
    height: 350px;
  }

  .product-thumbnail {
    mix-blend-mode: multiply;
  }
</style>
