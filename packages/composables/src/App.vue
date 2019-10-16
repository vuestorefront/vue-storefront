<template>
  <div id="app">
    Product: {{ product }}<br />
    Configuration: {{ configuration }}<br />
    <button @click="configure()">Configure product</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { createComponent, ref } from '@vue/composition-api'
import { useProduct } from './hooks/useProduct'

export default createComponent({
  name: 'app',
  setup () {
    const { product, configuration, configure } = useProduct()

    return {
      product,
      configuration,
      configure
    }
  }
})
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
