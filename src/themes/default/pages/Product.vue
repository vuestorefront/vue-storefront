<template>
  <div id="product">
    <breadcrumbs :routes="breadcrumbs.routes" :active-route="breadcrumbs.name" />
     {{ product.name }}
  </div>
</template>

<script>
import { corePage } from 'lib/themes'
import breadcrumbsData from 'src/resource/breadcrumbs.json'

export default {
  data () {
    return {
      breadcrumbs: {
        routes: breadcrumbsData.routes,
        name: 'Lorem ipsum'
      }
    }
  },
  mixins: [corePage('Product')]
}
</script>

<style scoped>

</style>
