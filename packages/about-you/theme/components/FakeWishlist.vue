<template>
  <div>
    {{product}}
  </div>
</template>

<script>
import { useProduct } from '@vue-storefront/about-you';

export default {
  name: 'FakeWishlist',
  setup() {
    const { products } = useProduct();
    console.log(products);
    return {
      products
    };
  }
};
</script>
