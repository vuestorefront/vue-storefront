<template>
  <div data-testid="storyblok-page">
    <sb-rich-text :text="item.description" v-if="item.description" />
    <sb-render v-for="child in item.body" :item="child" :key="child.uuid" />
  </div>
</template>

<script lang="ts">
import { Blok } from '..'
import ComponentWidthCalculator from '../../component-width-calculator.service'

export default Blok.extend({
  name: 'PageBlok',
  provide () {
    return {
      'componentWidthCalculator': new ComponentWidthCalculator({
        xsmall: 479,
        small: 767,
        medium: 1023,
        large: 1199,
        xlarge: 2730
      })
    }
  }

})
</script>
