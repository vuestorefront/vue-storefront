<template>
  <div class="row">
    <div v-for="_item in item.columns" :key="_item.uuid" class="col-xs-12 col-sm-6 col-lg-3">
      <sb-render class="box" :item="_item" />
    </div>
  </div>
</template>

<script>
import { Blok } from '..'

export default {
  extends: Blok,
  name: 'GridBlok'
}
</script>

<style scoped>
.box {
  height: 100%;
}
</style>
