<template>
  <div> {{ $nuxt.$route.params }} {{ category }} </div>
</template>

<script>
import { useCategory } from '@vue-storefront/commercetools-composables' 

export default {
  setup () {
    const { category } = useCategory()
    return {
      category
    }
  }
}
</script>
