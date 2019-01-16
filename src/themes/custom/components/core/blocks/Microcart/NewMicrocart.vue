<template>
  <div id="microcart2">
    {{ productsInCart[0].name }}
  </div>
</template>

<script>
import Microcart from '@vue-storefront/core/compatibility/components/blocks/Microcart/Microcart'

export default {
  mixins: [Microcart]
}
</script>
