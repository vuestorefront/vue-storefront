<template>
  <div data-testid="storyblok-page">
    <sb-rich-text :text="item.description" v-if="item.description" />
    <sb-render v-for="child in item.body" :item="child" :key="child.uuid" />
  </div>
</template>

<script lang="ts">
import { Blok } from '..'

export default Blok.extend({
  name: 'PageBlok'

})
</script>
