<template>
  <div data-testid="storyblok-block-reference" v-if="item.reference.content">
    <sb-render v-for="child in item.reference.content.body" :item="child" :key="child.uuid" />
  </div>
</template>

<script>
import { Blok } from '..'

export default {
  extends: Blok,
  name: 'BlockReference'
}
</script>
