<template>
  <div class="row">
    <div v-for="_item in item.columns" :key="_item.uuid" class="col-xs-12" :class="[colSizeSm, colSizeLg]">
      <sb-render class="box" :item="_item" />
    </div>
  </div>
</template>

<script>
import { Blok } from '..'

export default {
  extends: Blok,
  name: 'GridBlok',
  computed: {
    colSizeSm: function () {
      return 'col-sm-' + Math.floor(12 / this.item.columns_count_mobile)
    },
    colSizeLg: function () {
      return 'col-lg-' + Math.floor(12 / this.item.columns_count)
    }
  }
}
</script>

<style scoped>
.box {
  height: 100%;
}
</style>
