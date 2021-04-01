<template>
  <div data-testid="storyblok-page">
    <sb-rich-text :text="item.description" />
    <sb-render v-for="child in item.body" :item="child" :key="child.uuid" />
  </div>
</template>

<script>
import { Blok } from '..'

export default {
  extends: Blok,
  name: 'PageBlok'
}
</script>
