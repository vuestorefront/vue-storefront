<template>
  <div
    class="column"
    :class="cssClasses"
    :style="styles"
  >
    <div
      v-for="_item in item.items"
      :key="_item.uuid"
      class="_item"
    >
      <sb-render class="box" :item="_item" />
    </div>
  </div>
</template>

<script lang="ts">
import { Blok } from '..'

export default Blok.extend({
  name: 'StoryblokColumn',
  computed: {
  }
});
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";
@import "./mixins";

.column {
  @include display-property-handling;
}
</style>
